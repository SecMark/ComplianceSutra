import React, { useState } from "react";

import "./style.css";

const ManageSecruity = (props) => {
  return (
    <div className="management-security-container">
      <h2 className="management-security-header">Security</h2>
      <div className="management-security-main">
        <p>Account Password</p>
        <div>
          <label>Password</label>
          <input type="password" />
          <span>Change Password</span>
        </div>
        <div className="manage-security-option">
          <h2>2 Factor Authentication (2FA)</h2>
          <div className="notification-option">
            <div>
              <p style={{ margin: "0" }}>Use Mobile Based OTP to login </p>
              <span>
                Every time you log in we will send you a OTP on your registered
                mobile number
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

        <div className="manage-security-option">
          <h2>Security Question</h2>
          <div className="notification-option">
            <div>
              <p style={{ margin: "0" }}>Use Mobile Based OTP to login </p>
              <span>
                Incase you forget your password, you can still login to account
                using this security question
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

        <div className="manage-security-answer">
          <p>Select a question</p>
          <select className="manage-security-answer-option">
            <option>What is the name of your favourite fruit?</option>
          </select>
        </div>

        <div className="manage-security-answer">
          <p>Type your answer</p>
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default ManageSecruity;
