import { PreviewSuspense } from '@sanity/preview-kit'
import PageLayout from 'components/PageLayout'
import { PageProps } from 'lib/getStaticPageProps'
import { lazy } from 'react'

const PreviewPage = lazy(() => import('components/PreviewPage'))

const Page = (props: PageProps) => {
  const { page, path, settings, preview, token } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PageLayout loading preview page={page} settings={settings} />
        }
      >
        <PreviewPage path={path} token={token} />
      </PreviewSuspense>
    )
  }

  return <PageLayout page={page} settings={settings} />
}

export default Page;