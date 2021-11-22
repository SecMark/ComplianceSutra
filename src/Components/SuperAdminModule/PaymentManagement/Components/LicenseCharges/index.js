import React, { useState } from "react";
import "./style.css";
import {
  AiOutlineUp,
  AiOutlineDown,
  AiFillEdit,
  AiOutlinePlus,
} from "react-icons/ai";

const LicenseCharges = () => {
  const [sortBy, setSortBy] = useState(1);
  const [orderBy, setOrderBy] = useState(1);
  const [expanded, setExpanded] = useState({});

  const toggleExpanded = (index, status) => {
    setExpanded({ ...expanded, [index]: status });
  };

  return (
    <>
      <div className="filter-tabs">
        {sortBy === 3 ? (
          <div className="">
            <button
              className={`sort-btn ${orderBy === 1 ? "active" : "inactive"}`}
              onClick={() => setOrderBy(1)}
            >
              High to Low
            </button>
            <button
              className={`sort-btn ${orderBy === 2 ? "active" : "inactive"}`}
              onClick={() => setOrderBy(2)}
            >
              Low to High
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className="">
          <span className="edit-btn">Edit All License Charges</span>
          <span className="fs-12 px-2">Sort By</span>
          <button
            className={`sort-btn ${sortBy === 1 ? "active" : "inactive"}`}
            onClick={() => setSortBy(1)}
          >
            Updates
          </button>
          <button
            className={`sort-btn ${sortBy === 2 ? "active" : "inactive"}`}
            onClick={() => setSortBy(2)}
          >
            Alphabatically
          </button>
          <button
            className={`sort-btn ${sortBy === 3 ? "active" : "inactive"}`}
            onClick={() => setSortBy(3)}
          >
            Charges
          </button>
        </div>
      </div>
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>License Name</th>
              <th>Subtasks</th>
              <th>Tool Price</th>
              <th>Expert Review Price</th>
              <th>Upcoming tool & Review Prices</th>
              <th>Applicable from</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5, 6].map((user, index) => (
              <>
                <tr key={index}>
                  <td>
                    <div>
                      <span>Goods and Service Tax</span>
                      <br />
                      <span className="fs-10 text-muted">
                        Last Updated on April 28, 2021
                      </span>
                    </div>
                  </td>
                  <td>
                    <span>14</span>
                  </td>
                  <td>
                    <span>$1200</span>
                    <AiFillEdit size={20} color="#000000" />
                  </td>
                  <td>
                    <span>$200</span>
                    <AiFillEdit size={20} color="#000000" />
                  </td>
                  <td>
                    <spna>$1400 (Total price)</spna>
                  </td>
                  <td>
                    <span>Sep 21-Oct 10</span>
                  </td>
                  <td>
                    {expanded[index] ? (
                      <AiOutlineUp
                        size={15}
                        color="#000000"
                        onClick={() => toggleExpanded(index, false)}
                      />
                    ) : (
                      <AiOutlineDown
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
                          <AiOutlinePlus size={20} color="#7a73ff" />
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

                          {[1, 2].map((item, i) => {
                            return (
                              <tr key={i}>
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
                    {/*  */}
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LicenseCharges;
