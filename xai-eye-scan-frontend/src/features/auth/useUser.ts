import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const {
    isLoading,
    isError,
    data: userData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isError,
    isLoading,
    isAuthenticated: userData?.user?.role === "authenticated",
    userData,
  };
}
