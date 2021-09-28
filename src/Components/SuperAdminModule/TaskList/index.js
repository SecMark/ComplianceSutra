import React, { useState } from "react";
import "./style.css";
import complteTaskIcon from "../../../assets/Icons/complteTaskIcon.png";
import scheduledIcon from "../../../assets/Icons/scheduledIcon.png";
import viewall from "../../../assets/ERIcons/viewall.png";
import deadline from "../../../assets/ERIcons/deadline.png";
import downArrow from "../../../assets/Icons/downArrow.png";
import {
  AiFillInfoCircle,
  AiFillCheckCircle,
  AiFillEdit,
  AiOutlineUp,
  AiOutlineDown,
  AiOutlineRight,
} from "react-icons/ai";

const TaskList = () => {
  const [listTab, setListTab] = useState("Personal");
  const [sortBy, setSortBy] = useState("Task Status");

  const [expanded, setExpanded] = useState({});

  const toggleExpanded = (index, status) => {
    setExpanded({ ...expanded, [index]: status });
  };

  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <span
            className={
              listTab === "Personal"
                ? "list-tabs-btn-active"
                : "list-tabs-btn-inactive"
            }
            onClick={() => setListTab("Personal")}
          >
            Personal
          </span>
          <span
            className={
              listTab === "Expert Review"
                ? "list-tabs-btn-active"
                : "list-tabs-btn-inactive"
            }
            onClick={() => setListTab("Expert Review")}
          >
            Expert Review
          </span>
        </div>
        <div className="col">
          <ul className="sort-by-filter">
            <span className="sort-by">Sort by</span>
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
                sortBy == "Task Type"
                  ? "sort-filter-active"
                  : "sort-filter-inactive"
              }
              onClick={() => setSortBy("Task Type")}
            >
              Task Type
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
      </div>

      <div className="row mt-4">
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            margin: "0 10px",
          }}
        >
          <div className="table-head" style={{ color: "#f22727" }}>
            Overdue
          </div>
          <div
            className="circle-badge"
            style={{ background: "#f22727", color: "#fff" }}
          >
            5
          </div>
          <AiOutlineDown size={15} color="#000000" className="ml-1" />
        </div>
        <table className="table table-borderless">
          <tbody>
            {[1, 2, 3].map((item, index) => (
              <>
                <tr key={index}>
                  <td>
                    <span
                      style={{
                        background: "#f7f4fe",
                        color: "#b3abc4",
                        padding: "1px 4px",
                      }}
                    >
                      Internal
                    </span>
                  </td>
                  <td>
                    <span>Aakash Singal requested for Leave Migration</span>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div className="name-circle-badge">AS</div>
                      <div className="px-2">Aakash Singal</div>
                    </div>
                  </td>
                  <td>
                    <span>03 May</span>
                  </td>
                  <td>
                    {expanded[index] ? (
                      <AiOutlineDown
                        size={15}
                        color="#000000"
                        onClick={() => toggleExpanded(index, false)}
                      />
                    ) : (
                      <AiOutlineRight
                        size={15}
                        color="#000000"
                        onClick={() => toggleExpanded(index, true)}
                      />
                    )}
                  </td>
                </tr>
                {expanded[index] && (
                  <tr style={{ background: "#f6f8fb" }}>
                    <td colSpan={12} style={{ margin: "15px 30px 30px 0" }}>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                        }}
                      >
                        <p className="text-muted fs-16">Price Update History</p>
                        <div className="">
                          <span className="add-btn">Add Upcoming Price </span>
                        </div>
                      </div>

                      <div>
                        <td colSpan={12} style={{ padding: 0 }}>
                          <tr>
                            <th className="dropdown-th">Price & duration</th>
                            <th className="dropdown-th">Update added on</th>
                            <th className="dropdown-th">Applied by</th>
                            <th className="dropdown-th">Approved by</th>
                          </tr>

                          {[1, 2].map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="dropdown-td">
                                  New charges of ₹600 for sept 20 - sept 30
                                </td>
                                <td className="dropdown-td">Jun 29,2020</td>
                                <td className="dropdown-td">Super admin</td>
                                <td className="dropdown-td">Ravi Ramaiya</td>
                              </tr>
                            );
                          })}
                        </td>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        <div>
          <span className="view-list-btn">View All (2 more)</span>{" "}
          <AiOutlineDown size={15} color="#000000" />
        </div>
      </div>

      <div className="row mt-4">
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            margin: "0 10px",
          }}
        >
          <div className="table-head">Do Now</div>
          <div className="circle-badge">5</div>
          <AiOutlineDown size={15} color="#000000" className="ml-1" />
        </div>
        <table className="table table-borderless">
          <tbody>
            {[1, 2].map((item, index) => (
              <>
                <tr key={index}>
                  <td>
                    <span
                      style={{
                        background: "#f7f4fe",
                        color: "#b3abc4",
                        padding: "1px 4px",
                      }}
                    >
                      Internal
                    </span>
                  </td>
                  <td>
                    <span>Aakash Singal requested for Leave Migration</span>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div className="name-circle-badge">AS</div>
                      <div className="px-2">Aakash Singal</div>
                    </div>
                  </td>
                  <td>
                    <span>03 May</span>
                  </td>
                  <td>
                    {expanded[index] ? (
                      <AiOutlineDown
                        size={15}
                        color="#000000"
                        onClick={() => toggleExpanded(index, false)}
                      />
                    ) : (
                      <AiOutlineRight
                        size={15}
                        color="#000000"
                        onClick={() => toggleExpanded(index, true)}
                      />
                    )}
                  </td>
                </tr>
                {expanded[index] && (
                  <tr style={{ background: "#f6f8fb" }}>
                    <td colSpan={12} style={{ margin: "15px 30px 30px 0" }}>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                        }}
                      >
                        <p className="text-muted fs-16">Price Update History</p>
                        <div className="">
                          <span className="add-btn">Add Upcoming Price </span>
                        </div>
                      </div>

                      <div>
                        <td colSpan={12} style={{ padding: 0 }}>
                          <tr>
                            <th className="dropdown-th">Price & duration</th>
                            <th className="dropdown-th">Update added on</th>
                            <th className="dropdown-th">Applied by</th>
                            <th className="dropdown-th">Approved by</th>
                          </tr>

                          {[1, 2].map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="dropdown-td">
                                  New charges of ₹600 for sept 20 - sept 30
                                </td>
                                <td className="dropdown-td">Jun 29,2020</td>
                                <td className="dropdown-td">Super admin</td>
                                <td className="dropdown-td">Ravi Ramaiya</td>
                              </tr>
                            );
                          })}
                        </td>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        <div>
          <span className="view-list-btn">View All (2 more)</span>{" "}
          <AiOutlineDown size={15} color="#000000" />
        </div>
      </div>

      <div className="row mt-4">
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            margin: "0 10px",
          }}
        >
          <div className="table-head">Upcoming</div>
          <div className="circle-badge">5</div>
          <AiOutlineDown size={15} color="#000000" className="ml-1" />
        </div>
        <table className="table table-borderless">
          <tbody>
            {[1].map((item, index) => (
              <>
                <tr key={index}>
                  <td>
                    <span
                      style={{
                        background: "#f7f4fe",
                        color: "#b3abc4",
                        padding: "1px 4px",
                      }}
                    >
                      Internal
                    </span>
                  </td>
                  <td>
                    <span>Aakash Singal requested for Leave Migration</span>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div className="name-circle-badge">AS</div>
                      <div className="px-2">Aakash Singal</div>
                    </div>
                  </td>
                  <td>
                    <span>03 May</span>
                  </td>
                  <td>
                    {expanded[index] ? (
                      <AiOutlineDown
                        size={15}
                        color="#000000"
                        onClick={() => toggleExpanded(index, false)}
                      />
                    ) : (
                      <AiOutlineRight
                        size={15}
                        color="#000000"
                        onClick={() => toggleExpanded(index, true)}
                      />
                    )}
                  </td>
                </tr>
                {expanded[index] && (
                  <tr style={{ background: "#f6f8fb" }}>
                    <td colSpan={12} style={{ margin: "15px 30px 30px 0" }}>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                        }}
                      >
                        <p className="text-muted fs-16">Price Update History</p>
                        <div className="">
                          <span className="add-btn">Add Upcoming Price </span>
                        </div>
                      </div>

                      <div>
                        <td colSpan={12} style={{ padding: 0 }}>
                          <tr>
                            <th className="dropdown-th">Price & duration</th>
                            <th className="dropdown-th">Update added on</th>
                            <th className="dropdown-th">Applied by</th>
                            <th className="dropdown-th">Approved by</th>
                          </tr>

                          {[1, 2].map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="dropdown-td">
                                  New charges of ₹600 for sept 20 - sept 30
                                </td>
                                <td className="dropdown-td">Jun 29,2020</td>
                                <td className="dropdown-td">Super admin</td>
                                <td className="dropdown-td">Ravi Ramaiya</td>
                              </tr>
                            );
                          })}
                        </td>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        <div>
          <span className="view-list-btn">View All (2 more)</span>{" "}
          <AiOutlineDown size={15} color="#000000" />
        </div>
      </div>

      <div className="row mt-4">
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            margin: "0 10px",
          }}
        >
          <div className="table-head" style={{ color: "#41d290" }}>
            Completed
          </div>
          <div
            className="circle-badge"
            style={{ background: "#41d290", color: "#fff" }}
          >
            5
          </div>
          <AiOutlineDown size={15} color="#000000" className="ml-1" />
        </div>
        <table className="table table-borderless">
          <tbody>
            {[1].map((item, index) => (
              <>
                <tr key={index}>
                  <td>
                    <span
                      style={{
                        background: "#f7f4fe",
                        color: "#b3abc4",
                        padding: "1px 4px",
                      }}
                    >
                      Internal
                    </span>
                  </td>
                  <td>
                    <span>Aakash Singal requested for Leave Migration</span>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div className="name-circle-badge">AS</div>
                      <div className="px-2">Aakash Singal</div>
                    </div>
                  </td>
                  <td>
                    <span>03 May</span>
                  </td>
                  <td>
                    {expanded[index] ? (
                      <AiOutlineDown
                        size={15}
                        color="#000000"
                        onClick={() => toggleExpanded(index, false)}
                      />
                    ) : (
                      <AiOutlineRight
                        size={15}
                        color="#000000"
                        onClick={() => toggleExpanded(index, true)}
                      />
                    )}
                  </td>
                </tr>
                {expanded[index] && (
                  <tr style={{ background: "#f6f8fb" }}>
                    <td colSpan={12} style={{ margin: "15px 30px 30px 0" }}>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                        }}
                      >
                        <p className="text-muted fs-16">Price Update History</p>
                        <div className="">
                          <span className="add-btn">Add Upcoming Price </span>
                        </div>
                      </div>

                      <div>
                        <td colSpan={12} style={{ padding: 0 }}>
                          <tr>
                            <th className="dropdown-th">Price & duration</th>
                            <th className="dropdown-th">Update added on</th>
                            <th className="dropdown-th">Applied by</th>
                            <th className="dropdown-th">Approved by</th>
                          </tr>

                          {[1, 2].map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="dropdown-td">
                                  New charges of ₹600 for sept 20 - sept 30
                                </td>
                                <td className="dropdown-td">Jun 29,2020</td>
                                <td className="dropdown-td">Super admin</td>
                                <td className="dropdown-td">Ravi Ramaiya</td>
                              </tr>
                            );
                          })}
                        </td>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        <div>
          <span className="view-list-btn">View All (2 more)</span>{" "}
          <AiOutlineDown size={15} color="#000000" />
        </div>
      </div>
    </>
  );
};

export default TaskList;
