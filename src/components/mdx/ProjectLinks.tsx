import type { ProjectLink } from "@/types/project";

const ICON_MAP: Record<string, string> = {
  website:    "fa-solid fa-globe",
  github:  "fab fa-github",
  demo:   "fa-solid fa-circle-play",
  writeup: "fa-solid fa-file-lines",
};


type Props = {
  links: ProjectLink[];
};

export default function ProjectLinks({ links }: Props) {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex items-center gap-6 mt-5">
      {links.map((link) => (
        <a
          key={link.type + link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label ?? link.type}
          title={link.label ?? link.type}
          className="group"
        >
          <i
            className={`${ICON_MAP[link.type] ?? "fa-solid fa-link"} text-[1.4rem] text-[var(--text-muted)] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
          />
        </a>
      ))}
    </div>
  );
}
