import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import api from "../../api";
import {useDispatch,useSelector} from "react-redux"
import {
    getProject,
    setProject,
    getRegisteredUser
} from "../Redux/actions";

import {
    GET_PROJECT_DETAIL,
    GET_REGISTERED_USER_LIST,
    SET_PROJECT_DETAIL
} from "./types";
import { toast } from "react-toastify";


function* createProject(action){
    try{
        const { data } = yield call(api.getPostProject,action.payload);
        if(data.message.status ===true ){
            toast.success("Project added updatead successfuly")
        }
        else{
            toast.warning("Somthing went Wrong")
        }

    }catch(error) {

    }
}

function* getRegisteredUSer(action){
    
    try{
        const { data } = yield call(api.getRegisteredUserList,action.payload);
        console.log(data.message.user_list);
        if(data.message.status === true){
            yield put(getRegisteredUser(data.message.user_list))
        }
        else{
            
        }
         


    }catch(error) {

    }
}

function* projectSaga(){
    yield takeLatest(SET_PROJECT_DETAIL,createProject);
    yield takeLatest(GET_REGISTERED_USER_LIST,getRegisteredUSer);
}

export default projectSaga;