import {
  Calendar,
  House,
  User,

} from "lucide-react";


const baseMenuConfig = [
  { name: "Home", icon: <House size={15} /> },
  { name: "Users", icon: <User size={15} /> },

  {
    title: "Calendars",
    icon: <Calendar size={15} />,
    items: ["Holidays Calendar", "Leaves Calendar"],
  },
  

];

// ───  Admin-Based Menu ──────────────────────────────────────────
// ✅ SAFE: Accepts user as argument, no hooks



export { baseMenuConfig };
