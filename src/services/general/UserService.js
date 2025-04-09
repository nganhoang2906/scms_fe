import axios from "../../axiosConfig";

export const getAllUsers = async (token) => {
  const response = await axios.get("/sysad/get-all-users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllUsersInCompany = async (companyId, token) => {
  const response = await axios.get(`/comad/get-all-users-in-com/${companyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserByEmployeeId = async (employeeId, token) => {
  const response = await axios.get(`/comad/get-user-by-employeeId/${employeeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserById = async (userId, token) => {
  const response = await axios.get(`/sysad/get-user-by-userId/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUser = async (userId, newUser, token) => {
  const response = await axios.put(`/all/update-user/${userId}`, newUser, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMyProfile = async (token) => {
  const response = await axios.get("/user/get-profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
