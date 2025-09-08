import { useMutation } from "@tanstack/react-query";
import { createPatient as createPatientApi } from "../../services/apiPatient";
import toast from "react-hot-toast";

export default function useCreatePatient() {
  const { mutate: createPatient, isPending } = useMutation({
    mutationFn: createPatientApi,
    onSuccess: () =>
      toast.success(
        "Patient has been created , please select them in order to use the prediction feature"
      ),
  });

  return { createPatient, isLoading: isPending };
}
