"use client";
import { useState } from "react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "ethnj.shih@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactIcons = [
    { name: "LinkedIn", link: "https://www.linkedin.com/in/ethanshih1", icon: "fab fa-linkedin"},
    { name: "GitHub", link: "https://github.com/ethnjs", icon: "fab fa-github"},
    { name: "Resume", link: "/resume.pdf", icon: "far fa-file-lines"},
  ]

  return (
    <section id="contact" className="py-16 max-w-[800px] mx-auto text-center">
      <h2 className="text-[2.5rem] font-bold text-white mb-8">
        contact
      </h2>
      <p className="text-[1.1rem] text-[#ccc] mb-8">
        if you have any questions, feel free to reach out
      </p>

      <div className="flex flex-col items-center gap-6 mt-8 relative">
        {/* Email with Click to Copy */}
        <div className="relative group">
           {/* Copied Popup */}
           <div 
             className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-md text-sm font-bold transition-all duration-300 ${copied ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-[10px] invisible'}`}
           >
             copied!
           </div>

           <button
             onClick={handleCopy}
             className="text-[1.2rem] font-bold text-[#ccc] hover:text-white transition-colors cursor-pointer"
             title="copy to clipboard"
           >
             {email}
           </button>
        </div>

        {/* Contact Icons */}
        <div className="flex justify-center gap-10 mt-2">
          {contactIcons.map((contactIcon, i) => (
            <a
            key={i}
            href={contactIcon.link}
            target="_blank"
            className="text-[2rem] text-[#ccc] transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            aria-label={contactIcon.name}
            >
              <i className={contactIcon.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}