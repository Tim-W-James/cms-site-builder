/**
 * This code is responsible for revalidating the cache when a post or author is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. "API" -> "Webhooks" -> "GROQ-powered Webhooks" -> Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Trigger on: "Create", "Update", and "Delete"
 * 5. Add an optional filter
 * 6. Projection: Leave empty
 * 7. HTTP method: POST
 * 8. API version: v2021-03-25
 * 9. Include drafts: No
 * 10. HTTP Headers: Leave empty
 * 11. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random one if you haven't)
 * 12. Save the configuration
 * 13. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 14. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

import { apiVersion, dataset, projectId } from "lib/sanity.api";
import { pagePathQuery } from "lib/sanity.queries";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, type SanityClient } from "next-sanity";
import { parseBody } from "next-sanity/webhook";

export { config } from "next-sanity/webhook";

type StaleRoute = "/" | `/${string}`;

const _queryAllRoutes = (client: SanityClient): Promise<string[]> =>
  client.fetch(pagePathQuery);

const queryAllRoutes = async (client: SanityClient): Promise<StaleRoute[]> => {
  const routes = await _queryAllRoutes(client);

  return ["/", ...routes.map((route) => `/${route}` as StaleRoute)];
};

const queryStaleRoutes = (): Promise<StaleRoute[]> => {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  });
  return queryAllRoutes(client);
};

const revalidate = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );
    if (isValidSignature === false) {
      const message = "Invalid signature";
      console.info(message);
      return res.status(401).send(message);
    }

    if (typeof body._id !== "string" || !body._id) {
      const invalidId = "Invalid _id";
      console.error(invalidId, { body });
      return res.status(400).send(invalidId);
    }

    const staleRoutes = await queryStaleRoutes();
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)));

    const updatedRoutes = `Updated routes: ${staleRoutes.join(", ")}`;
    console.info(updatedRoutes);
    return res.status(200).send(updatedRoutes);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send(err.message);
  }
};

export default revalidate;
