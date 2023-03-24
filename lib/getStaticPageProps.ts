import { getIndexPage, getPage, getSettings } from 'lib/sanity.client'
import { Page, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'

export interface PageProps {
  path?: string
  page: Page
  settings: Settings
  preview: boolean
  token: string | null
}

export interface Query {
  [key: string]: string
}

export interface PreviewData {
  token?: string
}

export const getStaticPageProps =
  (path?: string): GetStaticProps<PageProps, Query, PreviewData> =>
  async (ctx) => {
    const { preview = false, previewData = {}, params = {} } = ctx
    const parsedPath = path || params?.path || ''

    const [settings, page] = await Promise.all([
      getSettings(),
      parsedPath ? getPage(parsedPath) : getIndexPage(),
    ])

    return {
      props: {
        path: parsedPath ?? '',
        page,
        settings,
        preview,
        token: previewData.token ?? null,
      },
    }
  }
