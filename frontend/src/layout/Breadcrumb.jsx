/* eslint-disable no-unused-vars */

const toTranslationKey = (segment) => {
  return segment
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const Breadcrumb = ({
  className = "h-[30px]", t, location, Link, separator = "/", Home,
}) => {
  const pathnames = location.pathname.split("/").filter(Boolean);

  if (pathnames.length === 0) return null;

  return (
    <nav
      className={`flex items-center text-sm text-gray-500 dark:text-gray-300 ${className} px-6  border-b border-gray-100 dark:border-gray-700 bg-none dark:bg-dark`}
    >
      <ol className="flex flex-wrap items-center space-x-1">
        <li className="flex items-center space-x-1">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400  dark:text-gray-100 font-medium transition-colors"
          >
            <Home size={16} className="shrink-0 f" />
          </Link>
        </li>

        {/* Collapsed breadcrumbs for long paths */}
        {pathnames.length > 4 ? (
          <>
            {/* Show the first segment */}
            <li className="flex items-center space-x-1">
              <span className=" text-gray-400">{separator}</span>
              <Link
                to={`/${pathnames[0]}`}
                className="capitalize text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t(toTranslationKey(pathnames[0]))}
              </Link>
            </li>
            {/* Ellipsis with tooltip for hidden segments */}
            <li className="flex items-center space-x-1">
              <span className=" text-gray-400">{separator}</span>
              <span className="relative group cursor-pointer select-none">
                ...
                <span className="absolute left-1/2 top-full z-10 hidden group-hover:block min-w-max bg-white dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-200 rounded shadow-lg p-2 mt-1 border border-gray-200 dark:border-gray-700 whitespace-nowrap">
                  {pathnames.slice(1, -2).map((seg, i) => (
                    <div key={i} className="py-0.5 px-1">
                      {t(toTranslationKey(seg))}
                    </div>
                  ))}
                </span>
              </span>
            </li>
            {/* Show the last two segments */}
            {pathnames.slice(-2).map((value, idx) => {
              const actualIdx = pathnames.length - 2 + idx;
              const to = `/${pathnames.slice(0, actualIdx + 1).join("/")}`;
              const isLast = actualIdx === pathnames.length - 1;
              const label = toTranslationKey(value);
              return (
                <li key={to} className="flex items-center space-x-1">
                  <span className=" text-gray-400">{separator}</span>
                  {isLast ? (
                    <span className="text-gray-700 dark:text-gray-100 font-semibold capitalize">
                      {t(label)}
                    </span>
                  ) : (
                    <Link
                      to={to}
                      className="capitalize text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {t(label)}
                    </Link>
                  )}
                </li>
              );
            })}
          </>
        ) : (
          // Default: show all segments
          pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const label = toTranslationKey(value);
            return (
              <li key={to} className="flex items-center space-x-1">
                <span className=" text-gray-400">{separator}</span>
                {isLast ? (
                  <span className="text-gray-700 dark:text-gray-100 font-semibold capitalize">
                    {t(label)}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="capitalize text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t(label)}
                  </Link>
                )}
              </li>
            );
          })
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
