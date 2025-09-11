import { useState } from "react";
import useGetPatients from "../patient/useGetPatients";
import Loader from "../../components/Loader";
import useHistory from "./useHistory";
import Predict from "../../components/Predict";

function DoctorHistory() {
  const { patientsData, isLoading: isGettingPatients } = useGetPatients();
  const [patientId, setPatientId] = useState<string>();
  const { history, isLoading: isGettingHistory } = useHistory();

  if (isGettingPatients || isGettingHistory) return <Loader />;

  if (!patientId)
    return (
      <div className="formContainer">
        <h1 className="formContainer__title">
          Please select a patient to access their history
        </h1>
        <form className="form">
          <div className="form__container">
            <select
              name="userType"
              id="userType"
              className="form__input"
              required
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            >
              <option value="">Please choose one of the patients</option>
              {patientsData?.map((patient) => (
                <option value={patient?.id}>{patient?.Patient_Name}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
    );

  if (patientId && history) return <Predict />;
}

export default DoctorHistory;
