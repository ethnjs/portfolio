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
  status: string
  gif: string | null
  cardImage: string | null
  tags: string[]
  problem: string
  role: string
  techDecisions: string[]
  challenges: string[]
  results: string[]
  whatsNext?: string[]
  demoUrl?: string
  repoUrl?: string
  codeSnippet?: {
    language: string
    label: string
    code: string
  }
}

export const projects: Project[] = [
  {
    slug: "nexus",
    title: "NEXUS",
    tagline: "PLACEHOLDER: one-line description of what it does and who it's for",
    status: "Active — In Development",
    gif: null,
    cardImage: null,
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Google Sheets API"],
    problem: "PLACEHOLDER: What problem does NEXUS solve and who uses it?",
    role: "PLACEHOLDER: Your specific role and responsibilities.",
    techDecisions: [
      "PLACEHOLDER: Why you chose FastAPI over alternatives.",
      "PLACEHOLDER: Why SQLite in dev, PostgreSQL in prod.",
    ],
    challenges: [
      "PLACEHOLDER: A concrete technical challenge you faced.",
      "PLACEHOLDER: Another challenge and how you solved it.",
    ],
    results: [
      "PLACEHOLDER: Real users / usage metrics.",
      "PLACEHOLDER: Any measurable impact.",
    ],
    whatsNext: [
      "PLACEHOLDER: Upcoming feature or technical goal.",
    ],
    demoUrl: "https://nexus.ethanshih.com",
    repoUrl: undefined,
  },
  {
    slug: "columns",
    title: "Columns",
    tagline: "A Sega Columns-inspired puzzle game — extended beyond the assignment with scoring and a persistent leaderboard",
    status: "Completed — Class Project",
    gif: null,
    cardImage: null,
    tags: ["Python", "Pygame", "JSON"],
    problem: "PLACEHOLDER: Brief description of the class assignment and what gap it was solving.",
    role: "Sole developer — built as a class project then independently extended.",
    techDecisions: [
      "PLACEHOLDER: A technical decision you made in the game engine or game loop.",
      "Used JSON for persistent local leaderboard storage — lightweight and human-readable for a local app.",
    ],
    challenges: [
      "PLACEHOLDER: A concrete challenge in the game logic (e.g. collision, faller logic).",
      "PLACEHOLDER: Challenge in adding the scoring system or leaderboard.",
    ],
    results: [
      "Went beyond the assignment scope by independently adding a scoring function, persistent leaderboard, and 'view next faller' feature.",
      "PLACEHOLDER: Any grade, recognition, or instructor feedback.",
    ],
    repoUrl: undefined,
    codeSnippet: {
      language: "python",
      label: "Scoring function excerpt",
      code: "# PLACEHOLDER: paste a short function (scoring or leaderboard) here",
    },
  },
  {
    slug: "embedded-systems",
    title: "Embedded Systems Series",
    tagline: "5 hardware projects spanning analog circuits to wireless IoT — built with OPS / IEEE @ UCI",
    status: "Completed — OPS / IEEE @ UCI",
    gif: null,
    cardImage: null,
    tags: ["ESP32", "Arduino", "I2C", "UART", "C++"],
    problem: "Hands-on engineering curriculum covering the full stack of embedded systems — from reading schematics and soldering PCBs to implementing wireless protocols.",
    role: "Sole engineer on each project within a structured club curriculum.",
    techDecisions: [
      "PLACEHOLDER: A specific protocol or hardware choice and why.",
      "PLACEHOLDER: Any tradeoff between two approaches on one of the projects.",
    ],
    challenges: [
      "PLACEHOLDER: A concrete hardware or firmware challenge.",
      "PLACEHOLDER: Debugging story or integration issue.",
    ],
    results: [
      "Progressed from soldering a 555 timer piano to implementing I2C, UART, and Wi-Fi on ESP32 microcontrollers across 5 projects.",
      "PLACEHOLDER: Any demo, showcase, or club recognition.",
    ],
    repoUrl: undefined,
  },
]
