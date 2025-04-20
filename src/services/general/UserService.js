import axios from "axios";

const BASE_URL = "http://localhost:8080";
const axiosAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getAllUsers = async (token) => {
  const response = await axios.get(`${BASE_URL}/sysad/get-all-users`, axiosAuth(token));
  return response.data;
};

export const getAllUsersInCompany = async (companyId, token) => {
  const response = await axios.get(`${BASE_URL}/comsys/get-all-users-in-com/${companyId}`, axiosAuth(token));
  return response.data;
};

export const getUserByEmployeeId = async (employeeId, token) => {
  const response = await axios.get(`${BASE_URL}/user/get-user-by-employeeId/${employeeId}`, axiosAuth(token));
  return response.data;
};

export const getUserById = async (userId, token) => {
  const response = await axios.get(`${BASE_URL}/user/get-user-by-userId/${userId}`, axiosAuth(token));
  return response.data;
};

export const updateUser = async (userId, newUser, token) => {
  const response = await axios.put(`${BASE_URL}/all/update-user/${userId}`, newUser, axiosAuth(token));
  return response.data;
};

export const updatePassword = async (userId, data, token) => {
  const res = await axios.post(`${BASE_URL}/users/update-password/${userId}`, data, axiosAuth(token) );
  return res.data;
};
