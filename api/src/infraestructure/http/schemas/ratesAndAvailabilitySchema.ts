import { ParamSchema } from "express-validator";

const roomTypeId: ParamSchema = {
  in: ["body"],
  isInt: {
    bail: true,
    options: { min: 1 },
    errorMessage: "INVALID_ROOM_TYPE_ID"
  },
  toInt: true
};

const date: ParamSchema = {
  in: ["body"],
  isISO8601: {
    bail: true,
    errorMessage: "INVALID_DATE_FORMAT"
  }
}

const customRate: ParamSchema = {
  in: ["body"],
  isDecimal: {
    bail: true,
    options: {
      decimal_digits: "2",
      force_decimal: true,
    },
    errorMessage: "INVALID_RATE_FORMAT"
  }
}

const roomsToSell: ParamSchema = {
  in: ["body"],
  isInt: {
    bail: true,
    options: {
      min: 0
    }
  },
  toInt: true
}

export const ratesAndAvailabilitySchema = {
  roomTypeId: roomTypeId,
  date: date,
  customRate: customRate,
  roomsToSell: roomsToSell
}
