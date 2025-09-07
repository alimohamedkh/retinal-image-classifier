import { useMutation } from "@tanstack/react-query";
import { predict as predictApi } from "../../services/apiPrediction";

export default function usePredict() {
  const { mutate: predict, isPending } = useMutation({
    mutationFn: predictApi,
  });

  return { predict, isLoading: isPending };
}
