import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { Toaster } from "react-hot-toast";
import FloatingPaths from "@Components/FloatingPaths";

export default function GuestLayout() {
  const { user, token } = useStateContext();

  if (user && token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent dark:bg-neutral-950">
      <Toaster />
      {/* Background */}
      <div className="absolute inset-0">
        <FloatingPaths position={-3} />
      </div>

      <Outlet />
    </div>
  );
}
