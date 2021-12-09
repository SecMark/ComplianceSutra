import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../../apiServices";
const ManageNotification = (props) => {
  const [isEmailChecked, setEmailChecked] = useState(false);
  const [isWAppChecked, setWAppChecked] = useState(false);
  const [isSMSChecked, setSMSChecked] = useState(false);
  const [isDailyChecked, setDailyChecked] = useState(false);
  const [isUrgentChecked, setUrgentChecked] = useState(false);
  const [isTaskMigrationChecked, setTaskMigrationChecked] = useState(false);
  const [settingsData, setSettingsData] = useState([]);
  const state = useSelector((state) => state);

  const auth = state && state.auth;
  useEffect(() => {
    if (settingsData && settingsData) {
      let data = [];
      for (var propt in settingsData) {
        let obj = { type: propt, value: parseInt(settingsData[propt]) };
        data.push(obj);
      }
      data &&
        data.map((item) => {
          changeSettingFlags(item.type, item.value);
        });
    }
  }, [settingsData]);
  const changeSettingFlags = (type, isEnable) => {
    switch (type) {
      case "Email":
        setEmailChecked(isEnable === 0 ? false : true);
        break;
      case "Whatsup":
        setWAppChecked(isEnable === 0 ? false : true);
        break;
      case "SMS":
        setSMSChecked(isEnable === 0 ? false : true);
        break;
      case "DailyTasks":
        setDailyChecked(isEnable === 0 ? false : true);
        break;
      case "UrgentTasks":
        setUrgentChecked(isEnable === 0 ? false : true);
        break;
      case "TaskMigrationApprovals":
        setTaskMigrationChecked(isEnable === 0 ? false : true);
        break;
    }
  };

  const changeSettingFlagAPICall = (type) => {
    const payload = {
      gUserID: auth && auth.loginInfo && auth.loginInfo.UserID,
      settingType: 4,
      actionFlag: 2,
      entityID: 0,
      licID: 0,
      uUserID: 0,
      utype: 0,
      notificationList: type,
      pwd: "",
      fullName: "",
      emailID: "",
      mobile: "",
    };
    api
      .post("/api/CoSettings", payload)
      .then(function (response) {
        if (response && response.data && response.data[0]) {
          setSettingsData(response.data[0]);
        } else {
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  };

  const onSliderChange = (e, type) => {
    changeSettingFlagAPICall(type);
    switch (type) {
      case "Email":
        setEmailChecked(!isEmailChecked);
        break;
      case "Whatsup":
        setWAppChecked(!isWAppChecked);
        break;
      case "SMS":
        setSMSChecked(!isSMSChecked);
        break;
      case "Daily":
        setDailyChecked(!isDailyChecked);
        break;
      case "UTasks":
        setUrgentChecked(!isUrgentChecked);
        break;
      case "MTasks":
        setTaskMigrationChecked(!isTaskMigrationChecked);
        break;
    }
  };
  useEffect(() => {
    const payload = {
      gUserID: auth && auth.loginInfo && auth.loginInfo.UserID,
      settingType: 4,
      actionFlag: 0,
      entityID: 0,
      licID: 0,
      uUserID: 0,
      utype: 0,
      notificationList: "",
      pwd: "",
    };
    api
      .post("/api/CoSettings", payload)
      .then(function (response) {
        if (response && response.data && response.data[0]) {
          setSettingsData(response.data[0]);
        } else {
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  }, []);

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
            <input
              htmlFor="licenses"
              id="licenseSetting"
              type="checkbox"
              checked={isEmailChecked}
              onClick={(e) => onSliderChange(e, "Email")}
            />
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
            <input
              htmlFor="licenses"
              id="licenseSetting"
              type="checkbox"
              checked={isWAppChecked}
              onClick={(e) => onSliderChange(e, "Whatsup")}
            />
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
            <input
              htmlFor="licenses"
              id="licenseSetting"
              type="checkbox"
              checked={isSMSChecked}
              onClick={(e) => onSliderChange(e, "SMS")}
            />
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
            <input
              htmlFor="licenses"
              id="licenseSetting"
              type="checkbox"
              checked={isDailyChecked}
              onClick={(e) => onSliderChange(e, "Daily")}
            />
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
            <input
              htmlFor="licenses"
              id="licenseSetting"
              type="checkbox"
              checked={isUrgentChecked}
              onClick={(e) => onSliderChange(e, "UTasks")}
            />
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
            <input
              htmlFor="licenses"
              id="licenseSetting"
              type="checkbox"
              checked={isTaskMigrationChecked}
              onClick={(e) => onSliderChange(e, "MTasks")}
            />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ManageNotification;
