"use client";
import { useSyncExternalStore } from "react";

type Theme = "day" | "night";

// The theme lives on <html data-theme>, set before first paint in layout.tsx.
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}
const getTheme = () => (document.documentElement.dataset.theme as Theme) || "night";

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

// The page crossfades between day and night; the toggle sits outside that
// fade (see globals.css) and does its own thing: the sun's rays tuck in and
// a shadow slides across it to make a moon, while the label rolls over.
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);

  const toggle = () => {
    const next: Theme = theme === "night" ? "day" : "night";
    localStorage.setItem("theme", next);
    const apply = () => { document.documentElement.dataset.theme = next; };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduce) document.startViewTransition(apply);
    else apply();
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "night" ? "day" : "night"} mode`}
      className="theme-toggle neon-glow-hover flex items-center gap-2 text-[0.85rem] tracking-[0.01em] cursor-pointer"
    >
      <svg viewBox="0 0 24 24" className="tt-icon h-4 w-4" aria-hidden>
        <mask id="tt-moon">
          <rect width="24" height="24" fill="#fff" />
          <circle className="tt-shadow" cx="12" cy="12" r="7" fill="#000" />
        </mask>
        <circle className="tt-core" cx="12" cy="12" r="7" fill="currentColor" mask="url(#tt-moon)" />
        <g className="tt-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {RAYS.map((a) => (
            <line key={a} x1="12" y1="1.5" x2="12" y2="3.5" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
      </svg>
      <span className="tt-label" aria-hidden>
        <span>day</span>
        <span>night</span>
      </span>
    </button>
  );
}
