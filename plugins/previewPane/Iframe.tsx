import { getSecret } from "plugins/productionUrl/utils";
import { memo } from "react";
import { useClient } from "sanity";
import { suspend } from "suspend-react";

export type Props = {
  path?: string;
  previewSecretId: `${string}.${string}`;
  apiVersion: string;
};
// Used as a cache key that doesn't risk collision or getting affected by other components that might be using `suspend-react`
const fetchSecret = Symbol("preview.secret");
// eslint-disable-next-line react/display-name
const Iframe = memo(
  (props: Omit<Props, "path"> & Required<Pick<Props, "path">>) => {
    const { apiVersion, previewSecretId, path } = props;
    const client = useClient({ apiVersion });

    const secret = suspend(
      () => getSecret(client, previewSecretId, true),
      ["getSecret", previewSecretId, fetchSecret],
      // The secret fetch has a TTL of 1 minute, just to check if it's necessary to recreate the secret which has a TTL of 60 minutes
      { lifespan: 60000 }
    );

    const url = new URL("/api/preview", location.origin);
    url.searchParams.set("path", path);
    if (secret) {
      url.searchParams.set("secret", secret);
    }

    return (
      <iframe
        src={url.toString()}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
        title="Preview"
      />
    );
  }
);
export default Iframe;
