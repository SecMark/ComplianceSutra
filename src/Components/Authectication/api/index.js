import api from "../../../apiServices";

const loginAccount = (payload) => api.post("compliance.api.Login", payload);
const updatePassword = (payload) => api.post("api/UpdatePassword", payload);
const setToken = (payload) => api.post("compliance.api.setFCMToken", payload);

export default {
  loginAccount,
  updatePassword,
  setToken,
};
