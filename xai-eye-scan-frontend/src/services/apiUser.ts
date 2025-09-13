import supabase from "./supabase";

export async function getUserDetails() {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) {
    console.log("Error from getting user details: ", authError.message);
    throw new Error(authError.message);
  }

  const { data: ifPatientData, error: ifPatientErorr } = await supabase
    .from("Patient")
    .select("*")
    .eq("id", authData.user.id);
  if (ifPatientErorr) {
    console.log("Error from getting user details: ", ifPatientErorr.message);
    throw new Error(ifPatientErorr.message);
  }
  if (ifPatientData.length > 0) return ifPatientData;
  const { data: ifDoctorData, error: ifDoctorError } = await supabase
    .from("Doctor")
    .select("*")
    .eq("id", authData.user.id);
  if (ifDoctorError) {
    console.log("Error from getting user details: ", ifDoctorError.message);
    throw new Error(ifDoctorError.message);
  }
  return ifDoctorData;
}
