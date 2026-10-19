// 1. Se podria
import { useState } from "react";

export default function ReservationForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  return (

    <form>
      <label>
        Nombre:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Apellido:
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
    </form>

  )


}
