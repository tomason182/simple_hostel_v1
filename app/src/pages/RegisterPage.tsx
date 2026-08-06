import { RegisterForm } from "../components/AuthForm/RegisterForm";
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";


export function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}
