import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import jp from "../locales/jp.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: localStorage.getItem("i18nextLng") || "en",
    resources: {
      en: en,
      jp: jp,
    },
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"],
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;
