import React from "react";
import { AiFillCheckCircle, AiOutlineInfo } from "react-icons/ai";
import closeIconGray from "../../../../assets/Icons/closeIconGray.png";
import "./style.css";

function UpgradePlanModal({ setUpgradeYourPlan, setIsUpgradeModalOpen }) {
  return (
    <div className="modal-upgrade-container">
      <div className="modal-upgrade-main">
        <div className="modal-upgrade-content">
          <div className="modal--upgrade-body-container">
            <div className="upgrade-header">
              <h3>Your trial has ended</h3>
              <button
                className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5"
                type="button"
                onClick={() => setIsUpgradeModalOpen(false)}
              >
                <img src={closeIconGray} alt="close Icon" />
              </button>
            </div>
            <div className="upgrade-benefits">
              <h3>Upgrade now to get following benefits!</h3>
            </div>
          </div>
          <div className="add-multiple-users">
            <AiFillCheckCircle />
            <p>Add multiple number of users</p>
          </div>
          <div className="add-multiple-users">
            <AiFillCheckCircle />
            <p>Expert review service</p>
          </div>
          <div className="add-multiple-users">
            <AiFillCheckCircle />
            <p>Flexible payment options. Cancel anytime</p>
          </div>
          <div className="add-multiple-users">
            <AiFillCheckCircle />
            <p>Cancel anytime</p>
          </div>
          <div class="upgrade-button-container">
            <button
              className="upgrade-now-button"
              onClick={() => setUpgradeYourPlan(true)}
            >
              Upgrade now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradePlanModal;
