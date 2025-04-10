import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const createItem = async (companyId, itemData, token) => {
  const response = await axios.post(
    `${BASE_URL}/comad/create-item/${companyId}`,
    itemData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getAllItemsInCompany = async (companyId, token) => {
  const response = await axios.get(
    `${BASE_URL}/user/get-all-item-in-com/${companyId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getItemById = async (itemId, token) => {
  const response = await axios.get(`${BASE_URL}/user/get-item/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateItem = async (itemId, itemData, token) => {
  const response = await axios.put(
    `${BASE_URL}/comad/update-item/${itemId}`,
    itemData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteItem = async (itemId, token) => {
  const response = await axios.delete(`${BASE_URL}/comad/delete-item/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
