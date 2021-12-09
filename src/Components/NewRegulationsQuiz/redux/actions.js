import { createAction } from "redux-actions";

export const GET_QUIZ_REQUEST = "NEW-REGULATIONS/GET-QUIZ_REQUEST";
export const GET_QUIZ_SUCCESS = "NEW-REGULATIONS/GET-QUIZ_SUCCESS";
export const GET_QUIZ_FAILED = "NEW-REGULATIONS/GET-QUIZ_FAILED";
export const CLEAR_QUIZ = "NEW-REGULATIONS/CLEAR-QUIZ";

export const SET_QUIZ_RESULT_REQUEST =
  "NEW-REGULATIONS/SET-QUIZ_RESULT_REQUEST";
export const SET_QUIZ_RESULT_SUCCESS =
  "NEW-REGULATIONS/SET-QUIZ_RESULT_SUCCESS";
export const SET_QUIZ_RESULT_FAILED = "NEW-REGULATIONS/SET-QUIZ_RESULT_FAILED";

export const SET_QUIZ_STEPPER = "NEW-REGULATIONS/SET_QUIZ_STEPPER";
export const CLEAR_QUIZ_STEPPER = "NEW-REGULATIONS/CLEAR_QUIZ_STEPPER";

export const SET_QUIZ_STEPPER_STATUS =
  "NEW-REGULATIONS/SET_QUIZ_STEPPER_STATUS";
export const CLEAR_QUIZ_STEPPER_STATUS =
  "NEW-REGULATIONS/SET_QUIZ_STEPPER_CLEAR";

export const CLEAR_QUIZ_RESULT = "NEW-REGULATIONS/CLEAR_QUIZ_RESULT";

export const getQuizRequest = createAction(GET_QUIZ_REQUEST);
export const getQuizSuccess = createAction(GET_QUIZ_SUCCESS);
export const getQuizFailed = createAction(GET_QUIZ_FAILED);
export const clearQuiz = createAction(CLEAR_QUIZ);

export const setQuizResultRequest = createAction(SET_QUIZ_RESULT_REQUEST);
export const setQuizResultSuccess = createAction(SET_QUIZ_RESULT_SUCCESS);
export const setQuizResultFailed = createAction(SET_QUIZ_RESULT_FAILED);
export const clearQuizResult = createAction(CLEAR_QUIZ_RESULT);

export const setQuizStepper = createAction(SET_QUIZ_STEPPER);
export const clearQuizStepper = createAction(CLEAR_QUIZ_STEPPER);

export const setQuizStepperStatus = createAction(SET_QUIZ_STEPPER_STATUS);
export const clearQuizStepperStatus = createAction(CLEAR_QUIZ_STEPPER_STATUS);
