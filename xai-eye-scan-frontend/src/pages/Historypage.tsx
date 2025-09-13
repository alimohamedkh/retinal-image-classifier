import Loader from "../components/Loader";
import DoctorHistorySelect from "../features/History/DoctorHistorySelect";
import PatientHistory from "../features/History/PatientHistory";
import useCheckIsPatient from "../features/patient/useCheckIsPatient";

function Historypage() {
  const { data: isPatient, isLoading } = useCheckIsPatient();

  if (isLoading) return <Loader />;

  if (isPatient === true) return <PatientHistory />;
  return <DoctorHistorySelect />;
}

export default Historypage;
