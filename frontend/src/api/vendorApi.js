
import axios from "axios";

const API_URL = "http://localhost:5041/api/vendors";

export const getVendors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getVendorById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};