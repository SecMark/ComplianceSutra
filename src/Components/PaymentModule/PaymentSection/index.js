import React, { useState } from "react";
import AddUserModal from "../../../CommonModules/sharedComponents/Modal/AddUserModal";
import UpgradePlanModal from "../../../CommonModules/sharedComponents/Modal/UpgradePlanModal";
import CancelSubscriptionModal from "../../../CommonModules/sharedComponents/Modal/CancelSubsriptionModal";
import DeActivateAccountModal from "../../../CommonModules/sharedComponents/Modal/DeActivateAccountModal";

import "./style.css";

function PaymentSection({
  setIsShowEditLicense,
  setUpgradeYourPlan,
  isPaidMember,
  setIsPaidMember,
}) {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] =
    useState(false);
  const [isDeactivatedAccountModalOpen, setIsDeactivatedAccountModalOpen] =
    useState(false);

  const closeDeActivatedModal = () => {
    setIsDeactivatedAccountModalOpen(!isDeactivatedAccountModalOpen);
  };
  const closeAddUserModal = () => {
    setIsAddUserModalOpen(!isAddUserModalOpen);
  };

  const closeCancelSubscriptionModal = () => {
    setIsCancelSubscriptionModalOpen(!isCancelSubscriptionModalOpen);
  };

  return (
    <>
      {isAddUserModalOpen && <AddUserModal closeModal={closeAddUserModal} />}
      {isDeactivatedAccountModalOpen && (
        <DeActivateAccountModal closeModal={closeDeActivatedModal} />
      )}
      {isUpgradeModalOpen && (
        <UpgradePlanModal setUpgradeYourPlan={setUpgradeYourPlan} />
      )}

      {isCancelSubscriptionModalOpen && (
        <CancelSubscriptionModal
          closeModal={closeCancelSubscriptionModal}
          setIsPaidMember={setIsPaidMember}
        />
      )}

      <div className="payment-detail">
        <h2 className="payment-plan">Payment plan</h2>
      </div>

      <div className="payment-detail-plan">
        <h2 className="payment-type">No. of users</h2>
        <h2 className="payment-trail">5</h2>
      </div>
      <div className="payment-detail-plan">
        <h2 className="payment-type">Your Licenses</h2>
        <div className="edit-container">
          <button className="edit-button" onClick={setIsShowEditLicense}>
            Edit License
          </button>
          <h2 className="payment-trail">5</h2>
        </div>
      </div>

      <div className="payment-detail-plan">
        <h2 className="payment-type">Type of plan</h2>
        {isPaidMember ? (
          <div className="plans-toggle">
            <h3 className="payment-trail mb-0">Months</h3>
            <div className="check-box-acc mx-3">
              <label class="switch" id="licenses">
                <input
                  htmlFor="licenses"
                  id="licenseSetting"
                  type="checkbox"
                  checked={true}
                  // onClick={() => onPlanSliderClick()}
                />
                <span class="plan-slider round"></span>
              </label>
            </div>
            <h3 className="payment-trail mb-0">Annual</h3>
          </div>
        ) : (
          <h2 className="payment-trail">30 Days Free Trail</h2>
        )}
      </div>

      <div className="payment-detail-plan">
        <h2 className="payment-type">Trail ends</h2>
        <h2 className="payment-trail">24 July 2021</h2>
      </div>

      {!isPaidMember && (
        <button
          className="upgrade-button d-none d-md-block"
          onClick={() => setIsUpgradeModalOpen(!isUpgradeModalOpen)}
        >
          upgrade now
        </button>
      )}

      <div className="payment-detail-plan">
        {isPaidMember ? (
          <button
            className="cancel-subscription"
            onClick={() => setIsCancelSubscriptionModalOpen(true)}
          >
            Cancel Subscription
          </button>
        ) : (
          <button
            className="upgrade-button w-100 d-block d-md-none text-center"
            onClick={() => setIsUpgradeModalOpen(!isUpgradeModalOpen)}
          >
            upgrade now
          </button>
        )}
      </div>
      <div className="payment-detail-plan">
        <h2 className="payment-plan">Account Status</h2>
      </div>
      <div className="payment-detail-plan">
        <h2 className="payment-type">De-Activate account</h2>
        <button
          className="cancel-subscription"
          onClick={() => setIsDeactivatedAccountModalOpen(true)}
        >
          de-activate
        </button>
      </div>
    </>
  );
}

export default PaymentSection;
