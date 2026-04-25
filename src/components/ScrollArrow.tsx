"use client";
import { useEffect, useState } from "react";

export default function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(true);

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
      aria-label="Scroll down"
      className={`absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-500 ease-out hover:opacity-100 ${
        isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
      }`}
      style={{ animation: isVisible ? "subtle-float 2.5s infinite ease-in-out" : "none" }}
    >
      <svg width="28" height="52" viewBox="0 0 28 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Gentle S-curve line */}
        <path
          d="M 14 4 C 5 14, 23 24, 14 40"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Rounded chevron arrowhead */}
        <path
          d="M 6 33 L 14 44 L 22 33"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </button>
  );
}
