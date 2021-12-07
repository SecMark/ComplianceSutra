import {
  CLEAR_BADGE,
  CLEAR_FILTER,
  IS_LOADING,
  IS_SUCCESS,
  REMOVE_BADGES,
  SET_BADGES,
  SET_FROM_DATE,
  SET_INDUSTRY,
  SET_INDUSTRY_LIST,
  SET_ISSUER,
  SET_ISSUER_LIST,
  SET_IS_FILTER,
  SET_IS_SEARCH,
  SET_SEARCH,
  SET_TOPIC,
  SET_TOPIC_LIST,
  SET_TO_DATE,
  SET_UPDATES,
  UPDATE_FILTER,
} from "./types";
const initailState = {
  updateList: [],
  isSuccess: false,
  isLoading: false,
  industryList: [],
  issuerList: [],
  topicList: [],
  isSearch: false,
  isFilterApplied: false,
  industry: "",
  issuer: "",
  topic: "",
  from: "",
  to: "",
  searchText: "",
  badges: {
    industry: "",
    issuer: "",
    topic: "",
    from: "",
    to: "",
  },
};

const reducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case SET_UPDATES:
      return { ...state, updateList: [...payload] };

    case SET_INDUSTRY_LIST:
      return { ...state, industryList: [...payload] };

    case SET_ISSUER_LIST:
      return { ...state, issuerList: [...payload] };

    case SET_TOPIC_LIST:
      return { ...state, topicList: [...payload] };

    case SET_INDUSTRY:
      return { ...state, industry: payload };

    case SET_ISSUER:
      return { ...state, issuer: payload };

    case SET_TOPIC:
      return { ...state, topic: payload };

    case SET_TO_DATE:
      return { ...state, to: payload };

    case SET_FROM_DATE:
      return { ...state, from: payload };

    case SET_IS_FILTER:
      return { ...state, isFilterApplied: payload };

    case IS_SUCCESS:
      return { ...state, isSuccess: payload };

    case IS_LOADING:
      return { ...state, isLoading: payload };

    case CLEAR_FILTER:
      return {
        ...state,
        from: "",
        to: "",
        industry: "",
        issuer: "",
        topic: "",
        isFilterApplied: false,
        isSearch: false,
        isLoading: false,
        isSuccess: false,
        updateList: [],
        badges: {
          fromAndToDate: "",
          industry: "",
          issuer: "",
          topic: "",
        },
      };

    case SET_IS_SEARCH:
      return {
        ...state,
        isSearch: payload,
      };

    case SET_BADGES:
      return {
        ...state,
        ...{ badges: payload },
      };
    case REMOVE_BADGES:
      return {
        ...state,
        badges: { ...state.badges, [payload.key]: payload.value },
      };

    case UPDATE_FILTER:
      return {
        ...state,
        [payload.key]: payload.value,
      };

    default:
      return state;
  }
};

export default reducer;
