export interface ValidationIssue {
  field: string;
  code: string;
}

export type ValidationErrors = Record<string, string>;


export class ApiError extends Error {
  public readonly code: string;
  public readonly errors?: ValidationIssue[]
  constructor(
    code: string,
    errors?: ValidationIssue[]
  ) {
    super(code);
    this.name = "ApiError";
    this.code = code;
    this.errors = errors;
  }
}
