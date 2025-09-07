import { useState, type ChangeEvent, type FormEvent } from "react";
import usePredict from "../features/prediction/usePredict";

function Krookypage() {
  const [file, setFile] = useState<File>();
  const { predict } = usePredict();

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
      predict({ file });
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
      <button type="submit">predict</button>
    </form>
  );
}

export default Krookypage;
