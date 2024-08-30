import client from "@/utils/client";
import { readItems } from "@directus/sdk";
import { DirectusFilters } from "../types/directus";
import { INews } from "../types/news";

type NewsOptions = {
  filter?: DirectusFilters<INews>;
  sort?: "date_created" | "-date_created" | undefined;
  page?: number;
  limit?: number;
};

export const getNews = (options: NewsOptions) =>
  client.request(
    readItems("news", {
      fields: ["*", "translations.*", "translations.languages_id.*"],
      ...options,
      meta: "*",
    })
  ) as Promise<INews[]>;
