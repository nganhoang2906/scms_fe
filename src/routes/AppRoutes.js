import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBarLayout from "../layouts/NavBarLayout";
import SideBarLayout from "../layouts/SideBarLayout";
import PrivateRoute from "./PrivateRoute";

import DefaultPage from "../pages/DefaultPage";
import Register from "../pages/authentication/Register";
import OtpVerification from "../pages/authentication/OtpVerification";
import Login from "../pages/authentication/Login";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import OtpForgotPassword from "../pages/authentication/OtpForgotPassword";
import ResetPassword from "../pages/authentication/ResetPassword";

import HomePage from "../pages/HomePage";
import Unauthorized from "../pages/Unauthorized";

import CompanyDetail from "../pages/general/Company/CompanyDetail";
import EditCompany from "../pages/general/Company/EditCompany";
import DepartmentInCompany from "../pages/general/Department/DepartmentInCompany";
import DepartmentDetail from "../pages/general/Department/DepartmentDetail";
import EmployeeInCompany from "../pages/general/Employee/EmployeeInCompany";
import EmployeeDetail from "../pages/general/Employee/EmployeeDetail";
import EditEmployee from "../pages/general/Employee/EditEmployee";
import CreateEmployee from "../pages/general/Employee/CreateEmployee";
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
          <Route path="/homepage" element={<PrivateRoute element={<HomePage />} allowedRoles={["C-ADMIN", "USER"]} />} />
          <Route path="/company-detail" element={<PrivateRoute element={<CompanyDetail />} allowedRoles={["C-ADMIN"]} />} />
          <Route path="/company/edit" element={<PrivateRoute element={<EditCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/department-in-company" element={<PrivateRoute element={<DepartmentInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/department-detail/:departmentId" element={<PrivateRoute element={<DepartmentDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/employee-in-company" element={<PrivateRoute element={<EmployeeInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/employee-detail/:employeeId" element={<PrivateRoute element={<EmployeeDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/employee/:employeeId/edit" element={<PrivateRoute element={<EditEmployee />} allowedRoles={["C-ADMIN", "USER"]}/>} />
          <Route path="/create-employee" element={<PrivateRoute element={<CreateEmployee />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default AppRoutes;
