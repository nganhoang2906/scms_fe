import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Alert from "../themes/alert";

const PrivateRoute = ({ element, allowedRoles, allowedDepartments }) => {
  const [redirectPath, setRedirectPath] = useState(null);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const departmentId = localStorage.getItem("departmentId");

  useEffect(() => {
    if (!token) {
      Alert.warning("Bạn chưa đăng nhập!")
      setRedirectPath("/login");
    } else if (!allowedRoles.includes(role)) {
      Alert.error("Bạn không có quyền truy cập vào trang này!")
        setRedirectPath("/unauthorized");
    } else if (allowedDepartments && !allowedDepartments.includes(parseInt(departmentId))) {
      Alert.error("Bạn không có quyền truy cập vào phòng ban này!")
        setRedirectPath("/unauthorized");
    }
  }, [token, role, departmentId, allowedRoles, allowedDepartments]);

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return element;
};

export default PrivateRoute;
