import React from "react";
import mobileSteperIcon from "../../../../../../assets/Icons/mobileSteperIcon.png";
import "./style.css";
function CustomCard(props) {
  return (
    <div className="row">
      <div className="board-tab-design">
        <div className="risk-pink-grid">
          <div className="nse-label">NSE</div>
          <div className="w-100 d-flex pb-20">
            <div className="checkIcon">
              <img
                className="three-dot three-dot-small"
                src={mobileSteperIcon}
                alt="three Dots Icon"
              />
            </div>
            <div className="checkIconText">Uploading of Holding Statement</div>
          </div>
          <div className="w-100 d-flex">
            <div className="d-flex w-50">
              <div className="pjCircle">
                <span className="pjText">pj</span>
              </div>
              <div className="circle-flex-text">Priyal Jain</div>
            </div>
            <div className="w-50">
              <span className="red-day">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CustomCard;
