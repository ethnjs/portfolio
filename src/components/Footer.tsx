import { hero } from "@/data/portfolio";
import CopyEmail from "./CopyEmail";

export default function Footer() {


  return (
    <footer className="w-full pt-4 pb-16 px-8 md:px-10">
      <div className="max-w-[880px] mx-auto flex flex-col gap-5">

        {/* Contact row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Email */}
          <CopyEmail className="text-left text-xs tracking-wide" />

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
            © {new Date().getFullYear()} ethan shih
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            made with next.js · typescript · tailwind
          </span>
        </div>

      </div>
    </footer>
  );
}
