import axios from "axios";
const BASE_URL = "http://localhost:8080";

export const getAllUsers = async (token) => {
  const response = await axios.get(`${BASE_URL}/sysad/get-all-users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllUsersInCompany = async (companyId, token) => {
  const response = await axios.get(`${BASE_URL}/comad/get-all-users-in-com/${companyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserByEmployeeId = async (employeeId, token) => {
  const response = await axios.get(`${BASE_URL}/user/get-user-by-employeeId/${employeeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserById = async (userId, token) => {
  const response = await axios.get(`${BASE_URL}/comsys/get-user-by-userId/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUser = async (userId, newUser, token) => {
  const response = await axios.put(`${BASE_URL}/all/update-user/${userId}`, newUser, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updatePassword = async (userId, body, token) => {
  const res = await axios.post( `${BASE_URL}/users/${userId}/update-password`,
    body,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
