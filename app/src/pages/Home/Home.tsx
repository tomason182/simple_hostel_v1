import styles from "./Home.module.css";
export function Home() {
  return (
    <div className={`container ${styles.home}`} >
      <div className={styles.card}>
        <h4>¿Quien llega hoy?</h4>

      </div>
      <div className={styles.card}>
        <h4>¿Quien sale hoy?</h4>
      </div>
      <div className={styles.card}>
        <h4>Estadias</h4>
      </div>
      <div className={styles.card}>
        <h4>Ultimas reservas</h4>
      </div>


    </div >
  )
}
