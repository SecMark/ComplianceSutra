import { createAction } from "redux-actions";

// Action type

const INS_UPDATE_DELETE_API_REQUEST_TM =
  "CAPMTECH/INS_UPDATE_DELETE_API_REQUEST_TM";
const INS_UPDATE_DELETE_API_SUCCESS_TM =
  "CAPMTECH/INS_UPDATE_DELETE_API_SUCCESS_TM";
const INS_UPDATE_DELETE_API_FAILED_TM =
  "CAPMTECH/INS_UPDATE_DELETE_API_FAILED_TM";

const SEND_OTP_ACTION_REQUEST_TM = "CAPMTECH/SEND_OTP_ACTION_REQUEST_TM";
const SEND_OTP_ACTION_SUCCESS_TM = "CAPMTECH/SEND_OTP_ACTION_REQUEST_TM";
const SEND_OTP_ACTION_FAILED_TM = "CAPMTECH/SEND_OTP_ACTION_REQUEST_TM";

const STORE_TEAM_MEMBER = 'CAPMTECH/STORE_TEAM_MEMBER'



const AVAIL_CHECK_REQUEST = 'CAPMTECH/AVAIL_CHECK_REQUEST';
const AVAIL_CHECK_REQUEST_SUCCESS = 'CAPMTECH/AVAIL_CHECK_REQUEST_SUCCESS';
const AVAIL_CHECK_REQUEST_FAILED = 'CAPMTECH/AVAIL_CHECK_REQUEST_FAILED';



const createActionForMailCheckRequest = createAction(AVAIL_CHECK_REQUEST);
const createActionForMailCheckSuccess = createAction(AVAIL_CHECK_REQUEST_SUCCESS);
const createActionForMailCheckFailed = createAction(AVAIL_CHECK_REQUEST_SUCCESS);


// Action method
const storeTeamMemberData = createAction(STORE_TEAM_MEMBER);

const sendOTPRequestTM = createAction(SEND_OTP_ACTION_REQUEST_TM);
const sendOTPRequestSuccessTM = createAction(SEND_OTP_ACTION_SUCCESS_TM);
const sendOTPRequestFailedTM = createAction(SEND_OTP_ACTION_FAILED_TM);

const insUpdateDeletAPIRequestTM = createAction(
  INS_UPDATE_DELETE_API_REQUEST_TM
);
const insUpdateDeletAPIRequestSuccessTM = createAction(
  INS_UPDATE_DELETE_API_SUCCESS_TM
);
const insUpdateDeletAPIRequestFailedTM = createAction(
  INS_UPDATE_DELETE_API_FAILED_TM
);

export const actions = {
  insUpdateDeletAPIRequestTM,
  insUpdateDeletAPIRequestSuccessTM,
  insUpdateDeletAPIRequestFailedTM,

  createActionForMailCheckRequest,
  createActionForMailCheckFailed,
  createActionForMailCheckSuccess,

  sendOTPRequestTM,
  sendOTPRequestFailedTM,
  sendOTPRequestSuccessTM,
  storeTeamMemberData
};

export const types = {
  AVAIL_CHECK_REQUEST,
  AVAIL_CHECK_REQUEST_FAILED,
  AVAIL_CHECK_REQUEST_SUCCESS,

  SEND_OTP_ACTION_REQUEST_TM,
  SEND_OTP_ACTION_SUCCESS_TM,
  SEND_OTP_ACTION_FAILED_TM,

  INS_UPDATE_DELETE_API_REQUEST_TM,
  INS_UPDATE_DELETE_API_SUCCESS_TM,
  INS_UPDATE_DELETE_API_FAILED_TM,

  STORE_TEAM_MEMBER
};
