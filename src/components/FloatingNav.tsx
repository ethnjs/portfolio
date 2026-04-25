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

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const heroH = window.innerHeight;
      const pastHero = window.scrollY > heroH * 0.7;
      setVisible(pastHero);

      const center = window.scrollY + heroH / 2;
      let closest: string | null = null;
      let minDist = Infinity;

      for (const id of TRACKED) {
        const el = document.getElementById(id);
        if (!el) continue;
        const dist = Math.abs(el.offsetTop - center);
        if (dist < minDist) { minDist = dist; closest = id; }
      }

      setActiveSection(pastHero ? closest : null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reposition the outline pill whenever active section or hover (padding) changes
  useLayoutEffect(() => {
    const activeIndex = navItems.findIndex(({ href }) => href.replace("#", "") === activeSection);
    if (activeIndex === -1) {
      setPill((p) => ({ ...p, opacity: 0 }));
      return;
    }
    const el = itemRefs.current[activeIndex];
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  }, [activeSection, hovered]);

  const handleClick = (href: string) => {
    if (!href.startsWith("#")) return;
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
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
          padding: hovered ? "10px 28px" : "8px 24px",
          gap: hovered ? "6px" : "4px",
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
