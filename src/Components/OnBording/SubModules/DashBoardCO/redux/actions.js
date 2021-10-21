import { createAction } from "redux-actions";

// Action type

const TASK_REPORT_REQUEST = "CAPMTECH/TASK_REPORT_REQUEST";
const TASK_REPORT_REQUEST_SUCCESS = "CAPMTECH/TASK_REPORT_REQUEST_SUCCESS";
const TASK_REPORT_REQUEST_FAILED = "CAPMTECH/TASK_REPORT_REQUEST_FAILED";

const GET_TASK_REPORT_BY_ID = "CAPMTECH/GET_TASK_REPORT_BY_ID";
const GET_TASK_REPORT_SUCCESS_BY_ID = "CAPMTECH/GET_TASK_REPORT_SUCCESS_BY_ID";
const GET_TASK_REPORT_FAILED_BY_ID = "CAPMTECH/GET_TASK_REPORT_FAILED_BY_ID";

const GET_USER_BY_ROLE = "CAPMTECH/GET_USER_BY_ROLE";
const GET_USER_SUCCESS_BY_ROLE = "CAPMTECH/GET_USER_SUCCESS_BY_ROLE";
const GET_USER_FAILED_BY_ROLE = "CAPMTECH/GET_USER_FAILED_BY_ROLE";

const GET_TASK_COMMENTS_BY_TASK_ID = "CAPMTECH/GET_TASK_COMMENTS_BY_TASK_ID";
const GET_TASK_COMMENTS_SUCCESS_BY_TASK_ID =
  "CAPMTECH/GET_TASK_COMMENTS_SUCCESS_BY_TASK_ID";
const GET_TASK_COMMENTS_FAILED_BY_TASK_ID =
  "CAPMTECH/GET_TASK_COMMENTS_FAILED_BY_TASK_ID";

const GET_TASK_REFERENSES_BY_TASK_NAME =
  "CAPMTECH/GET_TASK_REFERENSES_BY_TASK_NAME";
const GET_TASK_REFERENSES_BY_TASK_NAME_SUCCESS =
  "CAPMTECH/GET_TASK_REFERENSES_BY_TASK_NAME_SUCCESS";
const GET_TASK_REFERENSES_BY_TASK_NAME_FAILED =
  "CAPMTECH/GET_TASK_REFERENSES_BY_TASK_NAME_FAILED";

const POST_TASK_COMMENT_BY_TASK_ID = "CAPMTECH/POST_TASK_COMMENT_BY_TASK_ID";
const POST_TASK_COMMENT_SUCCESS_BY_TASK_ID =
  "CAPMTECH/POST_TASK_COMMENT_SUCCESS_BY_TASK_ID";
const POST_TASK_COMMENTS_FAILED_BY_TASK_ID =
  "CAPMTECH/POST_TASK_COMMENTS_FAILED_BY_TASK_ID";

const CHANGE_TASK_STATUS = "CAPMTECH/CHANGE_TASK_STATUS";
const CHANGE_TASK_STATUS_SUCCESS = "CAPMTECH/CHANGE_TASK_STATUS_SUCCESS";
const CHANGE_TASK_STATUS_FAILED = "CAPMTECH/CHANGE_TASK_STATUS_FAILED";

const GET_TASK_FILES_BY_TASK_ID = "CAPMTECH/GET_TASK_FILES_BY_TASK_ID";
const GET_TASK_FILES_SUCESS_BY_TASK_ID =
  "CAPMTECH/GET_TASK_FILES_SUCESS_BY_TASK_ID";
const GET_TASK_FILES_FAILED_BY_TASK_ID =
  "CAPMTECH/GET_TASK_FILES_FAILED_BY_TASK_ID";

const POST_UPLOAD_FILE_BY_TASK_ID = "CAPMTECH/POST_TASK_COMMENT_BY_TASK_ID";
const POST_UPLOAD_FILE_SUCCESS_BY_TASK_ID =
  "CAPMTECH/POST_TASK_COMMENT_SUCCESS_BY_TASK_ID";
