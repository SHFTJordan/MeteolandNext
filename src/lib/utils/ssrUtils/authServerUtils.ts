// src/lib/authServerUtils.ts

import { headers, cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifySessionJWT } from "./";
interface ServerAuthResult {
  isAuthenticated: boolean;
  user: {
    id: string;
    email?: string;
    username?: string;
  } | null;
}

export async function getAuthenticatedUserServerSide(): Promise<ServerAuthResult> {
  try {
    const response = new NextResponse();
    const requestHeadersInstance = headers();
    const requestCookiesInstance = cookies();

    const headersForNextRequest = new Headers(await requestHeadersInstance);

    const cookiesMap = new Map<string, string>();
    (await requestCookiesInstance)
      .getAll()
      .forEach((cookie: { name: string; value: string }) => {
        cookiesMap.set(cookie.name, cookie.value);
      }
    );

    const dummyRequest = new NextRequest(new URL("http://localhost"), {
      headers: headersForNextRequest,
      // @ts-expect-error : Toujours nécessaire car 'cookies' n'est pas dans RequestInit standard
      cookies: cookiesMap,
    });

    const userPayload = await verifySessionJWT(dummyRequest, response);
    return {
      isAuthenticated: true,
      user: {
        id: userPayload.sub,
        email: userPayload.email,
        username: userPayload.username ?? undefined,
      },
    };
  } catch (error) {
    console.error(
      "Erreur d'authentification côté serveur (getAuthenticatedUserServerSide):",
      error
    );
    return {
      isAuthenticated: false,
      user: null,
    };
  }
}
