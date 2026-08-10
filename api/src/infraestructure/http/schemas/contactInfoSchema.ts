import { ParamSchema } from "express-validator";

const emailValidator: ParamSchema = {
  in: ["body"],
  isEmail: {
    errorMessage: "INVALID_EMAIL",
  },
  normalizeEmail: true,
};

const phoneWhatsappCode: ParamSchema = {
  in: ["body"],
  isNumeric: {
    bail: true,
    errorMessage: "INVALID_WHATSAPP_CODE",
  },
  isLength: {
    options: { min: 1, max: 4 },
  },
}

const phoneCallsCode: ParamSchema = {
  in: ["body"],
  isNumeric: {
    bail: true,
    errorMessage: "INVALID_CALL_CODE",
  },
  isLength: {
    options: { min: 1, max: 4 },
  },
}

const phoneWhatsapp: ParamSchema = {
  in: ["body"],
  isNumeric: {
    bail: true,
    errorMessage: "INVALID_WHATSAPP_NUMER_numeric",
  },
  isLength: {
    options: { min: 6, max: 15 },
    errorMessage: "INVALID_WHATSAPP_NUMER_length",
  }
}

const phoneCalls: ParamSchema = {
  in: ["body"],
  isNumeric: {
    bail: true,
    errorMessage: "INVALID_CALLS_NUMBER",
  },
  isLength: {
    options: { min: 6, max: 15 },
    errorMessage: "INVALID_CALLS_NUMER",
  }
}

export const contactInfoSchema = {
  email: emailValidator,
  phoneWhatsappCode: phoneWhatsappCode,
  phoneCallsCode: phoneCallsCode,
  phoneWhatsapp: phoneWhatsapp,
  phoneCalls: phoneCalls
}

