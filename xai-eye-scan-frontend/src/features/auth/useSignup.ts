import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () =>
      toast.success(
        "Account successfully created! An email has been sent in order to verify your account"
      ),
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading: isPending };
}
