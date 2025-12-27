import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Check if it's in ui or just components

export default function PatientIndex() {
  const location = useLocation();

  const getActiveItem = () => {
    const path = location.pathname;
    if (path.includes("progress")) return "progress";
    if (path.includes("avatars")) return "avatars";
    if (path.includes("messages")) return "messages";
    if (path.includes("home") || path === "/patient") return "home";
    return "home";
  };

  return (
    <div className="flex h-screen w-full bg-[#e0f2f0] overflow-hidden">
      {/* Sidebar (Fixed) */}
      <Sidebar activeItem={getActiveItem()} />

      {/* MAIN CONTENT AREA - FIXES:
         1. ml-24: Pushes content right so it's not hidden behind the fixed sidebar.
         2. h-full: Ensures the container takes full height.
         3. overflow-y-auto: Allows THIS specific area to scroll (fixes clipping).
      */}
      <main className="flex-1 h-full relative overflow-y-auto overflow-x-auto">
        <Outlet /> 
      </main>
    </div>
  );
}