import type { MDXComponents } from "mdx/types";
import ProjectImage from "@/components/mdx/ProjectImage";
import CodeSnippet from "@/components/mdx/CodeSnippet";
import VideoEmbed from "@/components/mdx/VideoEmbed";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ProjectImage,
    CodeSnippet,
    VideoEmbed,
    h2: (props) => (
      <h3
        className="font-inter font-bold text-white text-lg text-left mb-3 mt-10"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="font-inter font-bold text-white text-base text-left mb-2 mt-8"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="text-[var(--text-secondary)] leading-relaxed mb-4"
        {...props}
      />
    ),
    ul: (props) => (
      <ul className="flex flex-col gap-2 pl-5 mb-6" {...props} />
    ),
    li: (props) => (
      <li
        className="text-[var(--text-secondary)] leading-relaxed list-disc"
        {...props}
      />
    ),
    strong: (props) => (
      <strong className="text-white font-semibold" {...props} />
    ),
    a: (props) => (
      <a
        className="text-white underline underline-offset-2 hover:opacity-80 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    hr: () => (
      <hr
        className="my-8 border-none"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-2 border-[var(--border)] pl-4 my-6 text-[var(--text-muted)] italic font-mono text-sm"
        {...props}
      />
    ),
    table: (props) => (
      <div
        className="my-6 rounded-[8px] overflow-hidden"
        style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm m-0" {...props} />
        </div>
      </div>
    ),
    thead: (props) => <thead {...props} />,
    tr: (props) => (
      <tr style={{ borderTop: "1px solid var(--border-subtle)" }} {...props} />
    ),
    th: (props) => (
      <th
        className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] text-left px-4 py-3 font-normal"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="text-[var(--text-secondary)] leading-relaxed px-4 py-3 align-top"
        {...props}
      />
    ),
  };
}
