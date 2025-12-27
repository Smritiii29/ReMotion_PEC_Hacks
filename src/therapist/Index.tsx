import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function TherapistIndex() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
