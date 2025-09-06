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

  if (error) throw new Error(error.message);

  return data;
}
