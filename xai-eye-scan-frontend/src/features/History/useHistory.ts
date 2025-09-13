import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../../services/apiHistory";

export default function useHistory(dpatient_id: string | undefined) {
  const {
    isLoading,
    isError,
    data: history,
  } = useQuery({
    queryKey: ["history", dpatient_id],
    queryFn: () => getHistory({ dpatient_id }),
  });

  return { isLoading, isError, history };
}
