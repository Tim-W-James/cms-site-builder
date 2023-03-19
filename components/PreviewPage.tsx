import PageLayout from 'components/PageLayout'
import { PageName } from 'data/pageNames'
import { usePreview } from 'lib/sanity.preview'
import {
  type PageData,
  pageQuery,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'

export default function PreviewPage({
  token,
  pageName,
}: {
  token: null | string
  pageName: PageName
}) {
  const pageData: PageData = usePreview(token, pageQuery(pageName)) || []
  const settings: Settings = usePreview(token, settingsQuery) || {}

  return <PageLayout preview pageData={pageData} settings={settings} />
}
