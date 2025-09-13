import { useQuery } from "@tanstack/react-query";
import { getPatient } from "../../services/apiPatient";

export default function useGetSelectedPatient(patientId: string | undefined) {
  const { data, isLoading } = useQuery({
    queryFn: () => getPatient({ patientId }),
    queryKey: ["selectedPatient"],
  });

  return { data, isLoading };
}
