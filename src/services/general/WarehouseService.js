// src/services/WarehouseService.js
import axios from "axios";
const BASE_URL = "http://localhost:8080";

export const createWarehouse = async (companyId, warehouseData, token) => {
  const response = await axios.post(
    `${BASE_URL}/comad/add-warehouse/${companyId}`,
    warehouseData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getWarehouseById = async (warehouseId, token) => {
  const response = await axios.get(`${BASE_URL}/user/get-warehouse/${warehouseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllWarehousesInCompany = async (companyId, token) => {
  const response = await axios.get(`${BASE_URL}/user/get-all-warehouse-in-company/${companyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateWarehouse = async (warehouseId, updatedWarehouse, token) => {
  const response = await axios.put(
    `${BASE_URL}/comad/update-warehouse/${warehouseId}`,
    updatedWarehouse,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
