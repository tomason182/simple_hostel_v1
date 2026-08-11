import { ParamSchema } from "express-validator";

const daysBeforArrival: ParamSchema = {
  in: ["body"],
  trim: true,
  isInt: {
    bail: true,
    options: { min: 0 },
    errorMessage: "DAYS_BEFORE_ARRIVAL_MUST_BE_INTEGER"
  },
  toInt: true,
}

const amountRefund: ParamSchema = {
  in: ["body"],
  trim: true,
  isFloat: {
    bail: true,
    options: {
      min: 0,
      max: 1
    },
    errorMessage: "REFUND_AMOUNT_MUST_BE_BETWEEN_0_AND_1"
  },
  toFloat: true
}


export const cancellationPoliciesSchema = {
  daysBeforArrival: daysBeforArrival,
  amountRefund: amountRefund
}
