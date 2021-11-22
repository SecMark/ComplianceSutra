import {
    GET_PROJECT_DETAIL,
    SET_PROJECT_DETAIL
} from "./types";


const initialState = {
    projectDetails : {
        project_name : "",
        assign_user:"",
        start_date:"",
        end_date:"",
        project_overview:""
    }   
};


const reducer = (state =initialState, {type,payload})=>{
    switch (type) {
        case GET_PROJECT_DETAIL:
            return state;
        case SET_PROJECT_DETAIL:
            return{
                ...state,
                projectDetails:{
                    ...payload
                }
            }
        default: 
        return state;
    }
}


export default reducer;