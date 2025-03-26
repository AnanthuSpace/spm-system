import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};
