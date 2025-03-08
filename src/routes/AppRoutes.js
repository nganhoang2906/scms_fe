import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import OtpVerification from "../pages/OtpVerification";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<h1>404 - Không tìm thấy trang</h1>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
