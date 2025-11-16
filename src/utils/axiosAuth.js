import axios from "axios";

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosAuth;
