import React, { useEffect, useState, useReducer } from "react";
import { Modal } from "react-responsive-modal";
import api from "../../apiServices/";
import moment from "moment";
import "./style.css";
import check from "../../assets/Icons/check.png";
import uncheck from "../../assets/Icons/uncheck.png";
import closeIconGray from "../../assets/Icons/closeIconGray.png";
import closeIcon from "../../assets/Icons/closeIcon.png";
import Datepicker from "../../CommonModules/sharedComponents/Datepicker/index";
import constants from "../../CommonModules/sharedComponents/constants/constant";
import { isSameOrAfterToday } from "../../CommonModules/sharedComponents/Datepicker/utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FROM_DATE":
      return {
        ...state,
        from: action.payload,
      };
    case "SET_TO_DATE":
      return {
        ...state,
        to: action.payload,
      };
    case "SET_DUE_DATE":
      return {
        ...state,
        dueOn: action.payload,
      };
    default:
      return state;
  }
};
const FilterTypes = {
  migrateAllTasksInDateRange: "MIGRATE_ALL_TASKS_IN_DATE_RANGE",
  migrateAllTasksOfParticularDate: "MIGRATE_ALL_TASKS_OF_PARTICULAR_DATE",
  migrateAllTasksForever: "MIGRATE_ALL_TASKS_FOREVER",
};
function ReAssignTasksModal({ openModal, setShowModal, userType, userId }) {
  const [isAllInputFilled, setIsAllInputFilled] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [{ from, to, dueOn }, dispatch] = useReducer(reducer, {
    from: [],
    to: [],
    dueOn: [],
  });
  const [assignTo, setAssignTo] = useState({});
  const [filter, setFilter] = useState({
    name: "",
    value: null,
  });
  // console.log(userId);
  // console.log(userType);
  const handleClose = () => {
    setAssignTo({});
    setFilter({});
    setShowModal(false);
  };
  const getInitials = (name) => {
    const nameArray = name ? name.split(" ") : " ";
    if (nameArray.length > 1) {
      return `${nameArray[0].slice(0, 1)}${nameArray[nameArray.length - 1]
        .slice(0, 1)
        .toUpperCase()}`;
    } else {
      return `${nameArray[0].slice(0, 2).toUpperCase()}`;
    }
  };
  const handleReAssign = () => {
    if (
      Object.entries(assignTo).length !== 0 &&
      Object.entries(filter).length !== 0 &&
      userType === 4 &&
      userId
    ) {
      let payload = {
        coUserType: "4",
        migrateID: assignTo.userId,
        ecoUserId: userId,
        flag: 0,
      };
      if (filter.name === FilterTypes.migrateAllTasksForever) {
        api
          .post("/api/Migrate", payload)
          .then(() => {
            toast.success("Task Re-Assigned To Team Member Successfully!");
          })
          .catch((err) => {
            toast.error(`${err}`);
          });
      }
      if (filter.name === FilterTypes.migrateAllTasksInDateRange) {
        payload = {
          coUserType: "4",
          migrateID: assignTo.userId,
          ecoUserId: userId,
          migratefrom: moment(filter.value.from.join("-"), "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
          migrateto: moment(filter.value.to.join("-"), "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
          flag: "2",
        };
        api
          .post("/api/Migrate", payload)
          .then(() => {
            toast.success("Task Re-Assigned To Team Member Successfully!");
          })
          .catch((err) => {
            toast.error(err);
          });
      }
      if (filter.name === FilterTypes.migrateAllTasksOfParticularDate) {
        payload = {
          coUserType: "4",
          migrateID: assignTo.userId,
          ecoUserId: userId,
          migratefrom: moment(
            filter.value.dueOn.join("-"),
            "DD-MM-YYYY"
          ).format("YYYY-MM-DD"),
          flag: "1",
        };
        console.log(payload);
        api
          .post("/api/Migrate", payload)
          .then(() => {
            toast.success("Task Re-Assigned To Team Member Successfully!");
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    }
    if (
      Object.entries(filter).length !== 0 &&
      Object.entries(assignTo).length !== 0 &&
      userType === 5 &&
      userId
    ) {
      let payload = {
        coUserType: "5",
        migrateID: assignTo.userId,
        ecoUserId: userId,
        flag: 0,
      };
      if (filter.name === FilterTypes.migrateAllTasksForever) {
        api
          .post("/api/Migrate", payload)
          .then(() => {
            toast.success("Task Re-Assigned To Approver Successfully!");
          })
          .catch((err) => {
            toast.error(`${err}`);
          });
      }
      if (filter.name === FilterTypes.migrateAllTasksInDateRange) {
        payload = {
          coUserType: "5",
          migrateID: assignTo.userId,
          ecoUserId: userId,
          migratefrom: moment(filter.value.from.join("-"), "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
          migrateto: moment(filter.value.to.join("-"), "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
          flag: "2",
        };
        api
          .post("/api/Migrate", payload)
          .then(() => {
            toast.success("Task Re-Assigned To Approver Successfully!");
          })
          .catch((err) => {
            toast.error(err);
          });
      }
      if (filter.name === FilterTypes.migrateAllTasksOfParticularDate) {
        payload = {
          coUserType: "5",
          migrateID: assignTo.userId,
          ecoUserId: userId,
          migratefrom: moment(
            filter.value.dueOn.join("-"),
            "DD-MM-YYYY"
          ).format("YYYY-MM-DD"),
          flag: "1",
        };
        api
          .post("/api/Migrate", payload)
          .then(() => {
            toast.success("Task Re-Assigned To Approver Successfully!");
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    }
    handleClose();
  };
  useEffect(() => {
    console.log(auth.loginInfo);
    if (auth && auth.loginInfo && auth.loginInfo.UserID && userType) {
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
      api
        .post("/api/Migrate", payload)
        .then((res) => {
          setData(res.data[0].GEN_Users);
        })
        .catch((err) => console.log(err));
    }
  }, [openModal]);
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
  useEffect(() => {
    console.log(userId);
    console.log(filter);
    console.log(assignTo);
    if (
      Object.entries(assignTo).length !== 0 &&
      Object.entries(filter).length !== 0
    ) {
      if (
        filter.name === FilterTypes.migrateAllTasksInDateRange &&
        filter.value.from !== "" &&
        filter.value.to !== "" &&
        filter.value.from.length !== 1 &&
        filter.value.to.length !== 1
      ) {
        setIsAllInputFilled(true);
      } else {
        setIsAllInputFilled(false);
      }
      if (
        filter.name === FilterTypes.migrateAllTasksOfParticularDate &&
        filter.value.dueOn !== "" &&
        filter.value.dueOn.length !== 1
      ) {
        setIsAllInputFilled(true);
      } else {
        setIsAllInputFilled(false);
      }
      if (filter.name === FilterTypes.migrateAllTasksForever) {
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
      <div className="container">
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
              {data && data.length > 0 ? (
                data.map((member) => {
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
                        dueOn: "",
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
                    <span>Re-assign task due on 06/07/2021</span>
                  </p>
                </div>
                {filter.name ===
                  FilterTypes.migrateAllTasksOfParticularDate && (
                  <div className="date-input-container">
                    <div className="form-group d-flex align-items-start my-3">
                      <label>Due on:</label>
                      <div className="d-flex flex-column">
                        <Datepicker
                          name="Due on"
                          dispatch={dispatch}
                          actionType="SET_DUE_DATE"
                        />
                        <p className="warnings">
                          {isSameOrAfterToday(dueOn) !== undefined &&
                            !isSameOrAfterToday(dueOn) && (
                              <small>
                                {"* " +
                                  constants.errorMessage.errorDueToGreaterDate}
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
                        from: "",
                        to: "",
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
                          {isSameOrAfterToday(from) !== undefined &&
                            !isSameOrAfterToday(from) && (
                              <small>
                                {"* " +
                                  constants.errorMessage.errorDueToGreaterDate}
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
                          {isSameOrAfterToday(to) !== undefined &&
                            !isSameOrAfterToday(to) && (
                              <small>
                                {"* " +
                                  constants.errorMessage.errorDueToGreaterDate}
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
                  <button className="btn re-assign" onClick={handleReAssign}>
                    RE-ASSIGN
                  </button>
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
