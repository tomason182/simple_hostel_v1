import { ParamSchema } from "express-validator";

const baseCurrency: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "BASE_CURRENCY_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "BASE_CURRENCY_MUST_BE_PROVIDED",
  },
  isLength: {
    bail: true,
    options: {
      min: 1,
      max: 3
    },
  },
  customSanitizer: {
    options: value => value.toLowerCase(),
  }
}

const paymentCurrency: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "PAYMENT_CURRENCY_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "PAYMENT_CURRENCY_MUST_BE_PROVIDED",
  },
  isLength: {
    bail: true,
    options: {
      min: 1,
      max: 3
    },
  },
  customSanitizer: {
    options: value => value.toLowerCase()
  }
}


export const currenciesSchema = {
  baseCurrency: baseCurrency,
  paymentCurrency: paymentCurrency
}
