import supabase, { supabaseUrl } from "./supabase";
import heic2any from "heic2any";
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
  if (fullName) updateData.data = { full_name: fullName };

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

  // const fileName = `avatar-${user.id}-${Math.random()}`;

  let avatarFile = avatar; // Assuming 'avatar' is the File object

  if (
    avatarFile.type.toLowerCase() === "image/hiec" ||
    avatarFile.name.endsWith(".heic") ||
    avatarFile.name.endsWith(".HEIC")
  ) {
    try {
      const convertedImage = await heic2any({
        blob: avatarFile,
        toType: "image/jpeg",
        quality: 1,
      });

      const convertedBlob = Array.isArray(convertedImage)
        ? convertedImage[0]
        : convertedImage;

      avatarFile = new File(
        [convertedBlob],
        avatarFile.name.replace(/\.[^/.]+$/, ".jpeg"),
        {
          type: "image/jpeg",
        }
      );
    } catch (error) {
      console.log("Error converting image type: ", error);
      // throw new Error(error);
    }
  }
  // 1. Extract the original file extension
  const fileExt = avatarFile.name.split(".").pop();

  // 2. Create the new, unique filename with the extension
  const fileName = `avatar-${user.id}-${Math.random()}.${fileExt}`;

  const filePath = `/avatars/${fileName}`;

  const { error: errorStorage } = await supabase.storage
    .from("Images")
    .upload(filePath, avatarFile);

  if (errorStorage) throw new Error(errorStorage.message);

  const { data: updatedUser, error: finalError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/Images/avatars/${fileName}`,
      },
    });

  if (finalError) throw new Error(finalError.message);

  return updatedUser.user;
}
