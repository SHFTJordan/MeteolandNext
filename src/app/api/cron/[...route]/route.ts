// src/app/api/cron/[...path]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { handleApiError, CustomError } from "@/lib/utils/ssrUtils";

// Importe tes tâches cron spécifiques depuis le fichier index
import { cleanupPendingUsersJob, purgeUsersJob } from "@@/services/crons";

// Récupère la clé API de l'environnement
// IMPORTANT : Assure-toi que cette variable d'environnement est définie sur Vercel et dans ton .env.local
const CRON_API_KEY = process.env.CRON_API_KEY;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ route: string[] }> }
) {
  const { route } = await params;
  try {
    // --- DÉBUT DE LA VÉRIFICATION DE LA CLÉ API ---
    // 1. Récupère l'en-tête d'autorisation
    const authorizationHeader = request.headers.get("Authorization");

    // 2. Vérifie sa présence et son format (doit commencer par 'Bearer ')
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      // Si l'en-tête est manquant ou mal formaté, refuse l'accès
      throw new CustomError(
        "En-tête d'autorisation manquant ou mal formaté.",
        401
      ); // Unauthorized
    }

    // 3. Extrait la clé API fournie par le client
    const providedKey = authorizationHeader.split(" ")[1];

    // 4. Compare la clé fournie avec la clé secrète configurée dans tes variables d'environnement
    // Si la clé n'est pas définie (erreur de config) ou ne correspond pas, refuse l'accès
    if (!CRON_API_KEY || providedKey !== CRON_API_KEY) {
      throw new CustomError("Clé API de cron invalide.", 403); // Forbidden
    }
    // --- FIN DE LA VÉRIFICATION DE LA CLÉ API ---

    // Le reste de la logique de ta route API ne sera exécuté que si la clé est valide
    const routePath = route.join("/");

    switch (routePath) {
      case "cleanup-pending-users":
        await cleanupPendingUsersJob();
        return NextResponse.json(
          { message: "Nettoyage des utilisateurs en attente déclenché." },
          { status: 200 }
        );
      case "purge-users":
        await purgeUsersJob();
        return NextResponse.json(
          { message: "Nettoyage des utilisateurs supprimés déclenché." },
          { status: 200 }
        );
      default:
        throw new CustomError(
          `POST: Tâche cron non trouvée pour /api/cron/${routePath}`,
          404
        );
    }
  } catch (error: unknown) {
    // Gestion centralisée des erreurs via handleApiError
    return handleApiError(error);
  }
}

// Les méthodes GET, PUT, DELETE renvoient toujours 405 Method Not Allowed
// pour les routes cron, car elles ne sont pas destinées à ces opérations.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ route: string[] }> }
) {
  const { route } = await params;

  const routePath = route.join("/");

  return handleApiError(
    new CustomError(
      `GET: Méthode non autorisée pour la tâche cron: /api/cron/${routePath}`,
      405
    )
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ route: string[] }> }
) {
  const { route } = await params;
  try {
    const routePath = route.join("/");

    throw new CustomError(
      `PUT: Méthode non autorisée pour la tâche cron: /api/cron/${routePath}`,
      405
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ month: string[] }> }
) {
  const { month } = await params;

  try {
    const routePath = month.join("/");
    throw new CustomError(
      `DELETE: Méthode non autorisée pour la tâche cron: /api/cron/${routePath}`,
      405
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
