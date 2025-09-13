import { useNavigate } from "react-router-dom";
import useUser from "../features/auth/useUser";
import { useEffect } from "react";
import Loader from "./Loader";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) return <Loader />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
