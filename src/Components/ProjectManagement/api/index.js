import api from "../../../apiServices/index";

const getPostProject = (payload) =>
  api.post("compliance.api.updateProject", payload);

const getRegisteredUserList = () => api.get("compliance.api.getAllUsersList");

const getProjectData = () => api.get("compliance.api.getProjectMilestoneTask");

const addAndUpdateTaskListData = (payload) =>
  api.post("compliance.api.updateProjectTaskList", payload);
const addAndUpdateMilestoneData = (payload) =>
  api.post("compliance.api.updateProjectMilestone", payload);
export default {
  getPostProject,
  getRegisteredUserList,
  getProjectData,
  addAndUpdateTaskListData,
  addAndUpdateMilestoneData,
};
