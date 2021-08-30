import React, { useState } from "react";
import downArrow from "../../../../../assets/Icons/downArrow.png";
import topArrow from "../../../../../assets/Icons/topArrow.png";
import Collapsible from "react-collapsible";
import { Table } from "react-bootstrap";
import "./style.css";

const Clients = () => {
  const [userList, setUserList] = useState([
    { name: "" },
    { name: "" },
    { name: "" },
  ]);
  const [collapse, setCollapse] = useState(userList);

  const openCloseCollapsible = (index) => {
    let list = [...collapse];
    console.log(list);
    if (collapse[index].open === false) {
      list &&
        list.map((item, key) => {
          if (key === index) {
            list[index].open = true;
          } else {
            list[key].open = false;
          }
        });
      setCollapse(list);
    } else {
      let list = [...collapse];
      list &&
        list.map((item, key) => {
          if (key === index) {
            list[index].open = false;
          } else {
            list[key].open = false;
          }
        });
      setCollapse(list);
    }

    console.log(collapse);
  };

  return (
    <>
      <div className="ER-task-container mt-0">
        <div className="ER-take-action">
          <div className="task-list-grid">
            <Table className="table">
              <thead>
                <tr>
                  <th>STATUS</th>
                  <th>TEAM MEMBER NAME</th>
                  <th>ROLES</th>
                  <th>PHONE NO</th>
                  <th>EMAIL ID</th>
                  <th>CLIENTS</th>
                  <th>LICENSES EXPERTISE</th>
                  <th></th>
                </tr>
              </thead>
              {userList.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr onClick={() => openCloseCollapsible(index)}>
                      <th>
                        <span class="check-box">
                          <label className="switch">
                            <input type="checkbox" value={true} />
                            <span className="slider"></span>
                          </label>
                        </span>
                      </th>
                      <td>
                        <div class="d-flex new-task-list">
                          <div class="circle-name d-none d-sm-block">
                            <div class="circle-text">RS</div>
                          </div>
                          <div class="circle-front-text d-none d-sm-block mail">
                            Rashika Singh
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            backgroundColor: "#f1f3ff",
                            fontSize: "10px",
                            margin: "2px",
                            padding: "2px",
                          }}
                        >
                          CONTENT MANAGER
                        </span>
                        <span
                          style={{
                            backgroundColor: "#f1f3ff",
                            fontSize: "10px",
                            margin: "2px",
                            padding: "2px",
                          }}
                        >
                          CONTENT MANAGER
                        </span>
                      </td>
                      <td>12345 12345</td>
                      <td>testuser123@gmail.com</td>
                      <td>
                        <div class="d-flex new-task-list">
                          <div
                            class="circle-name d-sm-block"
                            style={{
                              backgroundColor: "#000",
                              color: "#ffffff",
                              borderRadius: "50%",
                            }}
                          >
                            <div class="circle-text">SA</div>
                          </div>
                        </div>
                      </td>
                      <td>PFM, NSE, BSE...</td>
                      <td>
                        <img
                          className="float-right"
                          src={
                            collapse && collapse[index] && collapse[index].open
                              ? topArrow
                              : downArrow
                          }
                          alt="btn Arrow"
                        />
                      </td>
                    </tr>
                    {collapse && collapse[index] && collapse[index].open && (
                      <tr>
                        <td></td>
                        <td>
                          <div className="text-muted">Associated Clients</div>
                        </td>
                        <td></td>
                        <td>
                          <div>BK securities</div>
                          <div>BK securities</div>
                          <div>BK securities</div>
                        </td>
                        <td>
                          <div className="text-muted">Active From</div>
                          <div className="text-muted">Active From</div>
                          <div className="text-muted">Active From</div>
                        </td>
                        <td>
                          <div>May 03, 2021</div>
                          <div>May 03, 2021</div>
                          <div>May 03, 2021</div>
                        </td>
                        <td></td>
                        <td>
                          <span className="edit-btn">Edit</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                );
              })}
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
