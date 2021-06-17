import api from "../../../apiServices";

const verifyEmail = (payload) => api.post("/api/availabilityCheck", payload);

const checkEmailVerifiedThroughEmail = (payload) =>
  api.post("/api/ins_upd_del_User", payload);
const companyType = (payload) => api.post("/api/BindCompanyType", payload);
const sendOTP = (payload) =>
  api.post("api/sendmsgwithverificationcode", payload);
const verifyOTP = (payload) => api.post("api/UpdateMobileVerification");
const insertCerificateDetailsService = (payload) =>
  api.post("api/InsertCertifateDetails", payload);
const insertTempTask = (payload) => api.post("api/insertTempTask", payload);

export default {
  verifyEmail,
    insertTempTask,
  checkEmailVerifiedThroughEmail,
  companyType,
  sendOTP,
  verifyOTP,
  insertCerificateDetailsService,
};
