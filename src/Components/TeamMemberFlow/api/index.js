import api from "../../../apiServices";

const insertUpdateAPIRequest = (payload) =>
  api.post("/api/ins_upd_del_User", payload);
const sendOTP = (payload) =>
  api.post("api/sendmsgwithverificationcode", payload);
const availabilityCheck = (payload) => api.post("/api/availabilityCheck", payload);

export default {
  insertUpdateAPIRequest,
  sendOTP,
  availabilityCheck
};
