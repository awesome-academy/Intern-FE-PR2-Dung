import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import VItranslation from "./locales/vi/translation.json";
import ENtranslation from "./locales/en/translation.json";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: ENtranslation,
      },
      vi: {
        translation: VItranslation,
      },
    },
    react: {
      useSuspense: false,
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
