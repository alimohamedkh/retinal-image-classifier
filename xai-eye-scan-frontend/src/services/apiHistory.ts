import supabase from "./supabase";

export async function getHistory({
  dpatient_id,
}: {
  dpatient_id: string | undefined;
}) {
  let query = supabase
    .from("History")
    .select("id, Scan_image, Class, Heatmap_image, created_at");

  if (dpatient_id) {
    query = query.eq("Dpatient_id", dpatient_id);
  } else {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user)
      throw new Error(userError?.message || "User not found");

    const userId = userData.user.id;

    query = query.eq("Patient_id", userId);
  }

  const { data: historyData, error: errorData } = await query;

  if (errorData) throw new Error(errorData.message);

  console.log("Found History: ", historyData);

  return historyData;
}
