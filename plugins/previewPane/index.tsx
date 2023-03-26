import { DefaultDocumentNodeResolver } from "sanity/desk";

import PagePreviewPane from "./PagePreviewPane";

export const previewDocumentNode =
  ({
    apiVersion,
    previewSecretId,
  }: {
    apiVersion: string;
    previewSecretId: `${string}.${string}`;
  }): DefaultDocumentNodeResolver =>
  // eslint-disable-next-line @typescript-eslint/naming-convention
  (S) =>
    S.document().views([
      S.view.form(),
      S.view
        .component(({ document }) => (
          <PagePreviewPane
            apiVersion={apiVersion}
            path={document?.displayed?.metadata?.path?.current || undefined}
            previewSecretId={previewSecretId}
          />
        ))
        .title("Preview"),
    ]);
