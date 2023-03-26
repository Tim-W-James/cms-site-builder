import {
  DocumentPdfIcon,
  DocumentsIcon,
  DocumentTextIcon,
  ImageIcon,
  LinkIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  icon: DocumentsIcon,
  type: "object",
  preview: { select: { title: "header" } },
  fields: [
    defineField({
      name: "header",
      title: "Header",
      description: "Appears at the top of the page.",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      description:
        "Rich text content, including sub headings, links, images, and PDFs.",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "urlLink",
                type: "object",
                title: "URL Link",
                description: "Link to an external URL.",
                icon: LinkIcon,
                fields: [
                  {
                    name: "url",
                    type: "url",
                    title: "URL",
                    validation: (rule) => rule.uri().required(),
                  },
                  {
                    name: "hoverText",
                    type: "string",
                    title: "Description Text",
                  },
                  {
                    name: "shouldUseNewTab",
                    type: "boolean",
                    title: "Open link in new tab.",
                    initialValue: true,
                  },
                ],
              },
              {
                name: "fileLink",
                type: "object",
                title: "File Link",
                description: "Link pieces of text to a file.",
                icon: DocumentTextIcon,
                fields: [
                  {
                    name: "file",
                    type: "file",
                    title: "File Attachment",
                    validation: (rule) => rule.required(),
                  },
                  {
                    name: "fileName",
                    type: "string",
                    title: "File Name",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "object",
          name: "embeddedImage",
          title: "Image",
          icon: ImageIcon,
          fields: [
            {
              name: "imageFile",
              type: "image",
              title: "Image File",
              validation: (rule) => rule.required(),
            },
            {
              name: "imageDescription",
              type: "string",
              title: "Description",
              description: "If the image fails to load, this text will appear.",
              validation: (rule) => rule.required(),
            },
            {
              name: "imageWidth",
              type: "number",
              title: "Image Size",
              description:
                "Pixel width of the image, leave empty for auto scaling.",
              validation: (rule) => rule.max(5000).min(10),
            },
            {
              name: "wrapText",
              type: "boolean",
              title: "Wrap Text",
              description: "Wrap text around the image.",
              initialValue: false,
            },
          ],
        },
        {
          type: "object",
          name: "embeddedFile",
          title: "File",
          icon: DocumentPdfIcon,
          fields: [
            {
              name: "file",
              type: "file",
              title: "File Attachment",
              validation: (rule) => rule.required(),
            },
            {
              name: "fileName",
              type: "string",
              title: "File Name",
            },
            {
              name: "shouldRenderPdf",
              type: "boolean",
              title: "Render PDF",
              description: "If the file is a PDF, display it on the page.",
              initialValue: true,
            },
            {
              name: "pdfHeight",
              type: "number",
              title: "PDF Display Height",
              description:
                "Height for the PDF display, leave empty for auto scaling.",
              hidden: ({ parent }) => !parent?.shouldRenderPdf,
              validation: (rule) => rule.max(5000).min(50),
            },
          ],
        },
      ],
    }),
  ],
});