const POST_UPLOAD_FILE_FAILED_BY_TASK_ID =
  "CAPMTECH/POST_TASK_COMMENTS_FAILED_BY_TASK_ID";

const POST_ASSIGN_TASK_BY_TASKID = "CAPMTECH/POST_ASSIGN_TASK_BY_TASKID";
const POST_ASSIGN_TASK_SUCCESS_BY_TASKID =
  "CAPMTECH/POST_ASSIGN_TASK_SUCCESS_BY_TASKID";
const POST_ASSIGN_TASK_FAILED_BY_TASKID =
  "CAPMTECH/POST_ASSIGN_TASK_FAILED_BY_TASKID";

const GET_AVAILABILITY_CHECK = "CAPMTECH/GET_AVAILABILITY_CHECK";
const GET_AVAILABILITY_CHECK_SUCCESS =
  "CAPMTECH/GET_AVAILABILITY_CHECK_SUCCESS";
const GET_AVAILABILITY_CHECK_FAILED = "CAPMTECH/GET_AVAILABILITY_CHECK_FAILED";

const CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST =
  "CAPMTECH/CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST";
const CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST_SUCCESS =
  "CAPMTECH/CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST_SUCCESS";
const CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST_FAILED =
  "CAPMTECH/CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST_FAILED";

const CURRENT_ACTIVE_MENU = "CAPMTECH/CURRENT_ACTIVE_MENU";

const GET_ENTITY_LICENSE_TASK_REQUEST = "GET_ENTITY_LICENSE_TASK_REQUEST ";
const GET_ENTITY_LICENSE_TASK_REQUEST_SUCCESS =
  "GET_ENTITY_LICENSE_TASK_REQUEST_SUCCESS";
const GET_ENTITY_LICENSE_TASK_REQUEST_FAILED =
  "GET_ENTITY_LICENSE_TASK_REQUEST_FAILED";

const GET_COMPANY_TYPE_REQUEST = "GET_COMPANY_TYPE_REQUEST ";
const GET_COMPANY_TYPE_REQUEST_SUCCESS = "GET_COMPANY_TYPE_REQUEST_SUCCESS";
const GET_COMPANY_TYPE_REQUEST_FAILED = "GET_COMPANY_TYPE_REQUEST_FAILED";

const INS_CERTIFICATE_DETAILS_REQUEST = "INS_CERTIFICATE_DETAILS_REQUEST ";
const INS_CERTIFICATE_DETAILS_REQUEST_SUCCESS =
  "INS_CERTIFICATE_DETAILS_REQUEST_SUCCESS";
const INS_CERTIFICATE_DETAILS_REQUEST_FAILED =
  "INS_CERTIFICATE_DETAILS_REQUEST_FAILED";

const GET_CO_NOTIFICATIONS_REQUEST = "GET_CO_NOTIFICATIONS_REQUEST";
const GET_CO_NOTIFICATIONS_REQUEST_SUCCESS =
  "GET_CO_NOTIFICATIONS_REQUEST_SUCCESS";
const GET_CO_NOTIFICATIONS_REQUEST_FAILED =
  "GET_CO_NOTIFICATIONS_REQUEST_FAILED";

const GET_CO_ACCOUNT_REQUEST = "GET_CO_ACCOUNT_REQUEST";
const GET_CO_ACCOUNT_REQUEST_SUCCESS = "GET_CO_ACCOUNT_REQUEST_SUCCESS";
const GET_CO_ACCOUNT_REQUEST_FAILED = "GET_CO_ACCOUNT_REQUEST_FAILED";

const GET_PAYMENT_REQUEST = "GET_PAYMENT_REQUEST";
const GET_PAYMENT_REQUEST_SUCCESS = "GET_PAYMENT_REQUEST_SUCCESS";
const GET_PAYMENT_REQUEST_FAILED = "GET_PAYMENT_REQUEST_FAILED";

