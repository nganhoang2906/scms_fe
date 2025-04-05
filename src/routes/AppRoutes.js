import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/authentication/Register";
import OtpVerification from "../pages/authentication/OtpVerification";
import Login from "../pages/authentication/Login";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import DefaultPage from "../pages/DefaultPage";
import OtpForgotPassword from "../pages/authentication/OtpForgotPassword";
import ResetPassword from "../pages/authentication/ResetPassword";

import HomePage from "../pages/HomePage";
import Unauthorized from "../pages/Unauthorized";
import CompanyDetail from "../pages/general/Company/CompanyDetail";
import PrivateRoute from "./PrivateRoute";
import NavBarLayout from "../layouts/NavBarLayout";
import SideBarLayout from "../layouts/SideBarLayout";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<NavBarLayout />}>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-forgot-password-otp" element={<OtpForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<SideBarLayout />}>
          <Route path="/homepage" element={<PrivateRoute element={<HomePage />} allowedRoles={["C-ADMIN"]} />} />
          <Route path="/company-detail" element={<PrivateRoute element={<CompanyDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default AppRoutes;
