import React, { useEffect, useState, useReducer } from "react";
import { Modal } from "react-responsive-modal";
import moment from "moment";
import "./style.css";
import check from "../../assets/Icons/check.png";
import uncheck from "../../assets/Icons/uncheck.png";
import closeIconGray from "../../assets/Icons/closeIconGray.png";
import closeIcon from "../../assets/Icons/closeIcon.png";
import Datepicker from "../../CommonModules/sharedComponents/Datepicker/index";
import constants from "../../CommonModules/sharedComponents/constants/constant";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import reducer from "./reducer";
import {
  getInitials,
  checkResponse,
  isDifferenceIsMoreThanOneYear,
  isBeforeToday,
  isMoreThanOneYearFromToday,
  isToDateBeforeFromDate,
  searchUsers,
} from "./utilties";
import apiServices from "../OnBording/SubModules/DashBoardCO/api/index";
function ReAssignTasksModal({
  openModal,
  setShowModal,
  userType,
  userId,
  isSingleTask,
  taskId,
}) {
  const { migrateTasks, getTeamMembers } = apiServices;
  const [isAllInputFilled, setIsAllInputFilled] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [{ from, to, dueOn }, dispatch] = useReducer(reducer, {
    from: [],
    to: [],
    dueOn: [],
  });
  const [searchValue, setSearchValue] = useState("");
  const [assignTo, setAssignTo] = useState({});
  const [filter, setFilter] = useState({});
  const FilterTypes = constants.ReAssignFilterTypes;
  const Flags = constants.ReAssignFlags;
  const Messages = constants.ReAssignMessages;

  const handleClose = () => {
    setAssignTo({});
    setFilter({});
    setShowModal(false);
  };

  const handleReAssign = () => {
    // For Single Tasks
    if (
      isSingleTask &&
      Object.entries(assignTo).length !== 0 &&
      Object.entries(filter).length !== 0 &&
      taskId
    ) {
      // For Team Member
      if (assignTo.UserType === 4 && userId) {
        let payload = {
          coUserType: "4",
          migrateID: assignTo.UserID,
          taskID: taskId,
          flag: Flags[0],
        };
        if (filter.name === FilterTypes.migrateAllTasksForever) {
          migrateTasks(payload).then((response) => {
            if (checkResponse(response)) {
              toast.success(Messages.individualTaskSuccess + assignTo.UserName);
            } else {
              toast.error(Messages.error);
            }
          });
        } else if (
          filter.name === FilterTypes.migrateAllTasksOfParticularDate
        ) {
          payload = {
            coUserType: "4",
            migrateID: assignTo.UserID,
            taskID: taskId,
            migratefrom: moment(
              filter.value.dueOn.join("-"),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            flag: Flags[1],
          };
          migrateTasks(payload).then((response) => {
            if (checkResponse(response)) {
              toast.success(Messages.individualTaskSuccess + assignTo.UserName);
            } else {
              toast.error(Messages.error);
            }
          });
        } else if (filter.name === FilterTypes.migrateAllTasksInDateRange) {
          payload = {
            coUserType: "4",
            migrateID: assignTo.UserID,
            taskID: taskId,
            migratefrom: moment(
              filter.value.from.join("-"),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            migrateto: moment(filter.value.to.join("-"), "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
            flag: Flags[2],
          };
          migrateTasks(payload).then((response) => {
            if (checkResponse(response)) {
              toast.success(Messages.individualTaskSuccess + assignTo.UserName);
            } else {
              toast.error(Messages.error);
            }
          });
        }
      }
      // For Approver
      if (assignTo.UserType === 5 && userId) {
        let payload = {
          coUserType: "5",
          migrateID: assignTo.UserID,
          taskID: taskId,
          flag: Flags[0],
        };
        if (filter.name === FilterTypes.migrateAllTasksForever) {
          migrateTasks(payload).then((response) => {
            if (checkResponse(response)) {
              toast.success(Messages.individualTaskSuccess + assignTo.UserName);
            } else {
              toast.error(Messages.error);
            }
          });
        } else if (
          filter.name === FilterTypes.migrateAllTasksOfParticularDate
        ) {
          payload = {
            coUserType: "5",
            migrateID: assignTo.UserID,
            taskID: taskId,
            migratefrom: moment(
              filter.value.dueOn.join("-"),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            flag: Flags[1],
          };
          migrateTasks(payload).then((response) => {
            if (checkResponse(response)) {
              toast.success(Messages.individualTaskSuccess + assignTo.UserName);
            } else {
              toast.error(Messages.error);
            }
          });
        } else if (filter.name === FilterTypes.migrateAllTasksInDateRange) {
          payload = {
            coUserType: "5",
            migrateID: assignTo.UserID,
            taskID: taskId,
            migratefrom: moment(
              filter.value.from.join("-"),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            migrateto: moment(filter.value.to.join("-"), "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
            flag: Flags[2],
          };
          migrateTasks(payload).then((response) => {
            if (checkResponse(response)) {
              toast.success(Messages.individualTaskSuccess + assignTo.UserName);
            } else {
              toast.error(Messages.error);
            }
          });
        }
      }
      // For Compliance Officer
      if (assignTo.UserType === 3 && userId) {
        let payload = {
          coUserType: "3",
          migrateID: assignTo.UserID,
          taskID: taskId,
          flag: Flags[0],
        };
        if (filter.name === FilterTypes.migrateAllTasksForever) {
          migrateTasks(payload).then((response) => {
            if (checkResponse(response)) {
              toast.success(Messages.individualTaskSuccess + assignTo.UserName);
            } else {
              toast.error(Messages.error);
            }
          });
        } else if (
          filter.name === FilterTypes.migrateAllTasksOfParticularDate
        ) {
          payload = {
            coUserType: "3",
            migrateID: assignTo.UserID,
            taskID: taskId,
            migratefrom: moment(
              filter.value.dueOn.join("-"),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            flag: Flags[1],
          };
          migrateTasks(payload).then((response) => {
            if (checkResponse(response)) {
              toast.success(Messages.individualTaskSuccess + assignTo.UserName);
            } else {
              toast.error(Messages.error);
            }
          });
        } else if (filter.name === FilterTypes.migrateAllTasksInDateRange) {
          payload = {
            coUserType: "3",
            migrateID: assignTo.UserID,
            taskID: taskId,
            migratefrom: moment(
              filter.value.from.join("-"),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            migrateto: moment(filter.value.to.join("-"), "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
            flag: Flags[2],
          };
          migrateTasks(payload).then((response) => {
            if (checkResponse(response)) {
              toast.success(Messages.individualTaskSuccess + assignTo.UserName);
            } else {
              toast.error(Messages.error);
            }
          });
        }
      }
    }

    // For All Tasks
    if (
      Object.entries(assignTo).length !== 0 &&
      Object.entries(filter).length !== 0 &&
      isSingleTask === undefined
    ) {
      // For Team Member
      if (userType === 4 && assignTo.UserType === 4 && userId) {
        let payload = {
          coUserType: "4",
          migrateID: assignTo.UserID,
          ecoUserId: userId,
          flag: 0,
        };
        if (filter.name === FilterTypes.migrateAllTasksForever) {
          migrateTasks(payload)
            .then((response) => {
              if (checkResponse(response)) {
                toast.success(Messages.success + assignTo.UserName);
              } else {
                toast.error(Messages.error);
              }
            })
            .catch((err) => {
              toast.error(Messages.error);
            });
        } else if (filter.name === FilterTypes.migrateAllTasksInDateRange) {
          payload = {
            coUserType: "4",
            migrateID: assignTo.UserID,
            ecoUserId: userId,
            migratefrom: moment(
              filter.value.from.join("-"),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            migrateto: moment(filter.value.to.join("-"), "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
            flag: "2",
          };
          migrateTasks(payload)
            .then((response) => {
              if (checkResponse(response)) {
                toast.success(Messages.success + assignTo.UserName);
              } else {
                toast.error(Messages.error);
              }
            })
            .catch((err) => {
              toast.error(Messages.error);
            });
        } else if (
          filter.name === FilterTypes.migrateAllTasksOfParticularDate
        ) {
          payload = {
            coUserType: "4",
            migrateID: assignTo.UserID,
            ecoUserId: userId,
            migratefrom: moment(
              filter.value.dueOn.join("-"),
              "DD-M-YYYY"
            ).format("YYYY-MM-DD"),
            flag: Flags[1],
          };
          migrateTasks(payload)
            .then((response) => {
              if (checkResponse(response)) {
                toast.success(Messages.success + assignTo.UserName);
              } else {
                toast.error(Messages.error);
              }
            })
            .catch((err) => {
              toast.error(Messages.error);
            });
        }
      }
      // For Approver
      if (userType === 5 && assignTo.UserType === 5 && userId) {
        let payload = {
          coUserType: "5",
          migrateID: assignTo.UserID,
          ecoUserId: userId,
          flag: "0",
        };
        if (filter.name === FilterTypes.migrateAllTasksForever) {
          migrateTasks(payload)
            .then((response) => {
              if (checkResponse(response)) {
                toast.success(Messages.success + assignTo.UserName);
              } else {
                toast.error(Messages.error);
              }
            })
            .catch((err) => {
              toast.error(Messages.error);
            });
        } else if (filter.name === FilterTypes.migrateAllTasksInDateRange) {
          payload = {
            coUserType: "5",
            migrateID: assignTo.UserID,
            ecoUserId: userId,
            migratefrom: moment(
              filter.value.from.join("-"),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            migrateto: moment(filter.value.to.join("-"), "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
            flag: Flags[2],
          };
          migrateTasks(payload)
            .then((response) => {
              if (checkResponse(response)) {
                toast.success(Messages.success + assignTo.UserName);
              } else {
                toast.error(Messages.error);
              }
            })
            .catch((err) => {
              toast.error(Messages.error);
            });
        } else if (
          filter.name === FilterTypes.migrateAllTasksOfParticularDate
        ) {
          payload = {
            coUserType: "5",
            migrateID: assignTo.UserID,
            ecoUserId: userId,
            migratefrom: moment(
              filter.value.dueOn.join("-"),
              "DD-M-YYYY"
            ).format("YYYY-MM-DD"),
            flag: Flags[1],
          };
          migrateTasks(payload)
            .then((response) => {
              if (checkResponse(response)) {
                toast.success(Messages.success + assignTo.UserName);
              } else {
                toast.error(Messages.error);
              }
            })
            .catch((err) => {
              toast.error(Messages.error);
            });
        }
      }
      // For Compliance Officer
      if (assignTo.UserType === 3 && userId) {
        let payload = {
          coUserType: "3",
          migrateID: assignTo.UserID,
          ecoUserId: userId,
          flag: 0,
        };
        if (filter.name === FilterTypes.migrateAllTasksForever) {
          migrateTasks(payload)
            .then((response) => {
              if (checkResponse(response)) {
                toast.success(Messages.success + assignTo.UserName);
              } else {
                toast.error(Messages.error);
              }
            })
            .catch((err) => {
              toast.error(Messages.error);
            });
        } else if (filter.name === FilterTypes.migrateAllTasksInDateRange) {
          payload = {
            coUserType: "3",
            migrateID: assignTo.UserID,
            ecoUserId: userId,
            migratefrom: moment(
              filter.value.from.join("-"),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            migrateto: moment(filter.value.to.join("-"), "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
            flag: "2",
          };
          migrateTasks(payload)
            .then((response) => {
              if (checkResponse(response)) {
                toast.success(Messages.success + assignTo.UserName);
              } else {
                toast.error(Messages.error);
              }
            })
            .catch((err) => {
              toast.error(Messages.error);
            });
        } else if (
          filter.name === FilterTypes.migrateAllTasksOfParticularDate
        ) {
          payload = {
            coUserType: "3",
            migrateID: assignTo.UserID,
            ecoUserId: userId,
            migratefrom: moment(
              filter.value.dueOn.join("-"),
              "DD-M-YYYY"
            ).format("YYYY-MM-DD"),
            flag: Flags[1],
          };
          migrateTasks(payload)
            .then((response) => {
              if (checkResponse(response)) {
                toast.success(Messages.success + assignTo.UserName);
              } else {
                toast.error(Messages.error);
              }
            })
            .catch((err) => {
              toast.error(Messages.error);
            });
        }
      }
    }
    handleClose();
  };

  useEffect(() => {
    // Fetching data of members.
    if (auth && auth.loginInfo && auth.loginInfo.UserID && userId) {
      let payload = {
        coUserId: auth.loginInfo.UserID,
        coUserType: "0",
      };
      if (userType === 3) {
        payload = {
          coUserId: auth.loginInfo.UserID,
          coUserType: "3",
        };
      }
      if (userType === 4) {
        payload = {
          coUserId: auth.loginInfo.UserID,
          coUserType: "4",
        };
      }
      if (userType === 5) {
        payload = {
          coUserId: auth.loginInfo.UserID,
          coUserType: "5",
        };
      }
      getTeamMembers(payload)
        .then((response) => {
          // This is all task
          const responseData = response.data[0].GEN_Users;
          if (userType) {
            setData(responseData.filter((item) => item.UserID !== userId));
            return;
          }
          if (userType === undefined) {
            // This is for single task
            const dataByUserId = responseData.find(
              (item) => item.UserID === userId
            );
            const dataByUserType = responseData.filter(
              (item) => item.UserType === dataByUserId.UserType
            );
            setData(dataByUserType.filter((item) => item.UserID !== userId));
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }, [userId]);

  // For updating selected dates in state variables.
  useEffect(() => {
    if (filter.name === FilterTypes.migrateAllTasksInDateRange) {
      setFilter({
        name: FilterTypes.migrateAllTasksInDateRange,
        value: {
          from: from,
          to: to,
        },
      });
    }
    if (filter.name === FilterTypes.migrateAllTasksOfParticularDate) {
      setFilter({
        name: FilterTypes.migrateAllTasksOfParticularDate,
        value: {
          dueOn: dueOn,
        },
      });
    }
  }, [from, to, dueOn]);

  // For checking is all input filled
  useEffect(() => {
    if (
      Object.entries(assignTo).length !== 0 &&
      Object.entries(filter).length !== 0
    ) {
      if (filter.name === FilterTypes.migrateAllTasksForever) {
        setIsAllInputFilled(true);
      } else if (
        filter.name === FilterTypes.migrateAllTasksOfParticularDate &&
        filter.value.dueOn &&
        filter.value.dueOn.length !== 0 &&
        filter.value.dueOn.length === 3 &&
        !isBeforeToday(filter.value.dueOn) &&
        !isMoreThanOneYearFromToday(filter.value.dueOn)
      ) {
        setIsAllInputFilled(true);
      } else if (
        filter.name === FilterTypes.migrateAllTasksInDateRange &&
        filter.value.from &&
        filter.value.to &&
        filter.value.from.length !== 0 &&
        filter.value.to.length !== 0 &&
        filter.value.from.length === 3 &&
        filter.value.to.length === 3 &&
        !isBeforeToday(filter.value.from) &&
        !isMoreThanOneYearFromToday(filter.value.from) &&
        !isBeforeToday(filter.value.to) &&
        !isMoreThanOneYearFromToday(filter.value.to) &&
        !isDifferenceIsMoreThanOneYear(filter.value.from, filter.value.to) &&
        !isToDateBeforeFromDate(filter.value.from, filter.value.to)
      ) {
        setIsAllInputFilled(true);
      } else {
        setIsAllInputFilled(false);
      }
    } else {
      setIsAllInputFilled(false);
    }
  }, [assignTo, filter, from, to, dueOn]);
  return (
    <Modal
      center={true}
      showCloseIcon={false}
      open={openModal}
      onClose={handleClose}
      classNames={{
        modalContainer: "customReAssignModalContainerMobile",
        modal: "customReAssignModalMobile",
      }}
    >
      <div className="re-container">
        {Object.entries(assignTo).length === 0 && (
          <div className="modal-top">
            <h5>Re-assign to </h5>
            <img src={closeIcon} alt="cross" onClick={handleClose} />
          </div>
        )}
        <div className="header">
          {Object.entries(assignTo).length === 0 && (
            <div className="header-controls">
              <input
                type="text"
                className="form-control"
                placeholder="Enter name or email"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <span>or</span>
              <button
                className="btn re-assign-to-me"
                onClick={() => {
                  setAssignTo({
                    EmailID: auth.loginInfo.EmailID,
                    UserName: auth.loginInfo.UserName,
                    UserType: auth.loginInfo.UserType,
                    UserID: auth.loginInfo.UserID,
                  });
                }}
              >
                Re-assign to me
              </button>
            </div>
          )}
          {Object.entries(assignTo).length !== 0 && (
            <div className="header-after-selected">
              <div className="selected-member">
                <span className="circle-dp">
                  {getInitials(assignTo.UserName)}
                </span>
                <span className="member-name">{assignTo.UserName}</span>
                <img
                  src={closeIconGray}
                  alt="croxx"
                  onClick={() => setAssignTo({})}
                />
              </div>
              <img src={closeIcon} alt="cross" onClick={handleClose} />
            </div>
          )}
        </div>
        <div className="main-content">
          {Object.entries(assignTo).length === 0 && (
            <div className="members-list">
              {/* {data && data.length > 0 ? (
                data.map((member) => { */}
              {searchUsers(searchValue, data) &&
              searchUsers(searchValue, data).length > 0 ? (
                searchUsers(searchValue, data).map((member) => {
                  const { UserID, EmailID, UserName } = member;
                  return (
                    <article
                      className="member"
                      key={UserID}
                      onClick={() => setAssignTo(member)}
                    >
                      <span className="circle-dp">{getInitials(UserName)}</span>
                      <span className="member-name">{UserName}</span>
                      <span className="member-email">{EmailID}</span>
                    </article>
                  );
                })
              ) : (
                <p>No members found</p>
              )}
            </div>
          )}
          {Object.entries(assignTo).length !== 0 && (
            <>
              <div className="filters">
                <div
                  className="filter"
                  onClick={() => {
                    if (
                      filter.name ===
                      FilterTypes.migrateAllTasksOfParticularDate
                    ) {
                      setFilter({});
                      return;
                    }
                    setFilter({
                      name: FilterTypes.migrateAllTasksOfParticularDate,
                      value: {
                        dueOn: [],
                      },
                    });
                  }}
                >
                  <p>
                    <img
                      src={
                        filter.name ===
                        FilterTypes.migrateAllTasksOfParticularDate
                          ? check
                          : uncheck
                      }
                      alt="check"
                    />{" "}
                    <span>Re-assign task due on</span>
                  </p>
                </div>
                {filter.name ===
                  FilterTypes.migrateAllTasksOfParticularDate && (
                  <div className="date-input-container">
                    <div className="form-group d-flex align-items-start my-3">
                      <label>Date:</label>
                      <div className="d-flex flex-column">
                        <Datepicker
                          name="DueOn"
                          dispatch={dispatch}
                          actionType="SET_DUE_DATE"
                        />
                        <p className="warnings">
                          {isBeforeToday(filter.value.dueOn) !== undefined &&
                            isBeforeToday(filter.value.dueOn) && (
                              <small>
                                {"* " +
                                  constants.errorMessage.errorDueToBeforeDate}
                              </small>
                            )}
                          {isMoreThanOneYearFromToday(filter.value.dueOn) &&
                            isMoreThanOneYearFromToday(filter.value.dueOn) && (
                              <small>
                                {"* " +
                                  constants.errorMessage
                                    .errorDueToMoreThanOneYearDateFromToday}
                              </small>
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="filter"
                  onClick={() => {
                    if (
                      filter.name === FilterTypes.migrateAllTasksInDateRange
                    ) {
                      setFilter({});
                      return;
                    }
                    setFilter({
                      name: FilterTypes.migrateAllTasksInDateRange,
                      value: {
                        from: [],
                        to: [],
                      },
                    });
                  }}
                >
                  <p>
                    <img
                      src={
                        filter.name === FilterTypes.migrateAllTasksInDateRange
                          ? check
                          : uncheck
                      }
                      alt="check"
                    />{" "}
                    <span>
                      Re-assign this task to {assignTo.UserName} for a specific
                      duration
                    </span>
                  </p>
                </div>
                {filter.name === FilterTypes.migrateAllTasksInDateRange && (
                  <div className="date-input-container">
                    <div className="form-group d-flex align-items-start my-3">
                      <label>From:</label>
                      <div className="d-flex flex-column">
                        <Datepicker
                          name="From"
                          dispatch={dispatch}
                          actionType="SET_FROM_DATE"
                        />
                        <p className="warnings">
                          {isBeforeToday(filter.value.from) !== undefined &&
                            isBeforeToday(filter.value.from) && (
                              <small className="d-block">
                                {"* " +
                                  constants.errorMessage.errorDueToBeforeDate}
                              </small>
                            )}
                          {isMoreThanOneYearFromToday(filter.value.from) !==
                            undefined &&
                            isMoreThanOneYearFromToday(filter.value.from) && (
                              <small className="d-block">
                                {"* " +
                                  constants.errorMessage
                                    .errorDueToMoreThanOneYearDateFromToday}
                              </small>
                            )}
                        </p>
                      </div>
                    </div>
                    <div className="form-group d-flex align-items-start my-3">
                      <label>To:</label>
                      <div className="d-flex flex-column">
                        <Datepicker
                          name="To"
                          dispatch={dispatch}
                          actionType="SET_TO_DATE"
                        />
                        <p className="warnings">
                          {isBeforeToday(filter.value.to) !== undefined &&
                            isBeforeToday(filter.value.to) && (
                              <small className="d-block">
                                {"* " +
                                  constants.errorMessage.errorDueToBeforeDate}
                              </small>
                            )}
                          {isMoreThanOneYearFromToday(filter.value.to) !==
                            undefined &&
                            isMoreThanOneYearFromToday(filter.value.to) && (
                              <small className="d-block">
                                {"* " +
                                  constants.errorMessage
                                    .errorDueToMoreThanOneYearDateFromToday}
                              </small>
                            )}
                          {isDifferenceIsMoreThanOneYear(
                            filter.value.from,
                            filter.value.to
                          ) !== undefined &&
                            isDifferenceIsMoreThanOneYear(
                              filter.value.from,
                              filter.value.to
                            ) && (
                              <small className="d-block">
                                {"* " + constants.errorMessage.errorDueToRange}
                              </small>
                            )}
                          {isToDateBeforeFromDate(
                            filter.value.from,
                            filter.value.to
                          ) !== undefined &&
                            isToDateBeforeFromDate(
                              filter.value.from,
                              filter.value.to
                            ) && (
                              <small className="d-block">
                                {"* " +
                                  constants.errorMessage.errorDueToReverseDate +
                                  moment(
                                    filter.value.from.join("-"),
                                    "DD-MM-YYYY"
                                  ).format("D MMMM YYYY")}
                              </small>
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="filter"
                  onClick={() => {
                    if (filter.name === FilterTypes.migrateAllTasksForever) {
                      setFilter({});
                      return;
                    }
                    setFilter({
                      name: FilterTypes.migrateAllTasksForever,
                      value: null,
                    });
                  }}
                >
                  <p>
                    <img
                      src={
                        filter.name === FilterTypes.migrateAllTasksForever
                          ? check
                          : uncheck
                      }
                      alt="check"
                    />{" "}
                    Re-assign for all future tasks
                  </p>
                </div>
                <div className="buttons-re-assign">
                  {isAllInputFilled ? (
                    <button className="btn re-assign" onClick={handleReAssign}>
                      RE-ASSIGN
                    </button>
                  ) : (
                    <button className="btn re-assign" disabled={true}>
                      RE-ASSIGN
                    </button>
                  )}

                  <button className="btn cancel" onClick={handleClose}>
                    CANCEL
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ReAssignTasksModal;
