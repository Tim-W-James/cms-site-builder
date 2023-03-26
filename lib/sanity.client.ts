import { apiVersion, dataset, projectId, useCdn } from "lib/sanity.api";
import {
  indexQuery,
  Page,
  PageMeta,
  pagePathQuery,
  pageQuery,
  Routes,
  routesQuery,
  type Settings,
  settingsQuery,
} from "lib/sanity.queries";
import { createClient } from "next-sanity";

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export const getSettings = async (): Promise<Settings> => {
  if (client) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return (await client.fetch(settingsQuery)) || {};
  }
  return {};
};

export const getPage = async (pageName: string): Promise<Page | undefined> => {
  if (client) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return (await client.fetch(pageQuery(pageName))) || undefined;
  }
  return undefined;
};

export const getIndexPage = async (): Promise<Page> => {
  if (client) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return (await client.fetch(indexQuery)) || {};
  }
  return {};
};

export const getAllPagePaths = async (): Promise<Pick<PageMeta, "path">[]> => {
  if (client) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const paths = (await client.fetch<string[]>(pagePathQuery)) || [];
    return paths.map((path) => ({ path }));
  }
  return [];
};

export const getAllRoutes = async (): Promise<Routes> => {
  if (client) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return (await client.fetch(routesQuery)) || {};
  }
  return {};
};
