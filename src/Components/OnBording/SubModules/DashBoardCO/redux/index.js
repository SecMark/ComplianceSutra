import api from "../../../apiServices";

const verifyEmail = (payload) => api.get("/api/availabilityCheck", payload);

const checkEmailVerifiedThroughEmail = (payload) =>
  api.get("ins_upd_del_User", {
    params: {
      uInput: payload,
    },
  });
const companyType = (payload) =>
  api.get("BindCompanyType", {
    params: {
      uInput: payload,
    },
  });
const sendOTP = (payload) =>
  api.get("sendmsgwithverificationcode", {
    params: {
      uInput: payload,
    },
  });
const verifyOTP = (payload) =>
  api.get("UpdateMobileVerification", {
    params: {
      uInput: payload,
    },
  });
const insertCerificateDetailsService = (payload) =>
  api.get("InsertCertifateDetails", {
    params: {
      uInput: payload,
    },
  });
const insertTempTask = (payload) =>
  api.get("insertTempTask", {
    params: {
      uInput: payload,
    },
  });

export default {
  verifyEmail,
  insertTempTask,
  checkEmailVerifiedThroughEmail,
  companyType,
  sendOTP,
  verifyOTP,
  insertCerificateDetailsService,
};
