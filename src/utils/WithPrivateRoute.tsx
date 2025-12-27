import { Navigate, useLocation, Location } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ReactNode } from "react";

// Define allowed roles
type AllowedRole = "patient" | "physiotherapist";

// Props interface
interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: AllowedRole;
}

export default function PrivateRoute({
  children,
  requiredRole,
}: PrivateRouteProps) {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation() as Location<{ from?: Location } | null>;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-800 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    // Not logged in → redirect to login, preserving intended destination
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (requiredRole && userRole !== requiredRole) {
    // Logged in but wrong role → redirect to safe default (e.g., home or role-based dashboard)
    return <Navigate to="/" replace />;
  }

  // All checks passed → render protected content
  return <>{children}</>;
}