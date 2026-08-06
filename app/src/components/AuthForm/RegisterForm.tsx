import styles from "./Auth.module.css";

export function RegisterForm() {


  return (
    <form className={styles.form}>


      <label className={styles.label}>
        Nombre
        <input type="text" className={styles.input} />
      </label>

      <label className={styles.label}>
        Nombre de la propiedad
        <input type="text" className={styles.input} />
      </label>

      <label className={styles.label}>
        Correo electrónico
        <input type="email" className={styles.input} />
      </label>

      <label className={styles.label}>
        Contraseña
        <input type="password" className={styles.input} />
      </label>

      <label className={styles.label}>
        Repetir contraseña
        <input type="password" className={styles.input} />
      </label>

      <label className="label acceptTerms">
        <input type="checkbox" />
        Aceptar términos y condiciones
      </label>

      <button className={styles.button}>
        Registrarse
      </button>


    </form>
  )
}
