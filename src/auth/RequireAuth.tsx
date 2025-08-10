import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // Optionally render a spinner
  if (!session) return <Navigate to="/home" state={{ from: location }} replace />;

  return <>{children}</>;
}
