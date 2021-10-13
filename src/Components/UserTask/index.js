import React from "react";
import "./style.css";
import { isMobile } from "react-device-detect";
import UserComplete from "../../assets/Icons/UserComplete.png";
import UserText from "../../assets/Icons/UserText.png";
import Calendar from "../../assets/Icons/CalendarUser.png";
import Progress from "../../assets/Icons/ProgressBar.png";

const UserTaskDetails = () => {
  return (
    <div>
      <div className={(isMobile && "MobileUser") || "MainUser"}>
        <div className={(isMobile && "MobileContainer") || "UserContainer"}>
          <h4>User Task</h4>

          <div className={(isMobile && "MobileTaskType") || "UserTaskType"}>
            <div className="UserTypeSelected">All Tasks</div>
            <div>Current Tasks</div>
            <div>Pending Tasks</div>
            {/* <div>Rejected Tasks</div> */}
          </div>
          {(isMobile && (
            <div>
              <div className="MobileElement">
                <div style={{ color: "#7a73ff" }} className="MobileProject">
                  Check the Project
                </div>
                <div>
                  <span style={{ color: "#7a73ff" }}>Task : </span>
                  <span>Check the project</span>
                </div>

                <div className="MobileSubElement1">
                  <div className="MobileSubSection">
                    <div style={{ color: "#7a73ff" }}>Owner</div>
                    <div>Ajit</div>
                  </div>
                  <div className="MobileSubSection">
                    <div style={{ color: "#7a73ff" }}>Duration</div>
                    <div>0</div>
                  </div>
                  <div>
                    <img src={Progress}></img>
                  </div>
                </div>
                <div>
                  <span style={{ color: "#7a73ff" }}>Migrated On : </span>
                  <span>Nill</span>
                </div>
                <div>
                  <span style={{ color: "#7a73ff" }}>Scheduled Date : </span>
                  <span>---</span>
                </div>
                <div>
                  <span style={{ color: "#7a73ff" }}>Task Status </span>
                  <span>Not Started</span>
                </div>
                <div className="MobileSubElement2">
                  <div>
                    {" "}
                    <img src={Calendar}></img>
                  </div>

                  <div>16 Aug, 2021 To 21 Aug, 2021</div>
                  <div>
                    {" "}
                    <img src={UserComplete}></img>
                  </div>
                  <div>
                    {" "}
                    <img src={UserText}></img>
                  </div>
                </div>
              </div>
              <div className="MobileElement">
                <div style={{ color: "#7a73ff" }} className="MobileProject">
                  Check the Project
                </div>
                <div>
                  <span style={{ color: "#7a73ff" }}>Task : </span>
                  <span>Check the project</span>
                </div>

                <div className="MobileSubElement1">
                  <div className="MobileSubSection">
                    <div style={{ color: "#7a73ff" }}>Owner</div>
                    <div>Ajit</div>
                  </div>
                  <div className="MobileSubSection">
                    <div style={{ color: "#7a73ff" }}>Duration</div>
                    <div>0</div>
                  </div>
                  <div>
                    {" "}
                    <img src={Progress}></img>
                  </div>
                </div>
                <div>
                  <span style={{ color: "#7a73ff" }}>Migrated On : </span>
                  <span>Nill</span>
                </div>
                <div>
                  <span style={{ color: "#7a73ff" }}>Scheduled Date : </span>
                  <span>---</span>
                </div>
                <div>
                  <span style={{ color: "#7a73ff" }}>Task Status </span>
                  <span>Not Started</span>
                </div>
                <div className="MobileSubElement2">
                  <div>
                    {" "}
                    <img src={Calendar}></img>
                  </div>

                  <div>16 Aug, 2021 To 21 Aug, 2021</div>
                  <div>
                    {" "}
                    <img src={UserComplete}></img>
                  </div>
                  <div>
                    {" "}
                    <img src={UserText}></img>
                  </div>
                </div>
              </div>
              <div>
                <button className="SeeMore">See More</button>
              </div>
            </div>
          )) || (
            <div>
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
          )}
          {/* <div id="Line1"></div> */}
        </div>
      </div>
    </div>
  );
};
export default UserTaskDetails;
