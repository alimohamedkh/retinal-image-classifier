import { useState } from "react";
import useGetPatients from "../patient/useGetPatients";
import Loader from "../../components/Loader";
// import Predict from "../../components/Predict";
import { useNavigate } from "react-router-dom";

function DoctorHistorySelect() {
  const { patientsData, isLoading: isGettingPatients } = useGetPatients();
  const [patientId, setPatientId] = useState<string>();
  const navigate = useNavigate();
  //   const { history, isLoading: isGettingHistory } = useHistory(patientId);

  if (isGettingPatients) return <Loader />;

  //   if (!patientId)
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
            onChange={(e) => {
              navigate(`/history/${e.target.value}`);
              setPatientId(e.target.value);
            }}
          >
            <option value="">Please choose one of the patients</option>
            {patientsData?.map((patient) => (
              <option value={patient?.id} key={patient.id}>
                {patient?.Patient_Name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );

  //   if (patientId && history) return <Predict history={history} />;
}

export default DoctorHistorySelect;
