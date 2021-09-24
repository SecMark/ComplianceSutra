import api from "../../../apiServices";
import { test_customization_url } from "../../../apiServices/baseurl";

const getCountryCodeList = (payload) =>
  api.get(`${test_customization_url}Loginsuccess`, {
    params: {
      uInput: payload,
    },
  });

const getTaskReport = (payload) =>
  api.get(`${test_customization_url}getTaskReport`, {
    params: {
      uInput: payload,
    },
  });

const getUpdates = (payload) =>
  api.get(`${test_customization_url}Updates`, {
    params: {
      uInput: payload,
    },
  });

const getPayments = (payload) =>
  api.get(`${test_customization_url}PaymentDetails`, {
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
