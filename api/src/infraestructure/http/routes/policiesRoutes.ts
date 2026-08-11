import express, { Request, Response, NextFunction } from "express";
import { checkSchema } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Pool } from "pg";
import { EmailService } from "../../../services/EmailService";
// Schemas
import { generalPoliciesSchema } from "../schemas/generalPoliciesSchema";
import { minorPoliciesSchema } from "../schemas/minorPoliciesSchema";
import { otherPoliciesSchema } from "../schemas/otherPoliciesSchema";
import { requestContextMiddleware } from "../middlewares/requestContextMiddleware";
import { paymentPoliciesSchema } from "../schemas/paymentPoliciesSchema";


export function createPoliciesRoute(pool: Pool, emailService: EmailService) {
  const router = express.Router();

  router.post("/general-policies",
    authMiddleware,
    checkSchema(generalPoliciesSchema),
    validateRequest,
    requestContextMiddleware(pool, emailService),
    (req: Request, res: Response, next: NextFunction) =>
      req.context.policiesController.saveOrUpdateGeneralPolicies(req, res, next)
  );

  router.post("/minor-policies",
    authMiddleware,
    checkSchema(minorPoliciesSchema),
    validateRequest,
    requestContextMiddleware(pool, emailService),
    (req: Request, res: Response, next: NextFunction) =>
      req.context.policiesController.saveOrUpdateMinorPolicies(req, res, next)
  );

  router.post("/other-policies",
    authMiddleware,
    checkSchema(otherPoliciesSchema),
    validateRequest,
    requestContextMiddleware(pool, emailService),
    (req: Request, res: Response, next: NextFunction) =>
      req.context.policiesController.saveOrUpdateOtherPolicies(req, res, next)
  );

  router.post("/payment-policies",
    authMiddleware,
    checkSchema(paymentPoliciesSchema),
    validateRequest,
    requestContextMiddleware(pool, emailService),
    (req: Request, res: Response, next: NextFunction) =>
      req.context.policiesController.saveOrUpdatePaymentPolicies(req, res, next)
  )



  return router;
}
