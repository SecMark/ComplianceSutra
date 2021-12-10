import api from "../../../apiServices";

const getCountryCodeList = (payload) =>
  api.post("compliance.api.getRegulations", payload);

const getTaskReport = () => api.get("compliance.api.getCompanyDetails");
const getHisotry = (payload) =>
  api.post("compliance.api.getComplianceHistory", payload);

const getUpdates = (payload) =>
  api.post("compliance.api.getRegulations", payload);
const getFilters = () => api.get("compliance.api.getRegulationFilters");

const getPayments = (payload) => api.post("api/PaymentDetails", payload);

const addSection = (payload) => api.post("audit.api.AddQuestionnaireSection");

export default {
  getCountryCodeList,
  getTaskReport,
  getUpdates,
  getPayments,
  getHisotry,
  getFilters,
  addSection,
};
