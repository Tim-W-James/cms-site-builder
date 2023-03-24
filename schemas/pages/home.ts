import {
  HomeIcon
} from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'index',
  title: 'Home Page',
  icon: HomeIcon,
  type: 'document',
  preview: { select: { title: 'page.title', subtitle: 'page.description' } },
  fields: [
    {
      name: 'page',
      title: 'Page',
      type: 'page',
    },
  ],
})
