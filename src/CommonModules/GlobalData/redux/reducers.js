import { handleActions } from 'redux-actions';
import { types } from './actions';

const actionHandler = {
    [types.COUNTRYCODE_LIST_REQUEST]: (state) => ({
        ...state,
        countryCodeList: {}
    }),
    [types.COUNTRYCODE_LIST_REQUEST_FAILED]: (state,) => ({
        ...state,
        countryCodeList: {}
    }),
    [types.COUNTRYCODE_LIST_REQUEST_SUCCESS]: (state, { payload }) => ({
        ...state,
        countryCodeList: payload.countryCode
    }),

};

export default handleActions(actionHandler, {

    countryCodeList: {}
});
