import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import api from "../../api";

import {
    getProject,
    setProject
} from "../Redux/actions";

import {
    GET_PROJECT_DETAIL,
    SET_PROJECT_DETAIL
} from "./types";

function* createProject(action){
    try{
        const { data } = yield call(api.getPostProject,action.payload);

    }catch(error) {

    }
}

function* projectSaga(){
    yield takeLatest(SET_PROJECT_DETAIL,createProject);
}

export default projectSaga;