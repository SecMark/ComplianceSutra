import api from "../../../apiServices";

const getCountryCodeList = (payload) =>
  api.post("compliance.api.getRegulations", payload);

const getTaskReport = (payload) => api.post("api/getTaskReport", payload);

const getUpdates = (payload) =>
  api.post("compliance.api.getRegulations", payload);

const getPayments = (payload) => api.post("api/PaymentDetails", payload);

export default {
  getCountryCodeList,
  getTaskReport,
  getUpdates,
  getPayments,
};
