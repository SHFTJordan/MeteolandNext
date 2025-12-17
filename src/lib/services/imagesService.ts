// import { supabaseClient } from "@@/config";
// import { CustomError } from "@@/utils";

// async function uploadImageService({
//   file,
//   ad_id,
//   token,
// }: {
//   file: File;
//   ad_id: string;
//   token: string;
// }) {
//   const supabaseToken = supabaseClient.getSupabaseWithToken(token);
//   const { data: sessionUser, error: userError } = await supabaseToken.auth.getUser();
//   if (userError || !sessionUser?.user?.id) {
//     console.error(
//       "Erreur Supabase auth.getUser() dans uploadImageService:",
//       userError?.message
//     );
//     throw new CustomError("Authentification requise ou session invalide", 401);
//   }
//   console.log(
//     "User ID via supabase.auth.getUser():",
//     sessionUser?.user?.id,
//     "Error:",
//     userError
//   );

//   if (!file.name) {
//     throw new CustomError("Nom de fichier manquant.", 400);
//   }

//   const fileExt = file.name.split(".").pop();
//   const fileName = `${ad_id}-${Date.now()}.${fileExt}`;
//   const filePath = `ads/${ad_id}/${fileName}`;

//   const { error: uploadError } = await supabaseToken.storage
//     .from("profile-pictures")
//     .upload(filePath, file as Blob, {
//       contentType: file.type,
//     });

//   if (uploadError) {
//     console.error("Erreur upload images dans service :", uploadError.message);
//     throw new CustomError("Erreur lors de l'upload de l'images",500);
//   }

//   const { data } = supabaseToken.storage.from("profile-pictures").getPublicUrl(filePath);

//   return data.publicUrl;
// }

// export async function insertImageRecord({
//   user_id,
//   url,
//   token,
// }: {
//   user_id: string;
//   url: string;
//   token: string;
// }) {
//   const supabaseToken = await supabaseClient.getSupabaseWithToken(token);
//   const { error } = await supabaseToken
//     .from("Images")
//     .insert([{ user_id, url, uploaded_at: new Date().toISOString() }]);

//   if (error) {
//     console.error("Erreur insertion image dans service:", error.message);
//     throw new CustomError("Erreur lors de l'insertion et de l'enregistrement de l'image",500);
//   }
// }

// export { uploadImageService };
