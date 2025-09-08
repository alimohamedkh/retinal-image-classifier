import { useState, type ChangeEvent, type FormEvent } from "react";
import usePredict from "../features/prediction/usePredict";
import useCheckIsPatient from "../features/patient/useCheckIsPatient";

function Krookypage() {
  const [file, setFile] = useState<File>();
  const { data: checkResult, isLoading: isCheckingUser } = useCheckIsPatient();
  const { predict } = usePredict();

  let Dpatient_id: string | undefined;
  if (checkResult === true) {
    Dpatient_id = undefined;
  } else {
    Dpatient_id = "6edae688-bb53-4c02-92a3-12323d537586";
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // The selected files are in a FileList object.
    // We take the first file from the list.
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior.

    if (file) {
      console.log("Selected file:", file);
      predict({ file, Dpatient_id });
      // Here you would typically upload the file to a server.
      // For example: const formData = new FormData();
      // formData.append("image", file);
      // fetch("/api/predict", { method: "POST", body: formData });
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" disabled={isCheckingUser}>
        predict
      </button>
    </form>
  );
}

export default Krookypage;
