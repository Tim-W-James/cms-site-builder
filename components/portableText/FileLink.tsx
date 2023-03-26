import clsx from "clsx";
import sanityBaseUrl from "lib/sanityBaseUrl";
import { ReactNode } from "react";
import { z } from "zod";

const fileLinkSchema = z.object({
  _key: z.string(),
  _type: z.literal("fileLink"),
  fileName: z.string().optional(),
  file: z.object({
    _type: z.literal("file"),
    asset: z.object({
      _ref: z.string(),
      _type: z.literal("reference"),
    }),
  }),
});

const FileLink: React.FC<{ children: ReactNode; value?: unknown }> = ({
  children,
  value,
}) => {
  const parsedFileResult = fileLinkSchema.safeParse(value);
  if (!parsedFileResult.success) {
    console.error("File object did not match schema", {
      cause: parsedFileResult.error,
    });
    return <span className={clsx("text-danger")}>{children}</span>;
  }

  const fileData = parsedFileResult.data;
  const { fileName } = fileData;
  const [_file, id, extension] = fileData.file.asset._ref.split("-");
  return (
    <a
      href={`${sanityBaseUrl}/${id}.${extension}?dl=${
        fileName ? encodeURIComponent(fileName) : id
      }.${extension}`}
    >
      {children}
    </a>
  );
};

export default FileLink;
