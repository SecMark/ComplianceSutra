import { createAction } from 'redux-actions';

// Action type

const COUNTRYCODE_LIST_REQUEST = 'CAPMTECH/COUNTRYCODE_LIST_REQUEST';
const COUNTRYCODE_LIST_REQUEST_SUCCESS = 'CAPMTECH/COUNTRYCODE_LIST_REQUEST_SUCCESS';
const COUNTRYCODE_LIST_REQUEST_FAILED = 'CAPMTECH/COUNTRYCODE_LIST_REQUEST_FAILED';


// Action method
const countryCodeRequest = createAction(COUNTRYCODE_LIST_REQUEST);
const countryCodeRequetsSuccess = createAction(COUNTRYCODE_LIST_REQUEST_SUCCESS);
const countryCodeRequestFailed = createAction(COUNTRYCODE_LIST_REQUEST_FAILED);


export const actions = {
    countryCodeRequest,
    countryCodeRequetsSuccess,
    countryCodeRequestFailed
   
};

export const types = {
    COUNTRYCODE_LIST_REQUEST,
    COUNTRYCODE_LIST_REQUEST_SUCCESS,
    COUNTRYCODE_LIST_REQUEST_FAILED
};
