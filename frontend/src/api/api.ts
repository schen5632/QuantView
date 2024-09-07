import axios, { AxiosResponse } from "axios";

// Define the base URL for the API
const API_URL = import.meta.env.VITE_API_URL;

export const predictReturns = async (ticker: String) => {
  const response = await axios.get(`${API_URL}/predict?ticker=${ticker}`);
  return response.data;
};

export const getDailyData = async (ticker: String) => {
  const response = await axios.get(`${API_URL}/prices/daily?ticker=${ticker}`);
  return response.data;
};
