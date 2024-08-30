import { DirectusCollections } from "@/lib/types/directus";
import { authentication, createDirectus, rest } from "@directus/sdk";

const client = createDirectus<DirectusCollections>(
  process.env.EXPO_PUBLIC_DIRECTUS_URL || "http://localhost:8055"
)
  .with(rest())
  .with(authentication());

export default client;
