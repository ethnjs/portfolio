import { overview, type Role } from "@/data/portfolio";

// drawn arrow, so it never turns into an emoji
function Arrow() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden className="ml-1 inline-block h-[0.6em] w-[0.6em] align-baseline">
      <path d="M2 8 L8 2 M3.5 2 H8 V6.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function dates({ start, end }: Role) {
  return `${start} – ${end ?? "now"}`;
}

// A quiet overview of experience, projects and volunteering.
// Group label on the left, entries on the right; the resume has the rest.
export default function Overview() {
  return (
    <section id="work" className="px-8 md:px-10 pt-8 pb-24">
      <div className="mx-auto flex max-w-[880px] flex-col gap-16">
        {overview.map((group) => (
          <div key={group.label} className="grid gap-4 md:grid-cols-[160px_1fr] md:gap-10">
            <h2 className="m-0 text-left text-[0.85rem] font-normal tracking-[0.01em] text-[var(--text-muted)]">
              {group.label}
            </h2>

            <div className="flex flex-col gap-10">
              {group.entries.map((entry) => {
                const links = entry.links?.filter((l) => l.url) ?? [];
                return (
                  <div key={entry.name}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="m-0 text-left text-lg font-medium text-[var(--text-primary)]">
                        {entry.name}
                      </h3>
                      {links.length > 0 && (
                        <div className="flex gap-4 text-[0.85rem]">
                          {links.map((l) => (
                            <a
                              key={l.label}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="neon-glow-hover"
                            >
                              {l.label}<Arrow />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    <ul className="m-0 mt-3 flex list-none flex-col gap-3 p-0">
                      {entry.roles.map((role) => (
                        <li key={`${role.title}-${role.start}`}>
                          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                            <span className="text-[0.95rem] text-[var(--text-primary)] opacity-[0.85]">
                              {role.title ?? role.note}
                            </span>
                            <span className="shrink-0 text-[0.85rem] tabular-nums text-[var(--text-muted)]">
                              {dates(role)}
                            </span>
                          </div>
                          {role.title && role.note && (
                            <p className="m-0 mt-0.5 text-[0.9rem] leading-snug text-[var(--text-secondary)]">
                              {role.note}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>

                    {entry.tags && (
                      <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                        {entry.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[0.75rem] text-[var(--text-muted)]"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
