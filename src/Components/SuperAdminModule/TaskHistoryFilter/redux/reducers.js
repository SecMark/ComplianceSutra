import {
  GET_FILTER,
  SET_FILTER,
  SET_COMPANY_LIST,
  SET_LOADING,
  SET_SUCCESS,
  SET_LICENSE_LIST,
  SELECT_COMPANY_TOGGLE,
  SELECT_LICENSE_TOGGLE,
  SELECT_FROM_DATE,
  SELECT_TO_DATE,
  SET_HISTORY_LIST,
  CLEAR_STATE,
  CLEAR_LICENSE_LIST,
} from "./types";

const intialState = {
  from: [],
  to: [],
  selectedCompany: "",
  selectedLicenses: "",
  companyList: [],
  licenseList: [],
  isLoading: false,
  isSuccess: false,
  numberOfSelectedCompanies: 0,
  numberOfSelectedLicense: 0,
  historyList: [],
};

const reducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case SET_FILTER:
      return {
        ...state,
        from: payload.from,
        to: payload.to,
        selectedCompany: payload.selectedCompany,
        selectedLicenses: payload.selectedLicenses,
      };

    case GET_FILTER:
      return state;

    case SET_COMPANY_LIST: {
      return {
        ...state,
        companyList: [...payload],
      };
    }

    case SET_LICENSE_LIST: {
      return {
        ...state,
        licenseList: [...payload],
      };
    }

    case SET_HISTORY_LIST: {
      return { ...state, historyList: [...payload] };
    }

    case SET_LOADING: {
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    }

    case SET_SUCCESS: {
      return {
        ...state,
        isSuccess: payload,
      };
    }

    case SELECT_COMPANY_TOGGLE:
      const companyId = payload;
      return {
        ...state,
        companyList: [
          ...state.companyList.filter((company) => {
            if (company.EntityGroupID === companyId) {
              company.selected = !company.selected;
            }
            return company;
          }),
        ],
        numberOfSelectedCompanies: state.companyList.filter(
          (company) => company.selected === true
        ).length,
      };

    case SELECT_LICENSE_TOGGLE:
      const licenseId = payload;
      return {
        ...state,
        licenses: [
          ...state.licenseList.filter((license) => {
            if (license.LicenseID === licenseId) {
              license.selected = !license.selected;
            }
            return license;
          }),
        ],
        numberOfSelectedLicense: state.licenseList.filter(
          (list) => list.selected === true
        ).length,
      };

    case SELECT_FROM_DATE:
      return {
        ...state,
        from: payload,
      };

    case SELECT_TO_DATE:
      return {
        ...state,
        to: payload,
      };

    case CLEAR_LICENSE_LIST:
      return { ...state, licenseList: [], numberOfSelectedLicense: 0 };

    case CLEAR_STATE:
      return {
        ...state,
        selectedCompany: "",
        selectedLicenses: "",
        licenseList: [],
        isLoading: false,
        isSuccess: false,
        numberOfSelectedCompanies: 0,
        numberOfSelectedLicense: 0,
      };

    default:
      return state;
  }
};

export default reducer;
