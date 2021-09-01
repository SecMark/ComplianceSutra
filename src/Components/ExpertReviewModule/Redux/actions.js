import {
  GET_PAYMENT_DETAIL,
  IS_PAYMENT_DONE,
  MAKE_PAYMENT,
  SET_PAYMENT_DETAIL,
  SET_SUCCESS,
} from "./types";

export const getPayment = (payload) => {
  return {
    type: GET_PAYMENT_DETAIL,
    payload,
  };
};

export const setPayment = (payload) => {
  return {
    type: SET_PAYMENT_DETAIL,
    payload,
  };
};

export const setSuccess = (payload) => {
  return {
    type: SET_SUCCESS,
    payload,
  };
};

export const paymentDone = (payload) => {
  return {
    type: IS_PAYMENT_DONE,
    payload,
  };
};

export const makePayment = (payload) => {
  return {
    type: MAKE_PAYMENT,
    payload,
  };
};
