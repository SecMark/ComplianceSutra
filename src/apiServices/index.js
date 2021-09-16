import axios from "axios";
import { BACKEND_BASE_URL } from "./baseurl";
const BACKEND_URL = BACKEND_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  // headers: {
  //   Authorization: "token 2ecfeca7563d5:7ad99feb013135b",
  // },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.url = config.baseURL + config.url;
    config.params = {
      ...config.params,
    };
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
