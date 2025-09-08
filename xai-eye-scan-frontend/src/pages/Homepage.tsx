import Doctorpage from "../components/Doctorpage";
import Patientpage from "../components/Patientpage";
import useCheckIsPatient from "../features/patient/useCheckIsPatient";

function Homepage() {
  const { data: checkResult, isLoading } = useCheckIsPatient();

  if (isLoading) return <div>Loading...</div>;

  if (checkResult === true) return <Patientpage />;
  else return <Doctorpage />;
}

export default Homepage;
