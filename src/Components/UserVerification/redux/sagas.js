import { call, delay, put, takeLatest } from "redux-saga/effects";
import { actions, types } from "./actions";
import api from "../api";
import apiServices from "../../../apiServices";
import { toast } from "react-toastify";

const userDataSaveRequest = function* userDataSaveRequest({ payload }) {
  try {
    console.log("SDfsdfafsadfdsa");
    const { history } = payload;
    delete payload.history;
    const { data } = yield call(api.insertUpdateUserRequets, payload);
    const { message } = data;
    if (message.status !== false) {
      const { token } = message;
      localStorage.setItem("basicToken", token);
      yield put(actions.userDataSaveRequestSuccess(payload));
      toast.success("Personal Information saved successfully");
      history.push("/otp-verification");
    }
  } catch (err) {
    toast.error("Something went wrong");
    yield put(actions.userDataSaveRequestFailed());
  }
};

const updateMobileNumberOTP = function* updateMobileNumberOTP({ payload }) {
  try {
    const { data, status } = yield call(api.insertUpdateUserRequets, payload);
    if (status === 200) {
      yield put(actions.updateMobileNumberOTPRequestSuccess(data));

      let obj = {
        phn: payload.adminMobile,
        email: payload.adminEmail,
      };
      apiServices
        .post("/api/sendmsgwithverificationcode", obj)
        .then(function (response) {
          // handle success
          if (
            response &&
            response.data &&
            response.data.otp !== "" &&
            response.data.statuscode === "200"
          ) {
            toast.success(
              "The OTP has been sent to your registered mobile number"
            );
          } else {
            toast.error("something went wrong please try again !!!");
          }
        })
        .catch(function (error) {
          if (error) {
          }
        });
      toast.success(data && data.Message);
    }
  } catch (err) {}
};

export default function* sagas() {
  yield takeLatest(
    types.UPDATE_PHONE_NUMBER_OTP_REQUEST,
    updateMobileNumberOTP
  );
  yield takeLatest(types.USER_DATA_SAVE_REQUEST, userDataSaveRequest);
}
