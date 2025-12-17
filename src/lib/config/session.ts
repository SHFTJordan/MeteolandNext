import { getIronSession, SessionOptions, IronSessionData } from "iron-session";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET is not defined in environment variables. It must be at least 32 characters long."
  );
}
if (process.env.SESSION_SECRET.length < 32) {
  console.warn(
    "SESSION_SECRET est trop court ! Il est recommandé d'utiliser une chaîne d'au moins 32 caractères pour la sécurité."
  );
}
if (!process.env.COOKIE_NAME) {
  throw new Error("COOKIE_NAME is not defined in environment variables.");
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: process.env.COOKIE_NAME as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
  },
};

export default async function getSession(req:NextRequest,res:NextResponse) {
  return getIronSession<IronSessionData>(req,res,sessionOptions)
}
