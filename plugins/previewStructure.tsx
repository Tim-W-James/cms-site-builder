/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 * and each page singleton
 */

import { type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/desk'

import PagePreviewPane from './previewPane/PagePreviewPane'

export const previewStructurePlugin = (
  settingsTypeDef: DocumentDefinition,
  pageTypeDefs: DocumentDefinition[],
  {
    apiVersion,
    previewSecretId,
  }: {
    apiVersion: string
    previewSecretId: `${string}.${string}`
  }
): StructureResolver => {
  return (S) => {
    // The `Settings` root list item
    const settingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
      S.listItem()
        .title(settingsTypeDef.title)
        .icon(settingsTypeDef.icon)
        .child(
          S.editor()
            .id(settingsTypeDef.name)
            .schemaType(settingsTypeDef.name)
            .documentId(settingsTypeDef.name)
        )

    // The `Page` root list items
    const pageListItems = // A singleton, but has a built-in preview of the page
      pageTypeDefs.map((typeDef) =>
        S.listItem()
          .title(typeDef.title)
          .icon(typeDef.icon)
          .child(
            S.editor()
              .id(typeDef.name)
              .schemaType(typeDef.name)
              .documentId(typeDef.name)
              .views([
                S.view.form(),
                S.view
                  .component(() => (
                    <PagePreviewPane
                      path={typeDef.name === 'index' ? '' : `${typeDef.name}`}
                      apiVersion={apiVersion}
                      previewSecretId={previewSecretId}
                    />
                  ))
                  .title('Preview'),
              ])
          )
      )

    return S.list()
      .title('Content')
      .items([settingsListItem, S.divider(), ...pageListItems])
  }
}
