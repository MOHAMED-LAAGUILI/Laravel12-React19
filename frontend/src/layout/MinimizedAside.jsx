/* eslint-disable no-unused-vars */
export default function MinimizedAside({
  asideMenuItems, translator, Link, twMerge, profileMenuRef, profileRef, setIsProfileOpen,
  isProfileOpen, route, AppLogo , AppName, profileMenuItems, isMinimized, setIsMinimized, PanelLeftOpen,
  registerItemRef, hoveredItem, setHoveredItem, isHoveringPopup, popupRef, hoverTimeoutRef,
  setIsHoveringPopup, itemRefs, userImage, navigate, React, currentUser, setUser, setToken
}) {
  // --- Tooltip position logic ---
  const [tooltipPosition, setTooltipPosition] = React.useState({ left: "4.5rem", top: "80px" });
  const tooltipRef = React.useRef(null);

  React.useEffect(() => {
    if (hoveredItem === null) return;
    const itemEl = itemRefs.current[hoveredItem];
    if (!itemEl) return;
    const rect = itemEl.getBoundingClientRect();
    // Estimate tooltip height (if rendered)
    let tooltipHeight = 56; // fallback default
    if (popupRef.current) {
      tooltipHeight = popupRef.current.offsetHeight;
    }
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    // 8px margin from edge
    if (spaceBelow < tooltipHeight + 8 && spaceAbove > tooltipHeight + 8) {
      // Show above
      setTooltipPosition({
        left: "4.5rem",
        top: undefined,
        bottom: `${window.innerHeight - rect.top}px`,
      });
    } else {
      // Show below (default)
      setTooltipPosition({
        left: "4.5rem",
        top: `${rect.top}px`,
        bottom: undefined,
      });
    }
  }, [hoveredItem, popupRef, itemRefs]);


  return (
    <>
      {/* Minimized Sidebar */}
      <aside
        id="minimized-sidebar"
        className={`relative inset-y-0 left-0 z-[500]  bg-white dark:bg-dark border-r border-gray-200 dark:border-gray-800 flex flex-col  max-h-screen`}
        aria-label="Minimized sidebar navigation"
      >
        {/* Logo */}
        <div className="relative top-0 z-10 h-14 flex items-center justify-center px-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-dark">
          <Link to="/">
          <img src={AppLogo} alt={AppName} className="w-12 h-12 object-cover" />  
          </Link>
        </div>

        {/* Profile Icon */}
        <div
          ref={profileRef}
          className="sticky top-14 z-10 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800"
        >
          <button
            className="flex items-center justify-center p-3 w-full focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <img
              src={userImage}
              alt="Profile"
              className="w-9 h-9 rounded-lg object-cover border-2 border-blue-400 dark:border-blue-600 shadow"
            />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 overflow-y-auto">

          {asideMenuItems.map((section, index) => {
            const isActive = route === section.path;

            return (
              <div
                key={index}
                className="mb-1 px-2 relative"
                onMouseEnter={() => {
                  clearTimeout(hoverTimeoutRef.current);
                  setHoveredItem(index);
                }}
                onMouseLeave={() => {
                  hoverTimeoutRef.current = setTimeout(() => {
                    if (!isHoveringPopup) {
                      setHoveredItem(null);
                    }
                  }, 300); // 300ms delay before hiding
                }}
                ref={(el) => registerItemRef(index, el)}
              >
                {section.items ? (
                  <>
                    <button
                      className={twMerge(
                        "flex items-center justify-center w-full p-2 rounded-lg transition-colors duration-200",
                        isActive
                          ? "bg-blue-900 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      {section.icon && (
                        <span className="flex items-center justify-center text-blue-500 dark:text-blue-300">
                          {section.icon}
                          {section.path}
                        </span>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to={section.path}
                      className={twMerge(
                        "flex items-center justify-center p-2 rounded-lg transition-colors duration-200 w-full",
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      {section.icon && (
                        <span className="flex items-center justify-center">
                          {section.icon}
                        </span>
                      )}
                    </Link>
                  </>
                )}
              </div>
            );
          })}
        </nav>

        {/* Toggle button and Version info */}
        <div className="sticky bottom-0 border-t border-gray-200 dark:border-gray-800 py-0 px-0 flex flex-col items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-full py-[7px]  bg-blue-100 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800/50 dark:text-blue-300 transition-colors flex items-center justify-center gap-2"
            aria-label={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
          >
            {isMinimized && (
              <div>
                
                <PanelLeftOpen
                  size={15} 
                  className=" text-blue-600 dark:text-blue-300 "
                />
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Floating Menus - Rendered outside the aside to avoid overflow issues */}
      {isProfileOpen && (
  <div
    ref={profileMenuRef}
    className="fixed z-[9999] top-16 left-20 w-52 rounded-lg border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-lg animate-fade-in"
  >
    {/* Header */}
    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
      <div className="flex flex-col">
        <span className="text-md font-semibold text-gray-900 dark:text-white truncate">
          {currentUser?.username?.charAt(0).toUpperCase() + currentUser?.username?.slice(1)}
        </span>
        <span className="text-md text-gray-500 dark:text-gray-400 truncate">
          ID: {currentUser?.id}
        </span>
      </div>
    </div>

    {/* Menu Items */}
    <div className="py-2">
      {profileMenuItems.map((item, index) => {
        const commonClasses =
          "w-full text-left px-4 py-2 flex items-center gap-2 rounded-md transition-colors duration-200";

        if (item.to === "/logout") {
          return (
            <button
              key={index}
              className={`${commonClasses} ${item.textClass} ${item.hoverClass}`}
              onClick={(e) => {
                e.preventDefault();
                setUser(null);
                setToken(null);
              }}
            >
              {item.icon}
              {translator(item.label)}
            </button>
          );
        }

        return (
          <Link
            key={index}
            to={item.to}
            className={`${commonClasses} ${item.textClass} ${item.hoverClass}`}
          >
            {item.icon}
            {translator(item.label)}
          </Link>
        );
      })}
    </div>
  </div>
)}


      {/* Floating Dropdowns for Menu Items */}
      {hoveredItem !== null && asideMenuItems[hoveredItem]?.items && (
        <div
          ref={el => {
            popupRef.current = el;
            tooltipRef.current = el;
          }}
          className="fixed bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg z-[9999] py-2 min-w-[200px] animate-fade-in"
          style={{
            left: tooltipPosition.left,
            top: tooltipPosition.top,
            bottom: tooltipPosition.bottom,
          }}
          onMouseEnter={() => {
            clearTimeout(hoverTimeoutRef.current);
            setIsHoveringPopup(true);
          }}
          onMouseLeave={() => {
            setIsHoveringPopup(false);
            setHoveredItem(null);
          }}
        >
          <div className="px-3 py-2 font-medium text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">
            {translator(`${asideMenuItems[hoveredItem].title}`)}
          </div>
          <div className="py-1">
            {asideMenuItems[hoveredItem].items.map((item, idx) => {
              const isActive = `${route}` === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={twMerge(
                    "flex items-center px-3 py-2 transition-colors duration-200",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.icon && (
                    <span className="mr-2 flex items-center justify-center">
                      {isActive && item.icon}
                    </span>
                  )}
                  <div>{translator(`${item.name}`)}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Tooltips for Single Menu Items */}
      {hoveredItem !== null && !asideMenuItems[hoveredItem]?.items && (
        <div
          ref={el => {
            popupRef.current = el;
            tooltipRef.current = el;
          }}
          className="fixed bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg z-[9999] py-2 px-3 min-w-[120px] animate-fade-in"
          style={{
            left: tooltipPosition.left,
            top: tooltipPosition.top,
            bottom: tooltipPosition.bottom,
          }}
          onMouseEnter={() => {
            clearTimeout(hoverTimeoutRef.current);
            setIsHoveringPopup(true);
          }}
          onMouseLeave={() => {
            setIsHoveringPopup(false);
            setHoveredItem(null);
          }}
        >
          <span className="text-gray-700 dark:text-gray-200">
            {translator(`${asideMenuItems[hoveredItem].name}`)}
          </span>
        </div>
      )}
    </>
  );
}
