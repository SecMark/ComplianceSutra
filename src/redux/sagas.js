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
import userList from "../Components/SuperAdminModule/UserManagement/redux/sagas/user";
import AddSubTaskSaga from "../Components/SuperAdminModule/SubTask/AddSubTask/redux/saga";
import paymentSaga from "../Components/ExpertReviewModule/Redux/saga";


function* watchAndLog() {
  yield takeEvery("*", function* logger(action) {
    const state = yield select();

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
    fork(userList),
    fork(AddSubTaskSaga),
    fork(paymentSaga),
  ]);
}
