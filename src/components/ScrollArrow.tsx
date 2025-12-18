"use client";
import { useEffect, useState } from "react";

export default function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      // If user scrolls down more than 100px, hide the arrow
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", toggleVisibility);

    // Clean up listener when component unmounts
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollDown = () => {
    // Finds the 'about' section and scrolls to it
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      // Conditionally add the 'fade-out' class string
      className={`scroll-down-arrow ${isVisible ? "" : "fade-out"}`}
      onClick={handleScrollDown}
      aria-label="Scroll down"
    ></div>
  );
}