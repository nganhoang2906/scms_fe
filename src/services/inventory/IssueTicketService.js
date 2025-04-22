import axios from "axios";

const BASE_URL = "http://localhost:8080";
const axiosAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createIssueTicket = async (request, token) => {
  const response = await axios.post(`${BASE_URL}/user/create-issue-ticket`, request, axiosAuth(token));
  return response.data;
};

export const getAllIssueTicketsByCompany = async (companyId, token) => {
  const response = await axios.get(`${BASE_URL}/user/get-all-issue-ticket-in-com/${companyId}`, axiosAuth(token));
  return response.data;
};

export const getIssueTicketById = async (ticketId, token) => {
  const response = await axios.get(`${BASE_URL}/user/get-issue-ticket/${ticketId}`, axiosAuth(token));
  return response.data;
};

export const updateIssueTicketStatus = async (ticketId, status, token) => {
  const response = await axios.put(`${BASE_URL}/user/update-issue-ticket-status/${ticketId}?status=${status}`, {}, axiosAuth(token));
  return response.data;
};
