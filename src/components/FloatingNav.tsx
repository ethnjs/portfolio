"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { hero } from "@/data/portfolio";

const navItems = [
  { label: "projects", href: "#projects" },
  { label: "about",    href: "#about"    },
  { label: "skills",   href: "#skills"   },
  { label: "contact",  href: `mailto:${hero.email}` },
];

const TRACKED = ["projects", "about", "skills"];
const PADDING_X = { base: 24, hover: 28 };
const PADDING_Y = { base: 8, hover: 10 };
const GAP = { base: 4, hover: 6 };

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  // While a click-driven smooth scroll is in flight, freeze the active section
  // so mid-flight scroll readings can't override the user's intent.
  const programmaticScroll = useRef(false);
  const scrollSettleTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroH = window.innerHeight;
      const pastHero = window.scrollY > heroH * 0.7;
      setVisible(pastHero);

      if (programmaticScroll.current) {
        if (scrollSettleTimer.current) window.clearTimeout(scrollSettleTimer.current);
        scrollSettleTimer.current = window.setTimeout(() => {
          programmaticScroll.current = false;
        }, 150);
        return;
      }

      let active: string | null = null;
      for (const id of TRACKED) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 1) active = id;
      }

      setActiveSection(pastHero ? active : null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reposition the outline pill whenever active section or hover (padding) changes.
  // Compute left analytically from the final hover state instead of reading offsetLeft —
  // the parent's padding/gap is mid-transition, so offsetLeft would be a stale value.
  useLayoutEffect(() => {
    const activeIndex = navItems.findIndex(({ href }) => href.replace("#", "") === activeSection);
    if (activeIndex === -1) {
      setPill((p) => ({ ...p, opacity: 0 }));
      return;
    }
    const widths = itemRefs.current.map((el) => el?.offsetWidth ?? 0);
    const padX = hovered ? PADDING_X.hover : PADDING_X.base;
    const gap = hovered ? GAP.hover : GAP.base;
    let left = padX;
    for (let i = 0; i < activeIndex; i++) left += widths[i] + gap;
    setPill({ left, width: widths[activeIndex] ?? 0, opacity: 1 });
  }, [activeSection, hovered]);

  const handleClick = (href: string) => {
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    if (TRACKED.includes(id)) {
      setActiveSection(id);
      programmaticScroll.current = true;
    }
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
      <div
        ref={containerRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center transition-all duration-200 ease-out"
        style={{
          background: "rgba(28,28,30,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--border)",
          borderRadius: "9999px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          padding: `${hovered ? PADDING_Y.hover : PADDING_Y.base}px ${hovered ? PADDING_X.hover : PADDING_X.base}px`,
          gap: `${hovered ? GAP.hover : GAP.base}px`,
        }}
      >
        {/* Sliding glow-gradient indicator */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: pill.left,
            width: pill.width,
            top: "50%",
            height: "calc(100% - 12px)",
            transform: "translateY(-50%)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)",
            boxShadow: "0 0 10px rgba(255,255,255,0.18), 0 0 20px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)",
            opacity: pill.opacity,
            transition: "left 0.3s ease, width 0.3s ease, opacity 0.2s ease",
          }}
        />

        {navItems.map(({ label, href }, i) => {
          const isActive = activeSection === label;
          const isMail = href.startsWith("mailto:");

          const inner = (
            <span
              className="font-inter text-sm relative z-10 transition-colors duration-200"
              style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
            >
              {label}
            </span>
          );

          const cls = "px-4 py-1.5 cursor-pointer";
          const ref = (el: HTMLElement | null) => { itemRefs.current[i] = el; };

          return isMail ? (
            <a key={label} href={href} className={cls} ref={ref as React.RefCallback<HTMLAnchorElement>}>
              {inner}
            </a>
          ) : (
            <button key={label} onClick={() => handleClick(href)} className={cls} ref={ref as React.RefCallback<HTMLButtonElement>}>
              {inner}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
