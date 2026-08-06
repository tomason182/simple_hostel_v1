import { NextFunction, Request, Response } from "express";
import { validationResult, type FieldValidationError } from "express-validator";
import { ValidationError, ValidationIssue } from "../../../errors/ValidationError";

export function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req).array();

  if (!errors.length) {

    return next();
  }

  const issues: ValidationIssue[] = errors.map(err => {
    const fieldError = err as FieldValidationError;


    return {
      field: fieldError.path,
      code: fieldError.msg
    }
  })


  throw new ValidationError(issues);

}
