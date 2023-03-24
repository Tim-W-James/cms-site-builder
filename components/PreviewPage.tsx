import PageLayout from 'components/PageLayout'
import { usePreview } from 'lib/sanity.preview'
import {
  indexQuery,
  type PageData,
  pageQuery,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'

export default function PreviewPage({
  token,
  path,
}: {
  token: null | string
  path?: string
}) {
  const pageData: PageData =
    usePreview(token, path ? pageQuery(path) : indexQuery) || []
  const settings: Settings = usePreview(token, settingsQuery) || {}

  return <PageLayout preview pageData={pageData} settings={settings} />
}
