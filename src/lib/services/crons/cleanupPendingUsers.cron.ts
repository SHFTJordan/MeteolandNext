import { supabaseClient } from "@@/config";



export default async function cleanupPendingUsersJob(): Promise<void> {
  console.log("🔔 Tâche de nettoyage des utilisateurs en attente lancée.");
  try {
    const { data, error } =
      await supabaseClient.supabaseAdmin.auth.admin.listUsers();
    if (error) {
      console.error("❌ Erreur récupération utilisateurs :", error.message);
      throw new Error(`Erreur récupération utilisateurs : ${error.message}`);
    }

    const users = data?.users || [];
    const now = Date.now();

    const expiredUsers = users.filter((user) => {
      if (user.email_confirmed_at) return false;

      const createdAt = new Date(user.created_at).getTime();
      return now - createdAt > Number(process.env.DELAY_MINUTES) * 60 * 1000;
    });

    if (expiredUsers.length === 0) {
      console.log("✅ Aucun utilisateur à supprimer.");
      return;
    }

    for (const user of expiredUsers) {
      try {
        await supabaseClient.supabaseAdmin.auth.admin.deleteUser(user.id);

        await supabaseClient.supabaseAdmin.from("Cron_logs").insert({
          cron_name: "cleanup_pending_users",
          user_id: user.id,
          status: "success",
          message: `Utilisateur ${user.email} supprimé (non confirmé).`,
        });

        console.log(`🗑️ Utilisateur ${user.email} supprimé (non confirmé).`);
      } catch (deleteError) {
        const errorMessage =
          deleteError instanceof Error
            ? deleteError.message
            : String(deleteError);

        console.error(
          `❌ Erreur suppression utilisateur ${user.email} :`,
          errorMessage
        );

        await supabaseClient.supabaseAdmin.from("Cron_logs").insert({
          cron_name: "cleanup_pending_users",
          user_id: user.id,
          status: "error",
          message: errorMessage,
        });
      }
    }
    console.log(
      `✅ Nettoyage terminé : ${expiredUsers.length} utilisateurs supprimés.`
    );
  } catch (err) {
    console.error("❌ Erreur globale dans cleanupPendingUsersJob :", err);
    throw err;
  }
}
