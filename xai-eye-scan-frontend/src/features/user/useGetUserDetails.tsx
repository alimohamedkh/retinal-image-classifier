import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../services/apiUser";

export default function useGetUserDetails() {
  const { data, isLoading } = useQuery({
    queryFn: getUserDetails,
    queryKey: ["userdetails"],
  });

  return { data, isLoading };
}
