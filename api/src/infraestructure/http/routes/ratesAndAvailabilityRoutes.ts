import express, { Response, Request, NextFunction } from "express";
import { checkSchema } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";
import { requestContextMiddleware } from "../middlewares/requestContextMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

import { ratesAndAvailabilitySchema } from "../schemas/ratesAndAvailabilitySchema";
import { Pool } from "pg";
import { EmailService } from "../../../services/EmailService";

export function createRatesAndAvailabilityRoutes(pool: Pool, emailService: EmailService) {
  const router = express.Router();

  router.post("/create",
    authMiddleware,
    checkSchema(ratesAndAvailabilitySchema),
    validateRequest,
    requestContextMiddleware(pool, emailService),
    (req: Request, res: Response, next: NextFunction) =>
      req.context.ratesAndAvailabilityController.createOrUpdate(req, res, next)

  )



  return router
}
