import Doctorpage from "../components/Doctorpage";
import Loader from "../components/Loader";
import Predict from "../components/Predict";
// import Patientpage from "../components/Patientpage";
import useCheckIsPatient from "../features/patient/useCheckIsPatient";

function Homepage() {
  const { data: checkResult, isLoading } = useCheckIsPatient();

  if (isLoading) return <Loader />;

  if (checkResult === true) return <Predict />;
  else return <Doctorpage />;
}

export default Homepage;
