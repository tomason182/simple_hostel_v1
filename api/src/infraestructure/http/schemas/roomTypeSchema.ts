import { ParamSchema } from "express-validator"

const roomTypeDescriptionValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  isString: {
    bail: true,
    errorMessage: "Description must be a string"
  },
  exists: {
    bail: true,
    errorMessage: "Description must be provided"
  }
}


