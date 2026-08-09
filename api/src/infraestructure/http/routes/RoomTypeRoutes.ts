import express, { Request, Response, NextFunction } from "express";
import { checkSchema, param } from "express-validator";
import { roomTypeSchema } from "../schemas/roomTypeSchema";

import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { requestContextMiddleware } from "../middlewares/requestContextMiddleware";

import { Pool } from "pg";
import { EmailService } from "../../../services/EmailService";


export function createRoomTypeRoutes(pool: Pool, emailService: EmailService) {
  const router = express.Router();

  // 1. Create RoomType
  router.post(
    "/create",
    checkSchema(roomTypeSchema),
    validateRequest,
    requestContextMiddleware(pool, emailService),
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
      req.context.roomTypeController.createRoomType(req, res, next)
    });


  // 2. Get all room types
  router.get(
    "/all/:id",
    param("id").isInt().withMessage("Property id must be integer."),
    validateRequest,
    requestContextMiddleware(pool, emailService),
    (req: Request, res: Response, next: NextFunction) => {
      req.context.roomTypeController.getAll(req, res, next)
    }
  )

  return router;

}


