import api from "../../../../../apiServices";
import { test_customization_url } from "../../../../../apiServices/baseurl";

const getTaskReport = (payload) =>
  api.get(`${test_customization_url}getTaskReport`, {
    params: {
      uInput: payload,
    },
  });

const getTaskReportByID = (payload) =>
  api.get(`${test_customization_url}GetTask`, {
    params: {
      uInput: payload,
    },
  });

const getUsersByRole = (payload) =>
  api.get(`${test_customization_url}getUsersByRole`, {
    params: {
      uInput: payload,
    },
  });

const getTaskComments = (payload) =>
  api.get(`${test_customization_url}bindTaskComments`, {
    params: {
      uInput: { taskid: `${payload.taskid}`, link: `${payload.link || 0}` },
    },
  });

const postTaskComments = (payload) =>
  api.get(`${test_customization_url}TaskComments`, {
    params: {
      uInput: payload,
    },
  });
const getTaskFiles = (payload) =>
  api.get(`${test_customization_url}getTaskfile`, {
    params: {
      uInput: payload,
    },
  });
const postUploadFile = ({ taskid, fileData, userId, ftype }) =>
  api.post(
    `${test_customization_url}UploadFile?Taskid=${taskid}&Userid=${userId}&ftype=${ftype}`,
    fileData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );

const postAssignTask = (payload) =>
  api.get(`${test_customization_url}ChangeTaskStatus`, {
    params: {
      uInput: payload,
    },
  });

const getAvailabilityCheck = (payload) =>
  api.get(`${test_customization_url}availabilityCheck`, {
    params: {
      uInput: payload,
    },
  });

const postCodetailsInsUpdDel = (payload) =>
  api.get(`${test_customization_url}ins_upd_del_User`, {
    params: {
      uInput: payload,
    },
  });

const GetEntityLicenseTask = (payload) =>
  api.get(`${test_customization_url}GetEntityLicenseTask`, {
    params: {
      uInput: payload,
    },
  });

const GetCOCompanyType = (payload) =>
  api.get(`${test_customization_url}BindCompanyType`, {
    params: {
      uInput: payload,
    },
  });

const insertCerificateDetailsArray = (payload) =>
  api.get(`${test_customization_url}InsertCertifateDetailsArray`, {
    params: {
      uInput: payload,
    },
  });

const getAllNotifications = (payload) =>
  api.get(`${test_customization_url}Notifications`, {
    params: {
      uInput: payload,
    },
  });

const coSettingCommonApi = (payload) =>
  api.get(`${test_customization_url}CoSettings`, {
    params: {
      uInput: payload,
    },
  });

const migrateTasks = (payload) =>
  api.get(`${test_customization_url}Migrate`, {
    params: {
      uInput: payload,
    },
  });
const getTeamMembers = (payload) =>
  api.get(`${test_customization_url}Migrate`, {
    params: {
      uInput: payload,
    },
  });

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
};
