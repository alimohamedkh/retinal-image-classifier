import supabase, { supabaseUrl } from "./supabase";
import type { User, UserAttributes } from "@supabase/supabase-js";

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

type UpdateUserData = {
  password?: string;
  fullName?: string;
  avatar: File | null;
};

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UpdateUserData): Promise<User> {
  const updateData: UserAttributes = {};

  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };

  let user: User | null = null;

  if (Object.keys(updateData).length > 0) {
    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) throw new Error(error.message);
    user = data.user;
  }

  if (!avatar) {
    if (user) return user;
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    if (!currentUser) throw new Error("No user found");
    return currentUser;
  }

  if (!user) {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    user = currentUser;
  }

  if (!user) throw new Error("No user found to update avatar for.");

  const fileName = `avatar-${user.id}-${Math.random()}`;

  const { error: errorStorage } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (errorStorage) throw new Error(errorStorage.message);

  const { data: updatedUser, error: finalError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}}`,
      },
    });

  if (finalError) throw new Error(finalError.message);

  return updatedUser.user;
}
