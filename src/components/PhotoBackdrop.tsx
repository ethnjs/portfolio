"use client";
import { useEffect, useRef } from "react";

type Theme = "day" | "night";
type Stop = [number, string];

// How each theme grades the photo.
const GRADES: Record<Theme, {
  stops: Stop[];         // gradient map: brightness -> color
  curve: (g: number) => number;
  lantern: string;       // color the red lanterns keep
  lanternMix: number;
  glow: number;          // red bloom around lanterns
  fog: [string, number]; // haze color + strength at the top of the frame
  strength: number;      // how much of the photo shows through the page background
}> = {
  day: {
    stops: [[0, "#2A2826"], [0.55, "#9C958A"], [1, "#F3EFE6"]],
    curve: (g) => Math.pow(clamp((g - 0.05) / 0.85), 0.8),
    lantern: "#CF3F28", lanternMix: 0.85, glow: 0,
    fog: ["#F2EEE4", 0.25],
    strength: 0.42,
  },
  night: {
    stops: [[0, "#0E1114"], [0.5, "#3E4448"], [1, "#B9B6AD"]],
    curve: (g) => Math.pow(clamp(g * 0.75), 1.4),
    lantern: "#F0703F", lanternMix: 1, glow: 0.9,
    fog: ["#7D8287", 0.35],
    strength: 0.6,
  },
};

function clamp(v: number) { return v < 0 ? 0 : v > 1 ? 1 : v; }
function rgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
function lut(stops: Stop[]) {
  const out = new Float32Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let j = 0;
    while (j < stops.length - 2 && t > stops[j + 1][0]) j++;
    const [p0, c0] = stops[j], [p1, c1] = stops[j + 1];
    const u = clamp((t - p0) / (p1 - p0)), a = rgb(c0), b = rgb(c1);
    for (let k = 0; k < 3; k++) out[i * 3 + k] = a[k] * (1 - u) + b[k] * u;
  }
  return out;
}

function grade(img: HTMLImageElement, canvas: HTMLCanvasElement, theme: Theme, bgHex: string) {
  const W = img.naturalWidth, H = img.naturalHeight;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0);
  const src = ctx.getImageData(0, 0, W, H);
  const d = src.data;
  const g = GRADES[theme];
  const map = lut(g.stops);
  const red = rgb(g.lantern), fog = rgb(g.fog[0]), bg = rgb(bgHex);

  // lantern mask: strongly saturated reds
  const mask = new Float32Array(W * H);
  for (let i = 0, p = 0; p < mask.length; i += 4, p++) {
    const r = d[i] / 255, gg = d[i + 1] / 255, b = d[i + 2] / 255;
    const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b);
    const sat = (mx - mn) / (mx + 1e-6);
    mask[p] = clamp((r - Math.max(gg, b) - 0.18) / 0.25) * clamp((sat - 0.4) / 0.3);
  }

  // blurred copy of the mask for the night bloom
  let bloom: Uint8ClampedArray | null = null;
  if (g.glow > 0) {
    const m = document.createElement("canvas"); m.width = W; m.height = H;
    const mctx = m.getContext("2d")!;
    const mi = mctx.createImageData(W, H);
    for (let p = 0; p < mask.length; p++) { mi.data[p * 4 + 3] = mask[p] * 255; }
    mctx.putImageData(mi, 0, 0);
    const b = document.createElement("canvas"); b.width = W; b.height = H;
    const bctx = b.getContext("2d", { willReadFrequently: true })!;
    bctx.filter = "blur(12px)";
    bctx.drawImage(m, 0, 0);
    bloom = bctx.getImageData(0, 0, W, H).data;
  }

  for (let i = 0, p = 0; p < mask.length; i += 4, p++) {
    const lum = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
    const k = Math.round(g.curve(lum) * 255) * 3;
    let r = map[k], gg = map[k + 1], b = map[k + 2];

    const y = Math.floor(p / W) / H;
    const f = g.fog[1] * Math.pow(1 - y, 1.2);
    r = r * (1 - f) + fog[0] * f; gg = gg * (1 - f) + fog[1] * f; b = b * (1 - f) + fog[2] * f;

    if (bloom) {
      const bl = (bloom[i + 3] / 255) * g.glow;
      r += red[0] * bl; gg += red[1] * bl; b += red[2] * bl;
    }
    const l = mask[p] * g.lanternMix;
    r = r * (1 - l) + red[0] * l; gg = gg * (1 - l) + red[1] * l; b = b * (1 - l) + red[2] * l;

    // fade toward the page background so the photo stays in the back
    const s = g.strength + (1 - g.strength) * mask[p] * 0.6;
    d[i] = (bg[0] * (1 - s) + clamp(r) * s) * 255;
    d[i + 1] = (bg[1] * (1 - s) + clamp(gg) * s) * 255;
    d[i + 2] = (bg[2] * (1 - s) + clamp(b) * s) * 255;
  }
  ctx.putImageData(src, 0, 0);
}

export default function PhotoBackdrop({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const img = new Image();
    let alive = true;

    const draw = () => {
      if (!alive || !img.complete || !img.naturalWidth) return;
      const root = document.documentElement;
      const theme = (root.dataset.theme as Theme) || "night";
      const bg = getComputedStyle(root).getPropertyValue("--bg").trim() || "#111315";
      grade(img, canvas, theme, bg);
      canvas.style.opacity = "1";
    };

    img.onload = draw;
    img.src = src;

    const obs = new MutationObserver(draw);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => { alive = false; obs.disconnect(); };
  }, [src]);

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        // photo, grain and all melt into the page instead of ending on a hard edge
        maskImage: "linear-gradient(to bottom, #000 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.2) 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.2) 90%, transparent 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
      />
      {/* calm the bottom-left corner behind the name, and the top edge behind the small text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 0% 100%, var(--bg) 0%, transparent 100%), linear-gradient(to bottom, var(--bg) 0%, transparent 18%)",
          opacity: 0.8,
        }}
      />
      {/* film grain */}
      <div className="grain absolute inset-0" />
    </div>
  );
}
