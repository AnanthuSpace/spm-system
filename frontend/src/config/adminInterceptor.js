import axios from "axios";

const adminAxiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

adminAxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("adminToken");
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default adminAxiosInstance