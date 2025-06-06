// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language JSON files (e.g., English and French)
import en from '@Locales/en.json';
import fr from '@Locales/fr.json';


i18n
  .use(initReactI18next) // Connects i18next with React
  .init({
    resources: {
      en: {translation: en},
      fr: {translation: fr},
    },
    lng: 'en',
    fallbackLng: 'en', // Fallback language in case of missing translation
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
