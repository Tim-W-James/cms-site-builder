import PageWrapper from "components/PageWrapper";
import {
  getStaticPageProps,
  PageProps,
  PreviewData,
  Query,
} from "lib/getStaticPageProps";
import { getAllPagePaths } from "lib/sanity.client";
import { GetStaticProps } from "next";

const Page = (props: PageProps) => <PageWrapper {...props} />;

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> =
  getStaticPageProps();

export const getStaticPaths = async () => {
  const paths = await getAllPagePaths();

  return {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    paths: paths.map(({ path }) => `/${path ?? ""}`) || [],
    fallback: "blocking",
  };
};

export default Page;
