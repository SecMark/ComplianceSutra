import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import api from "../../../CommonModules/GlobalData/api";
import {
  makePayment,
  paymentDone,
  setPayment,
  setSuccess,
} from "../Redux/actions";
import { GET_PAYMENT_DETAIL, MAKE_PAYMENT } from "./types";

function* fetchPaymentDetail(action) {
  try {
    const { data, status } = yield call(api.getPayments, action.payload);
    if (status === 200) {
      yield put(setSuccess(true));
      yield put(setPayment(data));
    } else {
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* createPayment(action) {
  try {
    const { data, status } = yield call(api.getPayments, action.payload);
    if (status === 200) {
      yield put(setSuccess(true));
      yield put(paymentDone(true));
      yield put(makePayment(data));
    } else {
    }
  } catch (error) {
    yield put(paymentDone(false));
    console.log(error.message);
  }
}

function* paymentSaga() {
  yield takeLatest(GET_PAYMENT_DETAIL, fetchPaymentDetail);
  yield takeLatest(MAKE_PAYMENT, createPayment);
}

export default paymentSaga;
