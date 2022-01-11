import React, { useState, useEffect } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import closeBlack from "../../../assets/Icons/closeBlack.png";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import AddUserModal from "../../../CommonModules/sharedComponents/Modal/AddUserModal";
import {
  clearLicense,
  getPayment,
  mainSelectedLicense,
  makePayment,
} from "../../ExpertReviewModule/Redux/actions";
import { actions as coActions } from "../../../Components/OnBording/SubModules/DashBoardCO/redux/actions";

import "./style.css";
import { useHistory } from "react-router";

import { MdPermContactCalendar } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";

const UpgradeYourAccount = ({
  handleClose,
  setUpgradeYourAccount,
  isSliderCheck,
  onSliderChange,
  setIsUpgradeYourAccountOpen,
  isUpgradeYourAccountOpen,
  isShowEditLicense,
  setIsShowEditLicense,
  setIsMainPayment,
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isPlanSliderCheck, setIsPlanSliderCheck] = useState(false);
  const [choosedPlan, setChoosedPlans] = useState({});
  const loggedUser =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo;
  const [addUser, setAddUser] = useState(false);
  const [addUserCount, setAddUserCount] = useState(0);

  const [activePlan, setActivePlan] = useState("monthly");

  const totalAmount = state?.PaymentReducer?.expertReviewLicenseDetail?.plan;
  const history = useHistory();

  useEffect(() => {
    getLicenseDetail();
  }, [state.taskReport.coAccountLicenses.coLicenses]);

  useEffect(() => {
    const selectedLicense =
      state?.PaymentReducer?.mainPaymentLicenseDetail?.selectedLicense;

    setChoosedPlans({});
    const paymentDetail = state?.PaymentReducer?.paymentDetail;
    const filterPlan = paymentDetail.filter((plan) => plan.Plans === "Monthly");
    setChoosedPlans(filterPlan[0]);

    const payload = {
      flag: 1,
      pmtArray: JSON.stringify(selectedLicense),
    };
    dispatch(getPayment(payload));
  }, [state?.PaymentReducer?.mainPaymentLicenseDetail?.selectedLicense]);

  useEffect(() => {
    setChoosedPlans({});
    if (isPlanSliderCheck) {
      const paymentDetail = state?.PaymentReducer?.paymentDetail;
      const filterPlan = paymentDetail.filter(
        (plan) => plan.Plans === "Yearly"
      );
      setChoosedPlans(filterPlan[0]);
    } else {
      const paymentDetail = state?.PaymentReducer?.paymentDetail;
      const filterPlan = paymentDetail.filter(
        (plan) => plan.Plans === "Monthly"
      );
      setChoosedPlans(filterPlan[0]);
    }
  }, [isPlanSliderCheck]);

  const getLicenseDetail = () => {
    setChoosedPlans({});
    const paymentDetail = state?.PaymentReducer?.paymentDetail;
    const filterPlan = paymentDetail.filter((plan) => plan.Plans === "Monthly");
    setChoosedPlans(filterPlan[0]);
  };

  const onPlanSliderClick = () => {
    setIsPlanSliderCheck(!isPlanSliderCheck);
  };

  const setStatus = () => {
    setUpgradeYourAccount(false);
    setIsMainPayment(false);
  };

  const proceedPayment = () => {
    history.push("/thankyou");
  };

  return (
    <>
      <div className="upgrade-your-account">
        {addUser && (
          <AddUserModal
            setAddUser={setAddUser}
            setAddUserCount={setAddUserCount}
          />
        )}
        <div className="d-flex">
          <div className="col-10 col-sm-12 col-md-12 col-xl-12 pl-0">
            <div className="personal-mgt-title">
              <span
                className="arrow-left cursor-pointer"
                onClick={() =>
                  setIsUpgradeYourAccountOpen(!isUpgradeYourAccountOpen)
                }
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
        <div className="d-flex justify-content-center">
          <div className="payment-option">
            {" "}
            <button
              className={`${activePlan === "monthly" ? "active" : "deactive"}`}
              onClick={() => setActivePlan("monthly")}
            >
              Monthly
            </button>
            <button
              className={`${activePlan === "annual" ? "active" : "deactive"}`}
              onClick={() => setActivePlan("annual")}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="col-md-10 scroll-section pr-5">
            <div>
              <div className="channel-div">
                <div className="row pl-0">
                  <div className="col-12 plans-container d-flex justify-content-center"></div>
                </div>

                <div className="payment-total mt-3 d-flex">
                  <div className="col-6 col-md-6 d-flex justify-content-between">
                    <div className="know-more">
                      <p className="p-0 m-0">Enable Expert Review</p>
                      <span>Know more</span>
                    </div>

                    <div className="mt-2 ml-1">
                      <label class="switch" id="licenses">
                        <input
                          htmlFor="licenses"
                          id="licenseSetting"
                          type="checkbox"
                          checked={isSliderCheck ? true : false}
                          onClick={() => onSliderChange()}
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div className="col-6 col-md-6 d-flex justify-content-between">
                    <div style={{ borderRight: "2px solid #E2E2E2" }}></div>
                    <div className="know-more">
                      <p className="p-0 m-0">User Access</p>
                      <span className="p-0 m-0">Know more</span>
                    </div>

                    <div>
                      <span>10 Users</span>
                      <MdPermContactCalendar color="#7a73ff" fontSize={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="payment-total">
                <div className="payment-detail-plan mt-4">
                  <div className="edit-container d-flex flex-column flex-md-row">
                    <h2 className="payment-type">Licences</h2>

                    <AiTwotoneEdit
                      className="mt-1 ml-3 edit-icon"
                      onClick={() => {
                        setIsShowEditLicense(!isShowEditLicense);
                      }}
                      color="#7a73ff"
                      title="Edit License"
                    />
                  </div>
                  <h2 className="payment-trail">₹ {choosedPlan?.TotalAmt}</h2>
                </div>
                <div className="payment-detail-plan">
                  <h2 className="payment-type">
                    Discount ({choosedPlan?.Discamt}%)
                  </h2>
                  <h2 className="payment-trail">
                    ₹ {choosedPlan?.Discamt == 0 ? "0" : choosedPlan?.Discamt}
                  </h2>
                </div>
                <div className="payment-detail-plan">
                  <h2 className="payment-type">Taxes (GST 15%)</h2>
                  <h2 className="payment-trail">₹ {choosedPlan?.TaxAmt}</h2>
                </div>
                <div className="payment-detail-plan">
                  <div className="">
                    <p className="highlighted mb-0">
                      {addUserCount === 0 ? "Free" : addUserCount} Users{" "}
                      <small className="unselected">
                        (You get 5 free users)
                      </small>
                    </p>
                    {/* <button
                    className="edit-button m-0"
                    onClick={() => setAddUser(true)}
                  >
                    ADD USERS
                  </button> */}
                  </div>
                  <h2 className="payment-trail green">
                    {addUserCount === 0 ? "Free" : `₹${addUserCount * 1000}`}
                  </h2>
                </div>
                <div className="payment-detail-plan mb-2">
                  <div className="acc-div">
                    <div className="licences-toggle d-flex align-items-center">
                      <p className="highlighted mb-0 d-inline d-md-block">
                        Expert Review
                      </p>
                    </div>
                    {/* <button className="edit-button m-0">KNOW MORE</button> */}
                  </div>
                  <h2 className="payment-trail">
                    {isSliderCheck ? totalAmount?.TotalAmt : "N/A"}
                  </h2>
                </div>

                <div
                  className="payment-detail-plan"
                  style={{ borderBottom: "0.5px dashed #B3ABC4" }}
                ></div>

                <div
                  className="payment-detail-plan mt-2"
                  style={{ borderBottom: "2px solid dashed" }}
                >
                  <p className="highlighted mb-0">Total Amount</p>
                  <h4>
                    ₹{" "}
                    {parseInt(
                      totalAmount?.TotalAmt ? totalAmount?.TotalAmt : 0
                    ) +
                      parseInt(
                        choosedPlan?.TotalAmt ? choosedPlan?.TotalAmt : 0
                      ) +
                      parseInt(choosedPlan?.TaxAmt ? choosedPlan?.TaxAmt : 0) +
                      parseInt(addUserCount * 1000)}
                  </h4>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <button
                className="upgrade-button "
                onClick={() => proceedPayment()}
              >
                proceed to payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradeYourAccount;
