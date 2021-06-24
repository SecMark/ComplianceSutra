import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../CommonModules/GlobalData/api";
import { setLoading, setSuccess, setUpdates } from "./actions";
import { GET_UPDATES } from "./types";

function* fetchUpdates(action) {
  try {
    yield put(setLoading(true));
    const { data, status } = yield call(api.getUpdates, action.payload);
    if (status === 200) {
      yield put(setLoading(false));
      yield put(setSuccess(true));
      yield put(setUpdates(data));
    } else {
      yield put(setLoading(false));
      yield put(setSuccess(false));
    }
  } catch (e) {
    yield put(setLoading(false));
    yield put(setSuccess(false));
    console.log(e.message);
  }
}

function* updatesSaga() {
  yield takeLatest(GET_UPDATES, fetchUpdates);
}

export default updatesSaga;
