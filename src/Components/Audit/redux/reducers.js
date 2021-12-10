import { SET_SECTION_NAME } from "./types";

const initailState = {
  currentSectionId: "",
};

const reducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case SET_SECTION_NAME:
      return { ...state, sectionName: payload.sectionName };

    default:
      return state;
  }
};

export default reducer;
