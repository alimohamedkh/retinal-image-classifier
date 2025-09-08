import { useState } from "react";
import useGetPatients from "../features/patient/useGetPatients";

function DoctorPredict() {
  const { patientsData, isLoading } = useGetPatients();
  const [patient, setPatient] = useState<string>();
  const [image, setImage] = useState<File>();

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setImage(e.target.files[0]);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <form>
      <div>
        <label htmlFor="patient">Please choose the patient</label>
        <select
          name="patient"
          id="patient"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
        >
          <option value="">Select one of the patients</option>
          {patientsData?.map((patient) => (
            <option value={patient.Patient_Name}>{patient.Patient_Name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="image">Please upload the scan to be predicted</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <button>submit</button>
    </form>
  );
}

export default DoctorPredict;
