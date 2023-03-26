/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 * and each page singleton
 */

import { type DocumentDefinition } from "sanity";
import { type StructureResolver } from "sanity/desk";

import PagePreviewPane from "./previewPane/PagePreviewPane";

export const previewStructurePlugin =
  (
    singletonTypeDefs: DocumentDefinition[],
    singletonPreviewTypeDefs: DocumentDefinition[],
    {
      apiVersion,
      previewSecretId,
    }: {
      apiVersion: string;
      previewSecretId: `${string}.${string}`;
    }
  ): StructureResolver =>
  // eslint-disable-next-line @typescript-eslint/naming-convention
  (S) => {
    const singletonsListItems = // A singleton not using `documentListItem`, eg no built-in preview
      singletonTypeDefs.map((typeDef) =>
        S.listItem()
          .title(typeDef.title || typeDef.name)
          .icon(typeDef.icon)
          .child(
            S.editor()
              .id(typeDef.name)
              .schemaType(typeDef.name)
              .documentId(typeDef.name)
          )
      );

    const singletonPreviewListItems = // A singleton, but has a built-in preview of the page
      singletonPreviewTypeDefs.map((typeDef) =>
        S.listItem()
          .title(typeDef.title || typeDef.name)
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
                      apiVersion={apiVersion}
                      path=""
                      previewSecretId={previewSecretId}
                    />
                  ))
                  .title("Preview"),
              ])
          )
      );

    const customListItemNames = singletonTypeDefs
      .map((item) => item.name)
      .concat(singletonPreviewTypeDefs.map((item) => item.name));

    const defaultListItems = S.documentTypeListItems().filter((listItem) => {
      const listItemId = listItem.getId();
      return listItemId && !customListItemNames.includes(listItemId);
    });

    return S.list()
      .title("Content")
      .items([
        ...singletonsListItems,
        ...singletonPreviewListItems,
        S.divider(),
        ...defaultListItems,
      ]);
  };
