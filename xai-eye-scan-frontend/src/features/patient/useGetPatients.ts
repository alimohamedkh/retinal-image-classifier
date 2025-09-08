import { useQuery } from "@tanstack/react-query";
import { getPatients as getPatientsApi } from "../../services/apiPatient";

export default function useGetPatients() {
  const { data: patientsData, isPending } = useQuery({
    queryFn: getPatientsApi,
    queryKey: ["patients"],
  });

  return { patientsData, isLoading: isPending };
}
