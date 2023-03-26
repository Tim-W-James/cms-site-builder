import { PortableText } from "@portabletext/react";
import clsx from "clsx";
import Layout from "components/Layout";
import PageHead from "components/PageHead";
import type { Page, Settings } from "lib/sanity.queries";
import { Container } from "react-bootstrap";

import Navigation from "./Nav";
import PortableTextRenderer from "./portableText/PortableTextRenderer";

export interface PageLayoutProps {
  preview?: boolean;
  loading?: boolean;
  page: Page;
  routes: any;
  settings: Settings;
}

const PageLayout = (props: PageLayoutProps) => {
  const {
    preview,
    loading,
    page: { content, metadata },
    settings,
    routes,
  } = props;

  return (
    <>
      <PageHead pageMeta={metadata} settings={settings} />

      <Layout loading={loading} preview={Boolean(preview)}>
        <Navigation routes={routes} />
        <Container>
          <h1 className={clsx("pt-3")}>{content?.header ?? "Heading"}</h1>
          <hr />
          {content?.body ? (
            <PortableText
              components={PortableTextRenderer}
              value={content.body}
            />
          ) : (
            "Body"
          )}
        </Container>
      </Layout>
    </>
  );
};
export default PageLayout;
