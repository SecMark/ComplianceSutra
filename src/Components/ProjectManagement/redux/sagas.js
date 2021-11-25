import { call, put, takeLatest } from "redux-saga/effects";
import api from "../api";
import {
  GET_PROJECT_DETAIL,
  GET_REGISTERED_USER_LIST,
  SET_PROJECT_DETAIL,
  getProject,
  setProject,
  getRegisteredUser,
  getProjectDataSuccess,
  getProjectDataFailed,
  GET_PROJECT_MANAGEMENT_DATA_REQUEST,
} from "./actions";
import { toast } from "react-toastify";

function* createProject(action) {
  try {
    const { data } = yield call(api.getPostProject, action.payload);
    if (data.message.status === true) {
      toast.success("Project added updatead successfuly");
    } else {
      toast.warning("Somthing went Wrong");
    }
  } catch (error) {}
}

function* getRegisteredUSer(action) {
  try {
    const { data } = yield call(api.getRegisteredUserList, action.payload);
    console.log(data.message.user_list);
    if (data.message.status === true) {
      yield put(getRegisteredUser(data.message.user_list));
    } else {
    }
  } catch (error) {}
}

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

function* projectSaga() {
  yield takeLatest(SET_PROJECT_DETAIL, createProject);
  yield takeLatest(GET_REGISTERED_USER_LIST, getRegisteredUSer);
  yield takeLatest(GET_PROJECT_MANAGEMENT_DATA_REQUEST, getProjectData);
}

export default projectSaga;
