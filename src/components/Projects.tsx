import { Project } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-16 max-w-[800px] mx-auto">
      <h2>projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
