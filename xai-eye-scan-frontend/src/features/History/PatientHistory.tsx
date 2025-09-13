import Loader from "../../components/Loader";
import Predict from "../../components/Predict";
import useHistory from "./useHistory";

function PatientHistory() {
  const { history, isLoading } = useHistory(undefined);
  console.log("History: ", history);

  if (isLoading) return <Loader />;

  return <Predict history={history} />;
}

export default PatientHistory;
