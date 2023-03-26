import Meta from "components/Meta";
import { PageMeta, Settings } from "lib/sanity.queries";
import Head from "next/head";

export interface PageHeadProps {
  settings: Settings;
  pageMeta?: PageMeta;
}

const PageHead = ({ settings, pageMeta }: PageHeadProps) => {
  const {
    title: mainTitle = "Title",
    description: mainDescription = "Description",
  } = settings;
  const { title: pageTitle, description: pageDescription } = pageMeta ?? {};

  return (
    <Head>
      <title>{pageTitle ? `${pageTitle} | ${mainTitle}` : mainTitle}</title>
      <Meta />
      <meta
        content={pageDescription ?? mainDescription}
        key="description"
        name="description"
      />
    </Head>
  );
};
export default PageHead;
