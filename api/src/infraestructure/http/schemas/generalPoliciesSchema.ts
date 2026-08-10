import { ParamSchema } from "express-validator";

const minLengthOfStay: ParamSchema = {
  in: ["body"],
  trim: true,
  isInt: {
    bail: true,
    options: { min: 1 },
    errorMessage: "MIN_LENGTH_STAY_MUST_BE_POSITIVE_INT"
  },
  toInt: true,
};

const maxLengthOfStay: ParamSchema = {
  in: ["body"],
  trim: true,
  isInt: {
    bail: true,
    options: { min: 0 },
    errorMessage: "MAX_LENGTH_STAY_MUST_BE_GREATER_OR_EQUAL_TO_ZERO"
  },
  toInt: true,
};

const minAdvanceBooking: ParamSchema = {
  in: ["body"],
  trim: true,
  isInt: {
    bail: true,
    options: { min: 0 },
    errorMessage: "MIN_ADVANCE_BOOKING_MUST_BE_GREATER_OR_EQUAL_TO_ZERO",
  },
  toInt: true,
};

const checkInFrom: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "CHECK_IN_FROM_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "CHECK_IN_FROM_MUST_BE_PROVIDED",
  },
  isTime: {
    bail: true,
    errorMessage: "CHECK_IN_FROM_INVALID_TIME_FORMAT",
  },
};

const checkInUntil: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "CHECK_IN_UNTIL_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "CHECK_IN_UNTIL_MUST_BE_PROVIDED",
  },
  isTime: {
    bail: true,
    errorMessage: "CHECK_IN_UNTIL_INVALID_TIME_FORMAT",
  },
};

const checkOutFrom: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "CHECK_OUT_FROM_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "CHECK_OUT_FROM_MUST_BE_PROVIDED",
  },
  isTime: {
    bail: true,
    errorMessage: "CHECK_OUT_FROM_INVALID_TIME_FORMAT",
  },
};

const checkOutUntil: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "CHECK_OUT_UNTIL_MUST_BE_PROVIDED",
  },
  notEmpty: {
    bail: true,
    errorMessage: "CHECK_OUT_UNTIL_MUST_BE_PROVIDED",
  },
  isTime: {
    bail: true,
    errorMessage: "CHECK_OUT_UNTIL_INVALID_TIME_FORMAT",
  },
};

export const generalPoliciesSchema = {
  minLengthOfStay: minLengthOfStay,
  maxLengthOfStay: maxLengthOfStay,
  minAdvanceBooking: minAdvanceBooking,
  checkInfrom: checkInFrom,
  checkInUntil: checkInUntil,
  checkOutFrom: checkOutFrom,
  checkOutUntil: checkOutUntil
}


