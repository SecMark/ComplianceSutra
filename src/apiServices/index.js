import axios from "axios";
import { BACKEND_BASE_URL } from "./baseurl";
const BACKEND_URL = BACKEND_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("basicToken");
    if (auth) {
      config.headers = {
        Authorization: `Basic ZmVhY2NiOGJkNWZkMDJhOjc4NTAzYWI3N2UwNzI5Ng==`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default axiosInstance;
