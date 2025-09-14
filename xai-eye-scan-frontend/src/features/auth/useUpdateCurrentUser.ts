import type { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiUser";
import toast from "react-hot-toast";

type UpdatedUserData = {
  password?: string;
  fullName?: string;
  avatar: File | null;
};

export default function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUser, isPending: isLoading } = useMutation<
    User,
    Error,
    UpdatedUserData
  >({
    mutationFn: updateCurrentUserApi,
    onSuccess: () => {
      toast.success("User account successfully updated");
      // Invalidate the user query to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { updateCurrentUser, isLoading };
}
