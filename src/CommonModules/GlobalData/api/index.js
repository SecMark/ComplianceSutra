import api from "../../../apiServices";

const getCountryCodeList = (payload) => api.post("/api/Loginsuccess", payload);

const getTaskReport = (payload) => api.post("api/getTaskReport", payload);

const getUpdates = (payload) => api.post("api/Updates", payload);

export default {
  getCountryCodeList,
  getTaskReport,
  getUpdates,
};
