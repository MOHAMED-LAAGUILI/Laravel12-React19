
// Helper to get language from localStorage
const getInitialLanguage = () => {
  return localStorage.getItem("language") || "en";
};

export default getInitialLanguage;
