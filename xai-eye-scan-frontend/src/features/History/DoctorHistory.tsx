import { useParams } from "react-router-dom";
import useHistory from "./useHistory";
import Predict from "../../components/Predict";
import Loader from "../../components/Loader";

function DoctorHistory() {
  const { patientId } = useParams();
  const { history, isLoading: isGettingHistory } = useHistory(patientId);

  if (isGettingHistory) return <Loader />;

  return <Predict history={history} selectedPatientId={patientId} />;
}

export default DoctorHistory;
