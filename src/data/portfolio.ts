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
    (
      "Hi, I'm Ethan, a first-year Computer Science and Engineering major at UCI that found my way into science " +
      "through eighteen years of curiosity — tinkering with circuits, playing around with audio mixers, and " +
      "building rubber-powered aircraft and balsa structures. What excites me most is the intersection where " +
      "software meets hardware: the moment a line of firmware makes a physical system do something it couldn't " +
      "do before, or where a well-designed interface gives someone real visibility into a complex system. That " +
      "full-stack integration challenge, from data source to command interface, is what keeps intriguing me."
    ),
    (
      "I think the best way to learn is to build something that actually has to work. Not a tutorial project, " +
      "not a homework assignment — something real, where the gap between what you know and what the problem " +
      "demands is visible and motivating. That's the standard I try to hold myself to: if I'm not uncomfortable " +
      "with the scope, I'm probably not growing. I also believe that the best engineering happens in teams, " +
      "where you have to communicate clearly, subordinate your individual priorities to what moves the group " +
      "forward, and hold yourself accountable to people who are counting on you."
    ),
    (
      "Right now I'm building NEXUS, a full-stack tournament management platform for Science Olympiad directors " +
      "that handles real-time volunteer coordination across competitions — a problem I noticed firsthand while " +
      "volunteering at tournaments across California. Outside of that, I'm deepening my embedded systems skills " +
      "through IEEE's Open Project Space, where I've been programming ESP32 microcontrollers in C++, " +
      "breadboarding circuits, and getting hands-on with PCB design. I'm also currently taking ICS 45C to " +
      "sharpen my C++ and working my way deeper into the hardware-software stack, one project at a time."
    ),
  ],
  skills: [
    { category: "Languages",   items: ["Python", "SQL", "C++", "Java", "Typescript", "Javascript", "HTML/CSS"] },
    { category: "Frameworks",  items: ["FastAPI", "Next.js", "React", "Tailwind CSS", "Node.js"] },
    { category: "Libraries",   items: ["SQLite3", "SQLAlchemy"]},
    { category: "Tools",       items: ["Git", "Github", "VS Code", "PyCharm", "PostgreSQL", "Arduino IDE"] },
    { category: "Hardware",    items: ["ESP32", "Arduino", "KiCad", "Vivado"] },
  ],
}

