import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../domain/entities/AccessControl";
import { AppError } from "../errors/AppError";

export interface AccessTokenPayload extends JwtPayload {
  data: {
    id: number,
    propertyId: number,
    role: UserRole
    // otros campos.
  }
}


export function jwtTokenGenerator(data: object, expirationTimeSeg: number): string {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new AppError("JWT_SECRET environment variable is not defined", 400, "JWT_SECRET_ERROR");
  }

  const payload = {
    data,
  };

  try {

    const token: string = jwt.sign(payload, jwtSecret, { expiresIn: expirationTimeSeg });

    return token
  } catch (e) {
    throw new AppError("error_nose", 500, "NO_se")

  }


}

export function jwtTokenValidator(token: string): AccessTokenPayload | false {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as AccessTokenPayload;
    return decoded;
  } catch (err) {
    return false;
  }
}
