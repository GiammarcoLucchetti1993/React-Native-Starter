import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, it } from "./translations";

const resources = {
  en: en,
  it: it,
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  debug: true,
  lng: "en",
  fallbackLng: "en",
  resources,
});

export default i18next;
