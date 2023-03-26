import { HomeIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "index",
  title: "Home Page",
  icon: HomeIcon,
  type: "document",
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
  fields: [
    {
      name: "content",
      title: "Content",
      type: "page",
    },
  ],
});
