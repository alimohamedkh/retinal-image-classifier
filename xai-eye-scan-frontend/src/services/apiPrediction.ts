import supabase from "./supabase";

export async function predict({ file }: { file: File }) {
  // 1. Get the current session from Supabase
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error(sessionError.message);
    throw new Error(sessionError.message);
  }

  if (!sessionData.session) {
    throw new Error("User not authenticated. Please log in.");
  }

  // 2. Extract the JWT access token from the session
  const accessToken = sessionData.session.access_token;

  // 3. Use FormData to prepare the file for the request
  const formData = new FormData();
  formData.append("file", file); // 'file' is the key the server will use to find the file

  try {
    // 4. Send the POST request with the JWT and the file
    const response = await fetch("http://localhost:3000/predict", {
      // Adjusted URL
      method: "POST",
      headers: {
        // Attach the JWT for authorization
        Authorization: `Bearer ${accessToken}`,
      },
      // The body of the request is the FormData object
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorBody}`);
    }

    // Assuming the server responds with JSON
    const data = await response.json();
    console.log("Prediction successful:", data);
    return data;
  } catch (error) {
    console.error("Failed to send prediction request:", error);
    throw error;
  }
}
