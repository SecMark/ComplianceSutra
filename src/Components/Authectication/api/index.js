import api from "../../../apiServices";

const loginAccount = (payload) =>
  api.post("authentication.api.user_login", payload);
const updatePassword = (payload) =>
  api.post("authentication.api.update_password", payload);
export default {
  loginAccount,
  updatePassword,
};
