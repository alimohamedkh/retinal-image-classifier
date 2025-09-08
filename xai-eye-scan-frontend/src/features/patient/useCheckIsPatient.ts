import { useQuery } from "@tanstack/react-query";
import { checkIsPatient as checkIsPatientApi } from "../../services/apiPatient";

export default function useCheckIsPatient() {
  const { data, isLoading } = useQuery({
    queryFn: checkIsPatientApi,
    queryKey: ["user_type"],
  });

  return { data, isLoading };
}
