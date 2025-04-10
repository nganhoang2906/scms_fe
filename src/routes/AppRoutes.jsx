import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBarLayout from "@layouts/NavBarLayout";
import SideBarLayout from "@layouts/SideBarLayout";
import PrivateRoute from "./PrivateRoute";

import DefaultPage from "@pages/DefaultPage";
import Register from "@pages/authentication/Register";
import OtpVerification from "@pages/authentication/OtpVerification";
import Login from "@pages/authentication/Login";
import ForgotPassword from "@pages/authentication/ForgotPassword";
import OtpForgotPassword from "@pages/authentication/OtpForgotPassword";
import ResetPassword from "@pages/authentication/ResetPassword";

import HomePage from "@pages/HomePage";
import Unauthorized from "@pages/Unauthorized";
import MyProfile from "@pages/general/user/MyProfile";

import CompanyDetail from "@pages/general/company/CompanyDetail";
import EditCompany from "@pages/general/company/EditCompany";

import DepartmentInCompany from "@pages/general/department/DepartmentInCompany";
import DepartmentDetail from "@pages/general/department/DepartmentDetail";

import EmployeeInCompany from "@pages/general/employee/EmployeeInCompany";
import EmployeeDetail from "@pages/general/employee/EmployeeDetail";
import EditEmployee from "@pages/general/employee/EditEmployee";
import CreateEmployee from "@pages/general/employee/CreateEmployee";

import UserInCompany from "@pages/general/user/UserInCompany";  
import UserDetail from "@pages/general/user/UserDetail";
import EditUser from "@pages/general/user/EditUser";

import ItemInCompany from "@pages/general/item/ItemInCompany";

import WarehouseInCompany from "@pages/general/warehouse/WarehouseInCompany";
import WarehouseDetail from "@pages/general/warehouse/WarehouseDetail";

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
          <Route path="/my-profile" element={<PrivateRoute element={<MyProfile />} allowedRoles={["C-ADMIN", "USER", "S-ADMIN"]}/>} />
          
          <Route path="/company-detail" element={<PrivateRoute element={<CompanyDetail />} allowedRoles={["C-ADMIN"]} />} />
          <Route path="/company/edit" element={<PrivateRoute element={<EditCompany />} allowedRoles={["C-ADMIN"]}/>} />
          
          <Route path="/department-in-company" element={<PrivateRoute element={<DepartmentInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/department-detail/:departmentId" element={<PrivateRoute element={<DepartmentDetail />} allowedRoles={["C-ADMIN"]}/>} />
          
          <Route path="/employee-in-company" element={<PrivateRoute element={<EmployeeInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/employee-detail/:employeeId" element={<PrivateRoute element={<EmployeeDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/employee/:employeeId/edit" element={<PrivateRoute element={<EditEmployee />} allowedRoles={["C-ADMIN", "USER"]}/>} />
          <Route path="/create-employee" element={<PrivateRoute element={<CreateEmployee />} allowedRoles={["C-ADMIN"]}/>} />
          
          <Route path="/user-in-company" element={<PrivateRoute element={<UserInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/user-detail/:userId" element={<PrivateRoute element={<UserDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/user/:userId/edit" element={<PrivateRoute element={<EditUser />} allowedRoles={["C-ADMIN", "USER", "S-ADMIN"]}/>} />
          
          <Route path="/item-in-company" element={<PrivateRoute element={<ItemInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          
          <Route path="/warehouse-in-company" element={<PrivateRoute element={<WarehouseInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/warehouse-detail/:warehouseId" element={<PrivateRoute element={<WarehouseDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
