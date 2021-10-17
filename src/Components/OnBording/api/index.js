import api from "../../../apiServices";

const verifyEmail = (payload) =>
  api.post("compliance.api.getEmailBody", payload);

const checkEmailVerifiedThroughEmail = (payload) =>
  api.post("compliance.api.signUp", payload);
const companyType = () => api.post("compliance.api.getIndustryCompanyDetails");
const getLicenseList = (payload) =>
  api.post("compliance.api.getIndustryLicenseDetails", payload);
const sendOTP = (payload) =>
  api.post("api/sendmsgwithverificationcode", payload);
const verifyOTP = (payload) => api.post("api/GetOTP");
const insertCerificateDetailsService = (payload) =>
  api.post("api/InsertCertifateDetailsArray", payload);
const insertTempTask = (payload) => api.post("api/insertTempTask", payload);
const getAssignedTaskData = (payload) => api.post("compliance.api.GetTaskList");
const getGovernanceCompanyData = () =>
  api.get("compliance.api.getGovernanceCompanyList");

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
  getLicenseList,
};
