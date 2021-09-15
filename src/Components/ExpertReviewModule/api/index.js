import api from "../../../../../apiServices";

const getTaskReport = (payload) => api.post("/api/getTaskReport", payload);

const getTaskReportByID = (payload) => api.post("/api/GetTask", payload);

const getUsersByRole = (payload) => api.post("/api/getUsersByRole", payload);

const getTaskComments = (payload) =>
  api.post(`/api/bindTaskComments?taskid=${payload.taskid}`);

const postTaskComments = (payload) => api.post("/api/TaskComments", payload);

const postUploadFile = (payload) =>
  api.post(`/api/UploadFile?Taskid=${payload.taskid}`);

const postAssignTask = (payload) => api.post("/api/ChangeTaskStatus", payload);

const getAvailabilityCheck = (payload) =>
  api.post("/api/availabilityCheck", payload);

const postCodetailsInsUpdDel = (payload) =>
  api.post("/api/ins_upd_del_User", payload);

const GetEntityLicenseTask = (payload) =>
  api.post("api/GetEntityLicenseTask", payload);

const GetCOCompanyType = (payload) => api.post("api/BindCompanyType", payload);

const insertCerificateDetailsArray = (payload) =>
  api.post("api/InsertCertifateDetailsArray", payload);

const getAllNotifications = (payload) => api.post("api/Notifications", payload);

const coSettingCommonApi = (payload) => api.post("api/CoSettings", payload);

const migrateTasks = (payload) => api.post("api/Migrate", payload);
const getTeamMembers = (payload) => api.post("api/Migrate", payload);

export default {
  getTaskReport,
  getTaskReportByID,
  getUsersByRole,
  getTaskComments,
  postTaskComments,
  postUploadFile,
  postAssignTask,
  getAvailabilityCheck,
  postCodetailsInsUpdDel,
  GetEntityLicenseTask,
  GetCOCompanyType,
  insertCerificateDetailsArray,
  getAllNotifications,
  coSettingCommonApi,
  migrateTasks,
  getTeamMembers,
};
