/* eslint-disable no-unused-vars */
export default function BackToTopBtn({
  handleClick,
  AnimatePresence,
  motion,
  visible,
  ChevronUp,

}) {
  return (
    <AnimatePresence>
    {visible && (
      <motion.button
        key="backToTop"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.25 }}
        onClick={handleClick}
        className="fixed bottom-14 right-6 z-50 p-4 rounded-[8px] border bg-main-dark border-light dark:border-dark dark:bg-main-light shadow-lg backdrop-blur-sm hover:scale-105 active:scale-95 transition-all"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 text-light dark:text-dark" />
      </motion.button>
    )}
  </AnimatePresence>
  );
}
