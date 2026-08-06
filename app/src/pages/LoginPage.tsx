import LoginForm from "../components/AuthForm/LoginForm";
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";

export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}



