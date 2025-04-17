import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getAllItemsInCompany = async (companyId, token) => {
  const res = await axios.get(`${BASE_URL}/user/get-all-item-in-com/${companyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getItemById = async (itemId, token) => {
  const res = await axios.get(`${BASE_URL}/user/get-item/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const createItem = async (companyId, data, token) => {
  const res = await axios.post(`${BASE_URL}/comad/create-item/${companyId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateItem = async (itemId, data, token) => {
  const res = await axios.put(`${BASE_URL}/comad/update-item/${itemId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteItem = async (itemId, token) => {
  const res = await axios.delete(`${BASE_URL}/comad/delete-item/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export {
  getAllItemsInCompany,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
