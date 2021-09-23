import api from "../../../apiServices";
import { audit_auth_url } from "../../../apiServices/baseurl";
const loginAccount = (payload) =>
  api.post(`${audit_auth_url}user_login`, payload);
const updatePassword = (payload) =>
  api.post(`${audit_auth_url}update_password`, payload);
export default {
  loginAccount,
  updatePassword,
};
