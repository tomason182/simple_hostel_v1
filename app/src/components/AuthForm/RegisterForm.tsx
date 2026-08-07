import React, { useState } from "react";
import styles from "./Auth.module.css";

import { AuthRepository } from "../../repositories/AuthRepository";

import type { registerRequestDTO } from "../../dtos/registerDTO";
import { ApiError } from "../../error/ApiError";
import type { ValidationErrors, ValidationIssue } from "../../error/ApiError";

export function RegisterForm() {

  const repository = new AuthRepository();

  const [register, setRegister] = useState<registerRequestDTO>({
    username: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    propertyName: "",
    acceptTerms: false,
    captchaToken: "testinCaptchaToken"
  });

  const [errors, setErrors] = useState<ApiError | null>(null);
  const [validationErrors, SetValidationErrors] = useState<ValidationErrors>({});


  function toValidationErrors(issues: ValidationIssue[]): ValidationErrors {
    const errors: ValidationErrors = {};

    for (const issue of issues) {
      errors[issue.field] = issue.code;
    }

    return errors;
  }


  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {

      await repository.register(register);

      alert("Usuario creado con exito");

    } catch (err) {
      if (err instanceof ApiError) {

        if (err.code === "VALIDATION_ERROR" && err.errors) {

          SetValidationErrors(toValidationErrors(err.errors));
          return
        }

        setErrors(err)

      }

    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, checked, value } = e.target;

    setRegister((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>


      <label className={styles.label}>
        Nombre
        <input type="text" className={styles.input} name="firstName" value={register.firstName} onChange={handleChange} />
        {
          validationErrors.firstName &&
          <span className="error-input active">
            {validationErrors.firstName}
          </span>
        }

      </label>

      <label className={styles.label}>
        Nombre de la propiedad
        <input type="text" className={styles.input} name="propertyName" value={register.propertyName} onChange={handleChange} />
        {
          validationErrors.propertyName &&
          <span className="error-input active">
            {validationErrors.propertyName}
          </span>
        }
      </label>

      <label className={styles.label}>
        Correo electrónico
        <input type="email" className={styles.input} name="username" value={register.username} onChange={handleChange} />
        {
          validationErrors.username &&
          <span className="error-input active">
            {validationErrors.username}
          </span>
        }
      </label>

      <label className={styles.label}>
        Contraseña
        <input type="password" className={styles.input} name="password" value={register.password} onChange={handleChange} />
        {
          validationErrors.password &&
          <span className="error-input active">
            {validationErrors.password}
          </span>
        }
      </label>

      <label className={styles.label}  >
        Repetir contraseña
        <input type="password" className={styles.input} name="repeatPassword" value={register.repeatPassword} onChange={handleChange} />
        {
          validationErrors.repeatPassword &&
          <span className="error-input active">
            {validationErrors.repeatPassword}
          </span>
        }
      </label>


      <label className={styles.acceptTerms}>
        <div className={styles.acceptTermsContainer}>
          <input type="checkbox" name="acceptTerms" checked={register.acceptTerms} onChange={handleChange} />
          Aceptar términos y condiciones
        </div>

        {
          validationErrors.acceptTerms &&
          <span className="error-checkbox active">
            {validationErrors.acceptTerms}
          </span>
        }
      </label>



      <button className={styles.button}>
        Registrarse
      </button>

      {
        errors && <p>{errors.code}</p>
      }


    </form>
  )
}
