import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actions as notificationActions } from "../Components/OnBording/SubModules/DashBoardCO/components/notification/Redux/actions";
import bellSelected from "../assets/Icons/bellSelected.png";

function SingleNotification(props) {

  const dispatch = useDispatch();
  let text = "";
  let taskId = 0;
  text = props && props.notification && props.notification.Comment;
  taskId = props && props.notification && props.notification.TaskId;
  return (
    <>
      <div className="row">
        <div className="col-1">
          <img className="asas" src={bellSelected} alt="bell" />
        </div>
        <div className="col-9">
          <div
            dangerouslySetInnerHTML={{
              __html: text,
            }}
            className="auto-toster-text"
          ></div>

          <Link
            to="/dashboard"
            style={{ textDecoration: "none" }}
            onClick={() => {
              dispatch(notificationActions.setTaskID(taskId));
              props.toast.dismiss(props && props.toastProps.toastId);
            }}
          >
            <div
              style={{ textAlign: "left" }}
              className="auto-toster-viewmore pl-2"
            >
              VIEW MORE
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SingleNotification;
