import React, { useState, useEffect } from "react";
import "./style.css";
import { BiLeftArrowAlt } from "react-icons/bi";
import { GrRadialSelected, GrRadial } from "react-icons/gr";
import { IoMdPeople } from "react-icons/io";
import { isMobile } from "react-device-detect";
import closeBlack from "../../../assets/Icons/closeBlack.png";
import constants from "../../../CommonModules/sharedComponents/constants/constant";
function UpgradeYourAccount({
  handleClose,
  setUpgradeYourAccount,
  onAddLicenseLabelClick,
  isSliderCheck,
  flagCount,
  onSliderChange,
  setIsPaidMember,
}) {
  const [plansDetails, setPlansDetails] = useState(
    constants.MembershipDetails.plans
  );
  const [selectedPlan, setSelectedPlan] = useState(
    constants.MembershipDetails.plans.filter(
      (plan) => plan.isDefaultSelected === true
    )[0]
  );
  const [isPlanSliderCheck, setIsPlanSliderCheck] = useState(false);
  const onPlanSliderClick = () => {
    setIsPlanSliderCheck(!isPlanSliderCheck);
  };

  useEffect(() => {
    if (!isPlanSliderCheck) {
      setSelectedPlan(
        constants.MembershipDetails.plans.filter(
          (plan) => plan.name === "Monthly"
        )[0]
      );
    } else {
      setSelectedPlan(
        constants.MembershipDetails.plans.filter(
          (plan) => plan.name === "Annual"
        )[0]
      );
    }
  }, [isPlanSliderCheck]);
  return (
    <>
      <div className="upgrade-your-account">
        <div className="d-flex">
          <div className="col-10 col-sm-12 col-md-12 col-xl-12 pl-0">
            <div className="personal-mgt-title">
              <span
                className="arrow-left cursor-pointer"
                onClick={() => setUpgradeYourAccount(false)}
              >
                <BiLeftArrowAlt />
              </span>
              Upgrade Your Account
            </div>
          </div>
          <div className="col-2 col-sm-12 col-md-12 col-xl-12 d-block d-sm-none">
            <img
              className="close-icon-personal"
              src={closeBlack}
              alt="close Black"
              onClick={() => {
                handleClose(false);
              }}
            />
          </div>
        </div>
        <div class="border-header d-none d-sm-block"></div>
        <div className="scroll-sction">
          <div className="channel-div">
            <div className="row pl-0">
              <div className="col-12 plans-container d-flex justify-content-center mt-3">
                {/* {plansDetails.map((plan) => {
                  const { id, name, users, isRecommended } = plan;
                  return (
                    <div
                      className={`plan-container ${
                        selectedPlan.id === id
                          ? "plan-container-selected"
                          : "plan-container-unselected"
                      }`}
                      key={id}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      <span
                        className={`plan-state plan-item ${
                          selectedPlan.id === id ? "selected" : "unselected"
                        }`}
                      >
                        <GrRadialSelected />
                      </span>
                      <span
                        className={`plan-name plan-item ${
                          selectedPlan.id === id ? "selected" : "unselected"
                        }`}
                      >
                        {name}
                      </span>
                      <div
                        className={`plan-users plan-item d-inline ${
                          selectedPlan.id === id ? "selected" : "unselected"
                        }`}
                      >
                        <span className="icon-container">
                          <IoMdPeople />
                        </span>
                        <small>You get {users} users</small>
                      </div>
                      {isRecommended && selectedPlan.id === id && (
                        <span className="plan-recommended-tag">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                  );
                })} */}
                <div className="plans-toggle">
                  <h3 className="mb-0">Months</h3>
                  <div className="check-box-acc mx-3">
                    <label class="switch" id="licenses">
                      <input
                        htmlFor="licenses"
                        id="licenseSetting"
                        type="checkbox"
                        checked={isPlanSliderCheck}
                        onClick={() => onPlanSliderClick()}
                      />
                      <span class="plan-slider round"></span>
                    </label>
                  </div>
                  <h3 className="mb-0">Annual</h3>
                </div>
              </div>
              {/* Plans Container ends here */}
              <div className="col-12 payment-detail-plan mt-4">
                <div className="edit-container d-flex flex-column flex-md-row">
                  <h2 className="payment-type">Licences</h2>
                  <button
                    className="edit-button"
                    onClick={() => onAddLicenseLabelClick()}
                  >
                    Edit License
                  </button>
                </div>
                <h2 className="payment-trail">₹ 2000</h2>
              </div>
              <div className="col-12 payment-detail-plan">
                <h2 className="payment-type">Discount (5%)</h2>
                <h2 className="payment-trail">-₹ 1500</h2>
              </div>
              <div className="col-12 payment-detail-plan">
                <h2 className="payment-type">Taxes (GST 18%)</h2>
                <h2 className="payment-trail">₹ 5,123</h2>
              </div>
            </div>
          </div>
          <div className="col-12 payment-detail-plan mt-3">
            <div className="">
              <p className="highlighted mb-0">
                {selectedPlan.users} users{" "}
                <small className="unselected">
                  (You get {selectedPlan.users} free users)
                </small>
              </p>
              <button className="edit-button m-0">ADD USERS</button>
            </div>
            <h2 className="payment-trail green">Free</h2>
          </div>
          <div className="col-12 payment-detail-plan">
            <div className="acc-div">
              <div className="licences-toggle d-flex align-items-center">
                <p className="highlighted mb-0 d-inline d-md-block">
                  Enable Expert Review
                </p>
                <div className="check-box-acc mx-3 ">
                  <label class="switch" id="licenses">
                    <input
                      htmlFor="licenses"
                      id="licenseSetting"
                      type="checkbox"
                      checked={isSliderCheck}
                      onClick={() => onSliderChange()}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <button className="edit-button m-0">KNOW MORE</button>
            </div>
            <h2 className="payment-trail">
              {isSliderCheck ? "₹ 15,000" : "NA"}
            </h2>
          </div>
          <div class="border-header d-block mt-3 mb-0 mt-md-0"></div>
          <div className="col-12 payment-detail-plan my-3">
            <p className="highlighted mb-0">Total Amount</p>
            <h4>₹ 23,610</h4>
          </div>
          <div className="col-12 col-md-3 payment-detail plan mt-5 mt-md-0">
            <button
              className="upgrade-button w-100 text-center"
              onClick={() => setIsPaidMember(true)}
            >
              proceed to pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpgradeYourAccount;
