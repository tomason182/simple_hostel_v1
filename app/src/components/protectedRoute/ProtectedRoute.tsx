import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingPage from "../../pages/loading/LoadingPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loading, isAuthenticated } = useAuth();


  if (loading) {
    return <LoadingPage />
  }
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return children;
}

export default ProtectedRoute;
