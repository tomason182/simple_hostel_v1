import express, { Request, Response, NextFunction } from "express";
import { Pool } from "pg";
import { EmailService } from "../../../services/EmailService";

export function createPropertyRoutes(pool: Pool, emailService: EmailService) {
  const router = express.Router();


}
