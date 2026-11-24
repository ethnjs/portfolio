"use client";
import { useState, useEffect, useRef } from "react";
import { hero } from "@/data/portfolio";
import PhotoBackdrop from "./PhotoBackdrop";
import ThemeToggle from "./ThemeToggle";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked fade: --hero-fade goes 0 -> 1 over the first ~60% of the
  // viewport. The text drifts up and fades out first, the photo follows.
  useEffect(() => {
    const section = sectionRef.current!;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.6)));
      section.style.setProperty("--hero-fade", p.toFixed(3));
      section.dataset.faded = p > 0.55 ? "true" : "false";
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(hero.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={sectionRef} id="welcome" className="hero relative h-screen overflow-hidden">
      <div className="hero-photo absolute inset-0">
        <PhotoBackdrop src="/images/jiufen.jpg" />
      </div>

      <div className="hero-content relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
        {/* Top: where the photo was taken / day-night */}
        <div className="flex items-start justify-between">
          <span className="text-[0.85rem] tracking-[0.01em] text-[var(--text-secondary)]">
            九份 · jiufen, taiwan
          </span>
          <ThemeToggle />
        </div>

        {/* Bottom: name + major on the left, email + links on the right */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="m-0 mb-1 font-inter text-base text-[var(--text-secondary)]">
              {hero.greeting}
            </p>
            <h1 className="m-0 font-citadel font-normal leading-[0.9] text-[var(--text-primary)] text-[clamp(4.5rem,10vw,9rem)]">
              {hero.name}
            </h1>
            <p className="m-0 mt-4 text-base tracking-[0.01em] text-[var(--text-secondary)]">
              {hero.tagline}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="relative">
              <div
                className={`absolute -top-9 right-0 bg-[var(--text-primary)] text-[var(--bg)] px-3 py-1 rounded-md text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                  copied ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"
                }`}
              >
                copied!
              </div>
              <button
                onClick={handleCopy}
                className="neon-glow-hover text-[0.85rem] cursor-pointer tracking-[0.01em]"
                title="copy to clipboard"
              >
                {hero.email}
              </button>
            </div>
            <div className="flex items-center gap-6">
              {hero.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[1.25rem] neon-glow-hover"
                  aria-label={link.label}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
