import { createBrowserRouter } from "react-router";
import { Navigate } from "react-router";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { Home } from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    Component: LoginPage
  },
  {
    path: "/register",
    Component: RegisterPage
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/calendar",
        element: <h1>Calendar page</h1>
      }
    ]
  }

]);
