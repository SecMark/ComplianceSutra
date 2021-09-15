import { call, delay, put, takeLatest } from "redux-saga/effects";
import { actions, types } from "./actions";
import api from "../api";
import apiServices from "../../../apiServices";
import { toast } from "react-toastify";

const userDataSaveRequest = function* userDataSaveRequest({ payload }) {
  try {
    const { data, status } = yield call(api.insertUpdateUserRequets, payload);
    if (status === 200) {
      let userID = "";
      if (data && data[0] && data[0].StatusCode === false) {
        toast.error(data[0].Message);
      } else {
        userID =
          data &&
          data[0] &&
          data[0][0] &&
          data[0][0].UserDetails &&
          data[0][0].UserDetails[0] &&
          data[0][0].UserDetails[0].UserID;
        if (userID === "" || userID === 0) {
          toast.error("Unable to generate user ID ", userID);
        } else if (userID !== "") {
          yield put(
            actions.userDataSaveRequestSuccess({
              userType: payload.userType,
              formData: payload,
            })
          );
          toast.success("Personal Information saved successfully", {
            toastId: "personal-info-save",
          });
          yield delay(2000);
          payload.history.push(
            `/otp-verification?email=${payload.adminEmail}&type=${payload.userType}`
          );
        } else {
          toast.error("Something went wrong");
        }
      }
    } else {
      toast.success("Something went wrong");
      yield put(actions.userDataSaveRequestFailed());
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
