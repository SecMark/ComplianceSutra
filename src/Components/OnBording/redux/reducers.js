import { handleActions } from "redux-actions";
import { types } from "./actions";

const actionHandler = {
  [types.VERIFY_EMAIL_REQUEST]: (state) => ({
    ...state,
    isEmailVerified: false,
    verifyEmailInfo: {},
  }),
  [types.VERIFY_EMAIL_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    isVerifiedEmail: false,
    verifyEmailInfo: {},
    emailAlreadExist: payload.emailAlreadyExistMessage,
  }),
  [types.VERIFY_EMAIL_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    verifyEmailInfo: payload,
  }),

  [types.INS_UPDATE_DELETE_API_REQUEST]: (state) => ({
    ...state,
    isEmailVerified: false,
    emailInfo: {},
    personalInfo: {},
  }),
  [types.INS_UPDATE_DELETE_API_FAILED]: (state, { payload }) => ({
    ...state,
    isVerifiedEmail: false,
    emailInfo: {},
    personalInfo: {},
  }),
  [types.INS_UPDATE_DELETE_API_SUCCESS]: (state, { payload }) => ({
    ...state,
    isVerifiedEmail: true,
    emailInfo: payload,
    personalInfo: payload,
    userData: payload.userInfo,
  }),
  [types.COMPANY_TYPE_REQUEST]: (state) => ({
    ...state,
    loader: true,
    companyType: false,
    companyInfo: {},
  }),
  [types.COMPANY_TYPE_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    companyType: false,
    companyInfo: payload,
    loader: false,
  }),
  [types.COMPANY_TYPE_REQUEST_FAILED]: (state) => ({
    ...state,
    companyType: true,
    companyInfo: {},
    loader: false,
  }),
  [types.SEND_OTP_ACTION_REQUEST]: (state) => ({
    ...state,
    otoInfo: {},
  }),
  [types.SEND_OTP_ACTION_SUCCESS]: (state, { payload }) => ({
    ...state,
    otoInfo: payload,
  }),
  [types.SEND_OTP_ACTION_FAILED]: (state) => ({
    ...state,
    otoInfo: {},
  }),
  [types.VERIFY_OTP_REQUEST]: (state) => ({
    ...state,
    verifiedOtpInfo: {},
  }),
  [types.VERIFY_OTP_SUCCESS]: (state, { payload }) => ({
    ...state,
    verifiedOtpInfo: payload,
  }),
  [types.VERIFY_OTP_FAILED]: (state) => ({
    ...state,
    verifiedOtpInfo: {},
  }),

  [types.INSERTCERIFICATEDETAILS_REQUEST]: (state) => ({
    ...state,
    certificateloader: false,
    cerificateInfo: {},
  }),
  [types.INSERTCERIFICATEDETAILS_SUCCESS]: (state, { payload }) => ({
    ...state,
    cerificateInfo: payload,
  }),
  [types.INSERTCERIFICATEDETAILS_FAILED]: (state) => ({
    ...state,
    cerificateInfo: {},
    certificateloader: true,
  }),

  [types.INSERT_TASK_DATA_REQUEST]: (state) => ({
    ...state,
    taskInfo: {},
  }),
  [types.INSERT_TASK_DATA_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    taskInfo: payload,
  }),
  [types.INSERT_TASK_DATA_REQUEST_FAILED]: (state) => ({
    ...state,
    taskInfo: {},
  }),

  [types.SEND_MAIL_TASK_REQUEST]: (state) => ({
    ...state,
    taskMailInfo: {},
  }),
  [types.SEND_MAIL_TASK_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    taskMailInfo: payload,
  }),
  [types.SEND_MAIL_TASK_REQUEST_FAILED]: (state) => ({
    ...state,
    taskMailInfo: {},
  }),
  [types.GET_ASSIGN_TASK_DATA_REQUEST]: (state) => ({
    ...state,
    assignedTaskData: {},
  }),
  [types.GET_ASSIGN_TASK_DATA_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    assignedTaskData: payload,
  }),
  [types.GET_ASSIGN_TASK_DATA_REQUEST_FAILED]: (state) => ({
    ...state,
    assignedTaskData: {},
  }),
  [types.UPDATE_MOBILE_NUMBER_OTP_REQUEST]: (state) => ({
    ...state,
    updateMobileNumber: false,
  }),
  [types.UPDATE_MOBILE_NUMBER_OTP_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    updateMobileNumber: false,
  }),
  [types.UPDATE_MOBILE_NUMBER_OTP_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    updateMobileNumber: true,
  }),
  [types.GOVERNANCEDATA_REQUEST]: (state) => ({
    ...state,
    goveranceData: {},
  }),
  [types.GOVERNANCEDATA_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    goveranceData: payload,
  }),
  [types.GOVERNANCEDATA_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    goveranceData: payload,
  }),
  [types.STORE_ENTITYID]: (state, { payload }) => ({
    ...state,
    entityInfo: payload,
  }),

  [types.CLEAR_EMAIL_ALREADY_CACHE]: (state, { payload }) => ({
    ...state,
    emailAlreadExist: payload,
  }),
  [types.SET_LICENSE_LIST]: (state, { payload }) => ({
    ...state,
    licencedata: { industry_type: payload.category, country: payload.country },
  }),
  [types.SET_LICENSE_LIST]: (state, { payload }) => ({
    ...state,
    licenseList: payload,
  }),

  [types.SET_LOADER]: (state, { payload }) => ({
    ...state,
    loader: payload,
  }),
};

export default handleActions(actionHandler, {
  isVerifiedEmail: false,
  emailInfo: {},
  emailAlreadExist: "",
  verifyEmailInfo: {},
  companyType: false,
  companyInfo: {},
  personalInfo: {},
  loader: false,
  certificateloader: false,
  otoInfo: {},
  verifiedOtpInfo: {},
  cerificateInfo: {},
  taskInfo: {},
  taskMailInfo: {},
  assignedTaskData: {},
  updateMobileNumber: false,
  otpStatusCo: {},
  entityInfo: [],
  userInfo: {},
  userData: {},
  goveranceData: {},
  licenseList: {},
  licencedata: {},
});
