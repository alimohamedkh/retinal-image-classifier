import { useNavigate } from "react-router-dom";
import useUser from "../features/auth/useUser";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
