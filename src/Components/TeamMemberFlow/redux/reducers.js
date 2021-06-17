import { handleActions } from "redux-actions";
import { types } from "./actions";

const actionHandler = {
  [types.AVAIL_CHECK_REQUEST]: (state) => ({
    ...state,
    info: {}
  }),
  [types.AVAIL_CHECK_REQUEST_FAILED]: (state, { payload }) => ({
    ...state,
    info: {},
  }),
  [types.AVAIL_CHECK_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    info: {},
  }),

  [types.STORE_TEAM_MEMBER]: (state, { payload }) => ({
    ...state,
    teamMemberEmailVerifyInfo: payload || {},
  }),
  [types.INS_UPDATE_DELETE_API_REQUEST_TM]: (state) => ({
    ...state,
    personalInfoTM: {},
  }),
    [types.INS_UPDATE_DELETE_API_FAILED_TM]: (state) => ({
        ...state,
        personalInfoTM: {}
    }),
  [types.INS_UPDATE_DELETE_API_SUCCESS_TM]: (state, { payload }) => ({
    ...state,
    personalInfoTM: payload,
  }),

  [types.SEND_OTP_ACTION_REQUEST_TM]: (state) => ({
    ...state,
    otoInfoTM: {},
  }),
  [types.SEND_OTP_ACTION_SUCCESS_TM]: (state, { payload }) => ({
    ...state,
    otoInfoTM: payload,
  }),
  [types.SEND_OTP_ACTION_FAILED_TM]: (state) => ({
    ...state,
    otoInfoTM: {},
  }),
};

export default handleActions(actionHandler, {
  personalInfoTM: {},
  loader: false,
  otoInfoTM: {},
  info: {},
  teamMemberEmailVerifyInfo: {},
  teamMemberInfo: {}
});
