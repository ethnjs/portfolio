"use client";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      const hero = window.innerHeight;
      const pastHero = window.scrollY > hero * 0.7;
      setVisible(pastHero);

      const center = window.scrollY + hero / 2;
      let closest: string | null = null;
      let minDist = Infinity;

      for (const id of TRACKED) {
        const el = document.getElementById(id);
        if (!el) continue;
        const dist = Math.abs(el.offsetTop - center);
        if (dist < minDist) {
          minDist = dist;
          closest = id;
        }
      }

      setActiveSection(pastHero ? closest : null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    if (!href.startsWith("#")) return;
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center transition-all duration-200 ease-out"
        style={{
          background: "rgba(28,28,30,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--border)",
          borderRadius: "9999px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          padding: hovered ? "10px 24px" : "8px 20px",
          gap: hovered ? "4px" : "2px",
        }}
      >
        {navItems.map(({ label, href }) => {
          const isActive = activeSection === label;
          const isMail = href.startsWith("mailto:");

          const inner = (
            <span className="relative flex flex-col items-center gap-1">
              {isActive && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
              )}
              <span
                className="font-inter text-sm transition-colors duration-150"
                style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
              >
                {label}
              </span>
            </span>
          );

          const cls = "px-3 py-1 rounded-full hover:text-white transition-colors duration-150 cursor-pointer";

          return isMail ? (
            <a key={label} href={href} className={cls}>
              {inner}
            </a>
          ) : (
            <button key={label} onClick={() => handleClick(href)} className={cls}>
              {inner}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
