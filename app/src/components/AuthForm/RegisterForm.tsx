import React, { useState } from "react";
import styles from "./Auth.module.css";

import { AuthRepository } from "../../repositories/AuthRepository";

import type { registerRequestDTO } from "../../dtos/registerDTO";

export function RegisterForm() {

  const repository = new AuthRepository();

  const [register, setRegister] = useState<registerRequestDTO>({
    username: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    propertyName: "",
    acceptTerms: false,
    captchaToken: ""
  });


  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {

      await repository.register(register);

      alert("Usuario creado con exito");

    } catch (e) {
      alert(e)
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
      </label>

      <label className={styles.label}>
        Nombre de la propiedad
        <input type="text" className={styles.input} name="propertyName" value={register.propertyName} onChange={handleChange} />
      </label>

      <label className={styles.label}>
        Correo electrónico
        <input type="email" className={styles.input} name="username" value={register.username} onChange={handleChange} />
      </label>

      <label className={styles.label}>
        Contraseña
        <input type="password" className={styles.input} name="password" value={register.password} onChange={handleChange} />
      </label>

      <label className={styles.label}  >
        Repetir contraseña
        <input type="password" className={styles.input} name="repeatPassword" value={register.repeatPassword} onChange={handleChange} />
      </label>


      <label className={styles.acceptTerms}>
        <input type="checkbox" name="acceptTerms" checked={register.acceptTerms} onChange={handleChange} />
        Aceptar términos y condiciones
      </label>



      <button className={styles.button}>
        Registrarse
      </button>


    </form>
  )
}
