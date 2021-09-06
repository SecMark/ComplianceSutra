import {
  GET_PAYMENT_DETAIL,
  IS_PAYMENT_DONE,
  MAKE_PAYMENT,
  SET_PAYMENT_DETAIL,
  SET_SUCCESS,
} from "./types";

const intialState = {
  paymentDetail: [],
  isSuccess: false,
  isPaymentDone: false,
};

const reducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case GET_PAYMENT_DETAIL:
      return state;

    case SET_PAYMENT_DETAIL:
      return {
        ...state,
        paymentDetail: [...payload],
      };

    case SET_SUCCESS:
      return {
        ...state,
        isSuccess: payload,
      };

    case IS_PAYMENT_DONE:
      return {
        ...state,
        isPaymentDone: payload,
      };

    case MAKE_PAYMENT:
      return state;

    default:
      return state;
  }
};

export default reducer;
