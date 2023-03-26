import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageMeta",
  title: "Page Metadata",
  icon: DocumentsIcon,
  type: "object",
  preview: { select: { title: "title", subtitle: "description" } },
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      description: "Appears in the browser tab and search results.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      description: "Appears in search results.",
      title: "Description",
      type: "string",
      validation: (rule) => rule.max(155),
    }),
    defineField({
      name: "path",
      title: "Path",
      description: `Used for the URL path: https://example.com/your-path`,
      type: "slug",
      options: {
        source: "metadata.title",
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
