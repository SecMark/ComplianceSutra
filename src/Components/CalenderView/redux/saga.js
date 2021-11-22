import moment from "moment";
import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../CommonModules/GlobalData/api";
import { getAllTasks } from "../../../CommonModules/helpers/tasks.helper";
import {
  setDayData,
  setLoading,
  setMonthData,
  setSuccess,
  setWeekData,
} from "./actions";
import { GET_DAY, GET_MONTH, GET_WEEK } from "./types";

function* fetchCalenderDayData(action) {
  try {
    yield put(setLoading(true));
    const { taskList, StartDate } = action.payload;
    if (taskList && taskList.length > 0) {
      let dayData = getAllTasks([...taskList]).filter((task) => {
        return moment(task.due_date).format("YYYY-MM-DD") === StartDate;
      });

      yield put(setDayData(dayData));
      yield put(setSuccess(true));
      yield put(setLoading(false));
    } else {
      yield put(setSuccess(false));
      yield put(setLoading(false));
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* fetchCalenderWeekData(action) {
  try {
    yield put(setLoading(true));
    const { taskList, StartDate, EndDate } = action.payload;
    if (taskList && taskList.length > 0) {
      let weekData = getAllTasks([...taskList]).filter((task) => {
        return (
          moment(task.due_date).format("YYYY-MM-DD") >= StartDate &&
          moment(task.due_date).format("YYYY-MM-DD") <= EndDate
        );
      });

      yield put(setWeekData(weekData));
      yield put(setSuccess(true));
      yield put(setLoading(false));
    } else {
      yield put(setSuccess(false));
      yield put(setLoading(false));
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* fetchCalenderMonthData(action) {
  try {
    const { taskList, StartDate, EndDate } = action.payload;
    if (taskList && taskList.length > 0) {
      let monthData = getAllTasks([...taskList]).filter((task) => {
        return (
          moment(task.due_date).format("YYYY-MM-DD") >= StartDate &&
          moment(task.due_date).format("YYYY-MM-DD") <= EndDate
        );
      });
      yield put(setMonthData(monthData));
      yield put(setSuccess(true));
      yield put(setLoading(false));
    } else {
      yield put(setMonthData([]));
      yield put(setSuccess(false));
      yield put(setLoading(false));
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* calenderViewSaga() {
  yield takeLatest(GET_DAY, fetchCalenderDayData);
  yield takeLatest(GET_WEEK, fetchCalenderWeekData);
  yield takeLatest(GET_MONTH, fetchCalenderMonthData);
}

export default calenderViewSaga;
