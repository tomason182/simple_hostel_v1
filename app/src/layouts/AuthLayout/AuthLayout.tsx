import styles from "./AuthLayout.module.css"
export function AuthLayout({ children }: React.PropsWithChildren) {

  return (
    <main className={styles.authLayout}>
      <h1>SimpleHostel</h1>
      <h2>Ingresar</h2>
      <div className={styles.authContainer}>
        {children}
      </div>
    </main>
  )
}
