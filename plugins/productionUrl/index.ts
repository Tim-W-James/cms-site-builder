/**
 * This plugin sets up the "Open preview (CTRL + ALT + O)" in the dropdown menu that hosts
 * other actions like "Review changes" and "Inspect"
 * @TODO the code in this plugin is a candidate for moving into `@sanity/preview-kit/studio`
 */

import { definePlugin } from "sanity";

import { getSecret } from "./utils";

export const productionUrl = definePlugin<{
  previewSecretId: `${string}.${string}`;
  types: string[];
  apiVersion?: string;
}>(({ previewSecretId, types: _types, apiVersion = "2022-11-17" }) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!previewSecretId) {
    throw new TypeError("`previewSecretId` is required");
  }
  if (!previewSecretId.includes(".")) {
    throw new TypeError(
      "`previewSecretId` must contain a `.` to ensure it can only be queried by authenticated users"
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!_types || _types.length === 0) {
    throw new TypeError("`types` is required");
  }
  const types = new Set(_types);
  return {
    name: "productionUrl",
    document: {
      productionUrl: async (prev, { document, getClient }) => {
        const url = new URL("/api/preview", location.origin);

        const client = getClient({ apiVersion });
        const secret = await getSecret(client, previewSecretId, true);
        if (secret) {
          url.searchParams.set("secret", secret);
        }

        if (types.has(document._type)) {
          url.searchParams.set("type", document._type);
          console.info("Open preview URL", url.toString());
          return url.toString();
        }

        return prev;
      },
    },
  };
});
