import api from "../../../apiServices/index";

const getPostProject =(payload) => 
    api.post("compliance.api.updateProject",payload);

export default {
    getPostProject
};