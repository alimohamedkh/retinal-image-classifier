import { useMutation } from "@tanstack/react-query";
import { createPatient } from "../../services/apiPatient";
import { useNavigate } from "react-router-dom";

export default function useCreatePatient() {
  const navigate = useNavigate();

  useMutation({
    mutationFn: createPatient,
    onSuccess: (createdPatientData) => {
      navigate(`/history/${createdPatientData.at(0).id}`);
    },
  });
}
