import PageLayout from 'components/PageLayout'
import { usePreview } from 'lib/sanity.preview'
import {
  indexQuery,
  type Page,
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
  const page: Page =
    usePreview(token, path ? pageQuery(path) : indexQuery) || []
  const settings: Settings = usePreview(token, settingsQuery) || {}

  return <PageLayout preview page={page} settings={settings} />
}
