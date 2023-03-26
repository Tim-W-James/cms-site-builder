import { getImageDimensions } from "@sanity/asset-utils";
import clsx from "clsx";
import client from "lib/sanityClient";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { SanityClient } from "sanity";
import { z } from "zod";

const imageSchema = z.object({
  _key: z.string(),
  _type: z.literal("embeddedImage"),
  imageDescription: z.string().optional(),
  imageWidth: z.number().optional(),
  wrapText: z.boolean().optional(),
  imageFile: z.object({
    _type: z.literal("image"),
    asset: z.object({
      _ref: z.string(),
      _type: z.literal("reference"),
    }),
  }),
});

type ImageType = z.infer<typeof imageSchema>;

const ImageRenderer: React.FC<{
  image: ImageType;
  isInline: boolean;
  sanityClient: SanityClient;
}> = ({ image, isInline, sanityClient }) => {
  const imageProps = useNextSanityImage(sanityClient, image.imageFile);
  const { width, height } = getImageDimensions(image.imageFile);
  return (
    <Image
      {...imageProps}
      alt={image.imageDescription || ""}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? "inline-block" : "block",
        float: image.wrapText ? "left" : "none",

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
      width={image.imageWidth || width}
    />
  );
};

const ImageComponent: React.FC<{ value?: unknown; isInline: boolean }> = ({
  value,
  isInline,
}) => {
  if (!client) {
    console.error("Can't render image without Sanity client");
    return <span className={clsx("text-danger")}>Something went wrong</span>;
  }
  const parsedImageResult = imageSchema.safeParse(value);
  if (!parsedImageResult.success) {
    console.error("Image object did not match schema", {
      cause: parsedImageResult.error,
    });
    return (
      <span className={clsx("text-danger")}>Please specify a valid image</span>
    );
  }
  return (
    <ImageRenderer
      image={parsedImageResult.data}
      isInline={isInline}
      sanityClient={client}
    />
  );
};

export default ImageComponent;
