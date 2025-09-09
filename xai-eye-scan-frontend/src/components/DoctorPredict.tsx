import { useState } from "react";
import useGetPatients from "../features/patient/useGetPatients";
import usePredict from "../features/prediction/usePredict";
import toast from "react-hot-toast";

type Prediction = {
  scanImage: string;
  predictedClass: string;
  heatmapImage: string;
};

function DoctorPredict() {
  const { patientsData, isLoading } = useGetPatients();
  const {
    predict,
    isLoading: isPredicting,
    data: predictionResult,
  } = usePredict();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [patientId, setPatientId] = useState<string>();
  const [image, setImage] = useState<File>();

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setImage(e.target.files[0]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (image && patientId) {
      console.log("Predict Request Sent");
      predict(
        { file: image, Dpatient_id: patientId },
        {
          onSuccess: () => {
            setPatientId("");
            setImage(undefined);
            setPredictions((prevPredictions) => [
              ...prevPredictions,
              {
                scanImage: predictionResult?.image_url,
                predictedClass: predictionResult?.predicted_class,
                heatmapImage: predictionResult?.heatmap_url,
              },
            ]);

            e.currentTarget.reset();
          },
        }
      );
    } else if (!patientId) {
      toast.error("Please select one of your patients");
    } else {
      toast.error("Please upload a scan to be predicted");
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="predict">
      <div className="predict__form">
        <div className="formContainer">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__container">
              <label htmlFor="patient" className="form__label">
                Please choose the patient
              </label>
              <select
                name="patient"
                id="patient"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="form__input"
              >
                <option value="">Select one of the patients</option>
                {patientsData?.map((patient) => (
                  <option value={patient.id} key={patient.id}>
                    {patient.Patient_Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form__container">
              <input
                type="file"
                id="image"
                hidden
                onChange={handleImageUpload}
              />

              <div className="form__upload">
                <label htmlFor="image" className="form__label">
                  Upload File
                </label>

                <span id="file-chosen" className="form__file">
                  {image ? image.name : "No file chosen"}
                </span>
              </div>
            </div>

            <div className="form__buttons">
              <button className="form__submit" disabled={isPredicting}>
                Classify
              </button>
            </div>
          </form>
        </div>
      </div>

      {predictions.length > 0 && (
        <div className="predict__results">
          {predictions.map((prediction) => (
            <div className="predict__result" key={prediction.scanImage}>
              <img
                src={prediction.scanImage}
                alt="The is the image scan to be predicted"
                className="predict__scan"
              />
              <h2 className="predict__class">
                The Diagnosis is{" "}
                <span>
                  {prediction.predictedClass
                    ?.split("_")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </span>
              </h2>
              <img
                src={prediction.heatmapImage}
                alt="The is the visual proof of the explainable artificial intillegence"
                className="predict__heatmap"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorPredict;

// "https://vlzqpsknkkfwxgzqkyly.supabase.co/storage/v1/object/public/Images/heatmaps/7795cf2dfeac4391975529bdfeb03022.png?"
// "https://vlzqpsknkkfwxgzqkyly.supabase.co/storage/v1/object/public/Images/scanimage/008fcbcdc5bd4f6d889cace152dc4afd.png?"
