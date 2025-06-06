/* eslint-disable no-unused-vars */

export default function Header({
  isSidebarOpen, setIsSidebarOpen, isDarkMode, toggleTheme, isLangOpen,
  setIsLangOpen, handleLanguageChange, language, motion, Sun, Moon,
  Search, flags, notificationsDropdownRef, langDropdownRef, isSearchModalOpen,
  setIsSearchModalOpen, PanelLeftOpen, Link, SearchModal, X, menuItems,
  t, i18n, setLanguage, toast, ReactTyped, useCallback, useEffect, useMemo,
  useRef, useState, isMinimized, strings

}) {

  return (
    <div>
      <header className="h-14 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-600 bg-transparent dark:bg-dark relative font-serif shadow-sm dark:shadow-md ">
        {/* Sidebar Toggle Button */}
       {!isMinimized && (
        <button
          id="sidebar-toggle"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className={`lg:hidden text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-[#23232b] `}
        >
          <PanelLeftOpen size={15} className=" text-gray-600 dark:text-white" />
        </button>
       )}

        {/* Right-side Icons */}
        <div className="flex gap-4 items-center absolute z-[450] right-5">
          {/* Search Bar */}
          <div className="relative z-[450]" ref={notificationsDropdownRef}>
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="m-[5px]"
              title="Search"
            >
              <Search size={15} className=" text-gray-600 dark:text-white" />
            </button>
          </div>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="m-[5px]  " title="Toggle Theme">
            {isDarkMode ? (
              <Sun size={15} className=" text-white" />
            ) : (
              <Moon size={15} className=" text-gray-600" />
            )}
          </button>

          {/* Lang Dropdown */}
          <div className="relative z-[500]" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="h-[25px] w-[30px] m-[2px] "
            >
              <img
                src={flags[language]?.src || flags.en.src}
                className=""
                alt={flags[language]?.label}
                title={flags[language]?.label}
                style={{ filter: isDarkMode ? "brightness(0.9)" : "none" }}
              />
            </button>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-[500] border border-gray-200 dark:border-gray-600 right-0 mt-2 w-48 bg-white dark:bg-[#23232b] shadow-md rounded p-2"
              >
                {Object.entries(flags).map(([key, { src, label }]) => (
                  <button
                    key={key}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-white hover:bg-main-light dark:hover:bg-main-dark w-full text-left transition-colors duration-200 rounded"
                    onClick={() =>
                      handleLanguageChange(key, i18n, setLanguage, t, toast)
                    }
                    title={label}
                  >
                    <img
                      src={src}
                      className="w-6"
                      alt={label}
                      title={label}
                      style={{
                        filter: isDarkMode ? "brightness(0.85)" : "none",
                      }}
                    />{" "}
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
        Search={Search}
        X={X}
        Link={Link}
        menuItems={menuItems}
        motion={motion}
        t={t}
        ReactTyped={ReactTyped}
        useCallback={useCallback}
        useEffect={useEffect}
        useMemo={useMemo}
        useRef={useRef}
        useState={useState}
        strings={strings}
      />
    </div>
  );
}
