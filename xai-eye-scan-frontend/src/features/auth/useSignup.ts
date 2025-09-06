import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () =>
      toast.success(
        "Account successfully created! Use the newly created account to login"
      ),
    onError: () => toast.error("Something went wrong, please try again"),
  });

  return { signup, isLoading: isPending };
}
