import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getDepartmentById = async (departmentId, token) => {
  const res = await axios.get(`${BASE_URL}/user/get-department/${departmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getAllDepartmentsInCompany = async (companyId, token) => {
  const res = await axios.get(`${BASE_URL}/user/get-all-department-in-company/${companyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export {
  getDepartmentById,
  getAllDepartmentsInCompany
}
