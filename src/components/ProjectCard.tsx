import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/portfolio";

function initials(title: string): string {
  const words = title.trim().split(/\s+/);
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function statusDot(status: string) {
  const isActive = status.toLowerCase().startsWith("active");
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: isActive ? "#4ade80" : "var(--text-muted)" }}
      />
      <span className="font-mono text-xs text-[var(--text-muted)]">{status}</span>
    </span>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-[12px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--text-muted)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Media area — 16/9 */}
      <div
        className="w-full flex items-center justify-center overflow-hidden"
        style={{ aspectRatio: "16/9", background: "var(--bg-secondary)" }}
      >
        {project.gif ? (
          <img
            src={project.gif}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : project.cardImage ? (
          <Image
            src={project.cardImage}
            alt={project.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className="font-inter font-bold text-[var(--text-muted)] select-none"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "0.05em" }}
          >
            {initials(project.title)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="font-inter font-bold text-white text-left m-0"
            style={{ fontSize: "1.1rem" }}
          >
            {project.title}
          </h3>
          {statusDot(project.status)}
        </div>

        <p
          className="font-inter text-sm text-[var(--text-secondary)] leading-relaxed m-0"
          style={{ fontSize: "0.875rem" }}
        >
          {project.tagline}
        </p>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 mt-1">
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
    </Link>
  );
}
