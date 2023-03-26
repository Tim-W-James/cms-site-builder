import clsx from "clsx";
import { ReactNode } from "react";
import { z } from "zod";

const urlLinkSchema = z.object({
  _key: z.string(),
  _type: z.literal("urlLink"),
  url: z.string(),
  hoverText: z.string().optional(),
  shouldUseNewTab: z.boolean().optional(),
});

const UrlLink: React.FC<{ children: ReactNode; value?: unknown }> = ({
  children,
  value,
}) => {
  const parsedUrlResult = urlLinkSchema.safeParse(value);
  if (!parsedUrlResult.success) {
    console.error("Url object did not match schema", {
      cause: parsedUrlResult.error,
    });
    return <span className={clsx("text-danger")}>{children}</span>;
  }

  const { url, hoverText, shouldUseNewTab } = parsedUrlResult.data;
  return (
    <a
      href={url}
      rel="noreferrer"
      target={shouldUseNewTab ? "_blank" : "_self"}
      title={hoverText}
    >
      {children}
    </a>
  );
};

export default UrlLink;
