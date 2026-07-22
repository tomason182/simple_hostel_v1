import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/login/LoginPage";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import RoomTypePage from "../features/roomTypes/pages/RoomTypePages";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>

          <Route
            path="/"
            element={<DashboardPage />}
          />
          <Route
            path="/room-types"
            element={<RoomTypePage />}
          />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;
