import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../CommonModules/GlobalData/api";
import { setQuestionList } from "./actions";
import { ADD_NEW_SECTION, GET_QUESTION_LIST } from "./types";

function* addSection(action) {
  try {
    const { data } = yield call(api.addSection, action.payload);
    if (data.message.status) {
      console.log(data.message);
    } else {
    }
  } catch (error) {}
}

function* getQuestionList(action) {
  try {
    const { data } = yield call(api.getQuestionList, action.payload);
    if (data.message.status) {
      console.log(data.message.Question_reference_options);
      yield put(setQuestionList(data.message.Question_reference_options));
    } else {
    }
  } catch (error) {}
}

function* auditSaga() {
  yield takeLatest(ADD_NEW_SECTION, addSection);
  yield takeLatest(GET_QUESTION_LIST, getQuestionList);
}

export default auditSaga;
