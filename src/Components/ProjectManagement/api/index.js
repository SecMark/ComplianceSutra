import api from "../../../apiServices/index";

// Get Users List
const getRegisteredUserList = () => api.get("compliance.api.getUserList");

const getProjectData = () => api.get("compliance.api.getProjectMilestoneTask");

// Add/Update Project, Milestone, Task List, Task
const getPostProject = (payload) =>
  api.post("compliance.api.updateProject", payload);
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

// Get Individual Tasks
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

// Get Trash Data
const getTashProjectsList = () => api.get("compliance.api.getTrashProject");
const getTrashMilestoneList = () => api.get("compliance.api.getTrashMilestone");
const getTrashTasksList = () => api.get("compliance.api.getTrashTasks");

// Delete Project, Milestone, Task, Task List
const deleteProject = (payload) =>
  api.post("compliance.api.deleteProject", payload);
const deleteMilestone = (payload) =>
  api.post("compliance.api.deleteMilestone", payload);
const deleteTaskList = (payload) =>
  api.post("compliance.api.deleteTaskList", payload);
const deleteTask = (payload) => api.post("compliance.api.deleteTask", payload);

// Restore Project, Milestone, Task List, Task
const restoreProject = (payload) =>
  api.post("compliance.api.restoreProject", payload);
const restoreMilestone = (payload) =>
  api.post("compliance.api.restoreMilestone", payload);
const restoreTaskList = (payload) =>
  api.post("compliance.api.restoreTaskList", payload);
const restoreTask = (payload) =>
  api.post("compliance.api.restoreTask", payload);

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

  deleteProject,
  deleteMilestone,
  deleteTaskList,
  deleteTask,

  restoreProject,
  restoreMilestone,
  restoreTaskList,
  restoreTask,
};
