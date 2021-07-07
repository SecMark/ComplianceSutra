const reducer = (state, action) => {
    switch (action.type) {
      case "SET_FROM_DATE":
        return {
          ...state,
          from: action.payload,
        };
      case "SET_TO_DATE":
        return {
          ...state,
          to: action.payload,
        };
      case "SET_DUE_DATE":
        return {
          ...state,
          dueOn: action.payload,
        };
      default:
        return state;
    }
  };
export default reducer;