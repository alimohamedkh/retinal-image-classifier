import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../services/apiUser";

export default function useGetUserDetails() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUserDetails,
    queryKey: ["Details"],
  });

  return { data, isLoading, isError };
}
