import { PageName } from 'data/pageNames'
import { groq } from 'next-sanity'
import { TypedObject } from 'sanity'

export const settingsQuery = groq`*[_type == "settings"][0]`

export const pageQuery = (pageName: PageName) => groq`*[_type == "${pageName}"][0]`

export interface PageData {
  header?: string,
  content?: TypedObject
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
