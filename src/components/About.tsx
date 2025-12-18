"use client";
import { useState, useEffect, useRef } from "react";
import CourseworkTable from "./CourseworkTable";

export default function About() {
  
  const gpaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finalGpa = 4.78;
    const element = gpaRef.current;
    if (!element) return;

    const startCountUp = () => {
      let start = 0;
      const duration = 2000;
      let current = start;
      const increment = finalGpa / (duration / 10);
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= finalGpa) {
          clearInterval(timer);
          element.textContent = finalGpa.toFixed(2);
        } else {
          element.textContent = current.toFixed(2);
        }
      }, 10);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCountUp();
        observer.unobserve(element);
      }
    }, { threshold: 0.5 });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const experienceData = [
    {
      title: "vice captain and state finalist for science olympiad",
      details: [
        "awarded 3rd place out of 150+ teams for the socal region and made school history for the highest placement at the science olympiad state tournament",
        "mentored a local middle school science olympiad team which lead to them qualifying for State for the first time",
        "organized an exploration camp for new members and middle school students to showcase the different fields of science",
      ],
    },
    {
      title: "section leader in the royal wilson marching alliance",
      details: [
        "coordinated rehearsals and guided section members with music and marching techniques",
        "checked members for understanding and memorization of material",
        "liaison between my section and the band's leadership team, communicating concerns and updates to the director",
      ],
    },
    {
      title: "audio-visual team leader at local church",
      details: [
        "managed over $50,000 worth of equipment",
        "trained and mentored new volunteers",
        "self-taught the basics of audio engineering",
      ],
    },
  ];

  return (
    <section id="about" className="py-16 border-b border-[#222] max-w-[800px] mx-auto">
      {/* Main Header */}
      <h2>
        about me
      </h2>
      
      {/* Intro Paragraph */}
      <p>
        hi, i'm ethan shih, a recent high school graduate and an incoming student
        at UCI studying Computer Science and Engineering (CSE). i'm a curious
        student who loves exploring how things work. my favorites are computers,
        circuits, and audio equipment. i love learning new things and applying my
        knowledge in hands-on experiments. throughout high school, i took
        numerous stem classes such as AP Calculus, AP Physics, and AP CompSci. i
        hope to continue this journey of learning and exploring at UCI!
      </p>

      {/* Qualifications Wrapper */}
      <div className="mt-16 pt-12">
        <h3>
          my qualifications
        </h3>

        {/* The Grid: 1 col on mobile, 2 cols on md+ */}
        <div className="grid grid-cols-1 gap-y-8 gap-x-12 min-[800px]:grid-cols-3">
          
          {/* 1. GPA Item */}
          <div className="min-[800px]:col-span-1">
            <h4 className="font-bold text-[1.2rem] text-white border-b border-[#333] pb-2 mb-4">
              academic gpa
            </h4>
            <p className="text-[0.9rem] font-medium text-[#888] -mt-1 mb-4">
              glen a wilson high school
            </p>
            <p className="text-[2.5rem] font-bold text-white leading-[1.2]">
              {/* Added the ref here and set initial value to 0.00 */}
              <span ref={gpaRef}>0.00</span> 
              <span className="text-2xl"> / 4.0</span>
            </p>
            <p className="text-[0.8rem] text-[#666] italic mt-2">
              (not including band or pe)
            </p>
          </div>

          {/* 2. Experience Accordion */}
          <div className="min-[800px]:col-span-2">
            <h4 className="font-bold text-[1.2rem] text-white border-b border-[#333] pb-2 mb-2">
              experience
            </h4>
            <div className="w-full">
              {experienceData.map((item, index) => (
                <div key={index} className="border-b border-dotted border-[#222] last:border-0">
                  <button
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={openIndex === index}
                    className="w-full text-left py-4 text-base text-[#ccc] hover:text-white transition-colors duration-300 relative pl-6"
                  >
                    <span 
                      className={`absolute left-0 top-1/2 -translate-y-1/2 text-[1.2rem] text-[#666] transition-transform duration-500 ease-in-out ${openIndex === index ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                    {item.title}
                  </button>
                  
                  {/* DYNAMIC HEIGHT CONTAINER */}
                  <div 
                    ref={(el) => (contentRefs.current[index] = el)}
                    style={{ 
                        maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0px' 
                    }}
                    className="overflow-hidden transition-[max-height] duration-500 ease-out"
                  >
                    <ul className="pl-10 space-y-4">
                      {item.details.map((detail, i) => (
                        <li key={i} className="pb-4 border-b border-dotted border-[#222] last:boarder-0 text-[#888] text-[0.95rem] leading-relaxed">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 3. Coursework Table (Full Width) */}
        <div className="min-[800px]:col-span-3">
            <CourseworkTable />
        </div>
      </div>
    </section>
  );
}