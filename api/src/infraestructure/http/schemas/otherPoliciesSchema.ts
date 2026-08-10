import { ParamSchema } from "express-validator";

const quietHoursFrom: ParamSchema = {
  in: ["body"],
  trim: true,
  matches: {
    options: [/^([01]\d|2[0,3]):([0,5]\d)$/],  // HH:mm format validation
    errorMessage: "INVALID_QUIET_HOUR_FROM_FORMAT",
  },
};

const quietHoursUntil: ParamSchema = {
  in: ["body"],
  trim: true,
  matches: {
    options: [/^([0,1]\d|2[0,3]):([0,5]\d)$/],
    errorMessage: "INVALID_QUIET_HOURS_UNTIL_FORMAT",
  },
};

const hasSmookingAreas: ParamSchema = {
  in: ["body"],
  isBoolean: {
    bail: true,
    errorMessage: "SMOOKING_AREAS_MUST_BE_BOOLEAN",
  },
  toBoolean: true,
};

const allowExternalGuest: ParamSchema = {
  in: ["body"],
  isBoolean: {
    bail: true,
    errorMessage: "ALLOW_EXTERNAL_GUEST_MUST_BE_BOOLEAN",
  },
  toBoolean: true
};

const allowPets: ParamSchema = {
  in: ["body"],
  isBoolean: {
    bail: true,
    errorMessage: "ALLOW_PETS_MUST_BE_BOOLEAN",
  },
  toBoolean: true
};

export const otherPoliciesSchema = {
  quietHoursFrom: quietHoursFrom,
  quietHoursUntil: quietHoursUntil,
  hasSmookingAreas: hasSmookingAreas,
  allowExternalGuest: allowExternalGuest,
  allowPets: allowPets
}
