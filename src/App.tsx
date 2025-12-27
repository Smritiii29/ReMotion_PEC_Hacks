// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import WithPrivateRoute from "./utils/WithPrivateRoute";

// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";

// /* ================= PUBLIC ================= */
// import LandingPage from "./components/LandingPage";
// import AuthPage from "./pages/Auth";

// /* ================= PATIENT ================= */
// import PatientIndex from "./patient/Index";
// import Home from "./patient/Home";
// import Avatars from "./patient/Avatars";
// import ExerciseSession from "./patient/ExerciseSession";
// import Progress from "./patient/Progress1";
// import Messages from "./patient/Messages";
// import PatientNotFound from "./patient/NotFound";

// /* ================= THERAPIST ================= */
// import TherapistIndex from "./therapist/Index";
// import Patients from "./therapist/Patients";
// import Analytics from "./therapist/Analytics";
// import Reports from "./therapist/Reports";
// import Settings from "./therapist/Settings";
// import TherapistNotFound from "./therapist/NotFound";

// export default function App() {
//   return (
//     <AuthProvider>
//       <Toaster />
//       <Sonner />

//       <Routes>
//         {/* ================= PUBLIC ================= */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<AuthPage />} />

//         {/* ================= PATIENT (PROTECTED) ================= */}
//         <Route
//           path="/patient"
//           element={
//             <WithPrivateRoute requiredRole="patient">
//               <PatientIndex />
//             </WithPrivateRoute>
//           }
//         >
//           <Route index element={<Navigate to="home" replace />} />
//           <Route path="home" element={<Home />} />
//           <Route path="avatars" element={<Avatars />} />
//           <Route path="exercise" element={<ExerciseSession />} />
//           <Route path="progress" element={<Progress />} />
//           <Route path="messages" element={<Messages />} />
//           <Route path="*" element={<PatientNotFound />} />
//         </Route>

//         {/* ================= THERAPIST (PROTECTED) ================= */}
//         <Route
//           path="/therapist"
//           element={
//             <WithPrivateRoute requiredRole="physiotherapist">
//               <TherapistIndex />
//             </WithPrivateRoute>
//           }
//         >
//           <Route index element={<Navigate to="patients" replace />} />
//           <Route path="patients" element={<Patients />} />
//           <Route path="analytics" element={<Analytics />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="settings" element={<Settings />} />
//           <Route path="*" element={<TherapistNotFound />} />
//         </Route>

//         {/* ================= FALLBACK ================= */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </AuthProvider>
//   );
// }

// src/App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AvatarProvider } from "./context/AvatarContext";
import WithPrivateRoute from "./utils/WithPrivateRoute";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

/* PUBLIC */
import LandingPage from "./components/LandingPage";
import AuthPage from "./pages/Auth";

/* PATIENT */
import PatientIndex from "./patient/Index";
import Home from "./patient/Home";
import AvatarsPage from "./patient/Avatars";
import ExerciseSession from "./patient/ExerciseSession";
import Progress from "./patient/Progress1";
import Messages from "./patient/Messages";
import PatientNotFound from "./patient/NotFound";
import ChangePassword from "./components/accounts/ChangePassword";

/* THERAPIST */
import TherapistIndex from "./therapist/Index";
import Patients from "./therapist/Patients";
import Analytics from "./therapist/Analytics";
import Reports from "./therapist/Reports";
import Settings from "./therapist/Settings";
import TherapistNotFound from "./therapist/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Sonner />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />

        {/* PATIENT ROUTES – Wrapped with AvatarProvider */}
        <Route
          path="/patient"
          element={
            <WithPrivateRoute requiredRole="patient">
              <AvatarProvider>
                <PatientIndex />
              </AvatarProvider>
            </WithPrivateRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="avatars" element={<AvatarsPage />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="exercise" element={<ExerciseSession />} />
          <Route path="progress" element={<Progress />} />
          <Route path="messages" element={<Messages />} />
          <Route path="*" element={<PatientNotFound />} />
        </Route>

        {/* THERAPIST ROUTES */}
        <Route
          path="/therapist"
          element={
            <WithPrivateRoute requiredRole="physiotherapist">
              <TherapistIndex />
            </WithPrivateRoute>
          }
        >
          <Route index element={<Navigate to="patients" replace />} />
          <Route path="patients" element={<Patients />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<TherapistNotFound />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}