import api from "../../../apiServices/index";

const getPostProject =(payload) => 
    api.post("api/method/compliance.api.updateProject",payload);

export default {
    getPostProject
};