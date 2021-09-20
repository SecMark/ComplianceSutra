import React, { useState, useEffect } from "react";
import "../Notifications.css";
import Select from "react-select";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { actions as coActions } from "../../../OnBording/SubModules/DashBoardCO/redux/actions";
import { setNotificationTaskId } from "../../../OnBording/SubModules/DashBoardCO/components/notification/Redux/Action";
import axios from "axios";
import { Link } from "react-router-dom";

import { BACKEND_BASE_URL } from "../../../../apiServices/baseurl";
import NoResultFound from "../../../../CommonModules/sharedComponents/NoResultFound";
const NotificationList = ({ customStyles }) => {
  const [notificationList, setNotificationList] = useState([]);
  const [notifications, setNotification] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [notificationsBackup, setNotificationBackup] = useState(null);
  const [options, setOptions] = useState([]);

  const [allRead, setAllRead] = useState(false);
  const [allUnread, setAllUnread] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const loggedUser = state && state.auth && state.auth.loginInfo;
  useEffect(() => {
    getNotificationData();
  }, [state.taskReport.userNotifications]);

  const getNotificationData = () => {
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

    setNotificationList(tempFinalArray);
    setNotification(tempFinalArray);
    setNotificationBackup(tempFinalArray);
    setSelectedCategory({
      value: "All Notifications",
      label: "All Notifications",
    });
  };
  useEffect(() => {
    dispatch(
      coActions.getCoNotificationsRequest({
        userID: loggedUser.UserID,
      })
    );
  }, []);

  const ListPoint = () => {
    if (allRead) {
      return "ListPoint whiteBackground";
    } else if (allUnread) {
      return "ListPoint purpleBackground";
    } else return "ListPoint";
  };
  const onAllReadClick = () => {
    setAllRead(true);
    setAllUnread(false);
    setShowMenu(false);
  };

  const onAllUnreadClick = () => {
    setAllUnread(true);
    setAllRead(false);
    setShowMenu(false);
  };

  const onOptionChange = async (event) => {
    let tempArray = [];
    for (let i = 0; i < notificationList.length; i++) {
      const { value } = event;
      await getNotificationData();
      if (value !== "All Notifications") {
        const filteredNotification = notificationList[
          i
        ].notificationOfDay.filter((types) => types.notificationTpe === value);

        if (filteredNotification.length !== 0) {
          let dateObj = {
            date: notifications[0].date,
            notificationOfDay: filteredNotification,
          };

          tempArray.push(dateObj);
        }
        if (tempArray.length > 0) setNotification(tempArray);
        else
          setNotification([
            {
              date: notifications[0].date,
              notificationOfDay: [],
            },
          ]);
      } else getNotificationData();
    }
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

  useEffect(() => {
    fetchNotificationType();
  }, []);

  const fetchNotificationType = async () => {
    let arrayOfList = [];
    const { data } = await axios.post(
      `${BACKEND_BASE_URL}api/Notifications`,
      {}
    );

    data.NotificationType.map((types) => {
      arrayOfList.push({ value: types.description, label: types.description });
    });

    setOptions(arrayOfList);
  };

  return (
    <div>
      <div className="NotificationHeader">
        <div>
          <h4>Notifications</h4>
        </div>
        <div className="NotificationFilter">
          Filter by:
          <Select
            options={options}
            styles={customStyles}
            defaultValue={{
              value: "All Notifications",
              label: "All Notifications",
            }}
            value={options.value}
            onChange={onOptionChange}
          />
        </div>
        <div className="PopupMain">
          <div>
            <button className="Menu" onClick={() => setShowMenu(!showMenu)}>
              <BiDotsVerticalRounded
                style={{
                  height: "2rem",
                  width: "1.5rem",
                }}
              />
            </button>
          </div>
          {(showMenu && (
            <div className="MenuList">
              <button className="MenuItem1" onClick={onAllReadClick}>
                Mark all Read
              </button>
              <button className="MenuItem2" onClick={onAllUnreadClick}>
                Mark all Unread
              </button>
            </div>
          )) ||
            null}
        </div>
      </div>
      {notifications != null && notifications.length > 0 ? (
        <div className="ListMain">
          {notifications.map((item) => {
            return (
              <>
                {item.notificationOfDay.length > 0 ? (
                  <div>
                    <p id="Day">{getDeviderSection(item.date)}</p>
                    {item.notificationOfDay &&
                    item.notificationOfDay.length !== 0
                      ? item.notificationOfDay.map((element) => {
                          return (
                            <>
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
                                  <div>
                                    <div className="ListElement">
                                      <div className={ListPoint()}>
                                        <div className="ListDesc">
                                          <AiOutlineCheckCircle
                                            style={{
                                              margin: 4,
                                              marginLeft: "-10px",
                                              marginRight: 2,
                                              color: "#9e8fff",
                                              border: "none",
                                              width: "3rem",
                                              height: "1.4rem",
                                            }}
                                          />

                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: element.Comment,
                                            }}
                                          ></p>
                                        </div>

                                        <div>
                                          {isToday(element.date) && (
                                            <p id="TimeArrived">
                                              {gethourCalculation(element.date)}
                                            </p>
                                          )}
                                          {!isToday(element.date) && (
                                            <p id="TimeArrived">
                                              {getTimeCalculation(element.date)}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ) : (
                                <div></div>
                              )}
                            </>
                          );
                        })
                      : "--"}
                  </div>
                ) : (
                  <div>
                    No new notifications. We'll notify you when something new
                    arrives
                  </div>
                )}
              </>
            );
          })}
        </div>
      ) : (
        <div className="pt-2 pl-5">
          <NoResultFound text=" No new notifications. We'll notify you when something new arrives" />
        </div>
      )}
    </div>
  );
};
export default NotificationList;
