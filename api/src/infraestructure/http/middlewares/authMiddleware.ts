import { NextFunction, Request, Response } from "express";
import { jwtTokenValidator } from "../../../utils/jwtTokenHelper";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.signedCookies["jwt"];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwtTokenValidator(token);
    if (!decoded) {
      return res.status(401).json({ msg: "INVALID_TOKEN" });
    }
    req.auth = decoded.data;
    next();
  } catch (err) {
    return res
      .cookie("jwt", "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        domain: process.env.NODE_ENV === "production"
          ? process.env.COOKIE_DOMAIN
          : "undefined",
        maxAge: 0,
      })
      .status(401)
      .json({ msg: "Unauthorized" });
  }
}
