import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { hasAccess } from "@/lib/auth";
import { projects } from "@/data/portfolio";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const access = await hasAccess();
  if (!access) redirect("/");

  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-[700px] mx-auto">

        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-white transition-colors mb-10"
        >
          ← projects
        </Link>

        {/* Title block */}
        <div className="mb-10">
          <h1 className="font-inter font-bold text-white text-[2.5rem] leading-tight mb-3">
            {project.title}
          </h1>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4 m-0">
            {project.tagline}
          </p>

          {/* Status */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: project.status.toLowerCase().startsWith("active")
                  ? "#4ade80"
                  : "var(--text-muted)",
              }}
            />
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {project.status}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5 rounded-[6px] text-[var(--text-muted)]"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Media */}
        {(project.gif || project.cardImage) ? (
          <div className="mb-12 rounded-[12px] overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <img
              src={project.gif ?? project.cardImage!}
              alt={project.title}
              className="w-full object-cover"
            />
          </div>
        ) : (
          <div
            className="mb-12 rounded-[12px] flex items-center justify-center"
            style={{
              aspectRatio: "16/9",
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <span
              className="font-inter font-bold text-[var(--text-muted)]"
              style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
            >
              {project.title.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
            </span>
          </div>
        )}

        {/* Body sections */}
        <div className="flex flex-col gap-10">

          <Section title="the problem">
            <p className="text-[var(--text-secondary)] leading-relaxed m-0">{project.problem}</p>
          </Section>

          <Section title="my role">
            <p className="text-[var(--text-secondary)] leading-relaxed m-0">{project.role}</p>
          </Section>

          <Section title="technical decisions">
            <BulletList items={project.techDecisions} />
          </Section>

          <Section title="challenges">
            <BulletList items={project.challenges} />
          </Section>

          <Section title="results / impact">
            <BulletList items={project.results} />
          </Section>

          {project.whatsNext && project.whatsNext.length > 0 && (
            <Section title="what's next">
              <BulletList items={project.whatsNext} />
            </Section>
          )}

          {project.codeSnippet && (
            <Section title={project.codeSnippet.label}>
              <pre
                className="font-mono text-sm text-[var(--text-secondary)] rounded-[8px] p-5 overflow-x-auto"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <code>{project.codeSnippet.code}</code>
              </pre>
            </Section>
          )}

          {/* Links row */}
          {(project.demoUrl || project.repoUrl) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button"
                >
                  live demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button"
                >
                  github
                </a>
              )}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-inter font-bold text-white text-lg text-left mb-3 m-0">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-5 m-0">
      {items.map((item, i) => (
        <li key={i} className="text-[var(--text-secondary)] leading-relaxed list-disc">
          {item}
        </li>
      ))}
    </ul>
  );
}
