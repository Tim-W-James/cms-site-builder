import { groq } from 'next-sanity'
import { TypedObject } from 'sanity'

export const settingsQuery = groq`*[_type == "settings"][0]`

export const pageQuery = (path: string) =>
  groq`*[_type == "page" && path.current == "${path}"][0]`

export const navigationQuery = groq`*[_type == "navigation"][0]`

export const indexQuery = groq`*[_type == "index"][0].page`

export const pagePathQuery = groq`
*[_type == "page" && defined(path.current)][].path.current
`

export interface PageData {
  path?: string
  header?: string
  content?: TypedObject
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
