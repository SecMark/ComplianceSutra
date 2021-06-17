import {  createAction } from 'redux-actions';

const UPDATE_PHONE_NUMBER_OTP_REQUEST = 'CAPMTECH/UPDATE_PHONE_NUMBER_OTP_REQUEST';
const UPDATE_PHONE_NUMBER_OTP_REQUEST_SUCCESS = 'CAPMTECH/UPDATE_PHONE_NUMBER_OTP_REQUEST_SUCCESS';
const UPDATE_PHONE_NUMBER_OTP_REQUEST_FAILED = 'CAPMTECH/UPDATE_PHONE_NUMBER_OTP_REQUEST_FAILED';

const USER_DATA_SAVE_REQUEST = 'CAPMTECH/USER_DATA_SAVE_REQUEST';
const USER_DATA_SAVE_REQUEST_SUCCESS = 'CAPMTECH/USER_DATA_SAVE_REQUEST_SUCCESS';
const USER_DATA_SAVE_REQUEST_FAILED = 'CAPMTECH/USER_DATA_SAVE_REQUEST_FAILED';


const updateMobileNumberOTPRequest = createAction(UPDATE_PHONE_NUMBER_OTP_REQUEST);
const updateMobileNumberOTPRequestSuccess = createAction(UPDATE_PHONE_NUMBER_OTP_REQUEST_SUCCESS);
const updateMobileNumberOTPRequestFailed = createAction(UPDATE_PHONE_NUMBER_OTP_REQUEST_FAILED);


const userDataSaveRequest = createAction(USER_DATA_SAVE_REQUEST);
const userDataSaveRequestSuccess = createAction(USER_DATA_SAVE_REQUEST_SUCCESS);
const userDataSaveRequestFailed = createAction(USER_DATA_SAVE_REQUEST_FAILED);

export const types = {
    UPDATE_PHONE_NUMBER_OTP_REQUEST,
    UPDATE_PHONE_NUMBER_OTP_REQUEST_SUCCESS,
    UPDATE_PHONE_NUMBER_OTP_REQUEST_FAILED,

    USER_DATA_SAVE_REQUEST_FAILED,
    USER_DATA_SAVE_REQUEST_SUCCESS,
    USER_DATA_SAVE_REQUEST
}


export const actions = {
    updateMobileNumberOTPRequest,
    updateMobileNumberOTPRequestFailed,
    updateMobileNumberOTPRequestSuccess,

    userDataSaveRequest,
    userDataSaveRequestFailed,
    userDataSaveRequestSuccess
}
