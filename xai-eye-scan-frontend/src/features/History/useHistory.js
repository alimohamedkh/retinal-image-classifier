import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../../services/apiHistory";

export default function useHistory() {
  const {
    isLoading,
    isError,
    data: history,
  } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  return { isLoading, isError, history };
}
