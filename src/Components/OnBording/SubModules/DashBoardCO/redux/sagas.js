import { call, put, takeLatest } from "redux-saga/effects";
import { actions, types } from "./actions";
import api from "../api";
import { toast } from "react-toastify";

const taskReportRequest = function* taskReportRequest({ payload }) {
  try {
    const { data, status } = yield call(api.getTaskReport, payload);
    let statusData = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusData !== false) {
      yield put(actions.taskReportRequestSuccess({ taskReport: data }));
      toast.success(data && data.Message);
    } else {
      toast.success(data && data.Message);
      yield put(actions.taskReportRequestFailed({ taskReport: [] }));
    }
  } catch (err) {
    // toast.error(
    //     (err && err.response && err.response.data && err.response.data.message) ||
    //         'Something went to wrong, Please try after sometime',
    // );
    yield put(actions.taskReportRequestFailed({ taskReport: {} }));
  }
};

const taskReportRequestById = function* taskReportRequestById({ payload }) {
  try {
    const { data, status } = yield call(api.getTaskReportByID, payload);
    if (status === 200) {
      // console.log("taskReport By Id => ",data , status);
      yield put(actions.taskReportByIdRequestSuccess({ taskReportById: data }));
      toast.success(data && data.Message);
    } else {
      toast.success(data && data.Message);
      yield put(actions.taskReportByIdRequestFailed({ taskReportById: {} }));
    }
  } catch (err) {
    // toast.error(
    //     (err && err.response && err.response.data && err.response.data.message) ||
    //         'Something went to wrong, Please try after sometime',
    // );
    yield put(actions.taskReportByIdRequestFailed({ taskReportById: {} }));
  }
};

const userRequestByRole = function* userRequestByRole({ payload }) {
  try {
    const { data, status } = yield call(api.getUsersByRole, payload);
    // console.log(data);
    let statusCode = data && data[0] && data[0].StatuCode;
    if (status === 200 && statusCode != false && statusCode !== "norec") {
      // console.log("getUsersByRole  => ",data , status);
      yield put(actions.userByRoleRequestSuccess({ getUserByRole: data }));
      toast.success(data && data.Message);
    } else {
      toast.success(data && data.Message);
      yield put(actions.userByRoleRequestFailed({ getUserByRole: {} }));
    }
  } catch (err) {
    // toast.error(
    //     (err && err.response && err.response.data && err.response.data.message) ||
    //         'Something went to wrong, Please try after sometime',
    // );
    yield put(actions.userByRoleRequestFailed({ getUserByRole: {} }));
  }
};

const taskCommentBytaskID = function* taskCommentBytaskID({ payload }) {
  try {
    const { data, status } = yield call(api.getTaskComments, payload);
    // console.log("payload ==> ",payload)
    if (status === 200) {
      if (payload.link === 1) {
        yield put(
          actions.taskCommentsByTaskIdSuccess({ getTaskLinksByRole: data })
        );
      }
      if (payload.link === 0) {
        yield put(
          actions.taskCommentsByTaskIdSuccess({ getTaskCommentByRole: data })
        );
      }
      toast.success(data && data.Message);
    } else {
      toast.success(data && data.Message);
      yield put(
        actions.taskCommentsByTaskIdFailed({ getTaskCommentByRole: {} })
      );
    }
  } catch (err) {
    yield put(actions.taskCommentsByTaskIdFailed({ getTaskCommentByRole: {} }));
  }
};

const postCommentBytaskID = function* postCommentBytaskID({ payload }) {
  try {
    const { data, status } = yield call(api.postTaskComments, payload);
    if (status === 200) {
      yield put(
        actions.postTaskCommentByTaskIDSuccess({ postTaskCommentById: data })
      );
      if (payload.link === 0) {
        yield put(
          actions.taskCommentsByTaskIdRequest({
            taskid: payload.taskID,
            link: 0,
          })
        );
      }
      if (payload.link === 1) {
        yield put(
          actions.taskCommentsByTaskIdRequest({
            taskid: payload.taskID,
            link: 1,
          })
        );
      }
      toast.success(data && data.Message);
    } else {
      toast.success(data && data.Message);
      yield put(
        actions.postTaskCommentByTaskIDFailed({ postTaskCommentById: {} })
      );
    }
  } catch (err) {
    // console.log(err)
    // toast.error(
    //     (err && err.response && err.response.data && err.response.data.message) ||
    //         'Something went to wrong, Please try after sometime',
    // );
    yield put(
      actions.postTaskCommentByTaskIDFailed({ postTaskCommentById: {} })
    );
  }
};
const getTaskFilesById = function* getTaskFilesById({ payload }) {
  try {
    const { data, status } = yield call(api.getTaskFiles, payload);
    if (status === 200) {
      if (payload.ftype === 0) {
        yield put(actions.getTaskFilesByIdSucess({ taskFiles: data }));
      }
      if (payload.ftype === 1) {
        yield put(actions.getTaskFilesByIdSucess({ taskFilesReference: data }));
      }
    } else {
      yield put(actions.getTaskFilesByIdFailed());
    }
  } catch (error) {
    yield put(actions.getTaskFilesByIdFailed());
  }
};
const postUploadFileById = function* postUploadFileById({ payload }) {
  console.log(payload);
  // debugger
  try {
    const { data, status } = yield call(api.postUploadFile, payload);
    console.log(status);
    if (status === 201) {
      yield put(actions.postUploadFileByIDSuccess({ postUploadFile: data }));
      toast.success("Attachement successfully added!");
    } else {
      toast.success(data && data.Message);
      yield put(actions.postUploadFileByIDFailed({ postUploadFile: {} }));
    }
  } catch (err) {
    yield put(actions.postUploadFileByIDFailed({ postUploadFile: {} }));
  }
};

