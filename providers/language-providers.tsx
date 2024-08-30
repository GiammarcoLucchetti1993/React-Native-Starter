import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

type LangData = {
  lang: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LangData>({
  lang: "en",
  setLanguage: (lang: string) => {},
});

export default function LanguageProvider({ children }: PropsWithChildren) {
  const [lang, setLang] = useState("en");
  const LANG_STORAGE_KEY = "LANG";
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem(LANG_STORAGE_KEY);
        if (savedLang) {
          i18n.changeLanguage(savedLang);
        }
      } catch (error) {
        console.error("Failed to fetch language:", error);
      }
    };

    fetchLanguage();
  }, []);

  const setLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem(LANG_STORAGE_KEY, lang);
      i18n.changeLanguage(lang);
    } catch (error) {
      console.error("Failed to set language:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
