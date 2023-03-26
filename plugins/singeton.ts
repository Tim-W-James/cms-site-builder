import { definePlugin } from "sanity";

export const singletonPlugin = definePlugin<{ type: string[] }>(({ type }) => ({
  name: "test",
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => !type.includes(templateItem.templateId)
        );
      }

      return prev;
    },
    // Removes the "duplicate" action on the "settings" singleton
    actions: (prev, { schemaType }) => {
      if (type.includes(schemaType)) {
        return prev.filter(({ action }) => action !== "duplicate");
      }

      return prev;
    },
  },
}));
