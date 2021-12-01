import { call, put, takeLatest } from "redux-saga/effects";
import api from "../api";
import {
  GET_USERS_LIST_REQUEST,
  GET_PROJECT_MANAGEMENT_DATA_REQUEST,
  SET_PROJECT_DETAIL,
  ADD_UPDATE_TASKLIST_REQUEST,
  ADD_UPDATE_MILESTONE_REQUEST,
  ADD_UPDATE_TASK_REQUEST,
  getProjectDataSuccess,
  getProjectDataFailed,
  addUpdateTaskListFailed,
  addUpdateTaskListSuccess,
  getProjectDataRequest,
  addUpdateMilestoneFailed,
  addUpdateMilestoneSuccess,
  getUsersListSuccess,
  getUsersListFailed,
  GET_INDIVIDUAL_TASKS_REQUEST,
  getIndividualTasksSuccess,
  getIndividualTasksFailed,
  getIndividualTasksRequest,
  deactivateSuccess,
  deactivateFailed,
  DEACTIVATE_REQUEST,
  GET_TRASH_PROJECTS_REQUEST,
  GET_TRASH_MILESTONE_REQUEST,
  GET_TRASH_TASKS_REQUEST,
  getTrashMilestoneSuccess,
  getTrashMilestoneFailed,
  getTrashProjectSuccess,
  getTrashProjectFailed,
  getTrashTasksSuccess,
  getTrashTasksFailed,
} from "./actions";
import { toast } from "react-toastify";

function* createProject(action) {
  try {
    const { data } = yield call(api.getPostProject, action.payload);
    if (data.message.status === true) {
      toast.success("Project added updatead successfuly");
      yield put(getProjectDataRequest());
    } else {
      toast.warning("Somthing went Wrong");
    }
  } catch (error) {}
}

// function* getRegisteredUSer(action) {
//   try {
//     const { data } = yield call(api.getRegisteredUserList, action.payload);
//     console.log(data.message.user_list);
//     if (data.message.status === true) {
//       yield put(getRegisteredUser(data.message.user_list));
//     } else {
//     }
//   } catch (error) {}
// }

function* getProjectData(action) {
  try {
    const { status, data } = yield call(api.getProjectData);
    if (status && status === 200 && data && data.message) {
      yield put(getProjectDataSuccess(data.message));
    } else {
      yield put(getProjectDataFailed());
    }
  } catch (error) {
    console.log(error.message);
    yield put(getProjectDataFailed());
  }
}

