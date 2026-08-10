import { ParamSchema } from "express-validator"

const firstName: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "FIRST_NAME_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "FIRST_NAME_MUST_BE_PROVIDED",
  },
  isString: true,
  isLength: {
    bail: true,
    options: {
      min: 1,
      max: 255,
    },
    errorMessage: "FIRST_NAME_MAX_LENGTH_255",
  }
};

const lastName: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "LAST_NAME_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "LAST_NAME_MUST_BE_PROVIDED",
  },
  isString: true,
  isLength: {
    bail: true,
    options: {
      min: 1,
      max: 255,
    },
    errorMessage: "LAST_NAME_MAX_LENGTH_255",
  },
};

const idNumber: ParamSchema = {
  in: ["body"],
  trim: true,
  optional: true,
  isLength: {
    options: {
      min: 1,
      max: 25
    }
  },
};

const email: ParamSchema = {
  in: ["body"],
  trim: true,
  notEmpty: {
    bail: true,
    errorMessage: "EMAIL_MUST_BE_PROVIDED",
  },
  exists: {
    bail: true,
    errorMessage: "EMAIL_MUST_BE_PROVIDED",
  },
  isEmail: {
    bail: true,
    errorMessage: "NOT_VALID_EMAIL",
  },
  normalizeEmail: true,
};

const phoneNumber: ParamSchema = {
  in: ["body"],
  trim: true,
  optional: true,
  isMobilePhone: {
    options: "any",
    errorMessage: "INVALID_MOVILE_PHONE",
  },
};

const city: ParamSchema = {
  in: ["body"],
  optional: true,
  trim: true,
  isLength: {
    options: {
      max: 255,
    },
    errorMessage: "CITY_MAX_LENGTH_255",
  },
};

const street: ParamSchema = {
  in: ["body"],
  optional: true,
  trim: true,
  isLength: {
    options: {
      max: 255
    }
  },
  errorMessage: "CITY_MAX_LENGTH_255",
};

const postalCode: ParamSchema = {
  in: ["body"],
  trim: true,
  optional: true,
  isPostalCode: {
    options: "any",
    errorMessage: "INVALID_POSTAL_CODE"
  }
};

const countryCode: ParamSchema = {
  in: ["body"],
  optional: true,
  isISO31661Alpha2: {
    errorMessage: "INVALID_COUNTRY_CODE"
  }
}


export const guestSchema = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  idNumber: idNumber,
  phoneNumber: phoneNumber,
  city: city,
  street: street,
  postalCode: postalCode,
  countryCode: countryCode
}

