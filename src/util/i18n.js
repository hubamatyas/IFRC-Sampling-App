import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr', 'es', 'ar'],
    fallbackLng: 'en',
    detection: {
        order: ['cookie', 'path'],
        caches: ['cookie']
    },
    Backend: {
        loadPath: '/locales/{{lng}}/translation.json'
    },
  });


export default i18n;