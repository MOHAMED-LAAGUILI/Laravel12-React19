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
    items: ["Users","Permissions","Roles"],
  },
  

];

// ───  Admin-Based Menu ──────────────────────────────────────────
// ✅ SAFE: Accepts user as argument, no hooks



export { baseMenuConfig };
