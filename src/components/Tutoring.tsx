export default function TutoringSection() {
  const subjects = [
    { subject: "math", level: "high school / ap level", icon: "fa-calculator" },
    { subject: "physics", level: "high school / ap level", icon: "fa-atom" },
    { subject: "chemistry", level: "high school / ap level", icon: "fa-flask-vial" },
    { subject: "computer science", level: "ap level", icon: "fa-code" },
  ];

  return (
    <section id="tutoring" className="py-16 border-b border-[var(--border-subtle)] max-w-[800px] mx-auto">
      <h2>
        private tutoring
      </h2>
      <p className="text-center text-[1.1rem] text-[var(--text-secondary)] mb-6">
        one-on-one, in-person or virtual tutoring for the following subjects:
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
        {subjects.map((sub, idx) => (
          <div
            key={idx}
            className="bg-[var(--surface)] p-10 rounded-lg border border-[var(--border)] text-center transition-all duration-300 hover:-translate-y-[5px] hover:border-[var(--text-muted)]"
          >
            {/* Icon */}
            <div className="text-[2.5rem] text-white mb-6">
              <i className={`fas ${sub.icon}`}></i>
            </div>
            {/* Title */}
            <h3 className="text-[1.5rem] text-white mb-2 font-bold">
              {sub.subject}
            </h3>
            <p className="text-[1.1rem] text-[var(--text-secondary)] opacity-80">
              {sub.level}
            </p>
          </div>
        ))}
      </div>

      {/* Button Container */}
      <div className="text-center mt-12">
        <a
          href="https://forms.gle/Bit4ZyMSp71u2f4A7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-bold text-[1.25rem] text-white bg-transparent border-2 border-white rounded-lg px-8 py-3 transition-colors duration-300 hover:bg-white hover:text-black"
        >
          sign up
        </a>
      </div>
    </section>
  );
}