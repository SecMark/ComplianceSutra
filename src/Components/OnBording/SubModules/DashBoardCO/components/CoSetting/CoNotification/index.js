import React, { useEffect, useState } from 'react';
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import closeBlack from "../../../../../../../assets/Icons/closeBlack.png";
import api from "../../../../../../../apiServices"

function CoNotification({ settingData, handleClose }) {
   const [isEmailChecked, setEmailChecked] = useState(false)
   const [isWAppChecked, setWAppChecked] = useState(false)
   const [isSMSChecked, setSMSChecked] = useState(false)
   const [isMonthlyChecked, setMonthlyChecked] = useState(false)
   const [isWeeklyChecked, setWeeklyChecked] = useState(false);

   const [settingsData, setSettingsData] = useState([])
   const state = useSelector((state) => state);
   const dispatch = useDispatch();

   const auth = state && state.auth;
   useEffect(() => {
      if (settingsData && settingsData) {
         let data = [];
         for (var propt in settingsData) {
            let obj = { type: propt, value: parseInt(settingsData[propt]) }
            data.push(obj)
         }
         data && data.map((item) => {
            changeSettingFlags(item.type, item.value)
         })
      }
   }, [settingsData])
   const changeSettingFlags = (type, isEnable) => {
      switch (type) {
         case "Email": setEmailChecked(isEnable === 0 ? false : true)
            break;
         case "Whatsup": setWAppChecked(isEnable === 0 ? false : true)
            break;
         case "SMS": setSMSChecked(isEnable === 0 ? false : true)
            break;
         case "Monthly": setMonthlyChecked(isEnable === 0 ? false : true)
            break;
         case "Weekly": setWeeklyChecked(isEnable === 0 ? false : true)
            break;
      }
   }


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
         mobile: ""
      }
      api.post("/api/CoSettings", payload)
         .then(function (response) {
            if (response && response.data && response.data[0]) {
            } else {
            }
         })
         .catch(function (error) {
            if (error) {
            }
         });
   }
   const onSliderChange = (e, type) => {
      changeSettingFlagAPICall(type)
      switch (type) {
         case "Email": setEmailChecked(!isEmailChecked)
            break;
         case "Whatsup": setWAppChecked(!isWAppChecked)
            break;
         case "SMS": setSMSChecked(!isSMSChecked)
            break;
         case "Monthly": setMonthlyChecked(!isMonthlyChecked)
            break;
         case "Weekly": setWeeklyChecked(!isWeeklyChecked)
            break;
      }

   }

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
         pwd: ""
      }
      api.post("/api/CoSettings", payload)
         .then(function (response) {
            if (response && response.data && response.data[0]) {
               setSettingsData(response.data[0])
            } else {
            }
         })
         .catch(function (error) {
            if (error) {
            }
         });
   }, [])


   return (
      <div className="co-notification">
          <div className="d-flex">
                <div className="col-10 col-sm-12 col-md-12 col-xl-12 pl-0">
                <div className="personal-mgt-title">Notifications</div>
                </div>
                <div className="col-2 col-sm-12 col-md-12 col-xl-12 d-block d-sm-none">
                    <img className="close-icon-personal" src={closeBlack} alt="close Black" onClick={()=>{handleClose(true)}}/>
                </div>
            </div>
         
         <div className="border-header d-none d-sm-block"></div>
         <div className="scroll-sction">
            <div className="channel-div">
               <p className="channel-heading">Channels</p>
               <div className="row mar-bottom">
                  <div className="col-9">
                     <div className="notification-div">
                        <p className="bolder-text">Email Notifications</p>
                        <p className="normal-text">You'll receive all CAPMTech notifications on your registered email</p>
                     </div>
                  </div>
                  <div className="col-3">
                     <div className="check-box">
                        <label className="switch" id="email">
                           <input
                              htmlFor="email"
                              id="emailSetting"
                              type="checkbox"
                              checked={isEmailChecked} onClick={(e) => onSliderChange(e, "Email")} />
                           <span className="slider round"></span>
                        </label>
                     </div>
                  </div>
               </div>
               <div className="row mar-bottom">
                  <div className="col-9">
                     <div className="notification-div">
                        <p className="bolder-text">SMS Notifications</p>
                        <p className="normal-text">You'll receive all CAPMTech notifications via sms on your registered mobile number</p>
                     </div>
                  </div>
                  <div className="col-3">
                     <div className="check-box">
                        <label className="switch" id="sms">
                           <input htmlFor="sms" id="smsSetting" type="checkbox" checked={isSMSChecked} onClick={(e) => onSliderChange(e, "SMS")} />
                           <span className="slider round"></span>
                        </label>
                     </div>
                  </div>
               </div>
            </div>
            <div className="channel-div">
               <p className="channel-heading">Reports</p>
               <div className="row mar-bottom">
                  <div className="col-9">
                     <div className="notification-div">
                        <p className="bolder-text">Monthly Status Report</p>
                        <p className="normal-text">You'll receive monthly reports on your preferred email id</p>
                     </div>
                  </div>
                  <div className="col-3">
                     <div className="check-box">
                        <label className="switch" id="monthly">
                           <input htmlFor="monthly" id="monthlySetting" type="checkbox" checked={isMonthlyChecked} onClick={(e) => onSliderChange(e, "Monthly")} />
                           <span className="slider round"></span>
                        </label>
                     </div>
                  </div>
               </div>
               <div className="row mar-bottom">
                  <div className="col-9">
                     <div className="notification-div">
                        <p className="bolder-text">Weekly Status Report</p>
                        <p className="normal-text">You'll receive weekly reports every Monday on your preferred email id</p>
                     </div>
                  </div>
                  <div className="col-3">
                     <div className="check-box">
                        <label className="switch" id="weekly">
                           <input htmlFor="weekly" id="weeklySetting" type="checkbox" checked={isWeeklyChecked} onChange={(e) => onSliderChange(e, "Weekly")} />
                           <span className="slider round"></span>
                        </label>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
export default CoNotification;