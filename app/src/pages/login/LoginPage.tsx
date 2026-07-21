import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/AuthService";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError(null);
      const response = await authService.login({ email, password });

      login(response.user);

      navigate("/");
    } catch (err) {
      setError("Email o contraseña incorrectos");
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {
          error &&
          <p>{error}</p>
        }
        <button>Ingresar</button>

      </form>
    </main>
  );
}

export default LoginPage;
