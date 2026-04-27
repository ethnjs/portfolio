import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { hasAccess } from "@/lib/auth";
import { projectModules } from "@/lib/projects";
import ProjectLinks from "@/components/mdx/ProjectLinks";
import type { ProjectMeta } from "@/types/project";
import type { ProjectSlug } from "@/lib/projects";
import type { ComponentType } from "react";

type PageProps = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: PageProps) {
  const access = await hasAccess();
  if (!access) redirect("/");

  const { slug } = await params;
  if (!(slug in projectModules)) notFound();

  let Content: ComponentType;
  let meta: ProjectMeta;
  try {
    const mod = await projectModules[slug as ProjectSlug]();
    Content = mod.default as ComponentType;
    meta = mod.meta as ProjectMeta;
  } catch (e) {
    console.error(`[project page] failed to load MDX for slug "${slug}":`, e);
    notFound();
  }

  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-[700px] mx-auto">

        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-white transition-colors mb-10"
        >
          ← projects
        </Link>

        <div className="mb-10">
          <h1 className="font-inter font-bold text-white text-[2.5rem] leading-tight mb-3">
            {meta.title}
          </h1>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4 m-0">
            {meta.tagline}
          </p>

          {meta.status && (
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: meta.status.toLowerCase().startsWith("active")
                    ? "#4ade80"
                    : "var(--text-muted)",
                }}
              />
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {meta.status}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5 rounded-[6px] text-[var(--text-muted)]"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {meta.links && meta.links.length > 0 && (
            <ProjectLinks links={meta.links} />
          )}
        </div>

        <div className="mdx-body">
          <Content />
        </div>

      </div>
    </main>
  );
}
