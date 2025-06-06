import {
    User,
    LogOut,
} from "lucide-react";

export const ProfileMenuItems = [
  {
    label: "View Profile",
    icon: <User size={16} className="mr-2" />,
    textClass: "text-dark dark:text-gray-200",
    hoverClass: "hover:bg-main dark:hover:bg-main-dark",
    to: "/profile"
  },
  {
    label: "Logout",
    icon: <LogOut size={16} className="mr-2" />,
    textClass: "text-red-600 dark:text-red-400",
    hoverClass: "hover:bg-red-50 dark:hover:bg-gray-900",
    to: "/logout"
  },
];