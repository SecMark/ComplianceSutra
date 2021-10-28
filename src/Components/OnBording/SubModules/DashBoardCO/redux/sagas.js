import { call, put, takeLatest } from "redux-saga/effects";
import { actions, types } from "./actions";
import api from "../api";
import { toast } from "react-toastify";

const taskReportRequest = function* taskReportRequest() {
  try {
    const { data, status } = yield call(api.getTaskReport);
    const responseStatus = data.message.status_response;
    if (status === 200 && responseStatus === "Success") {
      yield put(
        actions.taskReportRequestSuccess({
          taskReport: data.message.task_details,
        })
      );
    } else {
      yield put(actions.taskReportRequestFailed({ taskReport: [] }));
    }
  } catch (err) {
    yield put(actions.taskReportRequestFailed({ taskReport: [] }));
  }
};

const taskReportRequestById = function* taskReportRequestById({ payload }) {
  try {
    const { data, status } = yield call(api.getTaskReportByID, payload);
    if (
      status === 200 &&
      data.message &&
      data.message.status_response === "Success"
    ) {
      yield put(
        actions.taskReportByIdRequestSuccess({
          taskReportById: data.message.task_details[0],
        })
      );
    } else {
      yield put(actions.taskReportByIdRequestFailed({ taskReportById: {} }));
    }
  } catch (err) {
    yield put(actions.taskReportByIdRequestFailed({ taskReportById: {} }));
  }
};

