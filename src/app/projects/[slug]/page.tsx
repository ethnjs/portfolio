import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { hasAccess } from "@/lib/auth";
import { projects } from "@/data/portfolio";
import ProjectLinks from "@/components/mdx/ProjectLinks";
import ProjectImage from "@/components/mdx/ProjectImage";
import CodeSnippet from "@/components/mdx/CodeSnippet";
import VideoEmbed from "@/components/mdx/VideoEmbed";
import type { ProjectMeta } from "@/types/project";

const mdxComponents = {
  ProjectImage,
  CodeSnippet,
  VideoEmbed,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-inter font-bold text-white text-lg text-left mb-3 mt-10"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-inter font-bold text-white text-base text-left mb-2 mt-8"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-[var(--text-secondary)] leading-relaxed mb-4"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="flex flex-col gap-2 pl-5 mb-6" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="text-[var(--text-secondary)] leading-relaxed list-disc"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-white underline underline-offset-2 hover:opacity-80 transition-opacity"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-8 border-none" style={{ borderTop: "1px solid var(--border-subtle)" }} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="border-l-2 border-[var(--border)] pl-4 my-6 text-[var(--text-muted)] italic font-mono text-sm"
      {...props}
    />
  ),
};

type PageProps = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: PageProps) {
  const access = await hasAccess();
  if (!access) redirect("/");

  const { slug } = await params;

  const card = projects.find((p) => p.slug === slug);
  if (!card) notFound();

  let MDXContent: React.ComponentType<{ components?: typeof mdxComponents }>;
  let meta: ProjectMeta;
  try {
    const mod = await import(`@/content/projects/${slug}.mdx`);
    MDXContent = mod.default;
    meta = mod.meta ?? {};
  } catch {
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
            {card.title}
          </h1>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4 m-0">
            {card.tagline}
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
            {card.tags.map((tag) => (
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
        </div>

        <div className="mdx-body">
          <MDXContent components={mdxComponents} />
        </div>

        {meta.links && meta.links.length > 0 && (
          <ProjectLinks links={meta.links} />
        )}

      </div>
    </main>
  );
}
