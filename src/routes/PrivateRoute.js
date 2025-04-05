import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, allowedRoles, allowedDepartments }) => {
  const [redirectPath, setRedirectPath] = useState(null);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const departmentId = localStorage.getItem("departmentId");

  useEffect(() => {
    if (!token) {
      alert("Bạn chưa đăng nhập!")
      setRedirectPath("/login");
    } else if (!allowedRoles.includes(role)) {
      alert("Bạn không có quyền truy cập vào trang này!")
        setRedirectPath("/unauthorized");
    } else if (allowedDepartments && !allowedDepartments.includes(parseInt(departmentId))) {
      alert("Bạn không có quyền truy cập vào trang này!")
        setRedirectPath("/unauthorized");
    }
  }, [token, role, departmentId, allowedRoles, allowedDepartments]);

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return element;
};

export default PrivateRoute;
