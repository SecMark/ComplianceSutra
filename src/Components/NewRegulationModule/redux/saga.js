import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../CommonModules/GlobalData/api";
import {
  setIndustryList,
  setIssuerList,
  setLoading,
  setSuccess,
  setTopicList,
  setUpdates,
} from "./actions";
import {
  GET_INDUSTRY_LIST,
  GET_ISSUER_LIST,
  GET_TOPIC_LIST,
  GET_UPDATES,
} from "./types";

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

function* fetchIndustryList(action) {
  try {
    yield put(setLoading(true));
    const { data, status } = yield call(api.getUpdates, action.payload);
    if (status === 200) {
      yield put(setLoading(false));
      yield put(setSuccess(true));
      yield put(setIndustryList(data));
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

function* fetchIssuerList(action) {
  try {
    yield put(setLoading(true));
    const { data, status } = yield call(api.getUpdates, action.payload);
    if (status === 200) {
      yield put(setLoading(false));
      yield put(setSuccess(true));
      yield put(setIssuerList(data));
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

function* fetchTopicList(action) {
  try {
    yield put(setLoading(true));
    const { data, status } = yield call(api.getUpdates, action.payload);
    if (status === 200) {
      yield put(setLoading(false));
      yield put(setSuccess(true));
      yield put(setTopicList(data));
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
  yield takeLatest(GET_INDUSTRY_LIST, fetchIndustryList);
  yield takeLatest(GET_ISSUER_LIST, fetchIssuerList);
  yield takeLatest(GET_TOPIC_LIST, fetchTopicList);
}

export default updatesSaga;
