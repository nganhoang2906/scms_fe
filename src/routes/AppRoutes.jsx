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
import ItemDetail from "@/pages/general/item/ItemDetail";
import EditItem from "@/pages/general/item/EditItem";
import CreateItem from "@/pages/general/item/CreateItem";
import CreateItemFromExcel from "@/pages/general/item/CreateItemFromExcel";

import WarehouseInCompany from "@pages/general/warehouse/WarehouseInCompany";
import WarehouseDetail from "@pages/general/warehouse/WarehouseDetail";
import EditWarehouse from "@/pages/general/warehouse/EditWarehouse";
import CreateWarehouse from "@pages/general/warehouse/CreateWarehouse";

import PlantInCompany from "@/pages/general/manufacturing-plant/PlantInCompany";
import PlantDetail from "@/pages/general/manufacturing-plant/PlantDetail";
import EditPlant from "@/pages/general/manufacturing-plant/EditPlant";
import CreatePlant from "@/pages/general/manufacturing-plant/CreatePlant";

import LineInCompany from "@/pages/general/manufacturing-line/LineInCompany";
import LineDetail from "@/pages/general/manufacturing-line/LineDetail";
import EditLine from "@/pages/general/manufacturing-line/EditLine";
import CreateLine from "@/pages/general/manufacturing-line/CreateLine";

import BomInCompany from "@/pages/manufacturing/bom/BomInCompany";
import CreateBom from "@/pages/manufacturing/bom/CreateBom";
import BomDetail from "@/pages/manufacturing/bom/BomDetail";
import EditBom from "@/pages/manufacturing/bom/EditBom";

import MoInCompany from "@/pages/manufacturing/mo/MoInCompany";
import CreateMo from "@/pages/manufacturing/mo/CreateMo";
import MoDetail from "@/pages/manufacturing/mo/MoDetail";
import EditMo from "@/pages/manufacturing/mo/EditMo";

import StageInCompany from "@/pages/manufacturing/stage/StageInCompany";
import CreateStage from "@/pages/manufacturing/stage/CreateStage";
import StageDetail from "@/pages/manufacturing/stage/StageDetail";
import EditStage from "@/pages/manufacturing/stage/EditStage";

import Inventory from "@/pages/inventory/inventory/Inventory";
import CheckInventory from "@/pages/inventory/inventory/CheckInventory";
import InventoryCount from "@/pages/inventory/inventory/InventoryCount";
import CreateInventory from "@/pages/inventory/inventory/CreateInventory";

import ItInCompany from "@/pages/inventory/issue-ticket/ItInCompany";
import ItDetail from "@/pages/inventory/issue-ticket/ItDetail";

import RtInCompany from "@/pages/inventory/receive-ticket/RtInCompany";
import RtDetail from "@/pages/inventory/receive-ticket/RtDetail";

