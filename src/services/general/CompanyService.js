import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getCompanyById = async (companyId, token) => {
  const res = await axios.get(`${BASE_URL}/user/get-company/${companyId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

const updateCompany = async (companyId, data, token) => {
  return await axios.put(
    `${BASE_URL}/comsys/update-company/${companyId}`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const updateCompanyLogo = async (companyId, file, token) => {
  const formData = new FormData();
  formData.append("logo", file);
  const res = await axios.put(
    `${BASE_URL}/comsys/update-company-logo/${companyId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export { getCompanyById, updateCompany, updateCompanyLogo };
