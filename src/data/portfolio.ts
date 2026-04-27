export const hero = {
  greeting: "hi my name is",
  name: "Ethan Shih",
  tagline: "computer science and engineering @ uci",
  email: "ethnj.shih@gmail.com",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ethanshih1", icon: "fab fa-linkedin" },
    { label: "GitHub",   url: "https://github.com/ethnjs",              icon: "fab fa-github"   },
    { label: "Resume",   url: "/resume.pdf",                            icon: "far fa-file-lines" },
  ],
}

export const about = {
  bio: [
    "PLACEHOLDER: Who you are, what excites you about engineering.",
    "PLACEHOLDER: Your engineering philosophy, not just a skill list.",
    "PLACEHOLDER: What you're currently learning or building.",
  ],
  skills: [
    { category: "Languages",   items: ["PLACEHOLDER", "Python", "TypeScript"] },
    { category: "Frameworks",  items: ["PLACEHOLDER", "Next.js", "FastAPI"]   },
    { category: "Tools",       items: ["PLACEHOLDER", "Git", "Docker"]        },
    { category: "Hardware",    items: ["PLACEHOLDER", "ESP32", "Arduino"]     },
  ],
}

export type Project = {
  slug: string
  title: string
  tagline: string
  tags: string[]
  gif: string | null
  cardImage: string | null
}

export const projects: Project[] = [
  {
    slug: "nexus",
    title: "NEXUS",
    tagline: "PLACEHOLDER: one-line description of what it does and who it's for",
    gif: "/videos/nexus-login-new-tournament.mp4",
    cardImage: null,
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Google Sheets API"],
  },
  {
    slug: "columns",
    title: "Columns",
    tagline: "A Sega Columns-inspired puzzle game — extended beyond the assignment with scoring and a persistent leaderboard",
    gif: null,
    cardImage: null,
    tags: ["Python", "Pygame", "JSON"],
  },
  {
    slug: "embedded-systems",
    title: "Embedded Systems Series",
    tagline: "5 hardware projects spanning analog circuits to wireless IoT — built with OPS / IEEE @ UCI",
    gif: null,
    cardImage: null,
    tags: ["ESP32", "Arduino", "I2C", "UART", "C++"],
  },
]
