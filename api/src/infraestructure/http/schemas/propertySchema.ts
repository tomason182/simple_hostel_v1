import { ParamSchema } from "express-validator";

export const propertyNameValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  isString: {
    bail: true,
    errorMessage: "Property description must be a string",
  },
  exists: {
    bail: true,
    errorMessage: "Property description must be provided"
  },
  notEmpty: {
    bail: true,
    errorMessage: "Property description must be provided"
  },
  isLength: {
    options: {
      min: 1,
      max: 255
    },
    errorMessage: "Property description must be under 255 characters"
  }
}

