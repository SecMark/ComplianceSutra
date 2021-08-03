import React from "react";
import { withRouter } from "react-router-dom";
function RightSideView({
  isTaskListOpen,

  history,
}) {
  return (
    <div className="row ">
      <div className="col-12 right-side-bar">
        <div className="">
          <div className="task-details-veiw">
            <div className="task-details-header"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RightSideView);
