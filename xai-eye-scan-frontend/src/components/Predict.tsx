import { useEffect, useRef, useState } from "react";
import useGetPatients from "../features/patient/useGetPatients";
import usePredict from "../features/prediction/usePredict";
import toast from "react-hot-toast";
import useCheckIsPatient from "../features/patient/useCheckIsPatient";
import Loader from "./Loader";
import useGetSelectedPatient from "../features/History/useGetSelectedPatient";

type Prediction = {
  id: number;
  scanImage: string;
  predictedClass: string;
  heatmapImage: string;
};

type PredictionFromCloud = {
  id: string;
  Scan_image: string;
  Class: string;
  Heatmap_image: string;
  created_at: string;
};

function Predict({
  history,
  selectedPatientId,
}: {
  history?: PredictionFromCloud[];
  selectedPatientId?: string;
}) {
  const { data: isPatient, isLoading: isCheckingIsPatient } =
    useCheckIsPatient();
  const { patientsData, isLoading: isGettingPatients } = useGetPatients();
  const { data: selectedPatient, isLoading: isGettingSelectedPatient } =
    useGetSelectedPatient(selectedPatientId);
  const { predict, isLoading: isPredicting } = usePredict();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [patientId, setPatientId] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef<number>(0);

  console.log("Selected patient by doctor: ", selectedPatient);

  useEffect(
    function () {
      if (history && history.length > 0) {
        const sortedHistory = [...history].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        const initialPredictions = sortedHistory.map(
          (item: PredictionFromCloud) => ({
            id: nextId.current++, // Assign a new local ID and increment the counter
            scanImage: item.Scan_image,
            predictedClass: item.Class,
            heatmapImage: item.Heatmap_image,
          })
        );

        console.log("Initial Predictions: ", initialPredictions);
        setPredictions(initialPredictions);
      }
    },
    [history]
  );

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) setImage(e.target.files[0]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!isPatient)
      if (image && patientId) {
        console.log("Predict Request Sent By Doctor");
        predict(
          { file: image, Dpatient_id: patientId },
          {
            onSuccess: (res) => {
              setPatientId("");
              setImage(undefined);
              setPredictions((prevPredictions) => [
                ...prevPredictions,
                {
                  id: nextId.current++,
                  scanImage: res.scanimage_url,
                  predictedClass: res.predicted_class,
                  heatmapImage: res.heatmap_url,
                },
              ]);

              if (fileInputRef.current) fileInputRef.current.value = "";
            },
          }
        );
      } else if (image && selectedPatientId) {
        predict(
          { file: image, Dpatient_id: selectedPatientId },
          {
            onSuccess: (res) => {
              setPatientId("");
              setImage(undefined);
              setPredictions((prevPredictions) => [
                ...prevPredictions,
                {
                  id: nextId.current++,
                  scanImage: res.scanimage_url,
                  predictedClass: res.predicted_class,
                  heatmapImage: res.heatmap_url,
                },
              ]);

              if (fileInputRef.current) fileInputRef.current.value = "";
            },
          }
        );
      } else if (!patientId) {
        toast.error("Please select one of your patients");
      } else {
        toast.error("Please upload a scan to be predicted");
      }
    else {
      if (image) {
        console.log("Predict Request Sent By Patient");
        predict(
          { file: image, Dpatient_id: patientId },
          {
            onSuccess: (res) => {
              setPatientId("");
              setImage(undefined);
              setPredictions((prevPredictions) => [
                ...prevPredictions,
                {
                  id: nextId.current++,
                  scanImage: res.scanimage_url,
                  predictedClass: res.predicted_class,
                  heatmapImage: res.heatmap_url,
                },
              ]);

              if (fileInputRef.current) fileInputRef.current.value = "";
            },
          }
        );
      } else {
        toast.error("Please upload a scan to be predicted");
      }
    }
  }

  if (isGettingPatients || isCheckingIsPatient || isGettingSelectedPatient)
    return <Loader />;

  return (
    <div className="predict">
      <div className="predict__form">
        <div className="formContainer">
          <form className="form" onSubmit={handleSubmit}>
            {isPatient && (
              <h1 className="predict__form--title">
                Please upload a scan to be classified
              </h1>
            )}
            {!isPatient && !selectedPatientId && (
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
                  disabled={isPredicting}
                >
                  <option value="">Select one of the patients</option>
                  {patientsData?.map((patient) => (
                    <option value={patient.id} key={patient.id}>
                      {patient.Patient_Name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedPatientId && (
              <h1 className="formContainer__title">
                This is the history for{" "}
                <span>{selectedPatient?.Patient_Name}</span>
              </h1>
            )}

            <div className="form__container">
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                hidden
                onChange={handleImageUpload}
              />

              <div className="form__upload">
                <label
                  htmlFor="image"
                  className={
                    isPredicting
                      ? "form__upload--label form__label--disabled"
                      : "form__upload--label"
                  }
                >
                  Upload File
                </label>

                <span
                  id="file-chosen"
                  className="form__file"
                  aria-disabled={isPredicting}
                >
                  {image ? image.name : "No file chosen"}
                </span>
              </div>
            </div>

            <div className="form__buttons">
              <button
                className="form__submit form__submit--disabled"
                disabled={isPredicting}
                aria-disabled={isPredicting}
              >
                Classify
              </button>
            </div>
          </form>
        </div>
      </div>

      {predictions.length > 0 && (
        <div className="predict__results">
          {predictions.map((prediction) => (
            <div className="predict__result" key={prediction.id}>
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
                    .join(" ") != "Normal"
                    ? prediction.predictedClass
                        ?.split("_")
                        .map(
                          (word: string) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    : "that your retinal scan is normal and has no disease"}
                </span>
              </h2>
              <img
                src={prediction.heatmapImage}
                alt="The is the visual proof of the explainable artificial intillegence"
                className="predict__heatmap"
              />
            </div>
          ))}
          {isPredicting ? (
            <div className="skeleton-container">
              <div className="skeleton skeleton-image"></div>

              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text short"></div>

              <div className="skeleton skeleton-image"></div>
            </div>
          ) : null}
        </div>
      )}

      {predictions.length === 0 && isPredicting && (
        <div className="predict__results">
          <div className="skeleton-container">
            <div className="skeleton skeleton-image"></div>

            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text short"></div>

            <div className="skeleton skeleton-image"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Predict;

// "https://vlzqpsknkkfwxgzqkyly.supabase.co/storage/v1/object/public/Images/heatmaps/7795cf2dfeac4391975529bdfeb03022.png?"
// "https://vlzqpsknkkfwxgzqkyly.supabase.co/storage/v1/object/public/Images/scanimage/008fcbcdc5bd4f6d889cace152dc4afd.png?"
