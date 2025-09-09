import supabase from "./supabase";

export async function createPatient({ patientName }: { patientName: string }) {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error(userError?.message || "Doctor not found or not logged in");
  }

  const doctorId = userData.user.id;

  const { data, error } = await supabase
    .from("DoctorPatients")
    .insert([{ Patient_Name: patientName, Doctor_id: doctorId }])
    .select();

  if (error) {
    console.log("Error creating patient: ", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function getPatients() {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error(userError?.message || "Doctor not found or not logged in");
  }

  const doctorId = userData.user.id;

  const { data: patientsData, error: patientsError } = await supabase
    .from("DoctorPatients")
    .select("id, Patient_Name")
    .eq("Doctor_id", doctorId);

  if (patientsError) {
    console.log("Error reading patients: ", patientsError.message);
    throw new Error(patientsError.message);
  }

  console.log("Arrived Patients: ", patientsData);

  return patientsData;
}

export async function checkIsPatient() {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) {
    console.log("Error from checking user: ", authError.message);
    throw new Error(authError.message);
  }

  console.log("Data from Authenticeated User: ", authData);

  const userId = authData.user.id;

  const { data: userData, error } = await supabase
    .from("Patient")
    .select("*")
    .eq("id", userId);

  if (error) {
    console.log("Error from checking user: ", error.message);
    throw new Error(error.message);
  }

  console.log("Result from user checking: ", userData);

  if (userData.length > 0) return true;
  else return false;
}
