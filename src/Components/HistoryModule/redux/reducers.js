import { GET_FILTER, SET_FILTER } from "./types";

const intialState = {
  from: "",
  to: "",
  selectedCompany: "",
  selectedLicenses: "",
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

    default:
      return state;
  }
};

export default reducer;