const GET_CO_ACCOUNT_LICENSES_REQUEST = "GET_CO_ACCOUNT_LICENSES_REQUEST";
const GET_CO_ACCOUNT_LICENSES_REQUEST_SUCCESS =
  "GET_CO_ACCOUNT_LICENSES_REQUEST_SUCCESS";
const GET_CO_ACCOUNT_LICENSES_REQUEST_FAILED =
  "GET_CO_ACCOUNT_LICENSES_REQUEST_FAILED";

const CO_ACCOUNT_UPDATE_REQUEST = "CO_ACCOUNT_UPDATE_REQUEST";
const CO_ACCOUNT_UPDATE_REQUEST_SUCCESS = "CO_ACCOUNT_UPDATE_REQUEST_SUCCESS";
const CO_ACCOUNT_UPDATE_REQUEST_FAILED = "CO_ACCOUNT_UPDATE_REQUEST_FAILED";

const CO_COMPANY_DELETE_REQUEST = "CO_COMPANY_DELETE_REQUEST";
const CO_COMPANY_DELETE_REQUEST_SUCCESS = "CO_COMPANY_DELETE_REQUEST_SUCCESS";
const CO_COMPANY_DELETE_REQUEST_FAILED = "CO_COMPANY_DELETE_REQUEST_FAILED";

// Action method

const taskReportRequest = createAction(TASK_REPORT_REQUEST);
const taskReportRequestSuccess = createAction(TASK_REPORT_REQUEST_SUCCESS);
const taskReportRequestFailed = createAction(TASK_REPORT_REQUEST_FAILED);

const taskReportByIdRequest = createAction(GET_TASK_REPORT_BY_ID);
const taskReportByIdRequestSuccess = createAction(
  GET_TASK_REPORT_SUCCESS_BY_ID
);
const taskReportByIdRequestFailed = createAction(GET_TASK_REPORT_FAILED_BY_ID);

const taskReferensesByNameRequest = createAction(
  GET_TASK_REFERENSES_BY_TASK_NAME
);
const taskReferensesByNameSuccess = createAction(
  GET_TASK_REFERENSES_BY_TASK_NAME_SUCCESS
);
const taskReferensesByNameFailed = createAction(
  GET_TASK_REFERENSES_BY_TASK_NAME_FAILED
);

const userByRoleRequest = createAction(GET_USER_BY_ROLE);
const userByRoleRequestSuccess = createAction(GET_USER_SUCCESS_BY_ROLE);
const userByRoleRequestFailed = createAction(GET_USER_FAILED_BY_ROLE);

const taskCommentsByTaskIdRequest = createAction(GET_TASK_COMMENTS_BY_TASK_ID);
const taskCommentsByTaskIdSuccess = createAction(
  GET_TASK_COMMENTS_SUCCESS_BY_TASK_ID
);
const taskCommentsByTaskIdFailed = createAction(
  GET_TASK_COMMENTS_FAILED_BY_TASK_ID
);

const postTaskCommentByTaskID = createAction(POST_TASK_COMMENT_BY_TASK_ID);
const postTaskCommentByTaskIDSuccess = createAction(
  POST_TASK_COMMENT_SUCCESS_BY_TASK_ID
);
const postTaskCommentByTaskIDFailed = createAction(
  POST_TASK_COMMENTS_FAILED_BY_TASK_ID
);

const changeTaskStatusRequest = createAction(CHANGE_TASK_STATUS);
const changeTaskStatusSuccess = createAction(CHANGE_TASK_STATUS_SUCCESS);
const changeTaskStatusFailed = createAction(CHANGE_TASK_STATUS_FAILED);

