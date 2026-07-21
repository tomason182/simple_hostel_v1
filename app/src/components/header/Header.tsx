import { useAuth } from "../../hooks/useAuth";

function Header() {

  const { user, logout } = useAuth();

  async function handleLogOut() {
    await logout();
  }
  return (
    <header>
      <h2>Simplehostel</h2>
      <div>
        <span>
          {user?.name}
        </span>
        <button onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
