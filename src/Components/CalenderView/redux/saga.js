import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../CommonModules/GlobalData/api";
import { setDayData, setLoading, setSuccess, setWeekData } from "./actions";
import { GET_DAY, GET_WEEK } from "./types";

function* fetchCalenderDayData(action) {
  try {
    yield put(setLoading(true));
    const { data, status } = yield call(api.getTaskReport, action.payload);
    if (status === 200) {
      yield put(setSuccess(true));
      yield put(setLoading(false));
      yield put(setDayData(data));
    } else {
      yield put(setSuccess(false));
      yield put(setLoading(false));
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* fetchCalenderWeekData(action) {
  try {
    yield put(setLoading(true));
    const { data, status } = yield call(api.getTaskReport, action.payload);
    if (status === 200) {
      yield put(setSuccess(true));
      yield put(setLoading(false));
      yield put(setWeekData(data));
    } else {
      yield put(setSuccess(false));
      yield put(setLoading(false));
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* calenderViewSaga() {
  yield takeLatest(GET_DAY, fetchCalenderDayData);
  yield takeLatest(GET_WEEK, fetchCalenderWeekData);
}

export default calenderViewSaga;
