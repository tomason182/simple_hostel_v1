import { JwtPayload, sign, verify } from "jsonwebtoken";

interface AccessTokenPayload extends JwtPayload {
  data: {
    id: number,
    // otros campos.
  }
}


export function jwtTokenGenerator(data: object, expirationTimeSeg: number): string {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }

  const payload = {
    sub: data,
  };

  const token: string = sign(payload, jwtSecret, { expiresIn: expirationTimeSeg });

  return token
}

export function jwtTokenValidator(token: string): AccessTokenPayload | false {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }

  try {
    const decoded = verify(token, jwtSecret) as AccessTokenPayload;
    return decoded;
  } catch (err) {
    return false;
  }
}
