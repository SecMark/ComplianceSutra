import React, { useState } from "react";
import "../Notifications.css";
import {
  AiOutlineCheckCircle,
  AiOutlineCheck,
  AiOutlineExclamation,
} from "react-icons/ai";

const NotificationList = (props) => {
  const [itemRead, setItemRead] = useState(false);
  const itemOpened = (e) => {
    console.log(e.className);
  };
  const checkSuccess = () => {
    return (
      <div
        style={{
          width: 20,
          height: 20,
          backgroundColor: "#e4e1ff",
          display: "inline-block",
          lineHeight: "20px",
          textAlign: "center",
          borderRadius: 10,
        }}
      >
        <AiOutlineCheck size={10} color="#9e8fff" />
      </div>
    );
  };
  const checkWarning = () => {
    return (
      <div
        style={{
          width: 20,
          height: 20,
          backgroundColor: "#ffe0e0",
          display: "inline-block",
          lineHeight: "20px",
          textAlign: "center",
          borderRadius: 10,
        }}
      >
        <AiOutlineExclamation size={10} color="#ff8f8f" />
      </div>
    );
  };

  return (
    <div className="ListMain">
      <div className="ListElement">
        <h4 id="Day">{props.title}</h4>
        <div className="ListPoint" onClick={itemOpened}>
          <ul>
            <li>
              <div>
                {checkSuccess()}
                <span>
                  Team member from Antware Technologies has submitted 1 tasks
                  related to GST
                </span>
              </div>
              <span id="TimeArrived">1 hr ago</span>
            </li>
          </ul>
        </div>
        <div className="ListPoint" onClick={itemOpened}>
          <ul>
            <li>
              <div>
                {checkWarning()}
                <span>32 tasks need to be finished today to avoid delays</span>
              </div>
              <span id="TimeArrived">2 hr ago</span>
            </li>
          </ul>
        </div>
        <div className="ListPoint">
          <ul>
            <li>
              <div>
                {checkWarning()}
                <span>
                  BK Securities has raised a request to change Complaince
                  Officer.
                </span>
              </div>
              <span id="TimeArrived">3 hr ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NotificationList;
