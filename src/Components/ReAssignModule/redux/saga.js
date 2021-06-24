import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../CommonModules/GlobalData/api";
import {
  setReAssignTasksList,
  setSuccess,
} from "./actions";
import { GET_REASSIGN_TASKS_LIST} from "./types";

function* fetchReAssignTasksList(action) {
  try {
    const { data, status } = yield call(api.getReAssignTasksList, action.payload);
    if (status === 200) {
      yield put(setSuccess(true));
      yield put(setReAssignTasksList(data));
    } else {
    }
  } catch (e) {
    console.log(e.message);
  }
}

function* reAssignTasksSaga() {
  yield takeLatest(GET_REASSIGN_TASKS_LIST, fetchReAssignTasksList);
}

export default reAssignTasksSaga;
