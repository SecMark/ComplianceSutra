import api from "../../../apiServices";

const getCountryCodeList = (payload) =>
  api.get("Loginsuccess", {
    params: {
      uInput: payload,
    },
  });

const getTaskReport = (payload) =>
  api.get("getTaskReport", {
    params: {
      uInput: payload,
    },
  });

const getUpdates = (payload) =>
  api.get("Updates", {
    params: {
      uInput: payload,
    },
  });

const getPayments = (payload) =>
  api.get("PaymentDetails", {
    params: {
      uInput: payload,
    },
  });

export default {
  getCountryCodeList,
  getTaskReport,
  getUpdates,
  getPayments,
};
