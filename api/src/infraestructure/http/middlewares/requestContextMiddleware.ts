import { NextFunction, Request, Response } from "express";
import { EmailService } from "../../../services/EmailService";
import { UnitOfWork } from "../../transactions/UnitOfWork";
import { RequestContext } from "../../../setup/requestContext";
import { Pool } from "pg";

export function requestContextMiddleware(pool: Pool, emailService: EmailService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const uow = new UnitOfWork(pool);

    req.context = new RequestContext(uow, emailService);

    next();
  }
}