const getTaskFilesById = createAction(GET_TASK_FILES_BY_TASK_ID);
const getTaskFilesByIdSucess = createAction(GET_TASK_FILES_SUCESS_BY_TASK_ID);
const getTaskFilesByIdFailed = createAction(GET_TASK_FILES_FAILED_BY_TASK_ID);

const postUploadFileByID = createAction(POST_UPLOAD_FILE_BY_TASK_ID);
const postUploadFileByIDSuccess = createAction(
  POST_UPLOAD_FILE_SUCCESS_BY_TASK_ID
);
const postUploadFileByIDFailed = createAction(
  POST_UPLOAD_FILE_FAILED_BY_TASK_ID
);

const taskAssignByTaskID = createAction(POST_ASSIGN_TASK_BY_TASKID);
const taskAssignByTaskIDSuccess = createAction(
  POST_ASSIGN_TASK_SUCCESS_BY_TASKID
);
const taskAssignByTaskIDFailed = createAction(
  POST_ASSIGN_TASK_FAILED_BY_TASKID
);

const availabilityCheckequest = createAction(GET_AVAILABILITY_CHECK);
const availabilityCheckRequestSuccess = createAction(
  GET_AVAILABILITY_CHECK_SUCCESS
);
const availabilityCheckRequestFailed = createAction(
  GET_AVAILABILITY_CHECK_FAILED
);

const coDetailsInsUpdDelRequest = createAction(
  CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST
);
const coDetailsInsUpdDelRequestSuccess = createAction(
  CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST_SUCCESS
);
const coDetailsInsUpdDelRequestFailed = createAction(
  CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST_FAILED
);

const setActiveMenu = createAction(CURRENT_ACTIVE_MENU);

const getEntityLicenseTaskRequest = createAction(
  GET_ENTITY_LICENSE_TASK_REQUEST
);
const getEntityLicenseTaskRequestSuccess = createAction(
  GET_ENTITY_LICENSE_TASK_REQUEST_SUCCESS
);
const getEntityLicenseTaskRequestFailed = createAction(
  GET_ENTITY_LICENSE_TASK_REQUEST_FAILED
);

const getCompanyTypeRequest = createAction(GET_COMPANY_TYPE_REQUEST);
const getCompanyTypeRequestSuccess = createAction(
  GET_COMPANY_TYPE_REQUEST_SUCCESS
);
const getCompanyTypeRequestFailed = createAction(
  GET_COMPANY_TYPE_REQUEST_FAILED
);

const insCertificateDetailsRequest = createAction(
  INS_CERTIFICATE_DETAILS_REQUEST
);
const insCertificateDetailsRequestSuccess = createAction(
  INS_CERTIFICATE_DETAILS_REQUEST_SUCCESS
);
const insCertificateDetailsRequestFailed = createAction(
  INS_CERTIFICATE_DETAILS_REQUEST_FAILED
);

const getCoNotificationsRequest = createAction(GET_CO_NOTIFICATIONS_REQUEST);
const getCoNotificationsRequestSuccess = createAction(
  GET_CO_NOTIFICATIONS_REQUEST_SUCCESS
);
const getCoNotificationsRequestFailed = createAction(
  GET_CO_NOTIFICATIONS_REQUEST_FAILED
);

const getCoAccountRequest = createAction(GET_CO_ACCOUNT_REQUEST);
const getCoAccountRequestSuccess = createAction(GET_CO_ACCOUNT_REQUEST_SUCCESS);
const getCoAccountRequestFailed = createAction(GET_CO_ACCOUNT_REQUEST_FAILED);

const getPaymentRequest = createAction(GET_PAYMENT_REQUEST);
const getPaymentSuccess = createAction(GET_PAYMENT_REQUEST_SUCCESS);
const getPaymentFailed = createAction(GET_PAYMENT_REQUEST_FAILED);