const postAssignTask = function* postAssignTask({ payload }) {
  const actualPayload = {
    taskID: payload.taskID,
    isApproved: payload.isApproved,
    userType: payload.userType,
    email: payload.email,
    invitee: payload.invitee,
    loginID: payload.loginID,
    userDetails: payload.userDetails,
  };
  // debugger
  try {
    const { data, status } = yield call(api.postAssignTask, actualPayload);
    // console.log(status);
    if (status === 200) {
      if (
        payload.isApproved === 1 &&
        payload.userDetails.IscreateBySecmark === 1
      ) {
        toast.dark(
          `${payload.LicenseCode} task for ${payload.EntityName} is approved successfully!`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
      if (
        payload.isApproved === 3 &&
        payload.userDetails.IscreateBySecmark === 1
      ) {
        toast.dark(
          `${payload.LicenseCode} task for ${payload.EntityName} is rejected successfully!`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
      yield put(actions.taskAssignByTaskIDSuccess({ postAssignTask: data }));
      yield put(
        actions.taskReportByIdRequest({
          taskid: payload.taskID,
        })
      );
      yield put(
        actions.taskReportRequest({
          entityid: "",
          userID: payload.userDetails.UserID,
          usertype: payload.userDetails.UserType,
        })
      );
      toast.success(data && data.Message);
    } else {
      toast.success(data && data.Message);
      yield put(actions.taskAssignByTaskIDFailed({ postAssignTask: {} }));
    }
  } catch (err) {
    yield put(actions.taskAssignByTaskIDFailed({ postAssignTask: {} }));
  }
};

const userAvailabilityCheck = function* userAvailabilityCheck({ payload }) {
  try {
    const { data, status } = yield call(api.getAvailabilityCheck, payload);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode != false) {
      yield put(
        actions.availabilityCheckRequestSuccess({ availabilityInfo: data })
      );
    } else {
      yield put(
        actions.availabilityCheckRequestFailed({ availabilityInfo: {} })
      );
    }
  } catch (err) {
    yield put(actions.availabilityCheckRequestFailed({ availabilityInfo: {} }));
  }
};

const coDetailsInsUpdDelInfo = function* coDetailsInsUpdDelInfo({ payload }) {
  try {
    const { data, status } = yield call(api.postCodetailsInsUpdDel, payload);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode !== false) {
      if (payload.userType === 1) {
        toast.success("Details Changed Successfully!");
      } else if (payload.userType === 9) {
        toast.success("Verification link sent to you given email");
      }

      yield put(
        actions.coDetailsInsUpdDelRequestSuccess({
          insUpdDelstatus: "Success",
          data: data,
        })
      );
    } else {
      toast.error("Something went wrong.");
      yield put(
        actions.coDetailsInsUpdDelRequestFailed({ insUpdDelstatus: "Failed" })
      );
    }
  } catch (err) {
    toast.error("Something went wrong.");
    yield put(
      actions.coDetailsInsUpdDelRequestFailed({ insUpdDelstatus: "Failed" })
    );
  }
};

const getCoEntityLicenseTask = function* getCoEntityLicenseTask({ payload }) {
  try {
    const { data, status } = yield call(api.GetEntityLicenseTask, payload);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode != false) {
      yield put(
        actions.getEntityLicenseTaskRequestSuccess({ entityLicenseInfo: data })
      );
    } else {
      yield put(
        actions.getEntityLicenseTaskRequestFailed({ entityLicenseInfo: {} })
      );
    }
  } catch (err) {
    yield put(
      actions.getEntityLicenseTaskRequestFailed({ entityLicenseInfo: {} })
    );
  }
};

const getCOCompnayType = function* getCOCompnayType({ payload }) {
  try {
    const { data, status } = yield call(api.GetCOCompanyType, payload);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode != false) {
      yield put(actions.getCompanyTypeRequestSuccess({ CompanyInfo: data }));
    } else {
      yield put(actions.getCompanyTypeRequestFailed({ CompanyInfo: {} }));
    }
  } catch (err) {
    yield put(actions.getCompanyTypeRequestFailed({ CompanyInfo: {} }));
  }
};

