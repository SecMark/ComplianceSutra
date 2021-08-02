import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import CheckIcon from "../../../.././../../../assets/Icons/notification-check.png";
import ArrowIcon from "../../../.././../../../assets/Icons/notification-icon.png";
import RedIcon from "../../../.././../../../assets/Icons/notification-icon-red.png";
import threeDots from "../../../.././../../../assets/Icons/threeDots.PNG";
import mobileDropDown from "../../../.././../../../assets/Icons/mobileDropDown.png";
import sideBarlogo from "../../../../../../../assets/Icons/sideBarlogo.png";
import togglemobile from "../../../../../../../assets/Icons/togglemobile.png";
import filterIcon from "../../../../../../../assets/Icons/filterIcon.png";
import Dropdown from "react-dropdown";
import MobileLeftSidebar from "../../MobileLeftSidebar";
import { actions as coActions } from "../../../redux/actions";
import { isMobile } from "react-device-detect";
import { useOuterClick } from "./outerClick.js";
import { Link } from "react-router-dom";
import { actions as notificationActions } from "../Redux/actions";
import NoResultFound from "../../../../../../../CommonModules/sharedComponents/NoResultFound";
import { setNotificationTaskId } from "../Redux/Action";

function NotificationGrid(props) {
  // console.log("state => ",state);

  const [showMarkDrop, setShowMarkDrop] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notifications, setNotification] = useState(null);
  const [notificationsBackup, setNotificationBackup] = useState(null);
  const [navigationHideShow, setNavigationHideShow] = useState(false);
  const dotsDropdown = () => {
    setShowMarkDrop(!showMarkDrop);
  };
  const filterDropDown = () => {
    setShowFilter(!showFilter);
  };
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const loggedUser = state && state.auth && state.auth.loginInfo;
  useEffect(() => {
    const tempNotification =
      state &&
      state.taskReport &&
      state.taskReport.userNotifications &&
      state.taskReport.userNotifications.notifications;
    let tempArray = [];
    let tempFinalArray = [];
    if (tempNotification != undefined && tempNotification.length > 0) {
      tempNotification.map((element) => {
        tempArray = tempNotification.filter(
          (e) =>
            new Date(e.date).toLocaleDateString() ===
            new Date(element.date).toLocaleDateString()
        );
        let dateObj = { date: element.date, notificationOfDay: tempArray };
        let isObjPresent = tempFinalArray.some(
          (e) =>
            new Date(e.date).toLocaleDateString() ===
            new Date(element.date).toLocaleDateString()
        );
        if (!isObjPresent) {
          tempFinalArray.push(dateObj);
        }
      });
      tempFinalArray = tempFinalArray.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }
    setNotification(tempFinalArray);
    setNotificationBackup(tempFinalArray);
    setSelectedCategory({
      value: "All Notifications",
      label: "All Notifications",
    });
  }, [state.taskReport.userNotifications]);

  useEffect(() => {
    dispatch(
      coActions.getCoNotificationsRequest({
        userID: loggedUser.UserID,
      })
    );
  }, []);

  const onCategoryChange = (e) => {
    setSelectedCategory(e);
    let tempFinalArray = [];
    if (e.value == "All Notifications" || e.value == "Approvals") {
      setNotification(notificationsBackup);
    } else {
      // notificationsBackup.map((item) => {
      //    let objArray = filterNotification(item, e.value)
      //    let tempObj = { date: item.date, notificationOfDay: objArray }
      //    tempFinalArray.push(tempObj)
      // })
      setNotification(tempFinalArray);
    }
  };
  const filterNotification = (arr, type) => {
    return arr.notificationOfDay.filter((e) => e.notificationType === type);
  };
  const isToday = (date) => {
    var today = new Date();
    var dateObj = new Date(date);
    if (today.toDateString() === dateObj.toDateString()) {
      return true;
    } else {
      return false;
    }
  };
  const getTimeCalculation = (date) => {
    var time = new Date(date);
    return time
      .toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .toLowerCase();
  };
  const gethourCalculation = (date) => {
    var objDate = new Date(date);
    var now = new Date();
    var diffInSeconds = Math.abs(now - objDate) / 1000;
    var hours = Math.floor((diffInSeconds / 60 / 60) % 24);
    var minutes = Math.floor((diffInSeconds / 60) % 60);
    if (hours < 24) {
      return hours + (hours > 1 ? " hrs" : " hr") + " ago";
    } else if (minutes < 60) {
      return minutes + " min ago";
    }
  };
  const getDeviderSection = (date) => {
    var today = new Date();
    var dateObj = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (dateObj.toLocaleDateString() == today.toLocaleDateString()) {
      return "Today";
    } else if (dateObj.toLocaleDateString() == yesterday.toLocaleDateString()) {
      return "Yesterday";
    } else {
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        dateObj
      );
      let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
        dateObj
      );
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
        dateObj
      );
      return da + " " + mo + " " + ye;
    }
  };
  const closeMobileSidebar = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.remove("overlay");
      drawerChild.style.left = "-100%";
    }
  };
  const options = [
    { value: "All Notifications", label: "All Notifications" },
    { value: "Approvals", label: "Approvals" },
    // { value: 'Updates', label: 'Updates' },
    // { value: 'Requests', label: 'Requests' }
  ];

  const innnerDropdown = useOuterClick((e) => {
    // console.log("inside inner dropdown");
    setShowFilter(false);
  });
  const openHBMenu = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.add("overlay");
      drawerChild.style.left = "0%";
    }
  };
  return (
    <div className="co-dash-notification-grid-right">
      {isMobile && (
        <div id="sideBarParent" className="">
          <div id="sideBarChild" className="leftSideBarFixed">
            <MobileLeftSidebar
              className="d-block d-md-none"
              close={() => closeMobileSidebar()}
            />
          </div>
        </div>
      )}
      <div className="mobile-head mobile-top-pyd d-block d-md-none">
        <div className="d-flex">
          <div className="w-25">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                openHBMenu();
              }}
              src={togglemobile}
              alt="toggle mobile"
            />
          </div>
          <div className="w-75">
            {" "}
            <img className="mobile-logo" src={sideBarlogo} />{" "}
          </div>
        </div>
      </div>
      <div className="inner-div">
        <div className="heading-section">
          <div className="row">
            <div className="col-4 col-sm-5 col-md-5 col-xl-5">
              <p className="main-title">Notifications</p>
            </div>
            <div className="col-8 col-sm-7 col-md-7 col-xl-7">
              <div className="Filter-drop-down">
                <ul>
                  <li>
                    <p className="filter-by d-none d-md-block">Filter by:</p>
                  </li>
                  <li>
                    <Dropdown
                      className="d-none d-md-block"
                      arrowClosed={
                        <span className="arrow-closed d-none d-md-block" />
                      }
                      onChange={onCategoryChange}
                      arrowOpen={<span className="arrow-open" />}
                      options={options}
                      value={selectedCategory}
                      placeholder="Select an option"
                    />
                  </li>
                  <li>
                    <span
                      className="dots-div dropIcon d-block d-md-none"
                      ref={innnerDropdown}
                    >
                      {showFilter ? (
                        <img
                          src={mobileDropDown}
                          onClick={filterDropDown}
                          style={{ height: "28px" }}
                        />
                      ) : (
                        <img
                          src={filterIcon}
                          onClick={filterDropDown}
                          style={{ height: "18px", marginRight: "5px" }}
                        />
                      )}
                      {/* <li><span className="dots-div dropIcon d-block d-sm-none" ref={innnerDropdown}><img src={mobileDropDown} onClick={filterDropDown} /> */}
                      {showFilter && (
                        <div className="drop-div top-pt">
                          {options.map((ele) => {
                            return (
                              <p
                                className="dots-option"
                                value={ele.value}
                                onClick={() => onCategoryChange(ele)}
                              >
                                {ele.label}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </span>
                  </li>

                  {/* This required in full release but not in beta... DO NOT DELETE COMMENTED CODE */}

                  {/* <li><span className="dots-div" ><img src={threeDots} onClick={dotsDropdown} />
                              {showMarkDrop && <div className="drop-div">
                                 <p className="dots-option">Mark all read</p>
                                 <p className="dots-option">Mark all unread</p>
                              </div>}
                           </span>
                           </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="inside-scroll">
          {notifications != null &&
            notifications.length > 0 &&
            notifications.map((item) => {
              return (
                <>
                  {item.notificationOfDay.length > 0 && (
                    <div className="today-grid">
                      <p className="gride-heading">
                        {getDeviderSection(item.date)}
                      </p>
                      {item.notificationOfDay &&
                      item.notificationOfDay.length !== 0
                        ? item.notificationOfDay.map((element) => {
                            return (
                              <>
                                {/* <div className={element.isRead == 0 ? "white-background" : "grey-background"}> */}
                                {element.Comment !== null &&
                                element.Comment !== undefined &&
                                element.Comment !== "" ? (
                                  <Link
                                    to="/dashboard"
                                    style={{ textDecoration: "none" }}
                                    onClick={() => {
                                      if (
                                        loggedUser &&
                                        loggedUser.UserType !== 6
                                      ) {
                                        dispatch(
                                          setNotificationTaskId(element.TaskId)
                                        );
                                      }
                                    }}
                                    style={{
                                      pointerEvents: `${
                                        loggedUser && loggedUser.UserType === 6
                                          ? "none"
                                          : "auto"
                                      }`,
                                    }}
                                  >
                                    <div className={"white-background"}>
                                      <div className="row">
                                        <div className="col-md-9">
                                          <ul className="list-gride">
                                            {/* <li><img src={element.notificationType === 'Approvals' ? CheckIcon : element.notificationType === 'Requests' ? ArrowIcon : RedIcon} alt="" /></li> */}
                                            <li>
                                              <img
                                                src={CheckIcon}
                                                alt=""
                                                className="assignedImage"
                                              />
                                            </li>
                                            {/* {element.notificationType === 'Approvals' && <li className="normal-text"><span className="bold-text">{element.user} </span>has completed a task assigned to them - <span className="bold-text">Uploading of Holding Statement</span></li>}
                                                {element.notificationType === 'Requests' && <li className="normal-text"><span className="bold-text">{element.user} </span>has requested to reassign a task - <span className="bold-text">Client Funding Report</span></li>}
                                                {element.notificationType === 'Updates' && <li className="normal-text"><span className="bold-text"> New regulatory changes introduced by SEBI. Click to know more </span></li>} */}
                                            <li
                                              className="normal-text d-block d-sm-none"
                                              dangerouslySetInnerHTML={{
                                                __html: element.Comment,
                                              }}
                                            ></li>
                                            <li
                                              className="normal-text d-none d-sm-block"
                                              dangerouslySetInnerHTML={{
                                                __html: element.Comment,
                                              }}
                                            ></li>
                                          </ul>
                                        </div>
                                        <div className="col-md-3">
                                          {isToday(element.date) && (
                                            <p className="right-hr">
                                              {gethourCalculation(element.date)}
                                            </p>
                                          )}
                                          {!isToday(element.date) && (
                                            <p className="right-hr">
                                              {getTimeCalculation(element.date)}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                ) : (
                                  <div className={"white-background"}>
                                    <div className="row">
                                      <div className="col-md-9">
                                        <NoResultFound text="No Comments for this date" />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          })
                        : "--"}
                    </div>
                  )}
                </>
              );
            })}
          {notifications != null && notifications.length <= 0 && (
            <div className="no-notification-label">
              No new notifications. We'll notify you when something new arrives
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default connect()(NotificationGrid);
