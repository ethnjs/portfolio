export type ProjectLinkType = "website" | "github" | "demo" | "writeup";

export type ProjectLink = {
  type: ProjectLinkType;
  url: string;
  label?: string;
};

export type ProjectMeta = {
  title: string;
  tagline: string;
  tags: string[];
  gif?: string;
  cardImage?: string;
  status: string;
  links?: ProjectLink[];
};
