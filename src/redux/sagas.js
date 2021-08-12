import { select, takeEvery, all, fork } from "redux-saga/effects";
import authSagas from "../Components/Authectication/redux/sagas";
import emailVerificationSagas from "../Components/OnBording/redux/sagas";
import teamMemberSaga from "../Components/TeamMemberFlow/redux/sagas";
import globalSagas from "../CommonModules/GlobalData/redux/sagas";
import taskReportSaga from "../Components/OnBording/SubModules/DashBoardCO/redux/sagas";

import userTypeSagas from "../Components/UserVerification/redux/sagas";
import historySaga from "../Components/HistoryModule/redux/saga";
import updatesSaga from "../Components/NewRegulationModule/redux/saga";
import calenderViewSaga from "../Components/CalenderView/redux/saga";

function* watchAndLog() {
  yield takeEvery("*", function* logger(action) {
    const state = yield select();
    console.debug("action", action);
    console.debug("state after", state);
  });
}

export default function* root() {
  yield all([
    fork(watchAndLog),
    fork(authSagas),
    fork(emailVerificationSagas),
    fork(teamMemberSaga),
    fork(taskReportSaga),
    fork(globalSagas),
    fork(userTypeSagas),
    fork(historySaga),
    fork(updatesSaga),
    fork(calenderViewSaga),
    fork(userTypeSagas),
  ]);
}
