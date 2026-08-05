import express, { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";
import { loginSchema } from "../schemas/userSchema";
import { validateRequest } from "../middlewares/validateRequest";
import rateLimit from "express-rate-limit";
import { Pool } from "pg";
import { EmailService } from "../../../services/EmailService";
import { requestContextMiddleware } from "../middlewares/requestContextMiddleware";


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attemps from this ip, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});



export function createUserRouter(pool: Pool, emailService: EmailService) {
  const router = express.Router();

  router.post(
    "/auth/",
    loginLimiter,
    checkSchema(loginSchema),
    validateRequest,
    requestContextMiddleware(pool, emailService),
    (req: Request, res: Response, next: NextFunction) => {
      req.context.userController.authUser(req, res, next)
    });


  return router;

}
