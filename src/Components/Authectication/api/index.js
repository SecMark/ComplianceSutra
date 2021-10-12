import api from "../../../apiServices";

const loginAccount = (payload) =>
  api.post("compliance.compliance_api.login", payload);
const updatePassword = (payload) => api.post("api/UpdatePassword", payload);
export default {
  loginAccount,
  updatePassword,
};
