import Loader from "../components/Loader";
import Predict from "../components/Predict";
import useCheckIsPatient from "../features/patient/useCheckIsPatient";

function Predictpage() {
  const { data: checkResult, isLoading } = useCheckIsPatient();

  if (isLoading) return <Loader />;

  if (checkResult === true) return <Predict />;
  else return <Predict />;
}

export default Predictpage;
