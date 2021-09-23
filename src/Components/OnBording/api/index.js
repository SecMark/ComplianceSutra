import api from "../../../apiServices";
import { audit_auth_url, audit_url } from "../../../apiServices/baseurl";

const verifyEmail = (payload) =>
  api.post(`${audit_auth_url}availability_check_email`, payload);

const checkEmailVerifiedThroughEmail = (payload) =>
  api.post(`${audit_url}user.api.user_detail`, payload);
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
  api.get("GetOTP", {
    params: {
      uInput: payload,
    },
  });
const insertCerificateDetailsService = (payload) =>
  api.get("InsertCertifateDetailsArray", {
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
const getAssignedTaskData = (payload) =>
  api.get("GetEntityLicenseTask", {
    params: {
      uInput: payload,
    },
  });
const getGovernanceCompanyData = (payload) =>
  api.get("GetEntityCategory", {
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
  getGovernanceCompanyData,
  insertCerificateDetailsService,
  getAssignedTaskData,
};
