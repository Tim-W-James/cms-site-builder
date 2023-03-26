import PageLayout from "components/PageLayout";
import { usePreview } from "lib/sanity.preview";
import {
  indexQuery,
  type Page,
  pageQuery,
  routesQuery,
  type Settings,
  settingsQuery,
} from "lib/sanity.queries";

const PreviewPage = ({
  token,
  path,
}: {
  token: null | string;
  path?: string;
}) => {
  const page: Page =
    usePreview(token, path ? pageQuery(path) : indexQuery) || [];
  const routes: any = usePreview(token, routesQuery) || {};
  const settings: Settings = usePreview(token, settingsQuery) || {};

  return <PageLayout page={page} preview routes={routes} settings={settings} />;
};
export default PreviewPage;
