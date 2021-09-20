import {
    SET_SUBTASK_NAME,
    GET_SUBTASK_NAME,
    SET_ASSOCIATE_LICENCE,
    GET_ASSOCIATE_LICENCE,
    SET_ASSOCIATE_SUBLICENCE,
    GET_ASSOCIATE_SUBLICENCE,
    SET_ACTIVATE_SUBTASK_ON,
    GET_ACTIVATE_SUBTASK_ON,
    SET_OCCURENCE,
    GET_OCCURENCE,
    SET_COMPLITION_DATE,
    GET_COMPLITION_DATE,
    SET_DUE_DATE,
    GET_DUE_DATE,
    SET_TEMPORARY_DUE_DATE,
    GET_TEMPORARY_DUE_DATE,
    SET_ANOTHER_TEMPORARY_DUE_DATE,
    GET_ANOTHER_TEMPORARY_DUE_DATE,
  } from "./types";

const initialState = {
    subTaskName :"",
    associateLicence : "",
    associateSubLicence : "",
    activateSubTaskOn : [],
    occurence : "",
    complitionDate : [],
    dueDate : [],
    temporaryDueDate : [],
    anotherTemporaryDueDate : []
};

const reducer = (state=initialState, {type,payload}) => {
    switch(type) {
        case SET_SUBTASK_NAME:
            return{
                ...state,
                    subTaskName: payload
            }
        default:
            return state;
    }
};

export default reducer;