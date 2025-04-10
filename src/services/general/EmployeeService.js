import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getAllEmployeesInCompany = async (companyId, token) => {
  const res = await axios.get(`${BASE_URL}/user/get-all-employee-in-com/${companyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getEmployeeById = async (employeeId, token) => {
  const res = await axios.get(`${BASE_URL}/user/get-employee/${employeeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const createEmployee = async (data, token) => {
  const res = await axios.post(`${BASE_URL}/comad/create-employee`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateEmployee = async (employeeId, data, token) => {
  const res = await axios.put(`${BASE_URL}/user/update-employee/${employeeId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteEmployee = async (employeeId, token) => {
  const res = await axios.delete(`${BASE_URL}/comad/delete-employee/${employeeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateEmployeeAvatar = async (employeeId, file, token) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await axios.put(`${BASE_URL}/user/update-avatar/${employeeId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export {
  getAllEmployeesInCompany,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  updateEmployeeAvatar,
};
