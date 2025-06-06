/* eslint-disable react-refresh/only-export-components */

import { baseMenuConfig } from "./Items";

// Sub-item icon component
const SubItemIcon = ({
  size = 15,
  color = "border-blue-400",
  darkColor = "dark:border-gray-100",
  spinning = true,
}) => {
  return (
    <span className="flex items-center justify-center">
      <span
        className={`
          rounded-full border-2 border-dashed
          ${color} ${darkColor}
          ${spinning ? "animate-spin" : ""}
        `}
        style={{ width: size, height: size }}
      />
    </span>
  );
};

// Utility: format route path
const formatPath = (name) => {
  return name === "Home" ? "/" : `/${name.toLowerCase().replace(/\s+/g, "-")}`;
};

// Utility: generate a single item
const getItem = (name, icon) => ({
  name,
  path: formatPath(name),
  icon,
});

// Utility: generate a list of sub-items
const getSubItems = (items) =>
  items.map((name) => ({
    name,
    path: formatPath(name),
    icon: <SubItemIcon key={name} />,
  }));

// ✅ This must now be a React component to safely use hooks
export const useMenuItems = () => {

  const menuItems = [
    ...baseMenuConfig.map((item) =>
      !item.title
        ? getItem(item.name, item.icon)
        : {
            title: item.title,
            icon: item.icon,
            items: getSubItems(item.items),
          }
    ),
   
  ];

  return menuItems;
};
