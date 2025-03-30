import axios from "axios";
import companyAxiosInstance from "../config/companyInterceptor";

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

export const getCompanyProfileApi = async () => {
    try {
        const response = await companyAxiosInstance.get(`${API_BASE_URL}/get-profile`)
        return response
    } catch (error) {
        throw error.response?.data || "Something went wrong!";
    }
}

export const updateCompanyProfileApi = async (updatedData) => {
    try {
        const response = await companyAxiosInstance.post(`${API_BASE_URL}/update-profile`, updatedData)
        return response.data
    } catch (error) {
        throw error.response?.data || "Something went wrong!";
    }
}