const getCoAccountLicensesRequest = createAction(
  GET_CO_ACCOUNT_LICENSES_REQUEST
);
const getCoAccountLicensesRequestSuccess = createAction(
  GET_CO_ACCOUNT_LICENSES_REQUEST_SUCCESS
);
const getCoAccountLicensesRequestFailed = createAction(
  GET_CO_ACCOUNT_LICENSES_REQUEST_FAILED
);

const coAccountUpdateRequest = createAction(CO_ACCOUNT_UPDATE_REQUEST);
const coAccountUpdateRequestSuccess = createAction(
  CO_ACCOUNT_UPDATE_REQUEST_SUCCESS
);
const coAccountUpdateRequestFailed = createAction(
  CO_ACCOUNT_UPDATE_REQUEST_FAILED
);

const deleteCompanyRequest = createAction(CO_COMPANY_DELETE_REQUEST);
const deleteCompanyRequestSuccess = createAction(
  CO_COMPANY_DELETE_REQUEST_SUCCESS
);
const deleteCompanyRequestFailed = createAction(
  CO_COMPANY_DELETE_REQUEST_FAILED
);

export const actions = {
  setActiveMenu,
  taskReportRequest,
  taskReportRequestSuccess,
  taskReportRequestFailed,

  taskReportByIdRequest,
  taskReportByIdRequestSuccess,
  taskReportByIdRequestFailed,

  taskReferensesByNameRequest,
  taskReferensesByNameSuccess,
  taskReferensesByNameFailed,

  userByRoleRequest,
  userByRoleRequestSuccess,
  userByRoleRequestFailed,

  taskCommentsByTaskIdRequest,
  taskCommentsByTaskIdSuccess,
  taskCommentsByTaskIdFailed,

  postTaskCommentByTaskID,
  postTaskCommentByTaskIDSuccess,
  postTaskCommentByTaskIDFailed,

  changeTaskStatusRequest,
  changeTaskStatusSuccess,
  changeTaskStatusFailed,

  getTaskFilesById,
  getTaskFilesByIdSucess,
  getTaskFilesByIdFailed,

  postUploadFileByID,
  postUploadFileByIDSuccess,
  postUploadFileByIDFailed,

  taskAssignByTaskID,
  taskAssignByTaskIDSuccess,
  taskAssignByTaskIDFailed,

  availabilityCheckequest,
  availabilityCheckRequestSuccess,
  availabilityCheckRequestFailed,

  coDetailsInsUpdDelRequest,
  coDetailsInsUpdDelRequestSuccess,
  coDetailsInsUpdDelRequestFailed,

  getEntityLicenseTaskRequest,
  getEntityLicenseTaskRequestSuccess,
  getEntityLicenseTaskRequestFailed,

  getCompanyTypeRequest,
  getCompanyTypeRequestSuccess,
  getCompanyTypeRequestFailed,

  insCertificateDetailsRequest,
  insCertificateDetailsRequestSuccess,
  insCertificateDetailsRequestFailed,

  getCoNotificationsRequest,
  getCoNotificationsRequestSuccess,
  getCoNotificationsRequestFailed,

  getCoAccountRequest,
  getCoAccountRequestSuccess,
  getCoAccountRequestFailed,

  getCoAccountLicensesRequest,
  getCoAccountLicensesRequestSuccess,
  getCoAccountLicensesRequestFailed,

  getPaymentRequest,
  getPaymentSuccess,
  getPaymentFailed,

  coAccountUpdateRequest,
  coAccountUpdateRequestSuccess,
  coAccountUpdateRequestFailed,

  deleteCompanyRequest,
  deleteCompanyRequestSuccess,
  deleteCompanyRequestFailed,
};

