const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COMPANY_LIST": {
      return { ...state, companies: [...action.payload] };
    }

    case "SET_LICENSE_LIST": {
      return { ...state, licenses: [...action.payload] };
    }

    case "SELECT_COMPANY_TOGGLE":
      const companyId = action.payload;
      return {
        ...state,
        companies: [
          ...state.companies.filter((company) => {
            if (company.EntityGroupID === companyId) {
              company.selected = !company.selected;
            }
            return company;
          }),
        ],
      };
    case "SELECT_LICENSE_TOGGLE":
      const licenseId = action.payload;
      return {
        ...state,
        licenses: [
          ...state.licenses.filter((license) => {
            if (license.LicenseID === licenseId) {
              license.selected = !license.selected;
            }
            return license;
          }),
        ],
      };

    case "SELECT_FROM_DATE":
      return {
        ...state,
        from: action.payload,
      };
    case "SELECT_TO_DATE":
      return {
        ...state,
        to: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
