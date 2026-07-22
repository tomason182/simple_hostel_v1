import { ParamSchema, Schema } from "express-validator";
import { usernameValidator } from "./userSchema";
import { passwordValidator } from "./userSchema";
import { firstNameValidator } from "./userSchema";
import { propertyNameValidator } from "./propertySchema";


const acceptTermsValidator: ParamSchema = {
  in: ["body"],
  exists: {
    bail: true,
    errorMessage: "Accept terms must be provided."
  },
  isBoolean: {
    bail: true,
    errorMessage: "Accept terms must be boolean."
  },
  custom: {
    options: value => value === true,
    errorMessage: "Terms must be accepted."
  }
}

const captchaTokenValidator: ParamSchema = {
  in: ["body"],
  trim: true,
  exists: {
    bail: true,
    errorMessage: "captcha token must be provided"
  },
  notEmpty: {
    bail: true,
    errorMessage: "captcha token must be provided"
  },
  isString: {
    bail: true,
    errorMessage: "captcha token must be a string"
  }

}


export const createAccountSchema: Schema = {
  username: usernameValidator,
  password: passwordValidator,
  firstName: firstNameValidator,
  propertyName: propertyNameValidator,
  acceptTerms: acceptTermsValidator,
  captchaToken: captchaTokenValidator

};

export const resendEmailSchema: Schema = {
  username: usernameValidator,
}
