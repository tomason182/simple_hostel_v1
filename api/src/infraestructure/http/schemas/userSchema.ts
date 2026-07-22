import { Schema, ParamSchema } from "express-validator";

const PASSWORD_RULES = {
  minLength: 8,
  minLowerCase: 1,
  minUpperCase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const usernameValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  isString: {
    bail: true,
    errorMessage: "username must be a string."
  },
  exists: {
    bail: true,
    errorMessage: "username must be provided."
  },
  notEmpty: {
    bail: true,
    errorMessage: "username must be provided.",
  },
  isEmail: {
    bail: true,
    errorMessage: "username must be an email.",
  },
  normalizeEmail: true,
  isLength: {
    options: {
      max: 255,
    },
    errorMessage: "username max length is 255 characters."
  },
};

const passwordValidator: ParamSchema = {
  in: ["body"],
  exists: {
    bail: true,
    errorMessage: "password must be provided."
  },
  isString: {
    bail: true,
    errorMessage: "password must be a string."
  },
  notEmpty: {
    bail: true,
    errorMessage: "password must be provided."
  },
  isStrongPassword: {
    options: PASSWORD_RULES,
    errorMessage: "password is to weak"
  },
  custom: {
    options: value => {
      if (/\s/.test(value)) {
        throw new Error("Password must not contain white spaces");
      }
      return true;
    },
  },
};

const loginPasswordValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "Password is required."
  },
  notEmpty: {
    bail: true,
    errorMessage: "Password is required."
  },
  isString: {
    bail: true,
    errorMessage: "Password must be a string."
  },
};

const firstNameValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "First name must be provided."
  },
  isString: {
    bail: true,
    errorMessage: "First name must be a string."
  },
  escape: true,
  isLength: {
    options: {
      min: 1,
      max: 100,
    },
    errorMessage: "First name is required and maximum length is 100 characters.",
  },
};

const lastNameValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  optional: true,
  isString: {
    bail: true,
    errorMessage: "Last name must be a string."
  },
  escape: true,
  isLength: {
    options: {
      max: 100,
    },
    errorMessage: "Last name maximum length is 100 characters.",
  },
};


export const registrationSchema: Schema = {
  username: usernameValidator,
  password: passwordValidator,
  firstName: firstNameValidator,
  lastName: lastNameValidator
};

export const loginSchema = {
  username: usernameValidator,
  password: loginPasswordValidator,
};
