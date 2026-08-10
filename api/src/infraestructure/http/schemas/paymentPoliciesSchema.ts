import { ParamSchema } from "express-validator";

const advancePaymentRequired: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "ADVANCE_PAYMENT_REQUIRED_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "ADVANCE_PAYMENT_REQUIRED_MUST_BE_PROVIDED",
  },
  isBoolean: {
    bail: true,
    errorMessage: "ADVANCE_PAYMENT_REQUIRED_MUST_BE_BOOLEAN",
  },
};

const depositAmount: ParamSchema = {
  in: ["body"],
  trim: true,
  isFloat: {
    bail: true,
    options: { min: 0, max: 1 },
    errorMessage: "DEPOSIT_AMOUNT_MUST_BE_FLOAT_NUMBER_0_TO_1",
  },
};

export const paymentPoliciesSchema = {
  advancePaymentRequired: advancePaymentRequired,
  depositAmount: depositAmount
}
