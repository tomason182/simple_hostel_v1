import { useAuth } from "../../hooks/useAuth";

function DashboardPage() {

  const { user } = useAuth();


  return (
    <h1>DashboarPage{user?.name}</h1>
  );
}

export default DashboardPage;
