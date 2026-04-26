"use client";
import { useState } from "react";
import { hero } from "@/data/portfolio";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hero.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      className="w-full mt-16 pt-8 pb-24 px-8"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-[800px] mx-auto flex flex-col gap-5">

        {/* Contact row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Email */}
          <div className="relative">
            <div
              className={`absolute -top-8 left-0 bg-white text-black px-3 py-1 rounded-md text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                copied ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-1 invisible"
              }`}
            >
              copied!
            </div>
            <button
              onClick={handleCopy}
              className="neon-glow-hover text-xs cursor-pointer tracking-wide"
              title="copy to clipboard"
            >
              {hero.email}
            </button>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {hero.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-glow-hover text-base"
                aria-label={link.label}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Ethan Shih
          </span>
          <span className="text-xs text-[var(--text-muted)] opacity-60">
            made with Next.js · TypeScript · Tailwind CSS
          </span>
        </div>

      </div>
    </footer>
  );
}
