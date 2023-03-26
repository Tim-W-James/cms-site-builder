import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "pages",
  title: "Pages",
  icon: DocumentsIcon,
  type: "document",
  preview: {
    select: { title: "metadata.title", subtitle: "metadata.description" },
  },
  fields: [
    defineField({
      name: "metadata",
      title: "Metadata",
      type: "pageMeta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "page",
    }),
  ],
});
