import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Allowed roles
type AllowedRole = "patient" | "physiotherapist";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: AllowedRole;
}

export default function PrivateRoute({
  children,
  requiredRole,
}: PrivateRouteProps) {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-800 mx-auto mb-4" />
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Logged in but wrong role
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return <>{children}</>;
}
