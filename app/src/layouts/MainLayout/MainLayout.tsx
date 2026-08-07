import { Outlet } from "react-router";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

export function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
