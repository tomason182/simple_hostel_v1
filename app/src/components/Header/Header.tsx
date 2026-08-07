import styles from "./Header.module.css";

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
            <li>Home</li>
            <li>Calendar</li>
            <li>Tarifas y disponibilidad</li>
            <li>Dormitorios</li>
            <li>Propiedad</li>
          </ul>

        </nav>

      </div>

    </header>
  )
}
