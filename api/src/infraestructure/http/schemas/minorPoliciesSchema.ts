import { ParamSchema } from "express-validator";

const minCheckInAge: ParamSchema = {
  in: ["body"],
  isInt: {
    bail: true,
    options: { min: 0 },
    errorMessage: "MIN_CHECK_IN_AGE_MUST_BE_GREATER_OR_EQUAL_TO_ZERO",
  },
  toInt: true,
};

const acceptChildren: ParamSchema = {
  in: ["body"],
  isBoolean: {
    bail: true,
    errorMessage: "ACCEPT_CHILDREN_MUST_BE_BOOLEAN"
  },
  toBoolean: true
};

const minorRoomTypes: ParamSchema = {
  in: ["body"],
  isIn: {
    options: [["all_rooms", "only_private", "only_dorms"]],
    errorMessage: "INVALID_MINOR_ROOM_TYPES",
  },

}

const minorAdultSupervision: ParamSchema = {
  in: ["body"],
  isBoolean: {
    bail: true,
    errorMessage: "MINOR_ADULT_SUPERVISION_MUST_BE_BOOLEAN"
  },
  toBoolean: true
};

const minChildAge: ParamSchema = {
  in: ["body"],
  isInt: {
    bail: true,
    options: { min: 0 },
    errorMessage: "MIN_CHILD_AGE_MUST_BE_GREATER_OR_EQUAL_TO_ZERO",
  },
  toInt: true
};

const freeStayAge: ParamSchema = {
  in: ["body"],
  isInt: {
    bail: true,
    options: { min: 0 },
    errorMessage: "FREE_STAY_AGE_MUST_BE_GREATER_OR_EQUAL_TO_ZERO",
  },
  toInt: true,
};

export const minorPoliciesSchema = {
  minCheckInAge: minCheckInAge,
  acceptChildren: acceptChildren,
  minorRoomTypes: minorRoomTypes,
  minorAdultSupervision: minorAdultSupervision,
  minChildAge: minChildAge,
  freeStayAge: freeStayAge
}

