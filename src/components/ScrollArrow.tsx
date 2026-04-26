"use client";
import { useEffect, useState } from "react";

export default function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY <= 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Scroll down"
      className={`absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "opacity-0 translate-y-5 pointer-events-none"
      }`}
      style={{
        animation: isVisible ? "subtle-float 2.5s infinite ease-in-out" : "none",
        color: hovered ? "#ffffff" : "var(--text-muted)",
        filter: hovered ? "drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 20px rgba(255,255,255,0.5))" : "none",
      }}
    >
      <i className="fa-solid fa-arrow-down text-2xl"></i>
    </button>
  );
}
