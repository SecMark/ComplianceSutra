import { call, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import { actions, types } from "./actions";
import api from "../api";
import { toast } from "react-toastify";
import { actions as menuActions } from "../../OnBording/SubModules/DashBoardCO/MenuRedux/actions";
import { actions as onBoardingActions } from "../../OnBording/redux/actions";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../apiServices/baseurl";
import { getUserType } from "../components/Auth";

const loginReq = function* loginReq({ payload }) {
  try {
    const { data } = yield call(api.loginAccount, payload);
    const { message } = data;
    if (message.status) {
      const { token, UserType, signup_done, details, route, page } = message;
      localStorage.setItem("basicToken", token);
      if (data) {
        const deviceToken = localStorage.getItem("deviceToken");

        axios.post(
          `${BACKEND_BASE_URL}compliance.api.setFCMToken`,
          { token: deviceToken },
          {
            headers: { Authorization: `Basic ${token}` },
          }
        );

        let userType = getUserType(UserType);
        localStorage.setItem("userType", userType);
        message.UserType = userType;
        message.full_name = data.full_name;
        yield put(
          actions.signInRequestSuccess({ loginSuccess: false, data: message })
        );
        if (signup_done) {
          if (userType === 3 || userType === 5) {
            payload.history.push("/dashboard-view");
          } else {
            payload.history.push("/dashboard");
          }
        } else {
          console.log({ route, details });
          if (route && details && page) {
            if (message.mobileVerified === 0 && page === "otpverification-co") {
              payload.history.replace({
                pathname: "/otpverification-co",
                state: {
                  mobile_number: message.Mobile,
                  token: message.token,
                  type: "mobile-validation",
                },
              });
            } else if (page === "company details") {
              yield put(
                onBoardingActions.insUpdateDeletAPIRequestSuccess({
                  ...details,
                  email: message?.email,
                  full_name: message?.full_name,
                  token: message?.token,
                  mobile_number: message?.Mobile,
                })
              );
              payload.history?.replace(route);
            } else {
              payload.history?.replace(route);
            }
          }
        }
      }
    } else {
      toast.error("Invalid username and password !!!");
      yield put(actions.signInRequestFailed({ loginSuccess: false }));
    }
  } catch (err) {
    yield put(actions.signInRequestFailed({ loginSuccess: false }));
  }
};
const updatePasswordReq = function* updatePasswordReq({ payload }) {
  try {
    const { status, data } = yield call(api.updatePassword, payload);
    if (
      status === 200 &&
      data &&
      data.message &&
      data.message.status === true
    ) {
      yield put(actions.updatePasswordRequestSuccess({ resetPassword: true }));
      toast.success("Password changed successfully");
      payload.history.push("/login");
    } else {
      if (data && data.message && data.message.status === "Fail") {
        toast.error(
          data.message.status_response ||
            "Something went wrong! Please try again"
        );
      }
      yield put(actions.updatePasswordRequestFailed({ resetPassword: false }));
    }
  } catch (err) {
    toast.error("Something went wrong. Please try again");
    yield put(actions.updatePasswordRequestFailed({ resetPassword: false }));
  }
};

export default function* sagas() {
  yield takeLatest(types.SIGN_IN_REQUEST, loginReq);
  yield takeLatest(types.UPDATE_PASSWORD_REQUEST, updatePasswordReq);
}
