import { PageName } from 'data/pageNames'
import { getPage, getSettings } from 'lib/sanity.client'
import { PageData, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'

export interface PageProps {
  pageName: PageName
  pageData: PageData
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
  (pageName: PageName): GetStaticProps<PageProps, Query, PreviewData> =>
  async (ctx) => {
    const { preview = false, previewData = {} } = ctx

    const [settings, pageData] = await Promise.all([
      getSettings(),
      getPage(pageName),
    ])

    return {
      props: {
        pageName,
        pageData,
        settings,
        preview,
        token: previewData.token ?? null,
      },
    }
  }