import express, { Request, Response, NextFunction } from "express";
import { Pool } from "pg";
import { EmailService } from "../../../services/EmailService";
import { checkSchema } from "express-validator";
import { contactInfoSchema } from "../schemas/contactInfoSchema";
import { validateRequest } from "../middlewares/validateRequest";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requestContextMiddleware } from "../middlewares/requestContextMiddleware";

export function createPropertyRoutes(pool: Pool, emailService: EmailService) {
  const router = express.Router();


  router.post("/contact-info",
    authMiddleware,
    checkSchema(contactInfoSchema),
    validateRequest,
    requestContextMiddleware(pool, emailService),
    (req: Request, res: Response, next: NextFunction) =>
      req.context.propertyController.saveOrUpdateContactInfo(req, res, next)
  )


  return router;


}
