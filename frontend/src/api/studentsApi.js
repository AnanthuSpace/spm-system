import axios from "axios";
import userAxiosInstance from "../config/userInterceptor";

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

export const fetchUserDataApi = async () => {
  try {
    const response = await userAxiosInstance.get(`/get-user`)
    return response.data;
  } catch (error) {
    console.error("Fetch User Data Error:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch user data. Try again later.");
  }
};

export const editUserApi = async (updatedData) => {
  try {
    const formData = new FormData();
    
    Object.keys(updatedData).forEach(key => {
      if (key !== 'resume' && key !== 'certificates') {
        formData.append(key, updatedData[key]);
      }
    });
    
    if (updatedData.resume) {
      formData.append('resume', updatedData.resume);
    }
    if (updatedData.certificates) {
      formData.append('certificates', updatedData.certificates);
    }

    const response = await userAxiosInstance.post('/edit-user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Update User Error:", error);
    throw new Error(error.response?.data?.message || "Failed to update user data.");
  }
};