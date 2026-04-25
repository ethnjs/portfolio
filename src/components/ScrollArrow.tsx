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
        isVisible ? "opacity-70 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
      }`}
      style={{ animation: isVisible ? "subtle-float 2.5s infinite ease-in-out" : "none" }}
    >
      <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Straight line — rounded caps */}
        <line x1="11" y1="2" x2="11" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Chevron — rounded joint and tips */}
        <polyline points="3,19 11,28 19,19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
