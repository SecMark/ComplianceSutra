import { SET_SECTION_NAME, GET_QUESTION_LIST } from "./types";

const initailState = {
  currentSectionId: "",
  questionList: [],
};

const reducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case SET_SECTION_NAME:
      return { ...state, sectionName: payload.sectionName };

    case GET_QUESTION_LIST:
      return { ...state, questionList: payload.questionList };

    default:
      return state;
  }
};

export default reducer;
