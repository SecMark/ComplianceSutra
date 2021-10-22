import moment from "moment";

// Get Data by Company
const getDataByCompany = (data) => {
  try {
    const temp = [...data];
    return temp.map((data) => {
      let tasks = [];
      const licenseAndTaskList = [...data.licenseAndTaskList];

      licenseAndTaskList.forEach((item) => {
        tasks = [...tasks, ...item.taskList];
      });
      return {
        status: data.companyName,
        company_name: data.companyName,
        company_id: data.company_id,
        tasks: [...new Set(tasks)],
      };
    });
  } catch (err) {
    console.log(err.message);
  }
};
const getAllTasks = (task_details) => {
  let tasks = [];
  [...task_details].forEach((data) => {
    const licenseAndTaskList = [...data.licenseAndTaskList];
    licenseAndTaskList.forEach((item) => {
      tasks = [...tasks, ...item.taskList];
    });
  });
  return tasks;
};
// get Data by Status
const getDataByStatus = (task_details) => {
  let tasks = getAllTasks(task_details);
  const getDataByStatus = [];
  const status = ["Overdue", "Take Action", "Upcoming", "Completed"];
  status.forEach((filter) => {
    let tasksByStatus = [];
    const todayDate = moment(new Date(), "YYYY-MM-DD");
    switch (filter) {
      case "Overdue":
        tasksByStatus = [...tasks].filter((task) => {
          if (
            task.status !== "Completed" &&
            task.status !== "Rejected" &&
            task.status !== "Approved"
          ) {
            const taskDueDate = moment(
              task.due_date || task.deadline_date,
              "YYYY-MM-DD"
            );
            const diffrenceInDays = taskDueDate.diff(todayDate, "days");
            if (diffrenceInDays < 0) {
              return task;
            }
          }
        });
        break;
      case "Upcoming":
        tasksByStatus = [...tasks].filter((task) => {
          if (
            task.status !== "Completed"
            // task.status !== "Rejected"
            // &&
            // task.status !== "Approved"
          ) {
            const taskDueDate = moment(
              task.due_date || task.deadline_date,
              "YYYY-MM-DD"
            );
            const diffrenceInDays = taskDueDate.diff(todayDate, "days");
            if (diffrenceInDays > 0 && diffrenceInDays >= 7) {
              return task;
            }
          }
        });
        break;
      case "Take Action":
        tasksByStatus = [...tasks].filter((task) => {
          if (
            task.status !== "Completed" &&
            task.status !== "Rejected" &&
            task.status !== "Approved"
          ) {
            const due_date = task.due_date || task.deadline_date;
            const taskDueDate = moment(due_date, "YYYY-MM-DD");
            const diffrenceInDays = taskDueDate.diff(todayDate, "days");
            if (diffrenceInDays >= 0 && diffrenceInDays <= 7) {
              return task;
            }
          }
        });
        console.log("From Take Action: ", tasksByStatus);
        break;
      case "Completed":
        tasksByStatus = [...tasks].filter((task) => {
          if (task.status === "Completed") {
            return task;
          }
        });
        break;
      default:
        return;
    }
    getDataByStatus.push({
      status: filter,
      tasks: tasksByStatus,
    });
  });
  return getDataByStatus;
};

// Get Data by licenses
const getDataByLicenses = (task_details) => {
  const dataByLicense = [];
  const tasks = getAllTasks(task_details);
  const licenses = [...new Set([...tasks].map((item) => item.license))];
  licenses.forEach((license) => {
    dataByLicense.push({
      status: license,
      license,
      tasks: [...tasks].filter((item) => item.license === license),
    });
  });
  return dataByLicense;
};

const getDataByTeam = (task_details) => {
  const dataByTeam = [];
  const tasks = getAllTasks(task_details);
  const teamMembers = [
    ...new Set([...tasks].map((item) => item.assign_to_name)),
  ];
  teamMembers.forEach((team) => {
    dataByTeam.push({
      status: team,
      assign_to_name: team,
      tasks: [...tasks].filter((item) => item.assign_to_name === team),
    });
  });
  return dataByTeam.map((item) => {
    if (item.assign_to_name === null && item.status === null) {
      item.status = "Not Assigned";
    }
    return item;
  });
};

export { getDataByStatus, getDataByLicenses, getDataByCompany, getDataByTeam };
