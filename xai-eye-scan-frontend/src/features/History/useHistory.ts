import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../../services/apiHistory";
import useUser from "../auth/useUser";

export default function useHistory(dpatient_id: string) {
  const { userData } = useUser();
  const userId = userData?.user;

  const {
    isLoading,
    isError,
    data: history,
  } = useQuery({
    queryKey: ["history", userId],
    queryFn: () => getHistory({ dpatient_id }),
    enabled: !!userId,
  });

  return { isLoading, isError, history };
}
