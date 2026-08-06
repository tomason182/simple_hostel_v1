import { useState } from "react";
import { AuthRepository } from "../repositories/AuthRepository";

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
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <input value={password} onChange={(e) => setPassword(e.target.value)} />

      <button>Ingresar</button>

    </form>
  )
}
