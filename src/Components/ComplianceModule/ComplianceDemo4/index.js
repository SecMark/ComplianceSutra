import React, { useState } from "react";
import "./style.css";
import arrow from "../../../assets/Icons/arrow.png";
import accountCircle from "../../../assets/Icons/accountCircle.png";
import accountCircleGreen from "../../../assets/Icons/accountCircleGreen.png";
import accountCirclePurple from "../../../assets/Icons/accountCirclePurple.png";
import accountCircleOrange from "../../../assets/Icons/accountCircleOrange.png";

const content = [
  {
    title: "Weekly Enhanced Supervision Reporting",
    date: "16 Mar 21",
  },
  {
    title: "Day wise reporting of Bank Balance",
    date: "21 Mar 21",
  },
  {
    title: "Weekly Enhanced Supervision Reporting",
    date: "24 Mar 21",
  },
  {
    title: "Day wise reporting of Bank Balance",
    date: "27 Mar 21",
  },
];

function ComplianceDemo4() {
  const [tasks, setTasks] = useState(["task1", "task2", "task3", "task4"]);
  const task = ["task1", "task2", "task3", "task4"];
  const [activeTask, setActiveTask] = useState(tasks[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const addOrRemoveTask = (value) => {
    var index = tasks.indexOf(value);
    tasks.map((item, key) => {
      if (key === index) {
        document
          .getElementById(value)
          .classList.add("animate__animated", "animate__fadeOutLeft");
        setTimeout(() => {
          document.getElementById(value).remove();
        }, 500);
      } else {
        if (value === "task1") {
          document.getElementById("task2").style.top = "0px";
          document.getElementById("task3").style.top = "72px";
          document.getElementById("task4").style.top = "144px";
        }
        if (value === "task2") {
          setTimeout(() => {
            document.getElementById("task3").style.top = "0px";
            document.getElementById("task3").style.transitionDuration = "1s";
            document.getElementById("task4").style.top = "72px";
            document.getElementById("task4").style.transitionDuration = "1.5s";
          }, 500);
        }
        if (value === "task3") {
          setTimeout(() => {
            document.getElementById("task4").style.transitionDuration = "1s";
            document.getElementById("task4").style.top = "0px";
          }, 500);
        }
        document
          .getElementById(item)
          .classList.add("animate__animated", "animate__fadeInUp");
      }
    });
    if (index >= 0) {
      tasks.splice(index, 1);
    }
    setTasks(tasks);
    setActiveTask(tasks[0]);
  };
  console.log("activeTask", activeIndex, activeTask);
  return (
    <div>
      <div className="">
        <div className="task-details-right-side-grid">
          <div className="">
            <div className="white-box-task-deatils">
              <div className="blue-grid-left">
                <div className="col-12 pl-0 pr-0">
                  <div className="compliance-right-grid-title d-block d-sm-none">
                    {" "}
                    My Task
                  </div>
                  <div id="task1" className="task-detail-btn1">
                    <div className="task-detail-btn-text">
                      <p className="task-detail-btn-title">
                        NSE <span className="dueBtn">DUE TODAY</span>
                      </p>
                      <p className="alignright">
                        <img src={accountCircle} alt="account Circle" />
                      </p>
                    </div>
                    <div className="d-block d-sm-none">
                      <div className="col-12 row pl-0 pr-0 margin-left-right">
                        <div className="col-4 pl-0 pr-0">
                          <p className="left-blur-text">Task</p>
                        </div>
                        <div className="col-8 pr-0 pl-0">
                          <p className="right-bold-text">
                            {content &&
                              content[activeIndex] &&
                              content[activeIndex].title &&
                              content[activeIndex].title}{" "}
                          </p>
                        </div>
                      </div>
                      <div className="col-12 row pl-0 pr-0 margin-left-right">
                        <div className="col-4 pl-0 pr-0">
                          <p className="left-blur-text">Due Date</p>
                        </div>
                        <div className="col-8 pr-0 pl-0">
                          <p className="right-bold-text">
                            {content &&
                              content[activeIndex] &&
                              content[activeIndex].date &&
                              content[activeIndex].date}
                          </p>
                        </div>
                      </div>
                      <div className="col-12 row pl-0 pr-0 margin-left-right">
                        <div className="col-4 pl-0 pr-0">
                          <p className="left-blur-text">File</p>
                        </div>
                        <div className="col-8 pr-0 pl-0">
                          <p className="blue-right-text">ADD FILE</p>
                        </div>
                      </div>
                      <div className="col-12 row pl-0 pr-0 margin-left-right">
                        <div className="col-4 pl-0 pr-0">
                          <p className="left-blur-text">Status</p>
                        </div>
                        <div className="col-8 pr-0 pl-0">
                          <p className="right-bold-text">Pending</p>
                        </div>
                      </div>
                      <div className="col-12 row pl-0 pr-0 margin-left-right">
                        <button className="mark-done-button">
                          MARK AS DONE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 pl-0 pr-0">
                  <div id="task2" className="task-detail-btn2">
                    <div className="task-detail-btn-text">
                      <p className="task-detail-btn-title">BSE </p>
                      <p className="alignright">
                        <img src={accountCircleGreen} alt="acount Circle" />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 pl-0 pr-0">
                  <div id="task3" className="task-detail-btn3">
                    <div className="task-detail-btn-text">
                      <p className="task-detail-btn-title">CDSL </p>
                      <p className="alignright">
                        <img src={accountCirclePurple} alt="acount Circle" />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 pl-0 pr-0">
                  <div id="task4" className="task-detail-btn4">
                    <div className="task-detail-btn-text">
                      <p className="task-detail-btn-title">MCX </p>
                      <p className="alignright">
                        <img
                          src={accountCircleOrange}
                          alt="acount Circle Orange"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-white-grid  d-none d-sm-block">
                <div className="complinace-right-grid-title"> Task Details</div>
                <div className="arrow-preview-next  d-none d-sm-block">
                  {" "}
                  <img src={arrow} alt="arrow left" />{" "}
                </div>
                <div className="col-12 row pl-0 pr-0 margin-left-right">
                  <div className="col-4 pl-0 pr-0">
                    <p className="left-blur-text">Task</p>
                  </div>
                  <div className="col-8 pr-0 pl-0">
                    <p className="right-bold-text">
                      {content &&
                        content[activeIndex] &&
                        content[activeIndex].title &&
                        content[activeIndex].title}
                    </p>
                  </div>
                </div>
                <div className="col-12 row pl-0 pr-0 margin-left-right">
                  <div className="col-4 pl-0 pr-0">
                    <p className="left-blur-text">Due Date</p>
                  </div>
                  <div className="col-8 pr-0 pl-0">
                    <p className="right-bold-text">
                      {content &&
                        content[activeIndex] &&
                        content[activeIndex].date &&
                        content[activeIndex].date}
                    </p>
                  </div>
                </div>
                <div className="col-12 row pl-0 pr-0 margin-left-right">
                  <div className="col-4 pl-0 pr-0">
                    <p className="left-blur-text">File</p>
                  </div>
                  <div className="col-8 pr-0 pl-0">
                    <p className="blue-right-text">ADD FILE</p>
                  </div>
                </div>
                <div className="col-12 row pl-0 pr-0 margin-left-right">
                  <div className="col-4 pl-0 pr-0">
                    <p className="left-blur-text">Status</p>
                  </div>
                  <div className="col-8 pr-0 pl-0">
                    <p className="right-bold-text">Pending</p>
                  </div>
                </div>
                <div className="col-12 row pl-0 pr-0 margin-left-right">
                  <button
                    disabled={activeTask === undefined}
                    onClick={() => {
                      setActiveIndex(task.indexOf(tasks[0]));
                      addOrRemoveTask(tasks[0]);
                    }}
                    className="mark-done-button"
                  >
                    MARK AS DONE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceDemo4;
