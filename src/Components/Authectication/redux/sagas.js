import { call, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import { actions, types } from "./actions";
import api from "../api";
import { toast } from "react-toastify";
import { actions as menuActions } from "../../OnBording/SubModules/DashBoardCO/MenuRedux/actions";

const loginReq = function* loginReq({ payload }) {
  try {
    const { data } = yield call(api.loginAccount, payload);
    if (data && data.message && data.message.Message !== "FAIL") {
      const responseData = data.message;
      yield put(
        actions.signInRequestSuccess({ loginSuccess: true, data: responseData })
      );
      console.log("login response", responseData);
      if (
        responseData.IscreateBySecmark === 0 &&
        ((responseData && responseData.UserType === 3) ||
          responseData.UserType === 5 ||
          responseData.UserType === 6)
      ) {
        yield put(menuActions.setCurrentMenu("dashboard"));
        yield put(menuActions.setActiveTabInSetting("personal"));
        payload.history.push("/dashboard-view");
      } else if (responseData.IscreateBySecmark === 1) {
        payload.history.push("/expert-review/");
      } else {
        yield put(menuActions.setCurrentMenu("taskList"));
        payload.history.push("/dashboard");
      }
    } else {
      toast.error("Invalid username and password !!!");
      yield put(actions.signInRequestFailed({ loginSuccess: false }));
    }
  } catch (err) {
    // toast.error(
    //     (err && err.response && err.response.data && err.response.data.message) ||
    //         'Something went to wrong, Please try after sometime',
    // );
    yield put(actions.signInRequestFailed({ loginSuccess: false }));
  }
};
const updatePasswordReq = function* updatePasswordReq({ payload }) {
  try {
    const { data } = yield call(api.updatePassword, payload);
    if (data && data.message && data.message.Status === "Sucess") {
      yield put(actions.updatePasswordRequestSuccess({ resetPassword: true }));
      payload.history.push("/login");
      toast.success("Password changed successfully");
    } else {
      if (data && data.message && data.message.Status === "Fail") {
        let message = "";
        message = data.message.Message;
        toast.error(message && message);
      }
      yield put(actions.updatePasswordRequestFailed({ resetPassword: false }));
    }
  } catch (err) {
    toast.error("Something went wrong, Please try again after some time.");
    yield put(actions.updatePasswordRequestFailed({ resetPassword: false }));
  }
};

export default function* sagas() {
  yield takeLatest(types.SIGN_IN_REQUEST, loginReq);
  yield takeLatest(types.UPDATE_PASSWORD_REQUEST, updatePasswordReq);
}