export const types = {
  CURRENT_ACTIVE_MENU,

  TASK_REPORT_REQUEST,
  TASK_REPORT_REQUEST_SUCCESS,
  TASK_REPORT_REQUEST_FAILED,

  GET_TASK_REPORT_BY_ID,
  GET_TASK_REPORT_SUCCESS_BY_ID,
  GET_TASK_REPORT_FAILED_BY_ID,

  GET_TASK_REFERENSES_BY_TASK_NAME,
  GET_TASK_REFERENSES_BY_TASK_NAME_SUCCESS,
  GET_TASK_REFERENSES_BY_TASK_NAME_FAILED,

  GET_USER_BY_ROLE,
  GET_USER_SUCCESS_BY_ROLE,
  GET_USER_FAILED_BY_ROLE,

  GET_TASK_COMMENTS_BY_TASK_ID,
  GET_TASK_COMMENTS_SUCCESS_BY_TASK_ID,
  GET_TASK_COMMENTS_FAILED_BY_TASK_ID,

  POST_TASK_COMMENT_BY_TASK_ID,
  POST_TASK_COMMENT_SUCCESS_BY_TASK_ID,
  POST_TASK_COMMENTS_FAILED_BY_TASK_ID,

  GET_TASK_FILES_BY_TASK_ID,
  GET_TASK_FILES_SUCESS_BY_TASK_ID,
  GET_TASK_FILES_FAILED_BY_TASK_ID,

  POST_UPLOAD_FILE_BY_TASK_ID,
  POST_UPLOAD_FILE_SUCCESS_BY_TASK_ID,
  POST_UPLOAD_FILE_FAILED_BY_TASK_ID,

  POST_ASSIGN_TASK_BY_TASKID,
  POST_ASSIGN_TASK_SUCCESS_BY_TASKID,
  POST_ASSIGN_TASK_FAILED_BY_TASKID,

  CHANGE_TASK_STATUS,
  CHANGE_TASK_STATUS_SUCCESS,
  CHANGE_TASK_STATUS_FAILED,

  GET_AVAILABILITY_CHECK,
  GET_AVAILABILITY_CHECK_SUCCESS,
  GET_AVAILABILITY_CHECK_FAILED,

  CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST,
  CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST_SUCCESS,
  CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST_FAILED,

  GET_ENTITY_LICENSE_TASK_REQUEST,
  GET_ENTITY_LICENSE_TASK_REQUEST_SUCCESS,
  GET_ENTITY_LICENSE_TASK_REQUEST_FAILED,

  GET_COMPANY_TYPE_REQUEST,
  GET_COMPANY_TYPE_REQUEST_SUCCESS,
  GET_COMPANY_TYPE_REQUEST_FAILED,

  INS_CERTIFICATE_DETAILS_REQUEST,
  INS_CERTIFICATE_DETAILS_REQUEST_SUCCESS,
  INS_CERTIFICATE_DETAILS_REQUEST_FAILED,

  GET_CO_NOTIFICATIONS_REQUEST,
  GET_CO_NOTIFICATIONS_REQUEST_SUCCESS,
  GET_CO_NOTIFICATIONS_REQUEST_FAILED,

  GET_CO_ACCOUNT_REQUEST,
  GET_CO_ACCOUNT_REQUEST_SUCCESS,
  GET_CO_ACCOUNT_REQUEST_FAILED,

  GET_PAYMENT_REQUEST,
  GET_PAYMENT_REQUEST_SUCCESS,
  GET_PAYMENT_REQUEST_FAILED,

  GET_CO_ACCOUNT_LICENSES_REQUEST,
  GET_CO_ACCOUNT_LICENSES_REQUEST_SUCCESS,
  GET_CO_ACCOUNT_LICENSES_REQUEST_FAILED,

  CO_ACCOUNT_UPDATE_REQUEST,
  CO_ACCOUNT_UPDATE_REQUEST_SUCCESS,
  CO_ACCOUNT_UPDATE_REQUEST_FAILED,

  CO_COMPANY_DELETE_REQUEST,
  CO_COMPANY_DELETE_REQUEST_SUCCESS,
  CO_COMPANY_DELETE_REQUEST_FAILED,
};
