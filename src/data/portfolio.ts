export const hero = {
  greeting: "hi my name is",
  name: "Ethan Shih",
  tagline: "computer science and engineering @ uci",
  email: "hi@ethanshih.com",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ethanshih1", icon: "fab fa-linkedin" },
    { label: "GitHub",   url: "https://github.com/ethnjs",              icon: "fab fa-github"   },
    { label: "Resume",   url: "/resume.pdf",                            icon: "far fa-file-lines" },
  ],
}

// ---------------------------------------------------------------------------
// The overview below the hero. Keep it short: the resume has the details.
// A link with an empty url is skipped, so it's safe to leave one blank.

export type Role = { title?: string; note?: string; start: string; end?: string };
export type Entry = { name: string; links?: { label: string; url: string }[]; roles: Role[]; tags?: string[] };
export type Group = { label: string; entries: Entry[] };

export const overview: Group[] = [
  {
    label: "experience",
    entries: [
      {
        name: "legacy robotics",
        links: [{ label: "github", url: "https://github.com/UCI-Legacy-Robotics/URC-2027" }],
        roles: [
          { title: "software lead", note: "building uci's first mars rover", start: "sep 2026" },
          { title: "software engineer", start: "apr 2026", end: "sep 2026" },
        ],
        tags: ["project management", "software architecture", "ros 2", "mavlink", "react", "electron", "webrtc"],
      },
    ],
  },
  {
    label: "projects",
    entries: [
      {
        name: "nexus",
        links: [
          { label: "live", url: "https://nexus.ethanshih.com" },
          { label: "github", url: "https://github.com/ethnjs/nexus" },
          { label: "docs", url: "https://docs.ethanshih.com/docs/nexus" },
        ],
        roles: [{ note: "volunteer management system for science olympiad", start: "mar 2026" }],
        tags: ["python", "fastapi", "sqlalchemy", "postgresql", "react", "next.js", "typescript", "git", "github"],
      },
    ],
  },
  {
    label: "volunteering",
    entries: [
      {
        name: "science olympiad",
        roles: [{ title: "uci chapter co-lead", note: "running oc tournaments and supporting socal's state chapter", start: "sep 2026" }],
      },
      {
        name: "first evangelical church of san gabriel valley",
        roles: [{ title: "av engineer", note: "pushing buttons and sliding faders for His glory", start: "jan 2021" }],
      },
    ],
  },
];
