import supabase from "./supabase";

export async function getHistory() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  const userId = data.user.id;

  const { data: historyData, error: errorData } = await supabase
    .from("History")
    .eq("User_id", userId)
    .select();

  if (error) throw new Error(errorData.message);

  return historyData;
}
