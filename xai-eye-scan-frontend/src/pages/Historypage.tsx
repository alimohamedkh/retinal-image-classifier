import Loader from "../components/Loader";
import DoctorHistory from "../features/History/DoctorHistory";
import PatientHistory from "../features/History/PatientHistory";
import useCheckIsPatient from "../features/patient/useCheckIsPatient";

function Historypage() {
  const { data: isPatient, isLoading } = useCheckIsPatient();

  if (isLoading) return <Loader />;

  if (isPatient === true) return <PatientHistory />;
  return <DoctorHistory />;
}

export default Historypage;
