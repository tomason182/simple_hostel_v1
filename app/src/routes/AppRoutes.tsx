import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/login/LoginPage";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>

          <Route
            path="/"
            element={<DashboardPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;
