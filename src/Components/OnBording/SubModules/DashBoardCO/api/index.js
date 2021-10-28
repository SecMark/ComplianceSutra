import axiosInstance from "../../../../../apiServices";
import api from "../../../../../apiServices";
import { BACKEND_BASE_URL } from "../../../../../apiServices/baseurl";

const getTaskReport = (payload) =>
  api.get("compliance.api.GetTaskList", payload);

const getTaskReportByID = (payload) =>
  api.post("compliance.api.getSingleTaskDetail", payload);
const getTaskReferencesByName = (payload) =>
  api.post("compliance.api.GetTaskReferences", payload);
const getUsersByRole = () => api.get("compliance.api.getUserList");

const getTaskComments = (payload) =>
  api.post("compliance.api.GetTaskComments", payload);

const postTaskComments = (payload) =>
  api.post("compliance.api.SetTaskComments", payload);
const getTaskFiles = (payload) =>
  api.post("compliance.api.GetExistingFileNames", payload);
const postUploadFile = ({ taskid, fileData, userId, ftype }) =>
  api.post(
    `/api/UploadFile?Taskid=${taskid}&Userid=${userId}&ftype=${ftype}`,
    fileData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
// const postUploadFile = (payload) =>
//   api.post(`/api/UploadFile?Taskid=${payload.TaskId}`);

const postAssignTask = (payload) =>
  api.post("compliance.api.AssignTasks", payload);
const changeTaskStatus = (payload) =>
  api.post("compliance.api.setTaskStatus", payload);
const getAvailabilityCheck = (payload) =>
  api.post("compliance.api.getUserDetails", payload);

const postCodetailsInsUpdDel = (payload) =>
  api.post("compliance.api.setUserDetails", payload);

const GetEntityLicenseTask = (payload) =>
  api.post("api/GetEntityLicenseTask", payload);

const GetCOCompanyType = () =>
  axiosInstance.get(`${BACKEND_BASE_URL}compliance.api.getCompanyDetails`);

const insertCerificateDetailsArray = (payload) =>
  api.post("api/InsertCertifateDetailsArray", payload);

const getAllNotifications = (payload) => api.post("api/Notifications", payload);

const coSettingCommonApi = (payload) => api.post("api/CoSettings", payload);

const migrateTasks = (payload) => api.post("api/Migrate", payload);
const getTeamMembers = (payload) =>
  axiosInstance.post(
    `${BACKEND_BASE_URL}compliance.api.getUserByRole`,
    payload
  );

export default {
  getTaskReport,
  getTaskReportByID,
  getUsersByRole,
  getTaskComments,
  postTaskComments,
  getTaskFiles,
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
  getTaskReferencesByName,
  changeTaskStatus,
};
