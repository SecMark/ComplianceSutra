import { handleActions } from "redux-actions";
import { types } from "./actions";

const actionHandler = {
  [types.TASK_REPORT_REQUEST]: (state) => ({
    ...state,
    taskReport: {},
  }),
  [types.CURRENT_ACTIVE_MENU]: (state, { payload }) => ({
    ...state,
    currentMenu: payload,
  }),

  [types.TASK_REPORT_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    taskReport: {},
  }),
  [types.TASK_REPORT_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    taskReport: payload,
  }),

  [types.GET_TASK_REPORT_BY_ID]: (state) => ({
    ...state,
    taskReportById: {},
  }),
  [types.GET_TASK_REPORT_FAILED_BY_ID]: (state, { payload }) => ({
    ...state,
    taskReportById: {},
  }),
  [types.GET_TASK_REPORT_SUCCESS_BY_ID]: (state, { payload }) => ({
    ...state,
    taskReportById: payload,
  }),

  [types.GET_USER_BY_ROLE]: (state) => ({
    ...state,
    getUserByRole: {},
  }),
  [types.GET_USER_FAILED_BY_ROLE]: (state, { payload }) => ({
    ...state,
    getUserByRole: payload,
  }),
  [types.GET_USER_SUCCESS_BY_ROLE]: (state, { payload }) => ({
    ...state,
    getUserByRole: payload,
  }),

  [types.GET_TASK_COMMENTS_BY_TASK_ID]: (state) => ({
    ...state,
    getTaskCommentByRole: {},
  }),
  [types.GET_TASK_COMMENTS_FAILED_BY_TASK_ID]: (state, { payload }) => ({
    ...state,
    getTaskCommentByRole: {},
  }),
  [types.GET_TASK_COMMENTS_SUCCESS_BY_TASK_ID]: (state, { payload }) => ({
    ...state,
    getTaskCommentByRole: payload,
  }),

  [types.POST_TASK_COMMENT_BY_TASK_ID]: (state) => ({
    ...state,
    postTaskCommentById: {},
  }),
  [types.POST_TASK_COMMENTS_FAILED_BY_TASK_ID]: (state, { payload }) => ({
    ...state,
    postTaskCommentById: {},
  }),
  [types.POST_TASK_COMMENTS_SUCCESS_BY_TASK_ID]: (state, { payload }) => ({
    ...state,
    postTaskCommentById: payload,
  }),

  [types.GET_TASK_FILES_BY_TASK_ID]: (state) => ({
    ...state,
    taskFilesById: {},
  }),
  [types.GET_TASK_FILES_FAILED_BY_TASK_ID]: (state) => ({
    ...state,
    taskFilesById: {},
  }),
  [types.GET_TASK_FILES_SUCESS_BY_TASK_ID]: (state, { payload }) => ({
    ...state,
    taskFilesById: payload,
  }),

  [types.POST_UPLOAD_FILE_BY_TASK_ID]: (state) => ({
    ...state,
    postUploadFile: {},
  }),
  [types.POST_UPLOAD_FILE_FAILED_BY_TASK_ID]: (state, { payload }) => ({
    ...state,
    postUploadFile: {},
  }),
  [types.POST_UPLOAD_FILE_SUCCESS_BY_TASK_ID]: (state, { payload }) => ({
    ...state,
    postUploadFile: payload,
  }),

  [types.POST_ASSIGN_TASK_BY_TASKID]: (state) => ({
    ...state,
    postAssignTask: {},
  }),
  [types.POST_ASSIGN_TASK_FAILED_BY_TASKID]: (state, { payload }) => ({
    ...state,
    postAssignTask: {},
  }),
  [types.POST_ASSIGN_TASK_SUCCESS_BY_TASKID]: (state, { payload }) => ({
    ...state,
    postAssignTask: payload,
  }),

  [types.GET_AVAILABILITY_CHECK]: (state) => ({
    ...state,
    userAvailability: {},
  }),
  [types.GET_AVAILABILITY_CHECK_SUCCESS]: (state, { payload }) => ({
    ...state,
    userAvailability: payload,
  }),
  [types.GET_AVAILABILITY_CHECK_FAILED]: (state, { payload }) => ({
    ...state,
    userAvailability: {},
  }),

  [types.CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST]: (state) => ({
    ...state,
    coDetailsInsUpdDelInfo: {},
  }),
  [types.CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST_SUCCESS]: (
    state,
    { payload }
  ) => ({
    ...state,
    coDetailsInsUpdDelInfo: payload,
  }),
  [types.CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST_FAILED]: (
    state,
    { payload }
  ) => ({
    ...state,
    coDetailsInsUpdDelInfo: payload,
  }),

  [types.GET_ENTITY_LICENSE_TASK_REQUEST]: (state) => ({
    ...state,
    coEntityLicenseTask: {},
  }),
  [types.GET_ENTITY_LICENSE_TASK_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    coEntityLicenseTask: payload,
  }),
  [types.GET_ENTITY_LICENSE_TASK_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    coEntityLicenseTask: {},
  }),

  [types.GET_COMPANY_TYPE_REQUEST]: (state) => ({
    ...state,
    companyTypeInfo: {},
  }),
  [types.GET_COMPANY_TYPE_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    companyTypeInfo: payload,
  }),
  [types.GET_COMPANY_TYPE_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    companyTypeInfo: {},
  }),

  [types.INS_CERTIFICATE_DETAILS_REQUEST]: (state) => ({
    ...state,
    CompanyAddEditStatus: {},
  }),
  [types.INS_CERTIFICATE_DETAILS_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    CompanyAddEditStatus: payload,
  }),
  [types.INS_CERTIFICATE_DETAILS_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    CompanyAddEditStatus: payload,
  }),

  [types.GET_CO_NOTIFICATIONS_REQUEST]: (state) => ({
    ...state,
    userNotifications: {},
  }),
  [types.GET_CO_NOTIFICATIONS_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    userNotifications: payload,
  }),
  [types.GET_CO_NOTIFICATIONS_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    userNotifications: {},
  }),

  [types.GET_CO_ACCOUNT_REQUEST]: (state) => ({
    ...state,
    coAccountInfo: {},
  }),
  [types.GET_CO_ACCOUNT_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    coAccountInfo: payload,
  }),
  [types.GET_CO_ACCOUNT_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    coAccountInfo: {},
  }),

  [types.GET_CO_ACCOUNT_LICENSES_REQUEST]: (state) => ({
    ...state,
    coAccountLicenses: {},
  }),
  [types.GET_CO_ACCOUNT_LICENSES_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    coAccountLicenses: payload,
  }),
  [types.GET_CO_ACCOUNT_LICENSES_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    coAccountLicenses: {},
  }),

  [types.CO_ACCOUNT_UPDATE_REQUEST]: (state) => ({
    ...state,
    coAccountUpdStatus: {},
  }),
  [types.CO_ACCOUNT_UPDATE_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    coAccountUpdStatus: payload,
  }),
  [types.CO_ACCOUNT_UPDATE_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    coAccountUpdStatus: payload,
  }),

  [types.CO_COMPANY_DELETE_REQUEST]: (state) => ({
    ...state,
    companyDeleteStatus: {},
  }),
  [types.CO_COMPANY_DELETE_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    companyDeleteStatus: payload,
  }),
  [types.CO_COMPANY_DELETE_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    companyDeleteStatus: payload,
  }),
};

export default handleActions(actionHandler, {
  currentMenu: "taskList",
  taskReport: {},
  taskReportById: {},
  getUserByRole: {},
  getTaskCommentByRole: {},
  postTaskCommentById: {},
  postUploadFile: {},
  postAssignTask: {},
  userAvailability: {},
  coDetailsInsUpdDelInfo: {},
  coEntityLicenseTask: {},
  companyTypeInfo: {},
  CompanyAddEditStatus: {},
  userNotifications: {},
  coAccountInfo: {},
  coAccountLicenses: {},
  coAccountUpdStatus: {},
  companyDeleteStatus: {},
});
