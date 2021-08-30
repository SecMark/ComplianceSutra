import React from "react";
import viewall from "../../../../../assets/ERIcons/viewall.png";
import downArrow from "../../../../../assets/Icons/downArrow.png";

const UserRoleList = () => {
  return (
    <>
      <div className="ER-task-container mt-0">
        <div className="ER-take-action">
          <div className="task-list-grid">
            <div className="upcoming-btn">
              <div className="upcoming-title">
                Super Admin
                <span className="black-circle">
                  <p className="black-circle-text">1</p>
                </span>
                <img src={downArrow} className="arrowDown" alt="Arrow down" />
              </div>
            </div>
            <div className="ER-task-detail">
              <button className="code">ACTIVE</button>
              <span className="company-name">
                <div class="d-flex new-task-list">
                  <div class="circle-name d-none d-sm-block">
                    <div class="circle-text">RS</div>
                  </div>
                  <div class="circle-front-text d-none d-sm-block mail">
                    Rashika Singh
                  </div>
                </div>{" "}
              </span>
              <div className="detail-name">
                <span className="user-name">testuser@gmail.com</span>
              </div>
              <div className="detail-name">
                <span className="user-name">12345 12345</span>
              </div>
              <div className="date" style={{ width: "80px" }} />
              <div className="date" style={{ width: "100px" }} />
              <div>
                <img src={downArrow} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="ER-take-action">
          <div className="task-list-grid">
            <div className="upcoming-btn">
              <div className="upcoming-title">
                Expert Reviewer
                <span className="black-circle">
                  <p className="black-circle-text">10</p>
                </span>
                <img src={downArrow} className="arrowDown" alt="Arrow down" />
              </div>
            </div>
            <div className="ER-task-detail">
              <button className="code">ACTIVE</button>
              <span className="company-name">
                <div class="d-flex new-task-list">
                  <div class="circle-name d-none d-sm-block">
                    <div class="circle-text">RS</div>
                  </div>
                  <div class="circle-front-text d-none d-sm-block mail">
                    Rashika Singh
                  </div>
                </div>{" "}
              </span>
              <div className="detail-name">
                <span className="user-name">testuser@gmail.com</span>
              </div>
              <div className="detail-name">
                <span className="user-name">12345 12345</span>
              </div>
              <div className="date" style={{ width: "80px" }}>
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
              <div className="date" style={{ width: "100px" }}>
                <span>lMP, JPT, XSY</span>
              </div>
              <span>
                <img src={downArrow} alt="" />
              </span>
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
                Expert Reviewer
                <span className="black-circle">
                  <p className="black-circle-text">1</p>
                </span>
                <img src={downArrow} className="arrowDown" alt="Arrow down" />
              </div>
            </div>
            <div className="ER-task-detail">
              <button className="code">ACTIVE</button>
              <span className="company-name">
                <div class="d-flex new-task-list">
                  <div class="circle-name d-none d-sm-block">
                    <div class="circle-text">RS</div>
                  </div>
                  <div class="circle-front-text d-none d-sm-block mail">
                    Rashika Singh
                  </div>
                </div>{" "}
              </span>
              <div className="detail-name">
                <span className="user-name">testuser@gmail.com</span>
              </div>
              <div className="detail-name">
                <span className="user-name">12345 12345</span>
              </div>
              <div className="date" style={{ width: "80px" }}>
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
              <div className="date" style={{ width: "100px" }}>
                <span>ABC, ABC</span>
              </div>
              <span>
                <img src={downArrow} alt="" />
              </span>
            </div>
          </div>
        </div>

        <div className="ER-take-action">
          <div className="task-list-grid">
            <div className="upcoming-btn">
              <div className="upcoming-title">
                License Management
                <span className="black-circle">
                  <p className="black-circle-text">1</p>
                </span>
                <img src={downArrow} className="arrowDown" alt="Arrow down" />
              </div>
            </div>
            <div className="ER-task-detail">
              <button className="code">ACTIVE</button>
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
              <div className="detail-name">
                <span className="user-name">testuser@gmail.com</span>
              </div>
              <div className="detail-name">
                <span className="user-name">12345 12345</span>
              </div>
              <div className="date" style={{ width: "80px" }} />
              <div className="date" style={{ width: "100px" }} />
              <span>
                <img src={downArrow} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRoleList;
