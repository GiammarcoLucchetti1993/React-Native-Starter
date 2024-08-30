import { Translation } from "./translation";

type NewsTranslatableFields = Translation & {
  title: string;
  content: string;
};

export type INews = {
  id: string;
  date_created: string;
  translations: NewsTranslatableFields[];
  cover_image?: string;
};