const taskReferencesByName = function* taskReferencesByName({ payload }) {
  console.log("taskReference Payload: ", payload);
  try {
    const { data, status } = yield call(api.getTaskReferencesByName, payload);
    if (status === 200 && data.message && data.message.status === true) {
      const { task_references } = data.message;
      yield put(
        actions.taskReferensesByNameSuccess({ taskReferences: task_references })
      );
    } else {
      yield put(actions.taskReferensesByNameFailed({ taskReferences: [] }));
    }
  } catch (error) {
    yield put(actions.taskReferensesByNameFailed({ taskReferences: [] }));
  }
};
const userRequestByRole = function* userRequestByRole({ payload }) {
  try {
    const { data, status } = yield call(api.getUsersByRole, payload);
    // console.log(data);

    if (status === 200 && data && data.message && data.message.length !== 0) {
      console.log("getUsersByRole  => ", data, status);
      yield put(
        actions.userByRoleRequestSuccess({ getUserByRole: data.message })
      );
      // toast.success(data && data.Message);
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
    if (status === 200 && data.message && data.message.status === true) {
      // if (payload.link === 1) {
      //   yield put(
      //     actions.taskCommentsByTaskIdSuccess({ getTaskLinksByRole: data })
      //   );
      // }
      // if (payload.link === 0) {
      //   yield put(
      //     actions.taskCommentsByTaskIdSuccess({ getTaskCommentByRole: data })
      //   );
      // }
      // toast.success(data && data.Message);
      // const commentList = data.message.comment_list;
      const { comment_list } = data.message;
      yield put(
        actions.taskCommentsByTaskIdSuccess({
          getTaskCommentByRole: comment_list,
        })
      );
    } else {
      toast.success(data && data.Message);
      yield put(
        actions.taskCommentsByTaskIdFailed({ getTaskCommentByRole: [] })
      );
    }
  } catch (err) {
    yield put(actions.taskCommentsByTaskIdFailed({ getTaskCommentByRole: [] }));
  }
};

const postCommentBytaskID = function* postCommentBytaskID({ payload }) {
  try {
    const { data, status } = yield call(api.postTaskComments, payload);
    if (status === 200 && data.message && data.message.status === true) {
      yield put(
        actions.postTaskCommentByTaskIDSuccess({ postTaskCommentById: true })
      );
      yield put(
        actions.taskCommentsByTaskIdRequest({
          task_name: payload.task_name,
        })
      );
      // if (payload.link === 0) {
      //   yield put(
      //     actions.taskCommentsByTaskIdRequest({
      //       taskid: payload.taskID,
      //       link: 0,
      //     })
      //   );
      // }
      // if (payload.link === 1) {
      //   yield put(
      //     actions.taskCommentsByTaskIdRequest({
      //       taskid: payload.taskID,
      //       link: 1,
      //     })
      //   );
      // }
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
    if (status === 200 && data.message && data.message.status === true) {
      if (payload.is_references === 0) {
        yield put(
          actions.getTaskFilesByIdSucess({
            taskFiles: data.message.file_details,
          })
        );
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
  try {
    const { data, status } = yield call(api.postAssignTask, payload);
    if (status === 200 && data.message.status_response === "Success") {
      toast.success("Task Assigned Successfully!");
      yield put(actions.taskReportRequest());
      yield put(actions.setLoader(false));
      yield put(
        actions.taskReportByIdRequest({
          task_name: payload.task_details[0].name,
        })
      );

      yield put(actions.taskAssignByTaskIDSuccess({ postAssignTask: data }));

      toast.success(data && data.Message);
    } else {
      toast.success(data && data.Message);
      yield put(actions.setLoader(false));
      yield put(actions.taskAssignByTaskIDFailed({ postAssignTask: {} }));
    }
  } catch (err) {
    yield put(actions.setLoader(false));
    yield put(actions.taskAssignByTaskIDFailed({ postAssignTask: {} }));
  }
};

const changeTaskStatus = function* changeTaskStatus({ payload }) {
  try {
    const { data, status } = yield call(api.changeTaskStatus, payload);
    if (status === 200 && data.message.status === true) {
      if (payload.status === "Approval Pending") {
        toast.success(`Task completed successfully!`);
      } else {
        toast.success(`Task ${payload.status} successfully!`);
      }
      yield put(actions.changeTaskStatusSuccess({ changeTaskStatus: true }));
      yield put(
        actions.taskReportByIdRequest({
          task_name: payload.task_name,
        })
      );
      yield put(actions.taskReportRequest());
    } else {
      yield put(actions.changeTaskStatusFailed({ changeTaskStatus: false }));
    }
  } catch (err) {
    toast.error("Something went wrong. Please try again");
    yield put(actions.changeTaskStatusFailed({ changeTaskStatus: false }));
  }
};

const userAvailabilityCheck = function* userAvailabilityCheck({ payload }) {
  try {
    const { data, status } = yield call(api.getAvailabilityCheck, payload);
    console.log(data.message.user_details);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode != false) {
      yield put(
        actions.availabilityCheckRequestSuccess({
          availabilityInfo: data.message.user_details,
        })
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
    const { data } = yield call(api.GetCOCompanyType, payload);
    const { message } = data;
    if (message.status) {
      yield put(
        actions.getCompanyTypeRequestSuccess({
          CompanyInfo: message.company_details_list,
        })
      );
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

const getPaymentDetail = function* getPaymentDetail({ payload }) {
  try {
    const { data, status } = yield call(api.coSettingCommonApi, payload);
    let statusCode = data && data[0] && data[0].StatusCode;
    if (status === 200 && statusCode != false) {
      yield put(actions.getPaymentSuccess({ coAccount: data }));
    } else {
      yield put(actions.getPaymentFailed({ coAccount: {} }));
    }
  } catch (err) {
    yield put(actions.getPaymentFailed({ coAccount: {} }));
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
  yield takeLatest(
    types.GET_TASK_REFERENSES_BY_TASK_NAME,
    taskReferencesByName
  );
  yield takeLatest(types.GET_USER_BY_ROLE, userRequestByRole);
  yield takeLatest(types.GET_TASK_COMMENTS_BY_TASK_ID, taskCommentBytaskID);
  yield takeLatest(types.POST_TASK_COMMENT_BY_TASK_ID, postCommentBytaskID);
  yield takeLatest(types.GET_TASK_FILES_BY_TASK_ID, getTaskFilesById);
  yield takeLatest(types.POST_UPLOAD_FILE_BY_TASK_ID, postUploadFileById);
  yield takeLatest(types.POST_ASSIGN_TASK_BY_TASKID, postAssignTask);
  yield takeLatest(types.CHANGE_TASK_STATUS, changeTaskStatus);
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

  yield takeLatest(types.GET_PAYMENT_REQUEST, getPaymentDetail);
}
