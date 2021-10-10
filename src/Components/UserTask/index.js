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
          <div>All Tasks</div>
          <div>Current Tasks</div>
          <div>Pending Tasks</div>
          <div>Rejected Tasks</div>
        </div>

        <div id="Line1"></div>
        <div className="UserHeader">
          <div
            style={{
              width: "150px",
            }}
          >
            Project Name
          </div>
          <div style={{ width: "140px" }}>Task</div>
          <div style={{ width: "70px" }}>Schedule Date</div>
          <div style={{ width: "70px" }}>Owner Name</div>
          <div style={{ width: "70px" }}>Start Date</div>
          <div style={{ width: "70px" }}>End Date</div>
          <div style={{ width: "70px" }}>Duration Time</div>
          <div style={{ width: "80px" }}>Migrated On </div>
          <div style={{ width: "60px" }}>Task Status</div>
          <div style={{ width: "100px" }}>Completion (Percentage)</div>
          <div
            style={{
              width: "60px",
              marginLeft: "20px",
            }}
          >
            Action
          </div>
        </div>

        <div className="UserElement">
          <div style={{ maxWidth: "150px" }}>Check the Project </div>
          <div style={{ maxWidth: "140px" }}>Check Hero section</div>
          <div>18th Sep 2021</div>
          <div>Ajit</div>
          <div>21th Sep 2021</div>
          <div>27th Sep 2021</div>
          <div>4 Days</div>
          <div>27th Sep 2021</div>
          <div>Completed</div>
          <div>100%</div>
          <div className="UserActions">
            <img src={UserComplete}></img>
            <img src={UserText}></img>
          </div>
        </div>
        <div className="UserElement">
          <div style={{ maxWidth: "150px" }}>Check the Project </div>
          <div style={{ maxWidth: "140px" }}>Check Hero section</div>
          <div>18th Sep 2021</div>
          <div>Ajit</div>
          <div>21th Sep 2021</div>
          <div>27th Sep 2021</div>
          <div>4 Days</div>
          <div>27th Sep 2021</div>
          <div>Completed</div>
          <div>100%</div>
          <div className="UserActions">
            <img src={UserComplete}></img>
            <img src={UserText}></img>
          </div>
        </div>
        <div className="UserElement">
          <div style={{ maxWidth: "150px" }}>Check the Project </div>
          <div style={{ maxWidth: "140px" }}>Check Hero section</div>
          <div>18th Sep 2021</div>
          <div>Ajit</div>
          <div>21th Sep 2021</div>
          <div>27th Sep 2021</div>
          <div>4 Days</div>
          <div>27th Sep 2021</div>
          <div>Completed</div>
          <div>100%</div>
          <div className="UserActions">
            <img src={UserComplete}></img>
            <img src={UserText}></img>
          </div>
        </div>
        <div className="UserElement">
          <div style={{ maxWidth: "150px" }}>Check the Project </div>
          <div style={{ maxWidth: "140px" }}>Check Hero section</div>
          <div>18th Sep 2021</div>
          <div>Ajit</div>
          <div>21th Sep 2021</div>
          <div>27th Sep 2021</div>
          <div>4 Days</div>
          <div>27th Sep 2021</div>
          <div>Completed</div>
          <div>100%</div>
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
