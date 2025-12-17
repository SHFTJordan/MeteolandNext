import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@@/config";
import { CustomError } from "./";
import * as jose from 'jose';

export default async function verifySessionJWT(
  request: NextRequest,
  response:NextResponse
): Promise<AuthenticatedUserPayload> {
  const session = await getSession(request, response);
  const sessionToken = session.accessToken;
  const sessionUsername = session.username;
  if (!sessionToken) {
    throw new CustomError("Non authentifié : token manquant", 401);
  }

  try {
    const {payload} = await jose.jwtVerify(
      sessionToken,
      new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET as string)
    );

    const decoded = payload as SupabaseJWTPayload;

    if (!decoded.sub) {
      throw new CustomError(
        "Token JWT incomplet : ID utilisateur (sub) manquant.",
        401
      );
    }

    const finalPayload: AuthenticatedUserPayload = {
      ...decoded,
      username: sessionUsername,
      accessToken: sessionToken,
    };
    return finalPayload;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    if (err instanceof jose.errors.JWTExpired) {
        console.error(`💥 Erreur JWT dans verifySessionJWTUtil: Token expiré.`);
        throw new CustomError(`Token JWT de session expiré.`, 401);
    } else if (err instanceof jose.errors.JWSInvalid) {
        console.error(`💥 Erreur JWT dans verifySessionJWTUtil: Signature invalide.`);
        throw new CustomError(`Signature JWT invalide.`, 401);
    } else if (err instanceof jose.errors.JWTClaimValidationFailed) {
        console.error(`💥 Erreur JWT dans verifySessionJWTUtil: Validation des claims échouée: ${errorMessage}.`);
        throw new CustomError(`Validation des claims JWT échouée: ${errorMessage}.`, 401);
    }
    console.error(`💥 Erreur JWT inattendue dans verifySessionJWTUtil: ${errorMessage}`);
    throw new CustomError(
      `Token JWT de session invalide ou inattendu : ${errorMessage}`,
      401
    );
  }
}
