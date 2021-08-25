import React, { useState } from "react";
import complteTaskIcon from "../../../assets/Icons/complteTaskIcon.png";
import scheduledIcon from "../../../assets/Icons/scheduledIcon.png";
import viewall from "../../../assets/ERIcons/viewall.png";
import deadline from "../../../assets/ERIcons/deadline.png";
import downArrow from "../../../assets/Icons/downArrow.png";
import { AiFillInfoCircle, AiFillCheckCircle } from "react-icons/ai";
import "./style.css";

const Dashboard = () => {
  const [sortBy, setSortBy] = useState("Task Status");

  return (
    <div className="ER-main">
      <div className="ER-task-statics row">
        <h3>Tasks</h3>
        <div className="active-task"></div>
        <div className="task-statics row">
          <div className="static-card">
            <img src={complteTaskIcon} alt="complte-Task-icon" />
            <span>Completed</span>
            <span>00</span>
          </div>
          <div className="static-card">
            <img src={scheduledIcon} alt="complte-Task-icon" />
            <span>Scheduled</span>
            <span>00</span>
          </div>
          <div className="static-card">
            <img src={complteTaskIcon} alt="complte-Task-icon" />
            <span>Rejected</span>
            <span>02</span>
          </div>
        </div>
        <div className="ER-search-input">
          <input
            className="form-control ER-search"
            placeholder="search by task,company and license"
          />{" "}
        </div>
      </div>

      <div>
        <ul className="sort-by-filter">
          <span className="sort-by">View by</span>
          <span
            className={
              sortBy == "Task Status"
                ? "sort-filter-active"
                : "sort-filter-inactive"
            }
            onClick={() => setSortBy("Task Status")}
          >
            Task Status
          </span>
          <span
            className={
              sortBy == "Company Name"
                ? "sort-filter-active"
                : "sort-filter-inactive"
            }
            onClick={() => setSortBy("Company Name")}
          >
            Company Name
          </span>
          <span
            className={
              sortBy == "Licenses"
                ? "sort-filter-active"
                : "sort-filter-inactive"
            }
            onClick={() => setSortBy("Licenses")}
          >
            Licenses
          </span>
          <span
            className={
              sortBy == "Task Name"
                ? "sort-filter-active"
                : "sort-filter-inactive"
            }
            onClick={() => setSortBy("Task Name")}
          >
            Task Name
          </span>
        </ul>
      </div>

      <div className="ER-task-container">
        <div className="ER-take-action">
          <div className="task-list-grid">
            <div className="upcoming-btn">
              <div className="overdue-title">
                {"Overdue"}
                <span className="overdue-circle">
                  <p className="overdue-circle-text">1</p>
                </span>
                <img src={downArrow} className="arrowDown" alt="Arrow down" />
              </div>
            </div>
            <img src={deadline} />
            <div className="ER-task-detail">
              <button className="code">Good and Service Tax</button>
              <div>
                <div className="overdue-company">
                  <AiFillInfoCircle
                    style={{ color: "red", marginRight: "5px" }}
                  />
                  <p className="company-name">
                    Good and Service tax - 3B form{" "}
                  </p>
                </div>
                <button className="ER-status-button">Task Approved</button>
              </div>
              <div className="detail-name align-left-always">
                <p>
                  <span className="circle-dp"></span>{" "}
                  <span className="user-name">Kedia Financial Securities</span>
                </p>
              </div>
              <span className="overdue-date">21 May</span>
              <span>></span>
            </div>
            <img src={deadline} />
            <div className="ER-task-detail">
              <button className="code">Good and Service Tax</button>
              <span className="company-name">
                Good and Service tax - 3B form{" "}
              </span>
              <div className="detail-name align-left-always">
                <p>
                  <span className="circle-dp"></span>{" "}
                  <span className="user-name">Kedia Financial Securities</span>
                </p>
              </div>
              <span className="overdue-date">21 May</span>
              <span>&gt;</span>
            </div>
            <img src={deadline} />
          </div>
        </div>

        <div className="ER-take-action">
          <div className="task-list-grid">
            <div className="upcoming-btn">
              <div className="upcoming-title">
                {"Review Now"}
                <span className="black-circle">
                  <p className="black-circle-text">1</p>
                </span>
                <img src={downArrow} className="arrowDown" alt="Arrow down" />
              </div>
            </div>
            <div className="ER-task-detail">
              <button className="code">Good and Service Tax</button>
              <span className="company-name">
                Good and Service tax - 3B form{" "}
              </span>
              <div className="detail-name align-left-always">
                <p>
                  <span className="circle-dp"></span>{" "}
                  <span className="user-name">Kedia Financial Securities</span>
                </p>
              </div>
              <span className="date">21 May</span>
              <span>></span>
            </div>
            <div className="ER-task-detail">
              <button className="code">Good and Service Tax</button>
              <span className="company-name">
                Good and Service tax - 3B form{" "}
              </span>
              <div className="detail-name align-left-always">
                <p>
                  <span className="circle-dp"></span>{" "}
                  <span className="user-name">Kedia Financial Securities</span>
                </p>
              </div>
              <span className="date">21 May</span>
              <span>></span>
            </div>
          </div>
          <div className="ER-view-all-conatiner">
            <span>View All (3 More)</span>
            <img src={viewall} />
          </div>
        </div>

        <div className="ER-take-action">
          <div className="task-list-grid">
            <div className="upcoming-btn">
              <div className="upcoming-title">
                {"Upcoming"}
                <span className="black-circle">
                  <p className="black-circle-text">1</p>
                </span>
                <img src={downArrow} className="arrowDown" alt="Arrow down" />
              </div>
            </div>
            <div className="ER-task-detail">
              <button className="code">Good and Service Tax</button>
              <span className="company-name">
                Good and Service tax - 3B form{" "}
              </span>
              <div className="detail-name align-left-always">
                <p>
                  <span className="circle-dp"></span>{" "}
                  <span className="user-name">Kedia Financial Securities</span>
                </p>
              </div>
              <span className="date">21 May</span>
              <span>></span>
            </div>
            <div className="ER-task-detail">
              <button className="code">Good and Service Tax</button>
              <span className="company-name">
                Good and Service tax - 3B form{" "}
              </span>
              <div className="detail-name align-left-always">
                <p>
                  <span className="circle-dp"></span>{" "}
                  <span className="user-name">Kedia Financial Securities</span>
                </p>
              </div>
              <span className="date">21 May</span>
              <span>></span>
            </div>
          </div>
        </div>

        <div className="ER-take-action">
          <div className="task-list-grid">
            <div className="upcoming-btn">
              <div className="completed-title">
                {"Completed"}
                <span className="completed-circle">
                  <p className="completed-circle-text">1</p>
                </span>
                <img src={downArrow} className="arrowDown" alt="Arrow down" />
              </div>
            </div>
            <div className="ER-task-detail">
              <button className="code">Good and Service Tax</button>

              <div className="complete-company">
                <AiFillCheckCircle
                  style={{ color: "green", marginRight: "5px" }}
                />
                <p className="company-name">Good and Service tax - 3B form</p>
              </div>

              <div className="detail-name align-left-always">
                <p>
                  <span className="circle-dp"></span>{" "}
                  <span className="user-name">Kedia Financial Securities</span>
                </p>
              </div>
              <span className="date">21 May</span>
              <span>></span>
            </div>
            <div className="ER-task-detail">
              <button className="code">Good and Service Tax</button>
              <span className="company-name">
                Good and Service tax - 3B form{" "}
              </span>
              <div className="detail-name align-left-always">
                <p>
                  <span className="circle-dp"></span>{" "}
                  <span className="user-name">Kedia Financial Securities</span>
                </p>
              </div>
              <span className="date">21 May</span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
