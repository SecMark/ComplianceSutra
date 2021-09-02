import React, { useState } from "react";
import "./style.css";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

const StatusList = () => {
  const [collapse1, setCollapse1] = useState(true);
  const [collapse2, setCollapse2] = useState(true);

  return (
    <>
      <div className="ER-task-container mt-0">
        <div className="ER-take-action">
          <div className="">
            <div className="upcoming-btn">
              <div
                className="upcoming-title"
                onClick={() => setCollapse1(!collapse1)}
              >
                Active Users
                <span className="black-circle">
                  <p className="black-circle-text">1</p>
                </span>
                {collapse1 ? (
                  <AiOutlineDown size={18} color="#000000" className="ml-2" />
                ) : (
                  <AiOutlineUp size={18} color="#000000" className="ml-2" />
                )}
              </div>
            </div>
            {collapse1 &&
              [1, 2, 3].map((item, index) => {
                return (
                  <div className="ER-task-detail" key={index}>
                    <span>
                      <div class="d-flex new-task-list">
                        <span class="check-box">
                          <label className="switch ml-2 mt-2">
                            <input type="checkbox" checked={true} />
                            <span className="slider"></span>
                          </label>
                        </span>
                        <button className="code">ACTIVE</button>
                      </div>
                    </span>
                    <span className="company-name">
                      <div class="d-flex new-task-list">
                        <div class="circle-name d-none d-sm-block">
                          <div class="circle-text">RS</div>
                        </div>
                        <div class="circle-front-text d-none d-sm-block mail">
                          Rashika Singh
                        </div>
                      </div>
                    </span>
                    <span className="d flex">
                      <span className="user-role">Expert Reviewer</span>
                    </span>
                    <div className="detail-name">
                      <span className="user-name">testuser@gmail.com</span>
                    </div>
                    <div className="detail-name">
                      <span className="user-name">12345 12345</span>
                    </div>
                    <div className="date" style={{ width: "80px" }}>
                      <div class="circle-name d-sm-block client-circle">
                        <div class="circle-text">1</div>
                      </div>
                    </div>
                    <div
                      className="date"
                      style={{ width: "100px", textAlign: "center" }}
                    >
                      <span>lMP, JPT, XSY</span>
                    </div>
                    <div>
                      <AiOutlineDown size={18} color="#000000" />
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <div className="ER-view-all-conatiner">
              <span>View All (3 More)</span>
              <AiOutlineDown size={18} color="#000000" className="ml-2" />
            </div> */}
        </div>

        <div className="ER-take-action">
          <div className="">
            <div className="upcoming-btn">
              <div
                className="upcoming-title"
                onClick={() => setCollapse2(!collapse2)}
              >
                Inactive Users
                <span className="black-circle">
                  <p className="black-circle-text">10</p>
                </span>
                {collapse2 ? (
                  <AiOutlineDown size={18} color="#000000" className="ml-2" />
                ) : (
                  <AiOutlineUp size={18} color="#000000" className="ml-2" />
                )}
              </div>
            </div>

            {collapse2 &&
              [1, 2].map((item, index) => {
                return (
                  <div className="ER-task-detail" key={index}>
                    <span>
                      <div class="d-flex new-task-list">
                        <span class="check-box">
                          <label className="switch ml-2 mt-2">
                            <input type="checkbox" checked={false} />
                            <span className="slider"></span>
                          </label>
                        </span>
                        <button className="code">ACTIVE</button>
                      </div>
                    </span>
                    <span className="company-name">
                      <div class="d-flex new-task-list">
                        <div class="circle-name d-none d-sm-block">
                          <div class="circle-text">RS</div>
                        </div>
                        <div class="circle-front-text d-none d-sm-block mail">
                          Rashika Singh
                        </div>
                      </div>
                    </span>
                    <span className="d-flex">
                      <span className="user-role">License manager</span>
                    </span>
                    <div className="detail-name">
                      <span className="user-name">testuser@gmail.com</span>
                    </div>
                    <div className="detail-name">
                      <span className="user-name">12345 12345</span>
                    </div>
                    <div className="date" style={{ width: "80px" }}></div>
                    <div
                      className="date"
                      style={{ width: "100px", textAlign: "center" }}
                    >
                      -
                    </div>
                    <span>
                      <AiOutlineDown size={18} color="#000000" />
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusList;
