import type { ProjectMeta } from "@/types/project";

declare module "*.mdx" {
  import type { MDXComponents } from "mdx/types";
  import type { ComponentType } from "react";

  export const meta: ProjectMeta;
  const MDXComponent: ComponentType<{ components?: MDXComponents }>;
  export default MDXComponent;
}