import TtInCompany from "@/pages/inventory/transfer-ticket/TtInCompany";
import TtDetail from "@/pages/inventory/transfer-ticket/TtDetail";
import EditTt from "@/pages/inventory/transfer-ticket/EditTt";
import CreateTt from "@/pages/inventory/transfer-ticket/CreateTt";

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
          
          <Route path="/company" element={<PrivateRoute element={<CompanyDetail />} allowedRoles={["C-ADMIN"]} />} />
          <Route path="/company/edit" element={<PrivateRoute element={<EditCompany />} allowedRoles={["C-ADMIN"]}/>} />
          
          <Route path="/department-in-company" element={<PrivateRoute element={<DepartmentInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/department/:departmentId" element={<PrivateRoute element={<DepartmentDetail />} allowedRoles={["C-ADMIN"]}/>} />
          
          <Route path="/employee-in-company" element={<PrivateRoute element={<EmployeeInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/employee/:employeeId" element={<PrivateRoute element={<EmployeeDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/employee/:employeeId/edit" element={<PrivateRoute element={<EditEmployee />} allowedRoles={["C-ADMIN", "USER"]}/>} />
          <Route path="/create-employee" element={<PrivateRoute element={<CreateEmployee />} allowedRoles={["C-ADMIN"]}/>} />
          
          <Route path="/user-in-company" element={<PrivateRoute element={<UserInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/user/:userId" element={<PrivateRoute element={<UserDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/user/:userId/edit" element={<PrivateRoute element={<EditUser />} allowedRoles={["C-ADMIN", "USER", "S-ADMIN"]}/>} />
          
          <Route path="/item-in-company" element={<PrivateRoute element={<ItemInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/item/:itemId" element={<PrivateRoute element={<ItemDetail/>} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/create-item" element={<PrivateRoute element={<CreateItem />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/item/:itemId/edit" element={<PrivateRoute element={<EditItem />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/create-item-from-excel" element={<PrivateRoute element={<CreateItemFromExcel />} allowedRoles={["C-ADMIN"]}/>} />

          <Route path="/warehouse-in-company" element={<PrivateRoute element={<WarehouseInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/warehouse/:warehouseId" element={<PrivateRoute element={<WarehouseDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/create-warehouse" element={<PrivateRoute element={<CreateWarehouse />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/warehouse/:warehouseId/edit" element={<PrivateRoute element={<EditWarehouse />} allowedRoles={["C-ADMIN"]}/>} />
          
          <Route path="/plant-in-company" element={<PrivateRoute element={<PlantInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/plant/:plantId" element={<PrivateRoute element={<PlantDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/create-plant" element={<PrivateRoute element={<CreatePlant />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/plant/:plantId/edit" element={<PrivateRoute element={<EditPlant />} allowedRoles={["C-ADMIN"]}/>} />
          
          <Route path="/line-in-company" element={<PrivateRoute element={<LineInCompany />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/line/:lineId" element={<PrivateRoute element={<LineDetail />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/create-line" element={<PrivateRoute element={<CreateLine />} allowedRoles={["C-ADMIN"]}/>} />
          <Route path="/line/:lineId/edit" element={<PrivateRoute element={<EditLine />} allowedRoles={["C-ADMIN"]}/>} />

          <Route path="/bom-in-company" element={<PrivateRoute element={<BomInCompany />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />
          <Route path="/create-bom" element={<PrivateRoute element={<CreateBom />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />
          <Route path="/bom/:itemId" element={<PrivateRoute element={<BomDetail />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />
          <Route path="/bom/:itemId/edit" element={<PrivateRoute element={<EditBom />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />

          <Route path="/mo-in-company" element={<PrivateRoute element={<MoInCompany />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />
          <Route path="/create-mo" element={<PrivateRoute element={<CreateMo />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />
          <Route path="/mo/:moId" element={<PrivateRoute element={<MoDetail />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />
          <Route path="/mo/:moId/edit" element={<PrivateRoute element={<EditMo />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />

          <Route path="/stage-in-company" element={<PrivateRoute element={<StageInCompany />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />
          <Route path="/create-stage" element={<PrivateRoute element={<CreateStage />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />
          <Route path="/stage/:itemId" element={<PrivateRoute element={<StageDetail />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />
          <Route path="/stage/:itemId/edit" element={<PrivateRoute element={<EditStage />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Sản xuất"]}/>} />

          <Route path="/inventory" element={<PrivateRoute element={<Inventory />} allowedRoles={["C-ADMIN", "USER"]} />} />
          <Route path="/check-inventory/:type/:id" element={<PrivateRoute element={<CheckInventory />} allowedRoles={["C-ADMIN", "USER"]} />} />
          <Route path="/inventory-count" element={<PrivateRoute element={<InventoryCount />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Kho"]} />} />
          <Route path="/create-inventory" element={<PrivateRoute element={<CreateInventory />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Kho"]} />} />

          <Route path="/issue-ticket-in-company" element={<PrivateRoute element={<ItInCompany />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Kho"]}/>} />
          <Route path="/issue-ticket/:ticketId" element={<PrivateRoute element={<ItDetail />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Kho"]}/>} />
          
          <Route path="/receive-ticket-in-company" element={<PrivateRoute element={<RtInCompany />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Kho"]}/>} />
          <Route path="/receive-ticket/:ticketId" element={<PrivateRoute element={<RtDetail />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Kho"]}/>} />
          
          <Route path="/tt-in-company" element={<PrivateRoute element={<TtInCompany />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Kho"]}/>} />
          <Route path="/transfer-ticket/:ticketId" element={<PrivateRoute element={<TtDetail />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Kho"]}/>} />
          <Route path="/transfer-ticket/:ticketId/edit" element={<PrivateRoute element={<EditTt />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Kho"]}/>} />
          <Route path="/create-transfer-ticket" element={<PrivateRoute element={<CreateTt />} allowedRoles={["C-ADMIN", "USER"]} allowedDepartments={["Quản trị", "Kho"]}/>} />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
