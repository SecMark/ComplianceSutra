import React, { useState } from "react";
import "./style.css";

const ManageNotification = (props) => {
  return (
    <div className="manage-notification-container">
      <h2 className="manage-notification-header">Notifications</h2>
      <p className="manage-notification-title">Channels</p>

      <div className="notification-option">
        <div>
          <p style={{ margin: "0" }}>Email Notifications</p>
          <span>
            You'll receive all task related notification on registered email
          </span>
        </div>
        <div className="check-box-acc">
          <label class="switch" id="licenses">
            <input htmlFor="licenses" id="licenseSetting" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div className="notification-option">
        <div>
          <p style={{ margin: "0" }}>WhatsApp Notifications</p>
          <span>
            You'll receive all notifications on registered mobile number
          </span>
        </div>
        <div className="check-box-acc">
          <label class="switch" id="licenses">
            <input htmlFor="licenses" id="licenseSetting" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div className="notification-option">
        <div>
          <p style={{ margin: "0" }}>SMS Notifications</p>
          <span>
            You'll receive all notifications via sms on registered number
          </span>
        </div>
        <div className="check-box-acc">
          <label class="switch" id="licenses">
            <input htmlFor="licenses" id="licenseSetting" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <p className="manage-notification-title">Reports</p>

      <div className="notification-option">
        <div>
          <p style={{ margin: "0" }}>Daily Tasks</p>
          <span>
            You'll receive a list of daily tasks on your registered email
          </span>
        </div>
        <div className="check-box-acc">
          <label class="switch" id="licenses">
            <input htmlFor="licenses" id="licenseSetting" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div className="notification-option">
        <div>
          <p style={{ margin: "0" }}>Urgent Tasks</p>
          <span>
            You'll receive a list of urgent ttasks on your registered email
          </span>
        </div>
        <div className="check-box-acc">
          <label class="switch" id="licenses">
            <input htmlFor="licenses" id="licenseSetting" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div className="notification-option">
        <div>
          <p style={{ margin: "0" }}>Task Migration Approvals</p>
          <span>
            You'll receive an email whenever migration request have been
            approved
          </span>
        </div>
        <div className="check-box-acc">
          <label class="switch" id="licenses">
            <input htmlFor="licenses" id="licenseSetting" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ManageNotification;
