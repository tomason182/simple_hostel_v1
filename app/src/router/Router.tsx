import { createBrowserRouter } from "react-router";
import { Navigate } from "react-router";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

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
  }
]);
