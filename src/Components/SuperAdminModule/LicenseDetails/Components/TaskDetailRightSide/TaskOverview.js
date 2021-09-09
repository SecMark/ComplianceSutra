import React from "react";

const TaskOverview = () => {
  return (
    <>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Status</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">Toggle</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Task added on </p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">March 03, 2021</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Task active from</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">March 03, 2021</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">latest updates on</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">May 16, 2021</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Last updated by</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">ashu kumar</p>
        </div>
      </div>
      <div className="col-6 col-md-12 mt-4">
        <h6>Task Related Details</h6>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Frequency</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">Monthly</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Occurs on</p>
        </div>
        <div className="col-6 d-flex align-items-center">
          <p className="task-data__field-value">15th of every month</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Completion Date</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">15 Aug, 2021</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Due Date</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">12 Aug, 2021</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Grouped under</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">Good and Service Tax</p>
        </div>
      </div>
      <div className="col-6 col-md-12 mt-4">
        <button className="task-details__button task-details__button--outlined">
          edit details
        </button>
      </div>
    </>
  );
};

export default TaskOverview;
