import {
    GET_PROJECT_DETAIL,
    SET_PROJECT_DETAIL
} from "./types";

export const getProject = (payload) =>{
    return {
        type: GET_PROJECT_DETAIL,
        payload,
    };
}

export const setProject = (payload) =>{
    return {
        type: SET_PROJECT_DETAIL,
        payload,
    }
}