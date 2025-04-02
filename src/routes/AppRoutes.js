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
import PrivateRoute from "./PrivateRoute"


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/verify-forgot-password-otp" element={<OtpForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/homepage" element={<PrivateRoute element={<HomePage />} allowedRoles={["C-ADMIN"]} allowedDepartments={[1]} />} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
