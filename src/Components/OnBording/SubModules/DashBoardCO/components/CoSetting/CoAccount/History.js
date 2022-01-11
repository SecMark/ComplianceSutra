import React from "react";
import "./style.css";
import { FaRegClock } from "react-icons/fa";

const HistoryList = () => {
  return (
    <>
      <h3>History</h3>
      <div className="d-flex history mt-4">
        <table className="license-table">
          <thead>
            <th>License</th>
            <th align="center">Type of plan</th>
            <th align="center">No of Users</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Fees</th>
            <th>Renew Plan</th>
          </thead>
          <tbody className="mt-5">
            <tr>
              <td>
                MICX <span style={{ color: "#7A73FF" }}>(10+)</span>
              </td>
              <td align="center">Monthly</td>
              <td align="center">15</td>
              <td> 1Aug, 2021</td>
              <td> 24thAug, 2021</td>
              <td>12,000</td>
              <td align="center">
                <div
                  style={{
                    backgroundColor: "#7A73FF",
                    width: "25px",
                    height: "25px",
                    borderRadius: "6px",
                  }}
                >
                  <FaRegClock color="#fff" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                MICX <span style={{ color: "#7A73FF" }}>(10+)</span>
              </td>
              <td align="center">Monthly</td>
              <td align="center">15</td>
              <td> 1Aug, 2021</td>
              <td> 24thAug, 2021</td>
              <td>12,000</td>
              <td align="center">
                <div
                  style={{
                    backgroundColor: "#7A73FF",
                    width: "25px",
                    height: "25px",
                    borderRadius: "6px",
                  }}
                >
                  <FaRegClock color="#fff" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                MICX <span style={{ color: "#7A73FF" }}>(10+)</span>
              </td>
              <td align="center">Monthly</td>
              <td align="center">15</td>
              <td> 1Aug, 2021</td>
              <td> 24thAug, 2021</td>
              <td>12,000</td>
              <td align="center">
                <div
                  style={{
                    backgroundColor: "#7A73FF",
                    width: "25px",
                    height: "25px",
                    borderRadius: "6px",
                  }}
                >
                  <FaRegClock color="#fff" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                MICX <span style={{ color: "#7A73FF" }}>(10+)</span>
              </td>
              <td align="center">Monthly</td>
              <td align="center">15</td>
              <td> 1Aug, 2021</td>
              <td> 24thAug, 2021</td>
              <td>12,000</td>
              <td align="center">
                <div
                  style={{
                    backgroundColor: "#7A73FF",
                    width: "25px",
                    height: "25px",
                    borderRadius: "6px",
                  }}
                >
                  <FaRegClock color="#fff" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                MICX <span style={{ color: "#7A73FF" }}>(10+)</span>
              </td>
              <td align="center">Monthly</td>
              <td align="center">15</td>
              <td> 1Aug, 2021</td>
              <td> 24thAug, 2021</td>
              <td>12,000</td>
              <td align="center">
                <div
                  style={{
                    backgroundColor: "#7A73FF",
                    width: "25px",
                    height: "25px",
                    borderRadius: "6px",
                  }}
                >
                  <FaRegClock color="#fff" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                MICX <span style={{ color: "#7A73FF" }}>(10+)</span>
              </td>
              <td align="center">Monthly</td>
              <td align="center">15</td>
              <td> 1Aug, 2021</td>
              <td> 24thAug, 2021</td>
              <td>12,000</td>
              <td align="center">
                <div
                  style={{
                    backgroundColor: "#7A73FF",
                    width: "25px",
                    height: "25px",
                    borderRadius: "6px",
                  }}
                >
                  <FaRegClock color="#fff" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                MICX <span style={{ color: "#7A73FF" }}>(10+)</span>
              </td>
              <td align="center">Monthly</td>
              <td align="center"> 15</td>
              <td> 1Aug, 2021</td>
              <td> 24thAug, 2021</td>
              <td>12,000</td>
              <td align="center">
                <div
                  style={{
                    backgroundColor: "#7A73FF",
                    width: "25px",
                    height: "25px",
                    borderRadius: "6px",
                  }}
                >
                  <FaRegClock color="#fff" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistoryList;
