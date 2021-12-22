import { SET_SECTION_NAME ,SET_TEMPLATE_NAME} from "./types";

const initailState = {
  currentSectionId: "",
  templateName: ""
};

const reducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case SET_SECTION_NAME:
      return { ...state, sectionName: payload.sectionName };
    case SET_TEMPLATE_NAME:
      return{ ...state, templateName: payload};

    default:
      return state;
  }
};

export default reducer;
