import DoctorPredict from "../components/DoctorPredict";
import useCheckIsPatient from "../features/patient/useCheckIsPatient";

function Predictpage() {
  const { data: checkResult, isLoading } = useCheckIsPatient();

  if (isLoading) return <div>Loading...</div>;

  if (checkResult === true) return <div>Patient Predict</div>;
  else return <DoctorPredict />;
}

export default Predictpage;
