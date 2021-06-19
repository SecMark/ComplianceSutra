const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_COMPANY_TOGGLE":
      const companyId = action.payload;
      return {
        ...state,
        companies: [
          ...state.companies.filter((company) => {
            if (company.id === companyId) {
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
            if (license.id === licenseId) {
              license.selected = !license.selected;
            }
            return license;
          }),
        ],
      };

    default:
      return state;
  }
};

export default reducer;
