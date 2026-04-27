export type ProjectLinkType = "website" | "github" | "demo" | "writeup";

export type ProjectLink = {
  type: ProjectLinkType;
  url: string;
  label?: string;
};

export type ProjectMeta = {
  status: string;
  links?: ProjectLink[];
};
