const progressByStatus = [
  { status: "Approval Pending", progress: 50 },
  { status: "Approved", progress: 100 },
];

export const getTaskProgressByStatus = (status) => {
  let progress = null;
  if (status) {
    progressByStatus.forEach((element) => {
      if (element.status === status) {
        progress = element.progress;
      }
    });
    return progress || 0;
  } else {
    return 0;
  }
};
