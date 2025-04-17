import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Bom
const createBom = async (data, token) => {
  const res = await axios.post(`${BASE_URL}/user/create-bom`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getAllBomsByCompany = async (companyId, token) => {
  const res = await axios.get(`${BASE_URL}/user/get-all-bom-in-com/${companyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getBomById = async (bomId, token) => {
  const res = await axios.get(`${BASE_URL}/user/get-bom/${bomId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateBom = async (bomId, data, token) => {
  const res = await axios.put(`${BASE_URL}/user/update-bom/${bomId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteBom = async (bomId, token) => {
  const res = await axios.delete(`${BASE_URL}/comad/delete-bom/${bomId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Bom Detail
const addBomDetail = async (bomId, data, token) => {
  const res = await axios.post(`${BASE_URL}/user/add-bom-detail/${bomId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateBomDetail = async (bomId, bomDetailId, data, token) => {
  const res = await axios.put(`${BASE_URL}/user/update-bom-detail/${bomId}/${bomDetailId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteBomDetail = async (bomDetailId, token) => {
  const res = await axios.delete(`${BASE_URL}/user/delete-bom-detail/${bomDetailId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export {
  createBom,
  getAllBomsByCompany,
  getBomById,
  updateBom,
  deleteBom,
  addBomDetail,
  updateBomDetail,
  deleteBomDetail,
};
