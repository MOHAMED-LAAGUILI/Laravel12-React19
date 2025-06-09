import {
  Calendar,
  House,
  ShieldAlert,
  User,

} from "lucide-react";


const baseMenuConfig = [
  { name: "Home", icon: <House size={15} /> },


  {
    title: "Admin",
    icon: <ShieldAlert size={15} />,
    items: ["Users","Roles","Permissions"],
  },
  

];

// ───  Admin-Based Menu ──────────────────────────────────────────
// ✅ SAFE: Accepts user as argument, no hooks



export { baseMenuConfig };
