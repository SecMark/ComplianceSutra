import { call, put, takeLatest } from "redux-saga/effects";
import { getNewRegulationsQuiz, setNewRegulationsQuizResult } from "../api";
import {
  GET_QUIZ_REQUEST,
  getQuizSuccess,
  getQuizFailed,
  setQuizStepper,
  clearQuizStepperStatus,
  setQuizResultFailed,
  setQuizResultSuccess,
  SET_QUIZ_RESULT_REQUEST,
} from "./actions";
import { getFormattedQuestion } from "../components/data.helper";
function* getQuizRequestSaga({ payload }) {
  try {
    yield put(clearQuizStepperStatus());
    const { status, data } = yield call(getNewRegulationsQuiz, payload);
    if (status === 200 && data && data?.message && data?.message?.success) {
      const questions = data?.message?.questions || [];
      if (questions && questions.length > 0) {
        const _questions = questions?.map((item, index) =>
          getFormattedQuestion(item, index)
        );
        yield put(getQuizSuccess({ quiz: [..._questions], ...payload }));
        yield put(
          setQuizStepper({
            currentSlide: _questions[0],
          })
        );
      } else {
        yield put(getQuizSuccess({ quiz: [], ...payload }));
      }
    } else {
      yield put(getQuizFailed());
    }
  } catch (error) {
    yield put(getQuizFailed());
  }
}

function* setQuizResultRequestSaga({ payload }) {
  try {
    const { data, status } = yield call(setNewRegulationsQuizResult, {
      correct: payload?.correctAnswers || 0,
      wrong: payload?.wrongAnswers || 0,
      skipped: 0,
      circular_no: payload?.circular_no,
    });
    if (status === 200 && data && data?.message && data?.message?.success) {
      yield put(setQuizResultSuccess(data?.message?.success_response));
    }
  } catch (error) {
    yield put(setQuizResultFailed());
  }
}

function* newRegulaitonsQuizSaga() {
  yield takeLatest(GET_QUIZ_REQUEST, getQuizRequestSaga);
  yield takeLatest(SET_QUIZ_RESULT_REQUEST, setQuizResultRequestSaga);
}

export default newRegulaitonsQuizSaga;
