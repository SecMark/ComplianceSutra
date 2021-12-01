import api from "../../../apiServices/index";

const getPostProject = (payload) =>
  api.post("compliance.api.updateProject", payload);

const getRegisteredUserList = () => api.get("compliance.api.getUserList");

const getProjectData = () => api.get("compliance.api.getProjectMilestoneTask");

const addAndUpdateTaskListData = (payload) =>
  api.post("compliance.api.updateProjectTaskList", payload);
const addAndUpdateMilestoneData = (payload) =>
  api.post("compliance.api.updateProjectMilestone", payload);
const addAndUpdateTaskData = (payload) =>
  api.post("compliance.api.updateProjectTask", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
const getIndividualTasks = () => api.get("compliance.api.getIndividualTask");

// Deactivate Requests
const deactivateProject = (payload) =>
  api.post("compliance.api.deactiveProject", payload);
const deactivateMilestone = (payload) =>
  api.post("compliance.api.deactiveMilestone", payload);
const deactivateTasklist = (payload) =>
  api.post("compliance.api.deactiveTaskList", payload);
const deactivateTask = (payload) =>
  api.post("compliance.api.deactiveTask", payload);

const getTashProjectsList = () => api.get("compliance.api.getTrashProject");
const getTrashMilestoneList = () => api.get("compliance.api.getTrashMilestone");
const getTrashTasksList = () => api.get("compliance.api.getTrashTasks");

export default {
  getPostProject,
  getRegisteredUserList,
  getProjectData,
  addAndUpdateTaskListData,
  addAndUpdateMilestoneData,
  addAndUpdateTaskData,
  getIndividualTasks,

  deactivateProject,
  deactivateMilestone,
  deactivateTasklist,
  deactivateTask,

  getTashProjectsList,
  getTrashMilestoneList,
  getTrashTasksList,
};
