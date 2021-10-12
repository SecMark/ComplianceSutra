import api from "../../../apiServices";

const verifyEmail = (payload) => api.post("/api/availabilityCheck", payload);

const checkEmailVerifiedThroughEmail = (payload) =>
  api.post("compliance.api.signUp", payload);
const companyType = (payload) => api.post("compliance.api.getCompanyType");
const sendOTP = (payload) =>
  api.post("api/sendmsgwithverificationcode", payload);
const verifyOTP = (payload) => api.post("api/GetOTP");
const insertCerificateDetailsService = (payload) =>
  api.post("api/InsertCertifateDetailsArray", payload);
const insertTempTask = (payload) => api.post("api/insertTempTask", payload);
const getAssignedTaskData = (payload) =>
  api.post("api/GetEntityLicenseTask", payload);
const getGovernanceCompanyData = (payload) =>
  api.post("api/GetEntityCategory", payload);

export default {
  verifyEmail,
  insertTempTask,
  checkEmailVerifiedThroughEmail,
  companyType,
  sendOTP,
  verifyOTP,
  getGovernanceCompanyData,
  insertCerificateDetailsService,
  getAssignedTaskData,
};
