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
const UpgradeYourAccount = ({
  handleClose,
  setUpgradeYourAccount,
  isSliderCheck,
  onSliderChange,
  setIsPaidMember,
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
    // const mainLicense =
    //   state?.PaymentReducer?.mainPaymentLicenseDetail?.selectedLicense;
    // const expertLicense =
    //   state?.PaymentReducer?.expertReviewLicenseDetail?.selectedLicense;
    // // console.log([...mainLicense, ...expertLicense]);
    // const paymentPayload = {
    //   flag: 2,
    //   cntrolid: choosedPlan.cntrlid,
    //   plan: choosedPlan.Plans === "Monthly" ? 0 : 1,
    // };
    // dispatch(makePayment(paymentPayload));
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
              <span className="arrow-left cursor-pointer" onClick={setStatus}>
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
        <div className="scroll-section pr-5">
          <div className="channel-div">
            <div className="row pl-0">
              <div className="col-12 plans-container d-flex justify-content-center">
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

              <div className="col-12 payment-detail-plan mt-4">
                <div className="edit-container d-flex flex-column flex-md-row">
                  <h2 className="payment-type">Licences</h2>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setIsShowEditLicense(!isShowEditLicense);
                    }}
                  >
                    Edit License
                  </button>
                </div>
                <h2 className="payment-trail">₹ {choosedPlan?.TotalAmt}</h2>
              </div>
              <div className="col-12 payment-detail-plan">
                <h2 className="payment-type">
                  Discount ({choosedPlan?.Discamt}%)
                </h2>
                <h2 className="payment-trail">
                  ₹ {choosedPlan?.Discamt == 0 ? "0" : choosedPlan?.Discamt}
                </h2>
              </div>
              <div className="col-12 payment-detail-plan">
                <h2 className="payment-type">Taxes (GST 15%)</h2>
                <h2 className="payment-trail">₹ {choosedPlan?.TaxAmt}</h2>
              </div>
            </div>
          </div>
          <div className="payment-detail-plan">
            <div className="">
              <p className="highlighted mb-0">
                {addUserCount === 0 ? "Free" : addUserCount} Users{" "}
                <small className="unselected">(You get 5 free users)</small>
              </p>
              <button
                className="edit-button m-0"
                onClick={() => setAddUser(true)}
              >
                ADD USERS
              </button>
            </div>
            <h2 className="payment-trail green">
              {addUserCount === 0 ? "Free" : `₹${addUserCount * 1000}`}
            </h2>
          </div>
          <div className="payment-detail-plan">
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
                      checked={isSliderCheck ? true : false}
                      onClick={() => onSliderChange()}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <button className="edit-button m-0">KNOW MORE</button>
            </div>
            <h2 className="payment-trail">
              {isSliderCheck ? totalAmount?.TotalAmt : "N/A"}
            </h2>
          </div>
          <div class="border-header d-block mb-0 mt-md-0"></div>
          <div className="payment-detail-plan my-3">
            <p className="highlighted mb-0">Total Amount</p>
            <h4>
              ₹{" "}
              {parseInt(totalAmount?.TotalAmt ? totalAmount?.TotalAmt : 0) +
                parseInt(choosedPlan?.TotalAmt ? choosedPlan?.TotalAmt : 0) +
                parseInt(choosedPlan?.TaxAmt ? choosedPlan?.TaxAmt : 0) +
                parseInt(addUserCount * 1000)}
            </h4>
          </div>
          <div className="col-12 col-md-3 payment-detail plan mt-5 mt-md-0">
            <button
              className="upgrade-button w-100 text-center"
              onClick={() => proceedPayment()}
            >
              proceed to pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradeYourAccount;
