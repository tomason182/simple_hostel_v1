import { useState } from "react";
import { AuthRepository } from "../../repositories/AuthRepository";
import styles from "./LoginForm.module.css";

const repository = new AuthRepository();


export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await repository.login({
        username, password
      });

      // guardar nombre, role en storage
      //
      // redirigir a /dashboard

      alert("login correcto");
    } catch (err) {

      // Mostrar mensaje de error.
      //
      alert("login Incorrecto")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Usuario:
        <input value={username} onChange={(e) => setUsername(e.target.value)} className={styles.input} />
      </label>
      <label className={styles.label}>
        Contraseña:
        <input value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
      </label>

      <button className={styles.button}>Ingresar</button>

    </form>
  )
}
