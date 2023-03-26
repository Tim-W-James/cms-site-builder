import { MasterDetailIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  icon: MasterDetailIcon,
  type: "document",
  preview: {
    prepare: () => ({ title: "Navigation" }),
  },
  fields: [
    {
      name: "items",
      title: "Nav Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuItem",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "routes",
              title: "Routes",
              description:
                "Pages for the nav item. Define multiple routes for a" +
                " dropdown menu.",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "subMenuItem",
                  fields: [
                    {
                      name: "title",
                      title: "Title",
                      description:
                        "If this is your only route, leave blank." +
                        " Otherwise used for the dropdown menu.",
                      type: "string",
                    },
                    {
                      name: "page",
                      title: "Page",
                      type: "reference",
                      to: [{ type: "pages" }],
                      validation: (rule) => rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
