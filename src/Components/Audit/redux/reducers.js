import {
  SET_SECTION_NAME,
  GET_QUESTION_LIST,
  SET_TEMPLATE_NAME,
  SET_QUESTION_LIST,
} from "./types";

const initailState = {
  currentSectionId: "",
  questionList: [],
  templateName: "",
};

const reducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case SET_SECTION_NAME:
      return { ...state, sectionName: payload.sectionName };
    case SET_TEMPLATE_NAME:
      return { ...state, templateName: payload };

    case GET_QUESTION_LIST:
      return { ...state, questionList: payload.questionList };

    case SET_QUESTION_LIST:
      console.log(payload);
      return { ...state, questionList: payload.questionList };

    default:
      return state;
  }
};

export default reducer;
