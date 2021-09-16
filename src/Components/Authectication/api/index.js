import api from "../../../apiServices";
const loginAccount = (payload) => api.post("user_login", payload);
const updatePassword = (payload) => api.post("update_password", payload);
export default {
  loginAccount,
  updatePassword,
};
