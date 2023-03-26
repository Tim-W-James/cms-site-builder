import { apiVersion, dataset, projectId, useCdn } from "lib/sanity.api";
import { createClient } from "next-sanity";

const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export default client;
