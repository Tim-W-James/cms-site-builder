import { groq } from "next-sanity";
import { TypedObject } from "sanity";

export const settingsQuery = groq`*[_type == "settings"][0]`;

export const pageQuery = (path: string) =>
  groq`*[_type == "pages" && metadata.path.current == "${path}"][0]`;

export const routesQuery = groq`
*[_type == "navigation"][0] {
  ...,
  "items": items[]{
    ...,
    "routes": routes[]{
      ...,
      "path": page->metadata.path.current
    }
  }
}
`;

export const indexQuery = groq`*[_type == "index"][0]`;

export const pagePathQuery = groq`
*[_type == "pages" && defined(metadata.path.current)][].metadata.path.current
`;

export interface PageContent {
  header?: string;
  body?: TypedObject;
}

export interface PageMeta {
  path?: string;
  title?: string;
  description?: string;
}

export type Routes = {
  items?: {
    title?: string;
    routes?:
      | {
          title?: string;
          path?: string;
        }[]
      | null;
  }[];
};

export interface Page {
  metadata?: PageMeta;
  content?: PageContent;
}

export interface Settings {
  title?: string;
  description?: string;
}
