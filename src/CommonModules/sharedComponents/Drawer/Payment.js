import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import RightImageBg from "../../../assets/Images/Onboarding/RectangleOnboadign.png";
import {
  makePayment,
  setPlan,
} from "../../../Components/ExpertReviewModule/Redux/actions";
import "./style.css";

const Payment = ({ paymentDrawer, isMainPayment }) => {
  const state = useSelector((state) => state);

  const [choosedPlan, setChoosedPlans] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setChoosedPlans({});
    const paymentDetail = state?.PaymentReducer?.paymentDetail;
    const filterPlan = paymentDetail.filter((plan) => plan.Plans === "Monthly");
    setChoosedPlans(filterPlan[0]);
  }, [state?.PaymentReducer?.paymentDetail]);

  const choosePlan = (planType) => {
    const paymentDetail = state?.PaymentReducer?.paymentDetail;
    const filterPlan = paymentDetail.filter((plan) => planType === plan.Plans);
    setChoosedPlans(filterPlan[0]);
  };

  const createPayment = () => {
    const paymentPayload = {
      flag: 2,
      cntrolid: choosedPlan.cntrlid,
      plan: choosedPlan.Plans === "Monthly" ? 0 : 1,
    };

    isMainPayment
      ? dispatch(setPlan(choosedPlan))
      : dispatch(makePayment(paymentPayload));

    isMainPayment ? paymentDrawer() : history.push("/thankyou");
  };

  // useEffect(() => {
  //   if (state?.PaymentReducer?.isPaymentDone) {
  //     history.push("/thankyou");
  //   }
  // }, [state?.PaymentReducer?.isPaymentDone]);

  return (
    <>
      <div className="get-main">
        <div className="pl-0 pr-0">
          <div className="col-12 padding-right d-block d-sm-none">
            <img
              className="bottom-right-bg-drower1"
              src={RightImageBg}
              alt="RightImageBg"
            />
          </div>
          <div className="choose-licenses">
            <div className="choose-licenses-title">
              <div className="d-flex">
                <div className="col-6 pl-0">
                  <img
                    className="closeIcon"
                    src={closeIcon}
                    alt="closeIcon"
                    onClick={paymentDrawer}
                  />
                </div>
              </div>
              <p className="licenses-title"> Confirm & Make Payment</p>
              <div className="row subscription-option">
                <div className="col-6">
                  <input
                    type="radio"
                    name="subscription-type"
                    checked
                    value="Monthly"
                    onClick={(e) => choosePlan(e.target.value)}
                  />
                  <label>Monthly</label>
                  {/* <p>₹6,000/per License per month</p> */}
                </div>

                <div className="col-6">
                  <input
                    type="radio"
                    name="subscription-type"
                    onClick={(e) => choosePlan(e.target.value)}
                    value="Yearly"
                  />
                  <label>Annual</label>
                  {/* <p>₹15,600/per license per year</p> */}
                </div>
              </div>
            </div>
            <div className="subsription-price-details">
              <h4>Details</h4>
              <div>
                <p>Subscription active till</p>
                <p>August 21, 2021</p>
              </div>
              <div>
                <p>Total Charges ({choosedPlan?.liccnt} Licenses)</p>
                <p>₹{choosedPlan?.Amount}</p>
              </div>
              <div>
                <p>Discount ({choosedPlan?.Discamt}%)</p>
                <p>{choosedPlan?.Discamt == 0 ? "0" : choosedPlan?.Discamt}</p>
              </div>
              <div>
                <p>Taxes (GST 15%)</p>
                <p>₹{choosedPlan?.TaxAmt}</p>
              </div>
              <div className="total-amount">
                <p>Total Amount</p>
                <p>₹{choosedPlan?.TotalAmt}</p>
              </div>
            </div>

            <button className="make-payment" onClick={createPayment}>
              {isMainPayment ? "next" : "make payment"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
