import api from "../../../apiServices/index";

const getPostProject =(payload) => 
    api.post("compliance.api.updateProject",payload);

const getRegisteredUserList = (payload) =>
    api.get("compliance.api.getAllUsersList",payload);
    
export default {
    getPostProject,
    getRegisteredUserList
};