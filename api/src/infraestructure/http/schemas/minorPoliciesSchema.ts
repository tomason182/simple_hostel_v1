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

const minorsRoomTypes: ParamSchema = {
  in: ["body"],
  isIn: {
    options: [["all_rooms", "only_private", "only_dorms"]],
    errorMessage: "MINORS_ROOM_TYPE_MUST_BE_ALL_ROOMS_ONLY_PRIVATE_OR_ONLY_DORMS",
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
  minorsRoomTypes: minorsRoomTypes,
  minorAdultSupervision: minorAdultSupervision,
  minChildAge: minChildAge,
  freeStayAge: freeStayAge
}

