import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const createPlant = async (companyId, plantData, token) => {
  const response = await axios.post(
    `${BASE_URL}/comad/create-mf-plant/${companyId}`,
    plantData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getAllPlantsInCompany = async (companyId, token) => {
  const response = await axios.get(
    `${BASE_URL}/user/get-all-mf-plant-in-com/${companyId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getPlantById = async (plantId, token) => {
  const response = await axios.get(
    `${BASE_URL}/user/get-mf-plant/${plantId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updatePlant = async (plantId, updatedPlant, token) => {
  const response = await axios.put(
    `${BASE_URL}/comad/update-mf-plant/${plantId}`,
    updatedPlant,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
