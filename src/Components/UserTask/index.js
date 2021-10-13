import React from "react";
import "./style.css";
import UserData from "./UserTaskDetails.json";
import UserComplete from "../../assets/Icons/UserComplete.png";
import UserText from "../../assets/Icons/UserText.png";

const UserTaskDetails = () => {
  return (
    <div className="MainUser">
      <div className="UserContainer">
        <h4>User Task</h4>

        <div className="UserTaskType">
          <div className="UserTypeSelected">All Tasks</div>
          <div>Current Tasks</div>
          <div>Pending Tasks</div>
          <div>Rejected Tasks</div>
        </div>

        {/* <div id="Line1"></div> */}
        <div className="UserHeader">
          <div className="UserProject">Project Name</div>
          <div className="UserTypeTask">Task</div>
          <div className="UserTaskElements">Scheduled Date</div>
          <div className="UserTaskElements">Owner Name</div>
          <div className="UserTaskElements">Start Date</div>
          <div className="UserTaskElements">End Date</div>
          <div className="UserTaskElements">Duration Time</div>
          <div className="UserTaskElements">Migrated On </div>
          <div className="UserTaskElements">Task Status</div>
          <div className="UserTaskComplete">Completion (Percentage)</div>
          <div className="UserActions">Action</div>
        </div>

        <div className="UserElement">
          <div className="UserProject">Check the Project </div>
          <div className="UserTask">Check Hero section</div>
          <div>18th Sep 2021</div>
          <div>Ajit</div>
          <div>21th Sep 2021</div>
          <div>27th Sep 2021</div>
          <div>4 Days</div>
          <div>27th Sep 2021</div>
          <div>Completed</div>
          <div className="CompleteTask">100%</div>
          <div className="UserActions">
            <img src={UserComplete}></img>
            <img src={UserText}></img>
          </div>
        </div>
        <div className="UserElement">
          <div className="UserProject">Check the Project </div>
          <div style={{ maxWidth: "140px" }}>Check Hero section</div>
          <div>18th Sep 2021</div>
          <div>Ajit</div>
          <div>21th Sep 2021</div>
          <div>27th Sep 2021</div>
          <div>4 Days</div>
          <div>27th Sep 2021</div>
          <div>Completed</div>
          <div className="CompleteTask">100%</div>
          <div className="UserActions">
            <img src={UserComplete}></img>
            <img src={UserText}></img>
          </div>
        </div>
        <div className="UserElement">
          <div className="UserProject">Check the Project </div>
          <div className="UserTask">Check Hero section</div>
          <div>18th Sep 2021</div>
          <div>Ajit</div>
          <div>21th Sep 2021</div>
          <div>27th Sep 2021</div>
          <div>4 Days</div>
          <div>27th Sep 2021</div>
          <div>Completed</div>
          <div className="CompleteTask">100%</div>
          <div className="UserActions">
            <img src={UserComplete}></img>
            <img src={UserText}></img>
          </div>
        </div>
        <div className="UserElement">
          <div className="UserProject">Check the Project </div>
          <div className="UserTask">Check Hero section</div>
          <div>18th Sep 2021</div>
          <div>Ajit</div>
          <div>21th Sep 2021</div>
          <div>27th Sep 2021</div>
          <div>4 Days</div>
          <div>27th Sep 2021</div>
          <div>Completed</div>
          <div className="CompleteTask">100%</div>
          <div className="UserActions">
            <img src={UserComplete}></img>
            <img src={UserText}></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserTaskDetails;
