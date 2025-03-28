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

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};

export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user-otp`, { email, otp });
    return response.data;
  } catch (error) {
    console.error("OTP Verification Error:", error);
    throw new Error(error.response?.data?.message || "OTP verification failed. Please try again.");
  }
};

export const resendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user-resendotp`, { email });
    return response.data;
  } catch (error) {
    console.error("Resend OTP Error:", error);
    throw new Error(error.response?.data?.message || "Failed to resend OTP. Try again later.");
  }
};

export const fetchUserDataApi = async (userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/get-user`, { userId });
    return response.data;
  } catch (error) {
    console.error("Resend OTP Error:", error);
    throw new Error(error.response?.data?.message || "Failed to resend OTP. Try again later.");
  }
};
