import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "lib/sanity.api";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId ?? "",
  dataset: dataset ?? "",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto("format").fit("max");
