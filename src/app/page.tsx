import { getProjects } from "@/lib/projects";
import Hero from "@/components/Hero";
import FloatingNav from "@/components/FloatingNav";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main>
      <Hero />
      <FloatingNav />
      <Projects projects={projects} />
      <About />
      <Footer />
    </main>
  );
}