const insertCerificateDetailsRequest =
  function* insertCerificateDetailsRequest({ payload }) {
    try {
      const { data, status } = yield call(
        api.insertCerificateDetailsArray,
        payload
      );
      let statusCode = data && data[0] && data[0].StatusCode;
      if (status === 200 && statusCode != false) {
        yield put(
          actions.insCertificateDetailsRequestSuccess({ Status: "Success" })
        );
      } else {
        yield put(
          actions.insCertificateDetailsRequestFailed({ Status: "Failed" })
        );
      }
    } catch (err) {
      yield put(
        actions.insCertificateDetailsRequestFailed({ Status: "Failed" })
      );
    }
  };

const getCoNotifications = function* getCoNotifications({ payload }) {
  try {
    const { data, status } = yield call(api.getAllNotifications, payload);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode != false) {
      yield put(
        actions.getCoNotificationsRequestSuccess({ notifications: data })
      );
    } else {
      yield put(actions.getCoNotificationsRequestFailed({ notifications: {} }));
    }
  } catch (err) {
    yield put(actions.getCoNotificationsRequestFailed({ notifications: {} }));
  }
};

const getCoAccountSetting = function* getCoAccountSetting({ payload }) {
  try {
    const { data, status } = yield call(api.coSettingCommonApi, payload);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode != false) {
      yield put(actions.getCoAccountRequestSuccess({ coAccount: data }));
    } else {
      yield put(actions.getCoAccountRequestFailed({ coAccount: {} }));
    }
  } catch (err) {
    yield put(actions.getCoAccountRequestFailed({ coAccount: {} }));
  }
};

const getCoAccountLicenses = function* getCoAccountLicenses({ payload }) {
  try {
    const { data, status } = yield call(api.coSettingCommonApi, payload);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode != false) {
      yield put(
        actions.getCoAccountLicensesRequestSuccess({ coLicenses: data })
      );
    } else {
      yield put(actions.getCoAccountLicensesRequestFailed({ coLicenses: {} }));
    }
  } catch (err) {
    yield put(actions.getCoAccountLicensesRequestFailed({ coLicenses: {} }));
  }
};

const coAccountUpdate = function* coAccountUpdate({ payload }) {
  try {
    const { data, status } = yield call(api.coSettingCommonApi, payload);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode != false) {
      toast.success("Setting saved successfully.");
      yield put(actions.coAccountUpdateRequestSuccess({ Status: "Success" }));
    } else {
      toast.error("Something went wrong.");
      yield put(actions.coAccountUpdateRequestFailed({ Status: "Failed" }));
    }
  } catch (err) {
    toast.error("Something went wrong.");
    yield put(actions.coAccountUpdateRequestFailed({ Status: "Failed" }));
  }
};

const CompanyDeleteRequest = function* CompanyDeleteRequest({ payload }) {
  try {
    const { data, status } = yield call(api.coSettingCommonApi, payload);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode != false) {
      toast.success("Company deleted successfully.");
      yield put(actions.deleteCompanyRequestSuccess({ Status: "Success" }));
    } else {
      toast.error("Something went wrong.");
      yield put(actions.deleteCompanyRequestFailed({ Status: "Failed" }));
    }
  } catch (err) {
    toast.error("Something went wrong.");
    yield put(actions.deleteCompanyRequestFailed({ Status: "Failed" }));
  }
};

export default function* sagas() {
  yield takeLatest(types.TASK_REPORT_REQUEST, taskReportRequest);
  yield takeLatest(types.GET_TASK_REPORT_BY_ID, taskReportRequestById);
  yield takeLatest(types.GET_USER_BY_ROLE, userRequestByRole);
  yield takeLatest(types.GET_TASK_COMMENTS_BY_TASK_ID, taskCommentBytaskID);
  yield takeLatest(types.POST_TASK_COMMENT_BY_TASK_ID, postCommentBytaskID);
  yield takeLatest(types.GET_TASK_FILES_BY_TASK_ID, getTaskFilesById);
  yield takeLatest(types.POST_UPLOAD_FILE_BY_TASK_ID, postUploadFileById);
  yield takeLatest(types.POST_ASSIGN_TASK_BY_TASKID, postAssignTask);
  yield takeLatest(types.GET_AVAILABILITY_CHECK, userAvailabilityCheck);
  yield takeLatest(
    types.CO_PERSONAL_DETAILS_INS_UPD_DEL_REQUEST,
    coDetailsInsUpdDelInfo
  );
  yield takeLatest(
    types.GET_ENTITY_LICENSE_TASK_REQUEST,
    getCoEntityLicenseTask
  );
  yield takeLatest(types.GET_COMPANY_TYPE_REQUEST, getCOCompnayType);
  yield takeLatest(
    types.INS_CERTIFICATE_DETAILS_REQUEST,
    insertCerificateDetailsRequest
  );
  yield takeLatest(types.GET_CO_NOTIFICATIONS_REQUEST, getCoNotifications);
  yield takeLatest(types.GET_CO_ACCOUNT_REQUEST, getCoAccountSetting);
  yield takeLatest(types.GET_CO_ACCOUNT_LICENSES_REQUEST, getCoAccountLicenses);
  yield takeLatest(types.CO_ACCOUNT_UPDATE_REQUEST, coAccountUpdate);
  yield takeLatest(types.CO_COMPANY_DELETE_REQUEST, CompanyDeleteRequest);
}
