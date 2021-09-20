import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  EDIT_USER_STATUS_REQUEST,
  EDIT_USER_STATUS_SUCCESS,
  EDIT_USER_STATUS_FAILURE,
} from "../types/user";
import { getUsersAPI, editUserStatusAPI } from "../services/user";

function* getUsers(action) {
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

function* editUserStatus(action) {
  try {
    const user = yield call(editUserStatusAPI, action.payload);
    console.log("res", user.data);
    yield put({
      type: EDIT_USER_STATUS_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    const { response } = err;
    console.log("err", err);
    yield put({
      type: EDIT_USER_STATUS_FAILURE,
      payload: response.data,
    });
  }
}

export default function* sagas() {
  yield takeLatest(GET_USER_REQUEST, getUsers);
  yield takeLatest(EDIT_USER_STATUS_REQUEST, editUserStatus);
}
