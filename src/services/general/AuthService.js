import axios from "axios";

const BASE_URL = "http://localhost:8080";

const registerCompany = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/register-company`, data);
  return res.data;
};

const sendVerifyOtp = async (email) => {
  const res = await axios.post(`${BASE_URL}/auth/send-verify-otp`, null, {
    params: { email },
  });
  return res.data;
};

const verifyOtp = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/verify-otp`, data);
  return res.data;
};

const verifyForgotPasswordOtp = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/verify-otp-forgot-password`, data);
  return res.data;
};

const resetPassword = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/reset-password`, data);
  return res.data;
};

const login = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, data);
  return res.data;
};

export {
  registerCompany,
  sendVerifyOtp,
  verifyOtp,
  verifyForgotPasswordOtp,
  resetPassword,
  login,
};
