"use client";
import { useState, useEffect } from "react";
import ScrollArrow from "./ScrollArrow";
import { hero } from "@/data/portfolio";

export default function HeroSection({ access }: { access: boolean }) {
  const [copied, setCopied] = useState(false);
  const [edgesVisible, setEdgesVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setEdgesVisible(window.scrollY <= 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(hero.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeClass = edgesVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4 pointer-events-none";

  return (
    <section
      id="welcome"
      className="relative flex h-screen flex-col items-center justify-center text-center"
    >
      {/* Center content */}
      <h1 className="flex flex-col items-start p-0 m-0">
        <span className="font-bold text-[4rem] leading-[1.2] text-white">
          {hero.greeting}
        </span>
        <span className="font-citadel text-white leading-none text-[10rem] -mt-6">
          {hero.name}
        </span>
        <span className="font-inter text-[1.1rem] font-normal text-[var(--text-secondary)] mt-3 tracking-wide self-end">
          {hero.tagline}
        </span>
      </h1>

      {/* Bottom left: email */}
      <div className={`absolute bottom-10 left-10 transition-all duration-500 ${fadeClass}`}>
        <div className="relative">
          <div
            className={`absolute -top-9 left-0 bg-white text-black px-3 py-1 rounded-md text-xs font-bold transition-all duration-300 whitespace-nowrap ${
              copied ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"
            }`}
          >
            copied!
          </div>
          <button
            onClick={handleCopy}
            className="neon-glow-hover text-[0.85rem] font-medium cursor-pointer tracking-wide"
            title="copy to clipboard"
          >
            {hero.email}
          </button>
        </div>
      </div>

      {/* Bottom right: icon links */}
      <div className={`absolute bottom-10 right-10 flex items-center gap-6 transition-all duration-500 ${fadeClass}`}>
        {hero.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[1.5rem] text-[var(--text-secondary)] transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            aria-label={link.label}
          >
            <i className={link.icon}></i>
          </a>
        ))}
      </div>

      {access && <ScrollArrow />}
    </section>
  );
}
