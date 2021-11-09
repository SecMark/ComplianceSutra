import moment from "moment";
const sortByDate = (data) =>
  data.sort((a, b) => {
    if (a.due_date && b.due_date) {
      return (
        new Date(a.due_date || a.deadline_date) -
        new Date(b.due_date || b.deadline_date)
      );
    }
    return false;
  });
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
        tasks: sortByDate([...new Set(tasks)]),
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
  return [...new Set(sortByDate(tasks))];
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
          if (task.status !== "Approved") {
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
          if (task.status !== "Approved") {
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
          if (task.status !== "Approved") {
            const due_date = task.due_date || task.deadline_date;
            const taskDueDate = moment(due_date, "YYYY-MM-DD");
            const diffrenceInDays = taskDueDate.diff(todayDate, "days");
            if (diffrenceInDays >= 0 && diffrenceInDays <= 7) {
              return task;
            }
          }
        });
        break;
      case "Completed":
        tasksByStatus = [...tasks].filter((task) => {
          if (task.status === "Approved") {
            return task;
          }
        });
        break;
      default:
        return;
    }
    getDataByStatus.push({
      status: filter,
      tasks: sortByDate(tasksByStatus),
    });
  });
  return getDataByStatus.filter((item) => item.tasks.length > 0);
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
      tasks: sortByDate([...tasks].filter((item) => item.license === license)),
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
  return sortByDate(
    dataByTeam.map((item) => {
      if (item.assign_to_name === null && item.status === null) {
        item.status = "Not Assigned";
      }
      return item;
    })
  );
};

export {
  getDataByStatus,
  getDataByLicenses,
  getDataByCompany,
  getDataByTeam,
  getAllTasks,
};
