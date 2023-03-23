import Meta from 'components/Meta'
import { Settings } from 'lib/sanity.queries'
import Head from 'next/head'

export interface IndexPageHeadProps {
  settings: Settings
}

export default function IndexPageHead({ settings }: IndexPageHeadProps) {
  const {
    title = "Example title",
    description = "Example description",
    ogImage = {},
  } = settings
  const ogImageTitle = ogImage?.title || "Example title"

  return (
    <Head>
      <title>{title}</title>
      <Meta />
      <meta
        key="description"
        name="description"
        content={"Example description"}
      />
      <meta
        property="og:image"
        // Because OG images must have a absolute URL, we use the
        // `VERCEL_URL` environment variable to get the deployment’s URL.
        // More info:
        // https://vercel.com/docs/concepts/projects/environment-variables
        content={`${
          process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
        }/api/og?${new URLSearchParams({ title: ogImageTitle })}`}
      />
    </Head>
  )
}
