import axios from "axios";
import adminAxiosInstance from "../config/adminInterceptor";

const API_BASE_URL = "http://localhost:3000/admin";

export const adminLoginApi = async (adminData) => {
    try {
        console.log(adminData)
        const response = await axios.post(`${API_BASE_URL}/login`, adminData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Something went wrong!";
    }
};

export const getUsers = async () => {
    try {
        const response = await adminAxiosInstance.get(`${API_BASE_URL}/get-users`)
        return response.data
    } catch (error) {
        throw error.response?.data || "Something went wrong!";
    }
}

export const fetchPendingCompaniesApi = async () => {
    try {
        const response = await adminAxiosInstance.get(`${API_BASE_URL}/get-pending-company`)
        return response.data
    } catch (error) {
        throw error.response?.data || "Something went wrong!";
    }
}

export const fetchApprovedCompaniesApi = async () => {
    try {
        const response = await adminAxiosInstance.get(`${API_BASE_URL}/get-company`)
        return response.data
    } catch (error) {
        throw error.response?.data || "Something went wrong!";
    }
}


export const verifyCompanyApi = async (companyId, status, reason) => {
    try {
        const response = await adminAxiosInstance.post(`${API_BASE_URL}/verification`, { companyId, status, reason })
        return response.data
    } catch (error) {
        throw error.response?.data || "Something went wrong!";
    }
}