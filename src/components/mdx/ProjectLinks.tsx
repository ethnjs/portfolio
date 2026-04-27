import type { ProjectLink } from "@/types/project";

const ICON_MAP: Record<string, string> = {
  website:    "fa-solid fa-globe",
  github:  "fab fa-github",
  demo:   "fa-solid fa-circle-play",
  writeup: "fa-solid fa-file-lines",
};

const LABEL_MAP: Record<string, string> = {
  website:    "website",
  github:  "github",
  demo:   "demo video",
  writeup: "write-up",
};

type Props = {
  links: ProjectLink[];
};

export default function ProjectLinks({ links }: Props) {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex items-center gap-6 pt-4 mt-8" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      {links.map((link) => (
        <a
          key={link.type + link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label ?? LABEL_MAP[link.type] ?? link.type}
          title={link.label ?? LABEL_MAP[link.type] ?? link.type}
          className="flex flex-col items-center gap-1.5 group"
        >
          <i
            className={`${ICON_MAP[link.type] ?? "fa-solid fa-link"} text-[1.4rem] text-[var(--text-muted)] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
          />
          <span className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-white transition-colors duration-300">
            {link.label ?? LABEL_MAP[link.type] ?? link.type}
          </span>
        </a>
      ))}
    </div>
  );
}
