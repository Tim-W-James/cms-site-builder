import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  preview: {
    prepare: () => ({ title: "Settings" }),
  },
  fields: [
    defineField({
      name: "title",
      description: "Appears in the browser tab and search results.",
      title: "Title",
      type: "string",
      initialValue: "Site Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      description: "Appears in search results.",
      title: "Description",
      type: "string",
      initialValue: "Site Description",
      validation: (rule) => rule.max(155).required(),
    }),
  ],
});
