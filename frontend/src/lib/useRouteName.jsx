import { useLocation } from "react-router-dom";
import { useMemo } from "react";

/**
 * Extracts the current route and page name from the URL.
 * Usage: const { route, pageName } = useRouteAndPageName();
 */
export default function useRouteName() {
  const location = useLocation();
  const { pathname } = location;

  const { route, pageName, AppName } = useMemo(() => {
    // Replace hyphens and underscores with spaces for title casing
    const cleanPath = pathname.replace(/[-_]/g, " ");
    const segments = cleanPath.split("/").filter(Boolean);
    let name = segments.length > 0 ? segments[segments.length - 1] : "Home";
    // Capitalize each word
    name = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { route: pathname, pageName: name };
  }, [pathname]);

  return { route, pageName };
}
