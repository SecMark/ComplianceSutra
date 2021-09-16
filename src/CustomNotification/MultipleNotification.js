import React from "react";
import { Link } from "react-router-dom";
import bellSelected from "../assets/Icons/bellSelected.png";

function MultipleNotification(props) {
  let notificationCount = props && props.notificationCount;
  return (
    <>
      <div className="row">
        <div className="col-1">
          <img className="asas" src={bellSelected} alt="bell" />
        </div>
        <div className="col-9">
          <div className="auto-toster-text">
            {" "}
            <span className="font-normal">
              You have {notificationCount} new notifications
            </span>
            <Link
              to="/notifications"
              style={{ textDecoration: "none" }}
              onClick={() => {
                props.toast.dismiss(props && props.toastProps.toastId);
              }}
            >
              <div
                style={{ textAlign: "left" }}
                className="auto-toster-viewmore"
              >
                VIEW MORE
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MultipleNotification;
