import { handleActions } from "redux-actions";
import {
  CLEAR_QUIZ,
  CLEAR_QUIZ_STEPPER,
  CLEAR_QUIZ_STEPPER_STATUS,
  GET_QUIZ_FAILED,
  GET_QUIZ_REQUEST,
  GET_QUIZ_SUCCESS,
  SET_QUIZ_RESULT_FAILED,
  SET_QUIZ_RESULT_REQUEST,
  SET_QUIZ_RESULT_SUCCESS,
  SET_QUIZ_STEPPER,
  SET_QUIZ_STEPPER_STATUS,
  CLEAR_QUIZ_RESULT,
} from "./actions";

const actionHandlers = {
  [GET_QUIZ_REQUEST]: (state) => ({
    ...state,
    quizData: {
      ...state?.quizData,
      isLoading: true,
      isError: false,
      quiz: [],
      circular_no: "",
    },
  }),
  [GET_QUIZ_SUCCESS]: (state, { payload }) => ({
    ...state,
    quizData: {
      ...state?.quizData,
      isLoading: false,
      isError: false,
      quiz: payload.quiz || [],
      circular_no: payload?.circular_no || "",
    },
  }),
  [GET_QUIZ_FAILED]: (state) => ({
    ...state,
    quizData: {
      ...state?.quizData,
      isLoading: false,
      isError: true,
      quiz: [],
      circular_no: "",
    },
  }),
  [CLEAR_QUIZ]: (state) => ({
    ...state,
    quizData: {
      ...state?.quizData,
      isLoading: false,
      isError: false,
      quiz: [],
      circular_no: "",
    },
  }),

  [SET_QUIZ_STEPPER]: (state, { payload }) => ({
    ...state,
    quizStepper: {
      ...state?.quizStepper,
      ...payload,
      currentStatus: {
        ...state?.quizStepper?.currentStatus,
        ...payload?.currentStatus,
      },
    },
  }),
  [CLEAR_QUIZ_STEPPER]: (state) => ({
    ...state,
    quizStepper: {
      ...state?.quizStepper,
      currentSlide: {},
      currentStatus: {
        selectedOption: {},
        isSubmited: false,
        isCorrectAnswer: false,
      },
    },
  }),

  [SET_QUIZ_STEPPER_STATUS]: (state, { payload }) => ({
    ...state,
    quizStepperStatus: {
      ...state?.quizStepperStatus,
      ...payload,
    },
  }),
  [CLEAR_QUIZ_STEPPER_STATUS]: (state) => ({
    ...state,
    quizStepperStatus: {
      ...state?.quizStepperStatus,
      completedSlides: [],
      skipedSlides: [],
      isAllSubmited: false,
    },
  }),

  [SET_QUIZ_RESULT_REQUEST]: (state, { payload }) => ({
    ...state,
    quizResult: {
      ...state?.quizResult,
      isLoading: true,
      isError: false,
      ...payload,
    },
  }),
  [SET_QUIZ_RESULT_SUCCESS]: (state, { payload }) => ({
    ...state,
    quizResult: {
      ...state?.quizResult,
      isLoading: false,
      isError: false,
      // status_response: payload,
      ...payload,
    },
  }),
  [SET_QUIZ_RESULT_FAILED]: (state) => ({
    ...state,
    quizResult: {
      ...state?.quizResult,
      isLoading: false,
      isError: true,
      status_response: "Something went wrong. Please try again.",
    },
  }),
  [CLEAR_QUIZ_RESULT]: (state) => ({
    ...state,
    quizResult: {
      isLoading: false,
      isError: false,
      status_response: "",
      correctAnswers: 0,
      wrongAnswers: 0,
      processInPercentage: 0,
    },
  }),
};

export default handleActions(actionHandlers, {
  quizData: {
    isLoading: false,
    isError: false,
    quiz: [],
    circular_no: "",
  },
  quizResultRequestStatus: {
    isLoading: false,
    isError: false,
    status_response: "",
  },
  quizStepper: {
    currentSlide: {},
    currentStatus: {
      selectedOption: {},
      isSubmited: false,
      isCorrectAnswer: false,
    },
  },
  quizStepperStatus: {
    completedSlides: [],
    skipedSlides: [],
    isAllSubmited: false,
  },
  quizResult: {
    isLoading: false,
    isError: false,
    status_response: "",
    correctAnswers: 0,
    wrongAnswers: 0,
    processInPercentage: 0,
  },
});
