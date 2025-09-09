import { Link } from "react-router-dom";
import useCreatePatient from "../features/patient/useCreatePatient";
import { useState } from "react";

function Doctorpage() {
  const { createPatient, isLoading } = useCreatePatient();
  const [patientName, setPatientName] = useState<string>();
  const [show, setShow] = useState<boolean>(false);

  function handleShow() {
    setShow(true);
  }

  function handleHide() {
    setShow(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!patientName) return;

    createPatient({ patientName }, { onSuccess: () => setShow(false) });
  }

  return (
    <div className="doctor">
      <div className="btns" style={show ? { filter: "blur(3px)" } : undefined}>
        <button className="btns__btn" onClick={handleShow}>
          Add Patient
        </button>
        <Link to="/predict" className="btns__btn">
          Select an Existing Patient
        </Link>
      </div>

      {show && (
        <form onSubmit={handleSubmit} className="doctor__form">
          <div className="doctor__form--container">
            <label htmlFor="patientName" className="doctor__form--label">
              Enter the name of the patient
            </label>
            <input
              type="text"
              className="doctor__form--input"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <button className="doctor__form--btn" disabled={isLoading}>
            Create Patient
          </button>
          <button className="doctor__form--cancel" onClick={handleHide}>
            cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default Doctorpage;
