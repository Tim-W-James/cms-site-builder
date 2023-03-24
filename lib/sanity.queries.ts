import { groq } from 'next-sanity'
import { TypedObject } from 'sanity'

export const settingsQuery = groq`*[_type == "settings"][0]`

export const pageQuery = (path: string) =>
  groq`*[_type == "pages" && metadata.path.current == "${path}"][0]`

export const navigationQuery = groq`*[_type == "navigation"][0]`

export const indexQuery = groq`*[_type == "index"][0]`

export const pagePathQuery = groq`
*[_type == "pages" && defined(metadata.path.current)][].metadata.path.current
`

export interface PageContent {
  header?: string
  body?: TypedObject
}

export interface PageMeta {
  path?: string
}

export interface Page {
  meta?: PageMeta
  content?: PageContent
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
