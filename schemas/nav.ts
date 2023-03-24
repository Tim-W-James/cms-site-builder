import { MasterDetailIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  icon: MasterDetailIcon,
  type: 'document',
  preview: {
    prepare: () => ({ title: 'Navigation' }),
  },
  fields: [
    {
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{ type: 'page' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subItems',
              title: 'Sub Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'subMenuItem',
                  fields: [
                    {
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'page',
                      title: 'Page',
                      type: 'reference',
                      to: [{ type: 'page' }],
                      validation: (Rule) => Rule.required(),
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
})
