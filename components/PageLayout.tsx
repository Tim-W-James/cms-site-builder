import { PortableText, PortableTextComponents } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import Container from 'components/Container'
import IndexPageHead from 'components/IndexPageHead'
import Layout from 'components/Layout'
import * as demo from 'lib/demo.data'
import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import type { PageData, Settings } from 'lib/sanity.queries'
import Image from 'next/image'
import { createClient } from 'next-sanity'
import { useNextSanityImage } from 'next-sanity-image'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  pageData: PageData
  settings: Settings
}

const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null

const ImageComponent = ({ value, isInline }) => {
  // TODO fallback
  const imageProps: any = useNextSanityImage(client, value.imageFile)
  const { width, height } = getImageDimensions(value.imageFile)
  return (
    <Image
      {...imageProps}
      alt={value.imageDescription || ''}
      width={value.imageWidth || width}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  )
}

const FileComponent = ({ value }) => {
  const { fileName, shouldRenderPdf, pdfHeight } = value
  const [_file, id, extension] = value.file.asset._ref.split('-')
  return extension === 'pdf' && shouldRenderPdf ? (
    <iframe
      src={`https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`}
      title={fileName || 'PDF'}
      width="100%"
      height={pdfHeight}
    />
  ) : (
    <a
      href={`https://cdn.sanity.io/files/${
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      }/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}?dl=${
        fileName ? encodeURIComponent(fileName) : id
      }.${extension}`}
    >
      {`${fileName}.${extension}` || 'Download file'}
    </a>
  )
}

const components: PortableTextComponents = {
  types: {
    embeddedImage: ImageComponent,
    embeddedFile: FileComponent,
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => <strong>{children}</strong>,
    urlLink: ({ children, value }) => {
      const { url, hoverText, shouldUseNewTab } = value
      console.log(url)
      return (
        <a href={url} title={hoverText} rel="noreferrer" target={shouldUseNewTab ? "_blank" : "_self"}>
          {children}
        </a>
      ) 
    },
    fileLink: ({ children, value }) => {
      const { fileName } = value
      const [_file, id, extension] = value.file.asset._ref.split('-')
      return (
        <a
          href={`https://cdn.sanity.io/files/${
            process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
          }/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}?dl=${
            fileName ? encodeURIComponent(fileName) : id
          }.${extension}`}
        >
          {children}
        </a>
      )
    },
  },
}

export default function PageLayout(props: IndexPageProps) {
  const { preview, loading, pageData, settings } = props
  const { title = demo.title, description = demo.description } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          {pageData.header}
          <PortableText value={pageData.content} components={components} />
        </Container>
      </Layout>
    </>
  )
}
