import api from "../../../apiServices/index";

const getPostProject = (payload) =>
  api.post("compliance.api.updateProject", payload);

const getRegisteredUserList = (payload) =>
  api.get("compliance.api.getAllUsersList", payload);

const getProjectData = () => api.get("compliance.api.getProjectMilestoneTask");

export default {
  getPostProject,
  getRegisteredUserList,
  getProjectData,
};
