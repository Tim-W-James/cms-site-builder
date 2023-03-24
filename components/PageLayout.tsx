import { PortableText } from '@portabletext/react'
import Container from 'components/Container'
import IndexPageHead from 'components/IndexPageHead'
import Layout from 'components/Layout'
import type { Page, Settings } from 'lib/sanity.queries'

import PortableTextRenderer from './portableText/PortableTextRenderer'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  page: Page
  settings: Settings
}

export default function PageLayout(props: IndexPageProps) {
  const {
    preview,
    loading,
    page: { content },
    settings,
  } = props

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={!!preview} loading={loading}>
        <Container>
          {content?.header ?? ''}
          {content?.body ? (
            <PortableText
              value={content?.body}
              components={PortableTextRenderer}
            />
          ) : null}
        </Container>
      </Layout>
    </>
  )
}
