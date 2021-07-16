import { call, put, takeLatest, delay } from "redux-saga/effects";
import { actions, types } from "./actions";
import api from "../api";
import { toast } from "react-toastify";

const otpRequestTM = function* otpRequestTM({ payload }) {
    try {
        const { data, status } = yield call(api.sendOTP, payload);
        if (status === 200) {
            yield put(actions.sendOTPRequestSuccessTM(data));
            //yield put(push(`/${authData && authData.store_locale}/my-account`));
            toast.success("The otp has been sent on your registered mobile number");
        } else {
            toast.error("Failed to verify OTP Request");
            yield put(actions.sendOTPRequestFailedTM({}));
        }
    } catch (err) {
        yield put(actions.sendOTPRequestFailedTM({}));
        toast.error("Failed to verify OTP Request");

    }
};

const insertUpdateDeleteAPIReqTM = function* insertUpdateDeleteAPIReqTM({ payload }) {
    try {
        const { data, status } = yield call(api.insertUpdateAPIRequest, payload);
        if (status === 200) {
            let statusCode, message;
            statusCode = data && data[0] && data[0].StatusCode;
            message = data && data[0] && data[0].Message;
            if (statusCode !== undefined && !statusCode) {
                yield put(actions.insUpdateDeletAPIRequestSuccessTM({ loginSuccess: true, statusCode: status, message: message }));
                toast.error("Email already exists");
            } else {
                let companyName = payload.entityName
                yield put(actions.insUpdateDeletAPIRequestSuccessTM({ formDataPersonalTM: payload, personalInfoTM: data }));
                toast.success("Personal Information saved successfully")
                if (payload.from === 'personal-details-team') {
                    payload.history.push("/team-member-secure-verification");
                }
            }

        } else {
            toast.error("something went wrong !!!");
            yield put(actions.insUpdateDeletAPIRequestFailedTM());
        }
    } catch (err) {
        // toast.error(
        //     (err && err.response && err.response.data && err.response.data.message) ||
        //         'Something went to wrong, Please try after sometime',
        // );
        yield put(actions.insUpdateDeletAPIRequestFailedTM());

    }
};



const emailavailabilityCheckReq = function* emailavailabilityCheckReq({ payload }) {
    try {
        const { data, status } = yield call(api.availabilityCheck, payload);
        if (status === 200) {
            if (data.Status === "True") {
                payload.history.push("/team-member")
            }
            yield put(actions.createActionForMailCheckSuccess());

        } else {
            // toast.error("something went wrong !!!");
            yield put(actions.createActionForMailCheckFailed());
        }
    } catch (err) {
        yield put(actions.createActionForMailCheckFailed());
    }
};


export default function* sagas() {
    yield takeLatest(types.INS_UPDATE_DELETE_API_REQUEST_TM, insertUpdateDeleteAPIReqTM);
    yield takeLatest(types.SEND_OTP_ACTION_REQUEST_TM, otpRequestTM);
    yield takeLatest(types.AVAIL_CHECK_REQUEST, emailavailabilityCheckReq)
}
