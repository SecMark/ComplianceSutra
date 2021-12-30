import { handleActions } from "redux-actions";
import { types } from "./actions";

const actionHandler = {
  [types.UPDATE_EMAIL_INFO]: (state, { payload }) => ({
    ...state,
    loginInfo: payload,
  }),

  [types.SIGN_IN_REQUEST]: (state) => ({
    ...state,
    loginSuccess: false,
    loginInfo: {},
  }),
  [types.LOGOUT_REQUEST]: (state) => {
    return {
      ...state,
      loginSuccess: false,
      loginInfo: {},
    };
  },
  [types.SIGN_IN_REQUEST_FAILED]: (state) => ({
    ...state,
    loginSuccess: false,
    loginInfo: {},
  }),
  [types.SIGN_IN_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    loginSuccess: true,
    loginInfo: payload.data,
  }),
  [types.UPDATE_PASSWORD_REQUEST]: (state) => ({
    ...state,
    updatePasswordInfo: {},
  }),
  [types.UPDATE_PASSWORD_REQUEST_FAILED]: (state) => ({
    ...state,
    updatePasswordInfo: {},
  }),
  [types.UPDATE_PASSWORD_REQUEST_SUCCESS]: (state, { payload }) => ({
    ...state,
    updatePasswordInfo: payload,
  }),
  [types.UPDATE_USER_TYPE]: (state, { payload }) => ({
    ...state,
    ...state.loginInfo,
    userType: payload,
  }),
};

export default handleActions(actionHandler, {
  loginSuccess: false,
  loginInfo: {},
  updatePasswordInfo: {},
});
