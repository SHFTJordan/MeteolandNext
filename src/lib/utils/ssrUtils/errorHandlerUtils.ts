// @@/utils/handleApiError.util.ts
import { NextResponse } from 'next/server';
import { CustomError } from './'; // Importe ton CustomError
/**
 * Gère les erreurs dans les API Routes, logue l'erreur et renvoie une NextResponse appropriée.
 * @param error L'objet d'erreur capturé dans le bloc catch.
 * @returns Une instance de NextResponse avec le statut et le message d'erreur appropriés.
 */
export default function handleApiError(error: unknown): NextResponse {
  // Détermine le code de statut HTTP
  const statusCode = error instanceof CustomError ? error.statusCode : 500;
  // Détermine le message d'erreur
  const errorMessage = error instanceof Error ? error.message : String(error);

  // Log de l'erreur pour le débogage côté serveur
  console.error("💥 Erreur API:", error instanceof Error ? error.stack || errorMessage : error);

  // Retourne la réponse JSON avec l'erreur et les détails pour le développement
  return NextResponse.json({
    error: errorMessage,
    details: process.env.NODE_ENV === "development" && error instanceof Error ? error.stack : undefined,
  }, { status: statusCode });
}