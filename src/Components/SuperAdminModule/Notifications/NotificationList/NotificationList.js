import React, { useState } from "react";
import "../Notifications.css";
import { AiOutlineCheckCircle } from "react-icons/ai";

const NotificationList = () => {
  const [itemRead, setItemRead] = useState(false);
  const itemOpened = (e) => {
    console.log(e.className);
  };
  return (
    <div className="ListMain">
      <div className="ListElement">
        <h4 id="Day">Today</h4>
        <div className="ListPoint" onClick={itemOpened}>
          <ul>
            <li>
              <AiOutlineCheckCircle size={20} />
              <span>
                {" "}
                Antware Technologies have submitted 3 more tasks today has
                approved your task
              </span>{" "}
              <span id="TimeArrived">1 hr ago</span>
            </li>
          </ul>
        </div>
        <div className="ListPoint" onClick={itemOpened}>
          <ul>
            <li>
              <AiOutlineCheckCircle size={20} />
              <span>
                {" "}
                BetaTechnologies have submitted 5 more tasks today has approved
                your task
              </span>{" "}
              <span id="TimeArrived">2 hr ago</span>
            </li>
          </ul>
        </div>
        <div className="ListPoint">
          <ul>
            <li>
              <AiOutlineCheckCircle size={20} />
              <span>
                {" "}
                Antware Technologies have submitted 3 more tasks today has
                approved your task
              </span>{" "}
              <span id="TimeArrived">3 hr ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NotificationList;
