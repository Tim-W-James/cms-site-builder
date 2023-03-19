import { DocumentsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resources',
  title: 'Resources Page',
  icon: DocumentsIcon,
  type: 'document',
  preview: { select: { title: 'header' } },
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
