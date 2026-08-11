import express, { Request, Response, NextFunction } from "express";
import { Pool } from "pg";
import { EmailService } from "../../../services/EmailService";

import { checkSchema } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { requestContextMiddleware } from "../middlewares/requestContextMiddleware";

import { guestSchema } from "../schemas/guestSchema";

export function createGuestRoutes(pool: Pool, emailService: EmailService) {
  const router = express.Router();

  router.put("/update",
    authMiddleware,
    checkSchema(guestSchema),
    validateRequest,
    requestContextMiddleware(pool, emailService),
    (req: Request, res: Response, next: NextFunction) =>
      req.context.guestController.updateGuest(req, res, next)
  )

  return router;
}
