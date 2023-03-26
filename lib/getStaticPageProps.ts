import {
  getAllRoutes,
  getIndexPage,
  getPage,
  getSettings,
} from "lib/sanity.client";
import { Page, Settings } from "lib/sanity.queries";
import { GetStaticProps } from "next";

export interface PageProps {
  path?: string;
  page: Page;
  routes: any;
  settings: Settings;
  preview: boolean;
  token: string | null;
}

export type Query = Record<string, string>;

export interface PreviewData {
  token?: string;
}

export const getStaticPageProps =
  (path?: string): GetStaticProps<PageProps, Query, PreviewData> =>
  async (ctx) => {
    const { preview = false, previewData = {}, params = {} } = ctx;
    const parsedPath = path || params.path || "";

    const [settings, page, routes] = await Promise.all([
      getSettings(),
      parsedPath ? getPage(parsedPath) : getIndexPage(),
      getAllRoutes(),
    ]);

    // If the page is not found, return 404
    if (!page) {
      return { notFound: true };
    }

    return {
      props: {
        path: parsedPath,
        page,
        routes,
        settings,
        preview,
        token: previewData.token ?? null,
      },
    };
  };
