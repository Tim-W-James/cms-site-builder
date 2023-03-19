import PageWrapper from 'components/PageWrapper'
import { getStaticPageProps, PageProps, Query } from 'lib/getStaticPageProps'
import { GetStaticProps, PreviewData } from 'next'

const Page = (props: PageProps) => <PageWrapper {...props} />

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> =
  getStaticPageProps('resources')

export default Page
