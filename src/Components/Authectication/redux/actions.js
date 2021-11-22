import { createAction } from "redux-actions";

// Action type

const SIGN_IN_REQUEST = "CAPMTECH/SIGN_IN_REQUEST";
const SIGN_IN_REQUEST_SUCCESS = "CAPMTECH/SIGN_IN_REQUEST_SUCCESS";
const SIGN_IN_REQUEST_FAILED = "CAPMTECH/SIGN_IN_REQUEST_FAILED";

const LOGOUT_REQUEST = "CAPMTECH/LOGOUT_REQUEST";

const UPDATE_PASSWORD_REQUEST = "CAPMTECH/UPDATE_PASSWORD_REQUEST";
const UPDATE_PASSWORD_REQUEST_SUCCESS =
  "CAPMTECH/UPDATE_PASSWORD_REQUEST_SUCCESS";
const UPDATE_PASSWORD_REQUEST_FAILED =
  "CAPMTECH/UPDATE_PASSWORD_REQUEST_FAILED";

const UPDATE_EMAIL_INFO = "CAPMTECH/UPDATE_EMAIL_INFO";
const UPDATE_USER_TYPE = "CAPMTECH/UPDATE_EMAIL_INFO";
// Action method
const signInRequest = createAction(SIGN_IN_REQUEST);
const signInRequestSuccess = createAction(SIGN_IN_REQUEST_SUCCESS);
const signInRequestFailed = createAction(SIGN_IN_REQUEST_FAILED);

const createLogoutAction = createAction(LOGOUT_REQUEST);

const updatePasswordRequest = createAction(UPDATE_PASSWORD_REQUEST);
const updatePasswordRequestSuccess = createAction(
  UPDATE_PASSWORD_REQUEST_SUCCESS
);
const updatePasswordRequestFailed = createAction(
  UPDATE_PASSWORD_REQUEST_FAILED
);

const updateEmailInfo = createAction(UPDATE_EMAIL_INFO);
const updateUserType = createAction(UPDATE_USER_TYPE);

export const actions = {
  signInRequest,
  signInRequestSuccess,
  signInRequestFailed,

  updatePasswordRequest,
  updatePasswordRequestSuccess,
  updatePasswordRequestFailed,

  updateEmailInfo,
  createLogoutAction,
  updateUserType,
};

export const types = {
  UPDATE_EMAIL_INFO,

  SIGN_IN_REQUEST,
  SIGN_IN_REQUEST_SUCCESS,
  SIGN_IN_REQUEST_FAILED,
  LOGOUT_REQUEST,

  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_REQUEST_SUCCESS,
  UPDATE_PASSWORD_REQUEST_FAILED,
  UPDATE_USER_TYPE,
};
