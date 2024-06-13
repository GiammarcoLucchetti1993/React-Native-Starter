import { DirectusCollections } from "@/lib/types/directus";
import { createDirectus, rest } from "@directus/sdk";

const client = createDirectus<DirectusCollections>(
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055"
).with(
  rest({
    onRequest: (options) => ({ ...options, cache: "no-cache" }),
  })
);

export default client;
