/* eslint-disable no-unused-vars */

function flattenMenuItemsWithSection(items) {
  return items.reduce((acc, item) => {
    if (item.items && item.items.length > 0) {
      // Section/group with subitems
      acc.push(
        ...item.items.map((sub) => ({
          ...sub,
          section: item.title || item.name || "",
        }))
      );
    } else {
      acc.push({ ...item, section: null });
    }
    return acc;
  }, []);
}

function HighlightMatch({ text, query }) {
  if (!query.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span
            key={i}
            className="bg-yellow-200 dark:bg-yellow-800 font-medium"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function SearchModal({
  useCallback, useEffect, useMemo, useRef, useState,
  isOpen, setIsSearchModalOpen, ReactTyped, Search, X,
  Link, menuItems, motion, t, strings,
}) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Use the new flattenMenuItemsWithSection to keep section/group info
  const flattenedItems = useMemo(
    () =>
      flattenMenuItemsWithSection(menuItems).map((item) => ({
        ...item,
        translatedLabel: t(item.name || item.title || ""),
        section: item.section ? t(item.section) : null,
      })),
    [menuItems, t]
  );

  const filteredItems = useMemo(() => {
    if (!search.trim()) return [];
    const searchLower = search.toLowerCase();
    return flattenedItems
      .filter((item) =>
        item.translatedLabel.toLowerCase().includes(searchLower)
      )
      .sort((a, b) => {
        const aLower = a.translatedLabel.toLowerCase();
        const bLower = b.translatedLabel.toLowerCase();
        if (aLower === searchLower) return -1;
        if (bLower === searchLower) return 1;
        if (aLower.startsWith(searchLower)) return -1;
        if (bLower.startsWith(searchLower)) return 1;
        return 0;
      });
  }, [search, flattenedItems]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setSelectedIndex(0);
    } else {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            window.location.href = filteredItems[selectedIndex].path;
            setIsSearchModalOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsSearchModalOpen(false);
          break;
      }
    },
    [isOpen, filteredItems, selectedIndex, setIsSearchModalOpen]
  );

  useEffect(() => {
    const selectedElement =
      resultsContainerRef.current?.children[selectedIndex];
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  // Group filteredItems by section
  const grouped = useMemo(() => {
    const map = new Map();
    filteredItems.forEach((item) => {
      const section = item.section || "Other";
      if (!map.has(section)) map.set(section, []);
      map.get(section).push(item);
    });
    return map;
  }, [filteredItems]);

  let runningIdx = 0; // For keyboard navigation index

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-8 md:p-12"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-dark rounded shadow-2xl w-full sm:max-w-[600px] max-h-[85vh] overflow-hidden transition-all duration-200 ease-out transform translate-y-0 opacity-100 border border-blue-100 dark:border-blue-900"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4">
              <Search className="mr-2 h-5 w-5 text-blue-400 dark:text-blue-300" />
              <div className="flex flex-col w-full">
                <input
                  ref={searchInputRef}
                  value={search}
                  onChange={(e) => {
                    console.log("onChange fired", e.target.value);
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onFocus={() => console.log("Input focused")}
                  placeholder="Search menu items... (Press ↑↓ to navigate)"
                  className="flex h-14 w-full bg-transparent py-4 text-base text-gray-900 placeholder:text-gray-400 outline-none dark:text-gray-100 dark:placeholder:text-gray-500 rounded-lg"
                  autoComplete="off"
                />
              </div>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                >
                  <X className="h-5 w-5 text-gray-400" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
            <div
              ref={resultsContainerRef}
              className="overflow-y-auto overscroll-contain thin-scrollbar bg-gradient-to-b from-blue-50/40 to-transparent dark:from-blue-900/20 dark:to-transparent"
              style={{ maxHeight: "calc(85vh - 4rem)" }}
            >
              {filteredItems.length > 0 ? (
                <div className="p-2">
                  <div className="px-2 py-1.5 text-xs text-gray-500 dark:text-gray-400">
                    {filteredItems.length} result
                    {filteredItems.length !== 1 ? "s" : ""}
                  </div>
                  {[...grouped.entries()].map(([section, items]) => (
                    <div key={section} className="mb-2">
                      {section !== "Other" && (
                        <div className="pl-2 pt-3 pb-1 text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                          {section}
                        </div>
                      )}
                      {items.map((item, i) => {
                        const idx = runningIdx;
                        runningIdx++;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSearchModalOpen(false)}
                            className={`
                              block px-3 py-2 text-sm rounded-lg cursor-pointer font-medium
                              ${
                                idx === selectedIndex
                                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 shadow"
                                  : "hover:bg-blue-50 dark:hover:bg-blue-800 text-gray-700 dark:text-gray-100"
                              }
                              transition-all duration-150 mb-1
                            `}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            tabIndex={0}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="truncate">
                                  <HighlightMatch
                                    text={item.translatedLabel}
                                    query={search}
                                  />
                                </div>
                                <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                                  {item.path}
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  {search ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      No results found for query
                      <span className="font-medium text-gray-900 dark:text-gray-200">
                        {" "}
                        {search}{" "}
                      </span>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-200 mb-2">
                      Begin typing to search{" "}
                      <ReactTyped
                        strings={strings}
                        stringsElement={null}
                        typeSpeed={50}
                        startDelay={500}
                        backSpeed={30}
                        smartBackspace={true}
                        shuffle={false}
                        backDelay={700}
                        fadeOut={false}
                        fadeOutDelay={500}
                        loop={true}
                        loopCount={Infinity}
                        showCursor={true}
                        cursorChar="|"
                        autoInsertCss={true}
                       // style={{ fontSize: "14px"}}
                        className="text-sm text-gray-500 dark:text-gray-200"
                      />
                      <div className="mt-1 text-xs">
                        Use ↑↓ arrows to navigate, Enter to select
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
