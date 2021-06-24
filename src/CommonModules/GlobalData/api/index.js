import axios from "axios";
import api from "../../../apiServices";

const getCountryCodeList = (payload) => api.post("/api/Loginsuccess", payload);

const getTaskReport = (payload) => api.post("api/getTaskReport", payload);

const getReAssignTasksList = (payload) => api.post("api/", payload);

export default {
  getCountryCodeList,
  getTaskReport,
  getReAssignTasksList,
};
