export type ProjectLinkType = "demo" | "github" | "video" | "writeup";

export type ProjectLink = {
  type: ProjectLinkType;
  url: string;
  label?: string;
};

export type ProjectMeta = {
  status: string;
  links?: ProjectLink[];
};
