import PropTypes from "prop-types";

// Color maps for badge variants
const SOFT_COLORS = {
  primary: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  yellow: "bg-yellow-100 text-yellow-800",
  sky: "bg-sky-100 text-sky-700",
  pink: "bg-pink-100 text-pink-700",
  indigo: "bg-indigo-100 text-indigo-700",
  orange: "bg-orange-100 text-orange-700",
  dark: "bg-gray-700 text-white",
  light: "bg-gray-100 text-gray-700",
};

const SOLID_COLORS = {
  primary: "bg-blue-500 text-white",
  purple: "bg-purple-500 text-white",
  green: "bg-green-500 text-white",
  red: "bg-red-500 text-white",
  yellow: "bg-yellow-400 text-gray-900",
  sky: "bg-sky-500 text-white",
  pink: "bg-pink-500 text-white",
  indigo: "bg-indigo-500 text-white",
  orange: "bg-orange-500 text-white",
  dark: "bg-gray-900 text-white",
  light: "bg-gray-200 text-gray-700",
};

const OUTLINE_COLORS = {
  primary: "border border-blue-400 text-blue-700 bg-transparent",
  purple: "border border-purple-400 text-purple-700 bg-transparent",
  green: "border border-green-400 text-green-700 bg-transparent",
  red: "border border-red-400 text-red-700 bg-transparent",
  yellow: "border border-yellow-400 text-yellow-800 bg-transparent",
  sky: "border border-sky-400 text-sky-700 bg-transparent",
  pink: "border border-pink-400 text-pink-700 bg-transparent",
  indigo: "border border-indigo-400 text-indigo-700 bg-transparent",
  orange: "border border-orange-400 text-orange-700 bg-transparent",
  dark: "border border-gray-700 text-gray-700 bg-transparent",
  light: "border border-gray-200 text-gray-700 bg-transparent",
};

const CLOSE_COLORS = SOFT_COLORS; // For badges with close (x) icon

const variantMap = {
  soft: SOFT_COLORS,
  solid: SOLID_COLORS,
  outline: OUTLINE_COLORS,
  close: CLOSE_COLORS,
};

const CoreBadge = ({
  children,
  color = "primary",
  variant = "soft",
  className = "",
  onClose,
  ...props
}) => {
  const colorClass = variantMap[variant]?.[color] || variantMap.soft.primary;
  const baseClass =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-sm transition-all duration-150 " +
    colorClass +
    (onClose ? " pr-2" : "") +
    (className ? ` ${className}` : "");

  return (
    <span className={baseClass} {...props}>
      {children}
      {variant === "close" && (
        <button
          type="button"
          className="ml-2 text-xs text-gray-400 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
          aria-label="Close badge"
        >
          ×
        </button>
      )}
    </span>
  );
};

CoreBadge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "purple",
    "green",
    "red",
    "yellow",
    "sky",
    "pink",
    "indigo",
    "orange",
    "dark",
    "light",
  ]),
  variant: PropTypes.oneOf(["soft", "solid", "outline", "close"]),
  className: PropTypes.string,
  onClose: PropTypes.func,
};

export default CoreBadge;
