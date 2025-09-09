import { useMutation } from "@tanstack/react-query";
import { predict as predictApi } from "../../services/apiPrediction";

export default function usePredict() {
  const {
    mutate: predict,
    isPending,
    data,
  } = useMutation({
    mutationFn: predictApi,
    onSuccess: (data) => {
      console.log("Prediction successful:", data);
    },
    onError: (error) => {
      console.error("Prediction failed:", error);
    },
  });

  return { predict, isLoading: isPending, data };
}
