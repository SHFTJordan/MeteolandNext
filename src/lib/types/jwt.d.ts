declare interface SupabaseJWTPayload {
  sub: string;
  email?: string;
  role?: string;
  iss?: string;
  aud?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

declare interface AuthenticatedUserPayload extends SupabaseJWTPayload {
  username?: string;
  accessToken?: string;
}