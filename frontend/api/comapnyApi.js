import axios from "axios";

const API_BASE_URL = "http://localhost:3000/company";

export const registerCompany = async (companyData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, companyData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Something went wrong!";
    }
};

export const loginCompany = async (companyData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/company-login`, companyData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Something went wrong!";
    }
};