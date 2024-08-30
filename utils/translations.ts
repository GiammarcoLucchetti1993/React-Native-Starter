import { Translation } from "@/lib/types/translation";

export const getTranslation = <T>(
  translations: Array<T & Translation>,
  locale: string
) => {
  if (!translations) return;

  return (
    translations.find((t) => t.languages_id.code === locale) ||
    translations.find((t) => t.languages_id.code === "en")
  );
};
