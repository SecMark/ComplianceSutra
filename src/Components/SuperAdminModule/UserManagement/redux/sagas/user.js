import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../types/user";
import { getUsersAPI } from "../services/user";

function* getUserListFromAPI(action) {
  try {
    const user = yield call(getUsersAPI, action.payload);
    yield put({
      type: GET_USER_SUCCESS,
      payload: user.data,
    });
  } catch (err) {
    const { response } = err;
    yield put({
      type: GET_USER_FAILURE,
      payload: response.data,
    });
  }
}

export default function* sagas() {
  yield takeLatest(GET_USER_REQUEST, getUserListFromAPI);
}
