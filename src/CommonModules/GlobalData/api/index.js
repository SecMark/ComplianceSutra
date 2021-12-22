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
const getQuestionList = (payload) =>
  api.get(
    `audit.api.getQuestionReference?audit_template_name=${payload.audit_template_name}`
  );

export default {
  getCountryCodeList,
  getTaskReport,
  getUpdates,
  getPayments,
  getHisotry,
  getFilters,
  addSection,
  getQuestionList,
};
