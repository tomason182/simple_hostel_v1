import styles from "./Loading.module.css";

export default function LoadingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>

      <p className={styles.message}>Loading...</p>
    </div>
  )
}
