import PageWrapper from "components/PageWrapper";
import {
  getStaticPageProps,
  PageProps,
  PreviewData,
  Query,
} from "lib/getStaticPageProps";
import { GetStaticProps } from "next";

const Page = (props: PageProps) => <PageWrapper {...props} />;

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> =
  getStaticPageProps();

export default Page;
