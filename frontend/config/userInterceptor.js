import axios from "axios";

const userAxiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

userAxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default userAxiosInstance;