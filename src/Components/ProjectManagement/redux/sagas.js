import { call, put, takeLatest } from "redux-saga/effects";
import api from "../api";
import {
  SET_PROJECT_DETAIL,
  getProject,
  setProject,
  getRegisteredUser,
  getProjectDataSuccess,
  getProjectDataFailed,
  GET_PROJECT_MANAGEMENT_DATA_REQUEST,
  ADD_UPDATE_TASKLIST_REQUEST,
  addUpdateTaskListFailed,
  addUpdateTaskListSuccess,
  getProjectDataRequest,
  addUpdateMilestoneFailed,
  ADD_UPDATE_MILESTONE_REQUEST,
  addUpdateMilestoneSuccess,
  GET_USERS_LIST_REQUEST,
  getUsersListSuccess,
  getUsersListFailed,
  ADD_UPDATE_TASK_REQUEST,
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
    if (
      status === 200 &&
      data &&
      data?.message &&
      data?.message?.status &&
      data?.message?.user_list
    ) {
      yield put(getUsersListSuccess(data?.message?.user_list || []));
    } else {
      yield put(getUsersListFailed([]));
    }
  } catch (error) {
    yield put(getUsersListFailed([]));
  }
}

function* addAndUpdateTask(state, { payload }) {
  try {
  } catch (error) {
    toast.error("Something went wrong! Please try again.");
  }
}

function* projectSaga() {
  yield takeLatest(SET_PROJECT_DETAIL, createProject);
  yield takeLatest(GET_PROJECT_MANAGEMENT_DATA_REQUEST, getProjectData);
  yield takeLatest(ADD_UPDATE_TASKLIST_REQUEST, addAndUpdateTaskListData);
  yield takeLatest(ADD_UPDATE_MILESTONE_REQUEST, addAndUpdateMilestoneData);
  yield takeLatest(GET_USERS_LIST_REQUEST, getUsersList);
  yield takeLatest(ADD_UPDATE_TASK_REQUEST, addAndUpdateTask);
}

export default projectSaga;
