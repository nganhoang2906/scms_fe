import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const createLine = async (plantId, data, token) => {
  const response = await axios.post(
    `${BASE_URL}/comad/create-mf-line/${plantId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getAllLinesInCompany = async (companyId, token) => {
  const response = await axios.get(
    `${BASE_URL}/user/get-all-mf-line-in-company/${companyId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getLineById = async (lineId, token) => {
  const response = await axios.get(
    `${BASE_URL}/user/get-mf-line/${lineId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateLine = async (lineId, data, token) => {
  const response = await axios.put(
    `${BASE_URL}/comad/update-mf-line/${lineId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
