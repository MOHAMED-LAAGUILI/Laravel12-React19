/* eslint-disable no-unused-vars */

export default function MaximizedAside({
  isSidebarOpen, setIsSidebarOpen, asideMenuItems, translator, Link,
  sectionTitleVisible, openDropdown, twMerge, ChevronDown, setOpenDropdown,
  X, profileMenuRef, profileRef, setIsProfileOpen, isProfileOpen, route,
  AppName, AppVersion, profileMenuItems, ChevronLeft, setIsMinimized,
  PanelRightOpen, userImage, currentUser, setUser, setToken
}) {

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div
        className={`fixed z-[500] inset-0 bg-black dark:bg-dark transition-opacity 
        ${isSidebarOpen ? "opacity-40 visible" : "opacity-0 invisible"}`}
      ></div>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={twMerge(
          "fixed inset-y-0 left-0 z-[500] w-72 bg-white dark:bg-dark border-r border-gray-200 dark:border-gray-800  flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto max-h-screen",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:flex"
        )}
        aria-label="Sidebar navigation"
      >
        {/* Logo */}
        <div className="sticky top-0 z-10 h-14 flex items-center gap-2 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172B]">
          <Link to="/">
            <span className="text-3xl  text-gray-600 dark:text-white tracking-tight font-semibold ">
            {`${AppName.charAt(0).toUpperCase()}${AppName.slice(1)}`}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-300 font-semibold uppercase tracking-wide mt-4 mb-2 px-2">
              {AppVersion}
            </span>
          </Link>
          <button
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <X size={15} className=" text-gray-600 dark:text-white" />
          </button>
        </div>
        {/* Profile Card */}
        <div
          ref={profileRef}
          className="sticky top-14 z-10 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800"
        >
          <button
            className="flex items-center gap-3 px-4 py-4 w-full focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <img
              src={userImage}
              alt="Profile"
              className="w-11 h-11 rounded-lg object-cover border-2 border-blue-400 dark:border-blue-600 shadow"
            />
            <div className="flex flex-col flex-1 min-w-0 text-left">
              <span className="font-semibold text-base text-gray-900 dark:text-white truncate">
                {currentUser?.username || "" }
              </span>
              
              <span className="text-xs text-gray-400 dark:text-gray-300 truncate">
              ID: {currentUser?.id || ""}
              </span>
          
            </div>
            <ChevronDown
              className={twMerge(
                "w-5 h-5 text-gray-400 dark:text-gray-300 transition-transform",
                isProfileOpen ? "rotate-180" : ""
              )}
            />
          </button>
          {isProfileOpen && (
            <div
              ref={profileMenuRef}
              className="absolute left-4 right-4 mt-2 mx-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border dark:border-gray-800 rounded-lg shadow-lg z-[999] py-2 animate-fade-in"
            >
              {profileMenuItems.map((item, index) => {
                if (item.to === "/logout") {
                  return (
                    <button
                      key={index}
                      className={`w-48 text-left px-2 mx-3 py-2 flex items-center rounded-md ${item.textClass} ${item.hoverClass} transition`}
                      onClick={(e) => {
                        e.preventDefault();
                        setUser(null);
                        setToken(null)
                        

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
                    className={`w-48 text-left px-2  mx-3 py-2 flex items-center rounded-md ${item.textClass} ${item.hoverClass} transition`}
                  >
                    {item.icon}
                    {translator(item.label)}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        {/* Navigation menu - dynamic rendering with dropdowns */}
        <nav
          className="flex-1 px-4 py-4 overflow-y-auto"
          aria-label="Main navigation"
        >
          {asideMenuItems.map((section, index) => (
            <div key={index} className="mb-1">
              {section.title && sectionTitleVisible && (
                <div className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wide mt-4 mb-2 px-2">
                  {section.title}
                </div>
              )}

              {section.title ? (
                <div className="space-y-1">
                  {/* Section header (collapsible) */}
                  <button
                    type="button"
                    className={twMerge(
                      "w-full flex items-center gap-3 px-3 py-2 text-[16px] rounded-lg font-medium transition-all duration-200 focus:outline-none",
                      openDropdown === index
                        ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 shadow-sm"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
                    )}
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                    aria-expanded={openDropdown === index}
                    aria-controls={`section-${index}`}
                  >
                    {section.icon && (
                      <span className="flex items-center justify-center text-blue-500 dark:text-blue-300">
                        {section.icon}
                      </span>
                    )}
                    <span className="flex-1 text-left truncate">
                      {translator(`${section.title}`)}
                    </span>
                    <span
                      className={twMerge(
                        "transition-transform duration-200 ml-auto",
                        openDropdown === index ? "-rotate-[90deg]" : ""
                      )}
                    >
                      <ChevronLeft size={15} />
                    </span>
                  </button>
                  {/* Section items (collapsible content) */}
                  <div
                    id={`section-${index}`}
                    className={twMerge(
                      "ml-5 pl-2 border-l border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out",
                      openDropdown === index
                        ? "opacity-100 visible py-1"
                        : "max-h-0 opacity-0 invisible overflow-hidden"
                    )}
                  >
                    {section.items.map((item, idx) => {
                      const isActive = `${route}` === item.path;
                      return (
                        <Link
                          key={idx}
                          to={item.path}
                          className={twMerge(
                            "flex items-center  my-1 mx-3  px-1 py-1  rounded-md transition-colors duration-200 group relative",
                            isActive
                              ? "ms-2 bg-blue-50 dark:bg-blue-600 text-blue-600 dark:text-blue-200  shadow-sm"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.icon && isActive && (
                            <span className="flex relative -left-[23px] items-center justify-center group-hover:text-blue-500 dark:group-hover:text-blue-300  ">
                              {isActive && item.icon}
                            </span>
                          )}

                          <div
                            className={twMerge(
                              isActive && "font-semibold relative -left-4 "
                            )}
                          >
                            {translator(`${item.name}`)}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Link
                  to={section.path}
                  className={twMerge(
                    "flex items-center gap-3 px-3 py-2 text-[16px] rounded-lg transition-colors duration-200 w-full",
                    route === section.path
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold shadow-sm"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {section.icon && (
                    <span className="w-5 h-5 flex items-center justify-center">
                      {section.icon}
                    </span>
                  )}
                  <span className="truncate">
                    {translator(`${section.name}`)}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </nav>
        {/* Minimize Button */}
        <div className="sticky bottom-0 border-t border-gray-200 dark:border-gray-800 p-0.5 flex flex-col items-center gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="w-full py-1.5 rounded-md bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-300 transition-colors flex items-center justify-center gap-2"
            aria-label="Minimize sidebar"
          >
            <PanelRightOpen size={15} />
            <span>Minimize</span>
          </button>
        </div>
      </aside>
    </>
  );
}
