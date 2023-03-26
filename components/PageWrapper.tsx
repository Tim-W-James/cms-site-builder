import { PreviewSuspense } from "@sanity/preview-kit";
import PageLayout from "components/PageLayout";
import { PageProps } from "lib/getStaticPageProps";
import { lazy } from "react";

const PreviewPage = lazy(() => import("components/PreviewPage"));

const Page = (props: PageProps) => {
  const { page, path, settings, preview, token, routes } = props;

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PageLayout
            loading
            page={page}
            preview
            routes={routes}
            settings={settings}
          />
        }
      >
        <PreviewPage path={path} token={token} />
      </PreviewSuspense>
    );
  }

  return <PageLayout page={page} routes={routes} settings={settings} />;
};

export default Page;
