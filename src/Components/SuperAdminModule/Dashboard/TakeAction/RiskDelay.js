import React, { useState } from "react";
import {
  AiOutlineUp,
  AiOutlineDown,
  AiOutlineRight,
  AiOutlineClose,
} from "react-icons/ai";
import "../style.css";

const RiskDelay = () => {
  const [expanded, setExpanded] = useState({});
  const toggleExpanded = (index, status) => {
    setExpanded({ ...expanded, [index]: status });
  };
  return (
    <div className="RiskDelay">
      <div className="RDHeader">
        <h3>Tasks</h3>
        <AiOutlineClose size={22} />
      </div>
      <div className="RDSubHeader">
        <span>Risk and Delays</span>
        <AiOutlineClose
          color="#000"
          size={15}
          style={{
            marginTop: "5px",
          }}
        />
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
          <div className="table-head">Personal</div>
          <div className="circle-badge">5</div>
          <AiOutlineUp
            size={15}
            color="#000000"
            className="ml-1"
            onClick={toggleExpanded}
          />
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
                    <span style={{ color: "#f22727" }}>03 May</span>
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
          <div className="table-head">Expert Review</div>
          <div className="circle-badge">3</div>
          <AiOutlineUp size={15} color="#000000" className="ml-1" />
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
                    <span>Raheem Singal requested for Leave Migration</span>
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
                    <span style={{ color: "#f22727" }}>05 June</span>
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
    </div>
  );
};
export default RiskDelay;
