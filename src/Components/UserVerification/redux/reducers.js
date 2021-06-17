import { handleActions } from 'redux-actions';
import { types } from './actions';

const actionHandler = {
    [types.UPDATE_PHONE_NUMBER_OTP_REQUEST]: (state) => ({
        ...state,
        updateMobileNumber: false,
        otpInfo:{}
    }),
    [types.UPDATE_PHONE_NUMBER_OTP_REQUEST_FAILED]: (state,) => ({
        ...state,
        updateMobileNumber: false,
        otpInfo:{}
    }),
    [types.UPDATE_PHONE_NUMBER_OTP_REQUEST_SUCCESS]: (state, { payload }) => ({
        ...state,
        updateMobileNumber: false,
        otpInfo:payload
    }),
    [types.USER_DATA_SAVE_REQUEST]: (state) => ({
        ...state,
        personalInfo: {}

    }),
    [types.USER_DATA_SAVE_REQUEST_FAILED]: (state) => ({
        ...state,
        personalInfo: {}
    }),
    [types.USER_DATA_SAVE_REQUEST_SUCCESS]: (state, { payload }) => ({
        ...state,
        personalInfo: payload
    }),
};

export default handleActions(actionHandler, {
    updateMobileNumber: false,
    otpInfo: {},
    personalInfo: {}
});
