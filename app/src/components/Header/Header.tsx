import styles from "./Header.module.css";
import { Link } from "react-router";

export function Header() {
  return (
    <header>
      <div className="container">
        <div className={styles.topBar}>
          <span>SimpleHostel.</span>

          <div className={styles.actions}>
            <span>Ayuda</span>
            <span>Comunicarse</span>
          </div>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="reservations">Reservas</Link>
            </li>
            <li>Tarifas y disponibilidad</li>
            <li>Dormitorios</li>
            <li>Propiedad</li>
          </ul>

        </nav>

      </div>

    </header>
  )
}
