import clsx from "clsx";
import sanityBaseUrl from "lib/sanityBaseUrl";
import { z } from "zod";

const fileSchema = z.object({
  _key: z.string(),
  _type: z.literal("embeddedFile"),
  fileName: z.string().optional(),
  shouldRenderPdf: z.boolean().optional(),
  pdfHeight: z.number().optional(),
  file: z.object({
    _type: z.literal("file"),
    asset: z.object({
      _ref: z.string(),
      _type: z.literal("reference"),
    }),
  }),
});

const FileComponent: React.FC<{ value?: unknown }> = ({ value }) => {
  const parsedFileResult = fileSchema.safeParse(value);
  if (!parsedFileResult.success) {
    console.error("File object did not match schema", {
      cause: parsedFileResult.error,
    });
    return (
      <span className={clsx("text-danger")}>Please specify a valid file</span>
    );
  }

  const { fileName, shouldRenderPdf, pdfHeight, file } = parsedFileResult.data;
  const [_file, id, extension] = file.asset._ref.split("-");
  return extension === "pdf" && shouldRenderPdf ? (
    <iframe
      height={pdfHeight}
      src={`${sanityBaseUrl}/${id}.${extension}`}
      title={fileName || "PDF"}
      width="100%"
    />
  ) : (
    <a
      href={`${sanityBaseUrl}/${id}.${extension}?dl=${
        fileName ? encodeURIComponent(fileName) : id
      }.${extension}`}
    >
      {`${fileName || "file"}.${extension}` || "Download file"}
    </a>
  );
};

export default FileComponent;
