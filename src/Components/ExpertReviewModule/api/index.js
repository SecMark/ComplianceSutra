import api from "../../../../../apiServices";

const getTaskReport = (payload) =>
  api.get("getTaskReport", { params: { uInput: payload } });

const getTaskReportByID = (payload) =>
  api.get("GetTask", { params: { uInput: payload } });

const getUsersByRole = (payload) =>
  api.get("getUsersByRole", { params: { uInput: payload } });

const getTaskComments = (payload) =>
  api.get(`bindTaskComments`, {
    params: {
      uInput: { taskid: `${payload.taskid}`, link: `${payload.link || 0}` },
    },
  });

const postTaskComments = (payload) =>
  api.get("TaskComments", { params: { uInput: payload } });

const postUploadFile = (payload) =>
  api.get(`UploadFile?Taskid=${payload.taskid}`);

const postAssignTask = (payload) =>
  api.get("ChangeTaskStatus", { params: { uInput: payload } });

const getAvailabilityCheck = (payload) =>
  api.get("availabilityCheck", { params: { uInput: payload } });

const postCodetailsInsUpdDel = (payload) =>
  api.get("ins_upd_del_User", { params: { uInput: payload } });

const GetEntityLicenseTask = (payload) =>
  api.get("GetEntityLicenseTask", payload);

const GetCOCompanyType = (payload) =>
  api.get("BindCompanyType", { params: { uInput: payload } });

const insertCerificateDetailsArray = (payload) =>
  api.get("InsertCertifateDetailsArray", { params: { uInput: payload } });

const getAllNotifications = (payload) =>
  api.get("Notifications", { params: { uInput: payload } });

const coSettingCommonApi = (payload) =>
  api.get("CoSettings", { params: { uInput: payload } });

const migrateTasks = (payload) =>
  api.get("Migrate", { params: { uInput: payload } });
const getTeamMembers = (payload) =>
  api.get("Migrate", { params: { uInput: payload } });

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
