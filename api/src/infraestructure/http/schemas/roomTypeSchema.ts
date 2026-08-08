import { ParamSchema } from "express-validator";
import { Gender, RoomTypeLiteral } from "../../../domain/entities/RoomTypes";

const roomTypeLiteral: RoomTypeLiteral[] = ["PRIVATE", "DORM"]
const gender: Gender[] = ["MIXED", "MALE", "FEMALE"];


const descriptionValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  isString: {
    bail: true,
    errorMessage: "Description must be a string"
  },
  exists: {
    bail: true,
    errorMessage: "Description must be provided"
  },
  notEmpty: {
    bail: true,
    errorMessage: "Description must be provided"
  },
  isLength: {
    options: {
      min: 1,
      max: 255
    },
    errorMessage: "RoomType description max lenght is 255 characters"
  }
}

const typeValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "Type must be provided"
  },
  isIn: {
    options: [roomTypeLiteral],
    errorMessage: "Room type must be private or dorm"
  }
}

const genderValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "Gender must be provided"
  },
  isIn: {
    options: [gender],
    errorMessage: "RoomType gender must be one of mixed, male or female"
  }
}

const maxOccupancyValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "maxOccupancy must be provided"
  },
  isInt: {
    options: [{ min: 1 }],
    errorMessage: "maxOccupancy must be positive integer"
  }
}

const inventoryValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "Inventory must be provided"
  },
  isInt: {
    options: [{ min: 1 }],
    errorMessage: "Inventory must be positive integer"
  }
}

export const roomTypeSchema = {
  description: descriptionValidator,
  type: typeValidator,
  gender: genderValidator,
  maxOccupancy: maxOccupancyValidator,
  inventory: inventoryValidator
}
