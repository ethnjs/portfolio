import type { ProjectMeta } from "@/types/project";
import type { ComponentType } from "react";

export const projectModules = {
  nexus:              () => import("@/content/projects/nexus.mdx"),
  columns:            () => import("@/content/projects/columns.mdx"),
  "embedded-systems": () => import("@/content/projects/embedded-systems.mdx"),
} as const;

export type ProjectSlug = keyof typeof projectModules;

export type ProjectData = ProjectMeta & { slug: ProjectSlug };

export type LoadedProject = ProjectData & { Content: ComponentType };

export async function getProjects(): Promise<ProjectData[]> {
  const entries = await Promise.all(
    (Object.entries(projectModules) as [ProjectSlug, () => Promise<{ meta: ProjectMeta }>][]).map(
      async ([slug, load]) => {
        const { meta } = await load();
        return { slug, ...(meta as ProjectMeta) };
      }
    )
  );
  return entries;
}
