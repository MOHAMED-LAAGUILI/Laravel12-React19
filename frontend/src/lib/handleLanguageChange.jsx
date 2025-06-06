
/**
 * Handles language change for the application.
 * @param {string} lang - The language code to switch to (e.g. 'en', 'fr').
 * @param {object} i18n - The i18n instance from react-i18next.
 * @param {function} setLanguage - State setter for language.
 * @param {function} t - Translation function.
 * @param {object} toast - Toast notification instance.
 */
export function handleLanguageChange(lang, i18n, setLanguage, t, toast) {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLanguage(lang);
    if (toast && typeof toast.success === 'function') {
      toast.success(`${t("Language changed to")} ${lang.toUpperCase()}`);
    }
  }
  