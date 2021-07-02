import React, { useEffect, useState, useReducer } from "react";
import { Modal } from "react-responsive-modal";
import "./style.css";
import check from "../../assets/Icons/check.png";
import uncheck from "../../assets/Icons/uncheck.png";
import closeIconGray from "../../assets/Icons/closeIconGray.png";
import closeIcon from "../../assets/Icons/closeIcon.png";
import Datepicker from "../../CommonModules/sharedComponents/Datepicker/index";
import constants from "../../CommonModules/sharedComponents/constants/constant";
import { isSameOrAfterToday } from "../../CommonModules/sharedComponents/Datepicker/utils";
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
    default:
      return state;
  }
};

function ReAssignTasksModal({ openModal, setShowModal, data }) {
  const [{ from, to }, dispatch] = useReducer(reducer, { from: [], to: [] });
  const [assignTo, setAssignTo] = useState({});
  const [filter, setFilter] = useState({
    name: "",
    selected: false,
    value: null,
  });
  const handleClose = () => setShowModal(false);
  useEffect(() => {
    console.log(assignTo);
    console.log(filter);
  }, [assignTo, filter]);
  useEffect(() => {
    if ((filter.name = "for specific duration")) {
      setFilter({
        name: "for specific duration",
        value: {
          from: from,
          to: to,
        },
      });
    }
  }, [from, to]);
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
              <button className="btn re-assign-to-me">Re-assign to me</button>
            </div>
          )}
          {Object.entries(assignTo).length !== 0 && (
            <div className="header-after-selected">
              <div className="selected-member">
                <span className="circle-dp">{assignTo.initialsName}</span>
                <span className="member-name">{assignTo.fullName}</span>
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
                  const { id, initialsName, fullName, email } = member;
                  return (
                    <article
                      className="member"
                      key={id}
                      onClick={() => setAssignTo(member)}
                    >
                      <span className="circle-dp">{initialsName}</span>
                      <span className="member-name">{fullName}</span>
                      <span className="member-email">{email}</span>
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
                    if (filter.name === "for task due on") {
                      setFilter({});
                      return;
                    }
                    setFilter({
                      name: "for task due on",
                      value: null,
                    });
                  }}
                >
                  <p>
                    <img
                      src={filter.name === "for task due on" ? check : uncheck}
                      alt="check"
                    />{" "}
                    <span>Re-assign task due on 06/07/2021</span>
                  </p>
                </div>

                <div
                  className="filter"
                  onClick={() => {
                    if (filter.name === "for specific duration") {
                      setFilter({});
                      return;
                    }
                    setFilter({
                      name: "for specific duration",
                      value: {
                        from: "2021-12-06",
                        to: "2021-12-24",
                      },
                    });
                  }}
                >
                  <p>
                    <img
                      src={
                        filter.name === "for specific duration"
                          ? check
                          : uncheck
                      }
                      alt="check"
                    />{" "}
                    <span>
                      Re-assign this task to {assignTo.fullName} for a specific
                      duration
                    </span>
                  </p>
                </div>
                {filter.name === "for specific duration" && (
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
                    if (filter.name === "for all future tasks") {
                      setFilter({});
                      return;
                    }
                    setFilter({
                      name: "for all future tasks",
                      value: null,
                    });
                  }}
                >
                  <p>
                    <img
                      src={
                        filter.name === "for all future tasks" ? check : uncheck
                      }
                      alt="check"
                    />{" "}
                    Re-assign for all future tasks
                  </p>
                </div>
                <div className="buttons-re-assign">
                  <button className="btn re-assign">RE-ASSIGN</button>
                  <button className="btn cancel">CANCEL</button>
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
