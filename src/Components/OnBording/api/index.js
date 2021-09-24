import api from "../../../apiServices";
import {
  audit_auth_url,
  audit_url,
  test_customization_url,
} from "../../../apiServices/baseurl";

const verifyEmail = (payload) =>
  api.post(`${audit_auth_url}availability_check_email`, payload);

const checkEmailVerifiedThroughEmail = (payload) =>
  api.post(`${audit_url}user.api.user_detail`, payload);
const companyType = (payload) =>
  api.get(`${test_customization_url}BindCompanyType`, {
    params: {
      uInput: payload,
    },
  });
const sendOTP = (payload) =>
  api.get(`${test_customization_url}sendmsgwithverificationcode`, {
    params: {
      uInput: payload,
    },
  });
const verifyOTP = (payload) =>
  api.get(`${test_customization_url}GetOTP`, {
    params: {
      uInput: payload,
    },
  });
const insertCerificateDetailsService = (payload) =>
  api.get(`${test_customization_url}InsertCertifateDetailsArray`, {
    params: {
      uInput: payload,
    },
  });
const insertTempTask = (payload) =>
  api.get(`${test_customization_url}insertTempTask`, {
    params: {
      uInput: payload,
    },
  });
const getAssignedTaskData = (payload) =>
  api.get(`${test_customization_url}GetEntityLicenseTask`, {
    params: {
      uInput: payload,
    },
  });
const getGovernanceCompanyData = (payload) =>
  api.get(`${test_customization_url}GetEntityCategory`, {
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
