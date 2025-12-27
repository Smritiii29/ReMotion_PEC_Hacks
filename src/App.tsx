import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

/* ================= Auth ================= */
import AuthPage from "./pages/Auth"; // Make sure this path matches where you saved the file above

/* ================= Patient ================= */
import PatientIndex from "./patient/Index";
import Home from "./patient/Home";
import Avatars from "./patient/Avatars";
import ExerciseSession from "./patient/ExerciseSession";
import Progress from "./patient/Progress1";
import Messages from "./patient/Messages";
import PatientNotFound from "./patient/NotFound";

/* ================= Therapist ================= */
import TherapistIndex from "./therapist/Index";
import Patients from "./therapist/Patients";
import Analytics from "./therapist/Analytics";
import Reports from "./therapist/Reports";
import Settings from "./therapist/Settings";
import TherapistNotFound from "./therapist/NotFound";

export default function App() {
  return (
    <>
      <Toaster />
      <Sonner />

      <Routes>
        {/* Root -> Redirect to Auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* ================= AUTHENTICATION ================= */}
        <Route path="/auth" element={<AuthPage />} />

        {/* ================= PATIENT ================= */}
        <Route path="/patient" element={<PatientIndex />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="avatars" element={<Avatars />} />
          <Route path="exercise" element={<ExerciseSession />} />
          <Route path="progress" element={<Progress />} />
          <Route path="messages" element={<Messages />} />
          <Route path="*" element={<PatientNotFound />} />
        </Route>

        {/* ================= THERAPIST ================= */}
        <Route path="/therapist" element={<TherapistIndex />}>
          <Route index element={<Navigate to="patients" replace />} />
          <Route path="patients" element={<Patients />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<TherapistNotFound />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </>
  );
}