function* addAndUpdateTaskListData({ payload }) {
  try {
    const { status, data } = yield call(api.addAndUpdateTaskListData, payload);
    if (status === 200 && data && data?.message && data?.message?.status) {
      toast.success(data?.message?.status_response);
      yield put(addUpdateTaskListSuccess());
      yield put(getProjectDataRequest());
    } else {
      toast.success(data?.message?.status_response);
      yield put(addUpdateTaskListFailed());
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong. Please try again!");
    yield put(addUpdateTaskListFailed());
  }
}

function* addAndUpdateMilestoneData({ payload }) {
  try {
    const { status, data } = yield call(api.addAndUpdateMilestoneData, payload);
    if (status === 200 && data && data?.message && data?.message?.status) {
      toast.success(data?.message?.status_response);
      yield put(addUpdateMilestoneSuccess());
      yield put(getProjectDataRequest());
    } else {
      toast.error(
        data?.message?.status_response ||
          "Something went wrong. Please try again."
      );
      yield put(addUpdateMilestoneFailed());
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again!");
    yield put(addUpdateMilestoneFailed());
  }
}

function* getUsersList() {
  try {
    const { status, data } = yield call(api.getRegisteredUserList);
    if (status === 200 && data && data?.message && data?.message?.length > 0) {
      const users = [...data?.message].map((item) => ({
        label: item.full_name,
        value: item.email,
      }));
      yield put(getUsersListSuccess(users || []));
    } else {
      yield put(getUsersListFailed([]));
    }
  } catch (error) {
    yield put(getUsersListFailed([]));
  }
}

function* addAndUpdateTask({ payload }) {
  try {
    const { status, data } = yield call(api.addAndUpdateTaskData, payload);
    if (status === 200 && data && data.message && data.message.status) {
      toast.success(data?.message?.status_response);
      yield put(getProjectDataRequest());
      yield put(getIndividualTasksRequest());
    } else {
      toast.error(data?.message?.status_response);
    }
  } catch (error) {
    toast.error("Something went wrong! Please try again.");
  }
}

function* getInidividualTasks() {
  try {
    const { status, data } = yield call(api.getIndividualTasks);
    if (status === 200 && data && data?.message && data?.message?.status) {
      const tasks_list = data?.message?.task_data;
      yield put(getIndividualTasksSuccess(tasks_list));
    } else {
      yield put(getIndividualTasksFailed([]));
    }
  } catch (error) {
    yield put(getIndividualTasksFailed([]));
  }
}

function* deactivateRequestHandler({ payload }) {
  let requestEndpoint = null,
    requestPayload = {};
  switch (payload?.modalName) {
    case "Project":
      requestEndpoint = api.deactivateProject;
      requestPayload = {
        project_id: payload?.id,
      };
      break;
    case "TaskList":
      requestEndpoint = api.deactivateTasklist;
      requestPayload = {
        task_list_id: payload?.id,
      };
      break;
    case "Milestone":
      requestEndpoint = api.deactivateMilestone;
      requestPayload = {
        milestone_id: payload?.id,
      };
      break;
    case "Task":
      requestEndpoint = api.deactivateTask;
      requestPayload = {
        task_id: payload?.id,
      };
      break;
    default:
      requestEndpoint = api.deactivateTask;
      requestPayload = {
        task_id: payload?.id,
      };
      return null;
  }
  try {
    const { status, data } = yield call(requestEndpoint, requestPayload);
    if (status === 200 && data && data?.message && data?.message?.status) {
      toast.success(data?.message?.status_response);
      yield put(deactivateSuccess());
      yield put(getProjectDataRequest());
      yield put(getIndividualTasksRequest());
    } else {
      toast.error(data?.message?.status_response);
      yield put(deactivateFailed(data?.message?.status_response));
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again");
    yield put(deactivateFailed("Something went wrong. Please try again"));
  }
}

function* getTashProjects({ payload }) {
  try {
    const { status, data } = yield call(api.getTashProjectsList, payload);
    if (status === 200 && data && data.message && data.message.status) {
      // toast.success(data?.message?.status_response);
      yield put(getTrashProjectSuccess(data?.message?.milestone_data));
    } else {
      // toast.error(data?.message?.status_response);
      yield put(getTrashProjectFailed());
    }
  } catch (error) {
    // toast.error("Something went wrong. Please try again.");
    yield put(getTrashProjectFailed());
  }
}
function* getTashMilestone({ payload }) {
  try {
    const { status, data } = yield call(api.getTrashMilestoneList, payload);
    if (status === 200 && data && data.message && data.message.status) {
      // toast.success(data?.message?.status_response);
      yield put(getTrashMilestoneSuccess(data?.message?.milestone_data));
    } else {
      // toast.error(data?.message?.status_response);
      yield put(getTrashMilestoneFailed());
    }
  } catch (error) {
    // toast.error("Something went wrong. Please try again.");
    yield put(getTrashMilestoneFailed());
  }
}
function* getTashTasks({ payload }) {
  try {
    const { status, data } = yield call(api.getTrashTasksList, payload);
    if (status === 200 && data && data.message && data.message.status) {
      // toast.success(data?.message?.status_response);
      yield put(getTrashTasksSuccess(data?.message?.task_data));
    } else {
      // toast.error(data?.message?.status_response);
      yield put(getTrashTasksFailed());
    }
  } catch (error) {
    // toast.error("Something went wrong. Please try again.");
    yield put(getTrashTasksFailed());
  }
}

function* projectSaga() {
  yield takeLatest(SET_PROJECT_DETAIL, createProject);
  yield takeLatest(GET_PROJECT_MANAGEMENT_DATA_REQUEST, getProjectData);
  yield takeLatest(ADD_UPDATE_TASKLIST_REQUEST, addAndUpdateTaskListData);
  yield takeLatest(ADD_UPDATE_MILESTONE_REQUEST, addAndUpdateMilestoneData);
  yield takeLatest(GET_USERS_LIST_REQUEST, getUsersList);
  yield takeLatest(ADD_UPDATE_TASK_REQUEST, addAndUpdateTask);
  yield takeLatest(GET_INDIVIDUAL_TASKS_REQUEST, getInidividualTasks);
  yield takeLatest(DEACTIVATE_REQUEST, deactivateRequestHandler);
  yield takeLatest(GET_TRASH_PROJECTS_REQUEST, getTashProjects);
  yield takeLatest(GET_TRASH_MILESTONE_REQUEST, getTashMilestone);
  yield takeLatest(GET_TRASH_TASKS_REQUEST, getTashTasks);
}

export default projectSaga;
