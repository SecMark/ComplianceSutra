import React, { useState } from "react";
import AddUserModal from "../../../CommonModules/sharedComponents/Modal/AddUserModal";
import UpgradePlanModal from "../../../CommonModules/sharedComponents/Modal/UpgradePlanModal";
import CancelSubscriptionModal from "../../../CommonModules/sharedComponents/Modal/CancelSubsriptionModal";

import "./style.css";

function PaymentSection({ openLicenseDrawer }) {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] =
    useState(false);

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(!isAddUserModalOpen);
  };

  const closeCancelSubscriptionModal = () => {
    setIsCancelSubscriptionModalOpen(!isCancelSubscriptionModalOpen);
  };

  return (
    <>
      {isAddUserModalOpen && <AddUserModal closeModal={closeAddUserModal} />}

      {isUpgradeModalOpen && <UpgradePlanModal />}

      {isCancelSubscriptionModalOpen && (
        <CancelSubscriptionModal closeModal={closeCancelSubscriptionModal} />
      )}

      <div className="col-md-10 col-sm-10 payment-detail">
        <h2 className="payment-plan">Payment plan</h2>
        <button
          className="upgrade-button"
          onClick={() => setIsUpgradeModalOpen(!isUpgradeModalOpen)}
        >
          upgrade now
        </button>
      </div>
      <div className="col-md-10 col-sm-6 payment-detail-plan">
        <h2 className="payment-type">Type of plan</h2>
        <h2 className="payment-trail">30 Days Free Trail</h2>
      </div>
      <div className="col-md-10 col-sm-10 payment-detail-plan">
        <h2 className="payment-type">Trail ends</h2>
        <h2 className="payment-trail">24 July 2021</h2>
      </div>
      <div className="col-md-10 col-sm-10 payment-detail-plan">
        <h2 className="payment-type">No. of users</h2>
        <div className="add-user-container">
          <button
            className="add-users-button"
            onClick={() => setIsAddUserModalOpen(true)}
          >
            Add Users
          </button>
          <h2 className="payment-trail">5</h2>
        </div>
      </div>
      <div className="col-10 payment-detail-plan">
        <h2 className="payment-type">Your Licenses</h2>
        <div className="edit-container">
          <button className="edit-button" onClick={() => openLicenseDrawer()}>
            Edit License
          </button>
          <h2 className="payment-trail">5</h2>
        </div>
      </div>
      <div className="col-10 payment-detail-plan">
        <h2 className="payment-type">Payment Method</h2>
        <div className="edit-container">
          <button className="edit-button">Change</button>
          <h2 className="payment-trail">**** **** 9999</h2>
        </div>
      </div>
    </>
  );
}

export default PaymentSection;
