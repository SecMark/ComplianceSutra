import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import api from "../../../CommonModules/GlobalData/api";
import {
  setCompanyList,
  setHistoryList,
  setLicenseList,
  setSuccess,
} from "./actions";
import { GET_COMPANY_LIST, GET_HISTORY_LIST, GET_LICENSE_LIST } from "./types";

function* fetchCompanyList(action) {
  try {
    const { data, status } = yield call(api.getTaskReport, action.payload);
    if (status === 200) {
      yield put(setSuccess(true));
      yield put(setCompanyList(data));
    } else {
    }
  } catch (e) {
    console.log(e.message);
  }
}

function* fetchLicenseList(action) {
  try {
    const { data, status } = yield call(api.getTaskReport, action.payload);
    if (status === 200) {
      yield put(setSuccess(true));
      yield put(setLicenseList(data));
    } else {
    }
  } catch (e) {
    console.log(e.message);
  }
}

function* fetchHistoryList(action) {
  try {
    const { data, status } = yield call(api.getTaskReport, action.payload);
    if (status === 200) {
      yield put(setSuccess(true));
      yield put(setHistoryList(data));
    } else {
    }
  } catch (e) {
    console.log(e.message);
  }
}

function* historySaga() {
  yield takeLatest(GET_COMPANY_LIST, fetchCompanyList);
  yield takeLatest(GET_LICENSE_LIST, fetchLicenseList);
  yield takeLatest(GET_HISTORY_LIST, fetchHistoryList);
}

export default historySaga;
