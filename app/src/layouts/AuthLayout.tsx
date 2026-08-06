export function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="auth-layout">
      <div className="auth-container">
        {children}
      </div>
    </main>
  )
}
