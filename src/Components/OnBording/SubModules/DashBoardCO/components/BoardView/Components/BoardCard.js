import React, { useState, useEffect } from 'react';
import mobileSteperIcon from "../../../../../../../assets/Icons/mobileSteperIcon.png";
import "../style.css";
import assignIconCircle from "../../../../../../../assets/Icons/assignIconCircle.png"
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux"
import { actions as notificationActions } from "../../notification/Redux/actions";
import { actions as taskDetailsModalOpen } from "../../../MenuRedux/actions";
import moment from 'moment';
function CustomCard(props) {
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const currentItem = props.currentItem;

    const defineStyle = (props) => {
        let obj = {}
        if (props && props.currentItem && props.currentItem.Statusorg === "overdue") {
            obj = {
                backgroundColor: '#fff9f9',
            }
        } else if (props && props.currentItem && props.currentItem.Statusorg === "Upcoming") {
            obj = {
                backgroundColor: '#fff',
            }
        } else if (props && props.currentItem && props.currentItem.Statusorg === "Completed") {
            obj = {
                backgroundColor: '#f9fffa',
            }
        } else {

            if (props && props.Statusorg === "overdue") {
                obj = {
                    backgroundColor: '#fff9f9',
                }
            } else if (props && props.Statusorg === "Upcoming") {
                obj = {
                    backgroundColor: '#fff',
                }
            } else if (props && props.Statusorg === "Completed") {
                obj = {
                    backgroundColor: '#f9fffa',
                }
            } else {
                obj = {
                    backgroundColor: '#fff',
                }
            }
        }
        return obj;
    }



    const defineStyleForDate = (props) => {
        let obj = {}
        if (props && props.currentItem && props.currentItem.Statusorg === "overdue") {
            obj = {
                color: 'red',
            }
        } else if (props && props.currentItem && props.currentItem.Statusorg === "Upcoming") {
            obj = {
                color: 'rgb(27, 29, 33)',
            }
        } else if (props && props.currentItem && props.currentItem.Statusorg === "Completed") {
            obj = {
                color: 'rgb(27, 29, 33)',
            }
        } else {

            if (props && props.Statusorg === "overdue") {
                obj = {
                    color: 'red',
                }
            } else if (props && props.Statusorg === "Upcoming") {
                obj = {
                    color: 'rgb(27, 29, 33)',
                }
            } else if (props && props.Statusorg === "Completed") {
                obj = {
                    color: 'rgb(27, 29, 33)',
                }
            } else {
                obj = {
                    color: 'rgb(27, 29, 33)',
                }
            }
        }
        return obj;

    }
    const getInitials = (str) => {
        var initials = " "
        if (str != "" && str) {
            var names = str.split(" "),
                initials = names[0].substring(0, 1).toUpperCase()
            if (names.length > 1) {
                initials += names[names.length - 1].substring(0, 1).toUpperCase()
            }
        }
        return initials
    }
    const getDayDate = (date, flag) => {
        var today = new Date()
        var dateObj = new Date(date)
        const yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)
        if (dateObj.toLocaleDateString() == today.toLocaleDateString()) {
            return "Today"
        } else if (dateObj.toLocaleDateString() == yesterday.toLocaleDateString()) {
            return "Yesterday"
        } else {
            return flag === 1
                ? moment(date).format("DD MMM YYYY")
                : moment(date).format("DD MMM")
        }
    }
    const _getAssignedName = (name) => {
        let str = ""
        if (name.length < 11) {
            str = name;
        } else {
            str = `${name.slice(0, 9)}...`
        }
        return str;
    }

    const redirectToTaskListView = (TaskId) => {
     
          dispatch(
            taskDetailsModalOpen.setCurrentBoardViewTaskId(TaskId));
        dispatch(taskDetailsModalOpen.setIsModalOpen("board"));
        dispatch(taskDetailsModalOpen.setCurrentFilterMenuViewBy(props && props.currentBoardViewBy))
    }
    return (
        <div className="">
            {currentItem ?
                <div style={{ maxWidth: '100%' }} className="board-tab-design">
                    <Link to={'/dashboard'} onClick={() => redirectToTaskListView(currentItem && currentItem.TaskId)}>
                        <div style={defineStyle(props)} className="risk-pink-grid">
                            <div className="nse-label">{currentItem && currentItem.LicenseCode}</div>
                            <div className="w-100 d-flex pb-20">
                                {/* <div className="checkIcon">
                                <img
                                    className="three-dot three-dot-small"
                                    src={mobileSteperIcon}
                                    alt="three Dots Icon"
                                />
                            </div> */}
                                <div className="checkIconText">{currentItem && currentItem.TaskName}</div>
                            </div>
                            <div className="card-company-title">{currentItem && currentItem.EntityName}</div>

                            <div className="w-100 d-flex">
                                {currentItem && currentItem.AssignedName !== "Assign" && (
                                    <div className="d-flex w-50">
                                        <div className="pjCircle">
                                            <span className="pjText"> {currentItem && getInitials(currentItem.AssignedName)}</span>
                                        </div>
                                        <div className="circle-flex-text">{currentItem && currentItem.AssignedName && _getAssignedName(currentItem.AssignedName)}</div>
                                    </div>)}
                                {currentItem && currentItem.AssignedName === "Assign" && (
                                    <div className="d-flex w-50">
                                        <div
                                            className="circle-front-text NoStatus"
                                            style={{ color: "#6c5dd3" }}
                                        >
                                            {" "}
                                            <img src={assignIconCircle} alt="" /> ASSIGN
              </div>
                                    </div>)}

                                <div className="w-50">
                                    <span style={defineStyleForDate(props)} className="red-day">{currentItem && getDayDate(currentItem.EndDate, 2)}</span>
                                </div>
                            </div>
                        </div></Link>
                </div> :
                <div className="board-tab-design">
                    <div className="risk-pink-grid">
                        <span>No tasks available</span>
                    </div>
                </div>
            }
        </div>
    )
}
export default CustomCard;