import { AppError } from "./AppError";

export interface ValidationIssue {
  field: string;
  code: string;
}

export class ValidationError extends AppError {
  constructor(
    public readonly errors: ValidationIssue[]
  ) {
    super("Validation failed", 400, "VALIDATION_ERROR")
  }
}
