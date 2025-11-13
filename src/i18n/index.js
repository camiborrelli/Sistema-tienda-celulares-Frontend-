import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

if (!localStorage.getItem("lenguage")) {
  localStorage.setItem("lenguage", "en");
}

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  lng: localStorage.getItem("lenguage"),
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

i18next.on("languageChange", (lng) => {
  localStorage.setItem("lenguage", lng);
});

export default i18next;
