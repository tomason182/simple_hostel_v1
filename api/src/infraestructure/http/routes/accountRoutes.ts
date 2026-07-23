import express, { Request, Response, NextFunction } from "express";
import { checkSchema, param } from "express-validator";
import { createAccountSchema, resendEmailSchema } from "../schemas/accountSchema";
import { validateRequest } from "../middlewares/validateRequest";
import rateLimit from "express-rate-limit";

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too may registration attemps from this ip, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});


export function createAccountRoutes() {
  const router = express.Router();

  // 1. createAccount
  router.post(
    "/create-account/",
    registerLimiter,
    checkSchema(createAccountSchema),
    validateRequest,
    (req: Request, res: Response, next: NextFunction) => {
      req.context.accountController.createAccount(req, res, next)
    });

  // 2. validateAccount
  router.get("/validate-account/:token",
    param("token").isJWT().withMessage("Invalid JWT token"),
    validateRequest,
    (req: Request, res: Response, next: NextFunction) => {
      req.context.accountController.validateAccount(req, res, next)
    });

  // 3. resend validation email.
  router.post("/resend-validation-email",
    checkSchema(resendEmailSchema),
    validateRequest,
    (req: Request, res: Response, next: NextFunction) => {
      req.context.accountController.resendValidationEmail(req, res, next)
    });

  return router;
}
