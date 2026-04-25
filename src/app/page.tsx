import { Suspense } from "react";
import { hasAccess } from "@/lib/auth";
import { projects } from "@/data/portfolio";
import Hero from "@/components/Hero";
import FloatingNav from "@/components/FloatingNav";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import KeyValidator from "@/components/KeyValidator";

export default async function Home() {
  const access = await hasAccess();

  return (
    <main>
      <Suspense>
        <KeyValidator />
      </Suspense>
      <Hero access={access} />
      {access && <FloatingNav />}
      {access && (
        <>
          <Projects projects={projects} />
          <About />
          <Footer />
        </>
      )}
    </main>
  );
}
