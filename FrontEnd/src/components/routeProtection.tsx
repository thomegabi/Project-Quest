import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean
}

export function ProtectedRoute({ children, isAuthenticated }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
