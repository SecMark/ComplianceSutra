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
  SET_FILTER_PAYLOAD,
  SET_SEARCH,
} from "./types";

function* fetchUpdates(action) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(api.getUpdates, action.payload);
    if (data.message.status) {
      yield put(setLoading(false));
      yield put(setUpdates(data.message.data));
    } else {
      yield put(setLoading(false));
      yield put(setSuccess(false));
    }
  } catch (error) {
    yield put(setLoading(false));
    console.log(error.message);
  }
}

function* fetchIndustryList(action) {
  try {
    yield put(setLoading(true));
    const { data, status } = yield call(api.getUpdates, action.payload);
    if (status === 200) {
      yield put(setLoading(false));
      yield put(setIndustryList(data));
    } else {
      yield put(setLoading(false));
      yield put(setSuccess(false));
    }
  } catch (error) {
    yield put(setLoading(false));
    console.log(error.message);
  }
}

function* fetchIssuerList(action) {
  try {
    yield put(setLoading(true));
    const { data, status } = yield call(api.getUpdates, action.payload);
    if (status === 200) {
      yield put(setLoading(false));
      yield put(setIssuerList(data));
    } else {
      yield put(setLoading(false));
    }
  } catch (error) {
    yield put(setLoading(false));
    console.log(error.message);
  }
}

function* fetchTopicList(action) {
  try {
    yield put(setLoading(true));
    const { data, status } = yield call(api.getUpdates, action.payload);
    if (status === 200) {
      yield put(setLoading(false));
      yield put(setTopicList(data));
    } else {
      yield put(setLoading(false));
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(setSuccess(false));
    console.log(error.message);
  }
}

function* fetchFilterIndustryList(action) {
  try {
    const { data } = yield call(api.getUpdates, action.payload);
    if (data.message) {
      yield put(setLoading(false));
      yield put(setUpdates(data.message));
    } else {
      yield put(setLoading(false));
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(setSuccess(false));
    yield put(setUpdates([]));
    console.log(error.message);
  }
}

function* setSearchTextAndFetchIndustryList(action) {
  try {
    const { data, status } = yield call(api.getUpdates, action.payload);
    if (status === 200) {
      yield put(setLoading(false));
      yield put(setSuccess(true));
      yield put(setUpdates(data));
    } else {
      yield put(setLoading(false));
      yield put(setSuccess(false));
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(setSuccess(false));
    yield put(setUpdates([]));
    console.log(error.message);
  }
}

function* updatesSaga() {
  yield takeLatest(GET_UPDATES, fetchUpdates);
  yield takeLatest(GET_INDUSTRY_LIST, fetchIndustryList);
  yield takeLatest(GET_ISSUER_LIST, fetchIssuerList);
  yield takeLatest(GET_TOPIC_LIST, fetchTopicList);
  yield takeLatest(SET_FILTER_PAYLOAD, fetchFilterIndustryList);
  yield takeLatest(SET_SEARCH, setSearchTextAndFetchIndustryList);
}

export default updatesSaga;
