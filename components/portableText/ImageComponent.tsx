import { getImageDimensions } from '@sanity/asset-utils'
import client from 'lib/sanityClient'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { SanityClient } from 'sanity'
import { z } from 'zod'

const imageSchema = z.object({
  _key: z.string(),
  _type: z.literal('embeddedImage'),
  imageDescription: z.string().optional(),
  imageWidth: z.number().optional(),
  wrapText: z.boolean().optional(),
  imageFile: z.object({
    _type: z.literal('image'),
    asset: z.object({
      _ref: z.string(),
      _type: z.literal('reference'),
    }),
  }),
})
type Image = z.infer<typeof imageSchema>

const ImageRenderer: React.FC<{
  image: Image
  isInline: boolean
  sanityClient: SanityClient
}> = ({ image, isInline, sanityClient }) => {
  const imageProps = useNextSanityImage(sanityClient, image.imageFile)
  const { width, height } = getImageDimensions(image.imageFile)
  return (
    <Image
      {...imageProps}
      alt={image.imageDescription || ''}
      width={image.imageWidth || width}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',
        float: image.wrapText ? "left" : "none",

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  )
}

const ImageComponent: React.FC<{ value?: unknown; isInline: boolean }> = ({
  value,
  isInline,
}) => {
  if (!client) {
    console.error("Can't render image without Sanity client")
    return <b>Something went wrong</b>
  }
  const parsedImageResult = imageSchema.safeParse(value)
  if (!parsedImageResult.success) {
    console.error('Image object did not match schema', {
      cause: parsedImageResult.error,
    })
    return <b>Please specify a valid image</b>
  }
  return (
    <ImageRenderer
      image={parsedImageResult.data}
      sanityClient={client}
      isInline={isInline}
    />
  )
}

export default ImageComponent
