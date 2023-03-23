import { PortableText } from '@portabletext/react'
import Container from 'components/Container'
import IndexPageHead from 'components/IndexPageHead'
import Layout from 'components/Layout'
import type { PageData, Settings } from 'lib/sanity.queries'

import PortableTextRenderer from './portableText/PortableTextRenderer'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  pageData: PageData
  settings: Settings
}

export default function PageLayout(props: IndexPageProps) {
  const { preview, loading, pageData, settings } = props

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={!!preview} loading={loading}>
        <Container>
          {pageData.header}
          {pageData.content ? (
            <PortableText
              value={pageData.content}
              components={PortableTextRenderer}
            />
          ) : null}
        </Container>
      </Layout>
    </>
  )
}
