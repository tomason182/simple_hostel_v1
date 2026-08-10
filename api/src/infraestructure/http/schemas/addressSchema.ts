import { ParamSchema } from "express-validator";

const houseNumber: ParamSchema = {
  in: ["body"],
  trim: true,
  notEmpty: {
    bail: true,
    errorMessage: "HOUSE_NUMBER_REQUIRED"
  },
  exists: {
    bail: true,
    errorMessage: "HOUSE_NUMBER_REQUIRED"
  },
  isString: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: "HOUSE_NUMBER_MAX_LENGTH_100"
  }
}

const street: ParamSchema = {
  in: ["body"],
  trim: true,
  notEmpty: {
    bail: true,
    errorMessage: "STREET_MUST_BE_PROVIDED"
  },
  exists: {
    bail: true,
    errorMessage: "STREET_MUST_BE_PROVIDED"
  },
  isString: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: "STEET_MAX_LENGTH_100"
  }
}

const city: ParamSchema = {
  in: ["body"],
  trim: true,
  notEmpty: {
    bail: true,
    errorMessage: "CITY_MUST_BE_PROVIDED"
  },
  exists: {
    bail: true,
    errorMessage: "CITY_MUST_BE_PROVIDED"
  },
  isString: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: "CITY_MAX_LENGTH_100"
  }
}

const postalCode: ParamSchema = {
  in: ["body"],
  trim: true,
  notEmpty: {
    bail: true,
    errorMessage: "POSTAL_CODE_REQUIRED",
  },
  isLength: {
    options: {
      min: 3,
      max: 12,
    },
    bail: true,
    errorMessage: "INVALID_POSTAL_CODE",
  },
  matches: {
    options: /^[A-Za-z0-9][A-Za-z0-9 -]*$/,
    errorMessage: "INVALID_POSTAL_CODE",
  },
}

const state: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "STATE_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "STATE_MUST_BE_PROVIDED",
  },
  isLength: {
    options: {
      min: 1,
      max: 255
    },
    errorMessage: "STATE_MAX_LENGTH_255"
  },

}

const country: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "COUNTRY_MUST_BE_PROVIDED",
  },
  isString: true,
  isLength: {
    options: {
      min: 1,
      max: 56
    },
    errorMessage: " COUNTRY_MAX_LENGHT_56",
  },
}

const alpha2code: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "APHA_2_CODE_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "APHA_2_CODE_MUST_BE_PROVIDED",
  },
  isISO31661Alpha2: {
    errorMessage: "INVALID_ALPHA_2_CODE",
  },
  customSanitizer: {
    options: value => value.toLowerCase()
  }
}

const lat: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "LATITUDE_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "LATITUDE_MUST_BE_PROVIDED",
  },
  isDecimal: {
    options: {
      force_decimal: false,
      decimal_digits: "6",
    },
    errorMessage: "LATITUDE_LENGTH_6_DIGITS",
  },
};

const lon: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "LONGITUDE_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "LONGITUDE_MUST_BE_PROVIDED",
  },
  isDecimal: {
    options: {
      force_decimal: false,
      decimal_digits: "6"
    },
    errorMessage: "LONGITUDE_LENGTH_6_DIGITS"
  }
}

const osmId: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "OSMID_MUST_BE_PROVIDED",
  },
  isLength: {
    options: {
      min: 1,
      max: 20
    },
  },
}

export const addressSchema = {
  houseNumber: houseNumber,
  street: street,
  city: city,
  postalCode: postalCode,
  state: state,
  country: country,
  alpha2code: alpha2code,
  lat: lat,
  lon: lon,
  osmId: osmId
}
