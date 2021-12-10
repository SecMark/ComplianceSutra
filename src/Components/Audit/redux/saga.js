import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../CommonModules/GlobalData/api";
import { ADD_NEW_SECTION } from "./types";

function* addSection(action) {
  try {
    const { data } = yield call(api.addSection, action.payload);
    if (data.message.status) {
      console.log(data.message);
    } else {
    }
  } catch (error) {}
}

function* auditSaga() {
  yield takeLatest(ADD_NEW_SECTION, addSection);
}

export default auditSaga;
