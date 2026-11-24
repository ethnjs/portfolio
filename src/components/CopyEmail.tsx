"use client";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/data/portfolio";

// Click to copy the email. The address crossfades to "copied", then back.
export default function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hero.email);
    } catch {
      return; // clipboard blocked: don't claim it was copied
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      title="copy to clipboard"
      aria-label={`copy ${hero.email} to clipboard`}
      className={`swap neon-glow-hover cursor-pointer ${copied ? "is-swapped" : ""} ${className}`}
    >
      <span aria-hidden>{hero.email}</span>
      <span aria-hidden>copied</span>
      <span className="sr-only" aria-live="polite">{copied ? "copied" : ""}</span>
    </button>
  );
}
