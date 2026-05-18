import jwt from "jsonwebtoken";
import type { AuthUser } from "../types/domain.js";

const expiresIn = "8h";

export function signToken(user: AuthUser): string {
  return jwt.sign(user, getJwtSecret(), { expiresIn });
}

export function verifyToken(token: string): AuthUser {
  return jwt.verify(token, getJwtSecret()) as AuthUser;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 16) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET must be set to a strong value in production.");
    }

    return "development-gw-certify-secret";
  }

  return secret;
}
