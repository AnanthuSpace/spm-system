import axios from "axios";

const companyAxiosInstance = axios.create({
    baseURL: "http://localhost:3000/company"
});

companyAxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("companyToken");
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default companyAxiosInstance