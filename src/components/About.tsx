import { about } from "@/data/portfolio";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 max-w-[800px] mx-auto">
        <h2>about</h2>
        <div className="flex flex-col gap-4">
          {about.bio.map((paragraph, i) => (
            <p key={i} className="text-[var(--text-secondary)] leading-relaxed m-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section id="skills" className="py-16 max-w-[800px] mx-auto">
        <h2>skills</h2>
        <div className="flex flex-col gap-8">
          {about.skills.map(({ category, items }) => (
            <div key={category}>
              <p
                className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3 m-0"
              >
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-sm px-3 py-1 rounded-[6px] text-[var(--text-secondary)]"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
