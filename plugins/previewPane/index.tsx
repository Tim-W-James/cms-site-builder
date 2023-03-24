import { DefaultDocumentNodeResolver } from 'sanity/desk'

import PagePreviewPane from './PagePreviewPane'

export const previewDocumentNode = ({
  apiVersion,
  previewSecretId,
}: {
  apiVersion: string
  previewSecretId: `${string}.${string}`
}): DefaultDocumentNodeResolver => {
  return (S) =>
    S.document().views([
      S.view.form(),
      S.view
        .component(({ document }) => (
          <PagePreviewPane
            path={document.displayed.path?.current || ''}
            apiVersion={apiVersion}
            previewSecretId={previewSecretId}
          />
        ))
        .title('Preview'),
    ])
}
