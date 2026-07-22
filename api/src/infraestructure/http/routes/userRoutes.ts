import express, { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";
import { registrationSchema, loginSchema } from "../schemas/userSchema";
import { validateRequest } from "../middlewares/validateRequest";
import rateLimit from "express-rate-limit";
import { Pool } from "pg";
import { UnitOfWork } from "../../transactions/UnitOfWork";
import { EmailService } from "../../../services/EmailService";
import { RequestContext } from "../../../setup/requestContext";



const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attemps from this ip, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too may registration attemps from this ip, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,

});

export function createUserRouter(pool: Pool, emailService: EmailService) {

  const router = express.Router();

  router.use((req: Request, res: Response, next: NextFunction) => {
    const uow = new UnitOfWork(pool);

    req.context = new RequestContext(uow, emailService);

    next();
  })

  router.post(
    "/auth/",
    loginLimiter,
    checkSchema(loginSchema),
    validateRequest,
    (req: Request, res: Response, next: NextFunction) => {
      req.context.userController.authUser(req, res, next)
    });

  router.post(
    "/create-account/",
    registerLimiter,
    checkSchema(registrationSchema),
    validateRequest,
    (req: Request, res: Response, next: NextFunction) => {
      req.context.accountController.createAccount(req, res, next)
    })

  return router;

}
