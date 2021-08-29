import React from "react";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import RightImageBg from "../../../assets/Images/Onboarding/RectangleOnboadign.png";
import "./style.css";

const Payment = ({ paymentDrawer }) => {
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
                  <input type="radio" name="subscription-type" />
                  <label>Monthly</label>
                  <p>₹1244/per License per month</p>
                </div>

                <div className="col-6">
                  <input type="radio" name="subscription-type" />
                  <label>Annual</label>
                  <p>₹15,600/per license per year</p>
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
                <p>Total Charges (5 Licenses)</p>
                <p>₹6000</p>
              </div>
              <div>
                <p>Discount (15%)</p>
                <p>-₹1200</p>
              </div>
              <div>
                <p>Taxes (GST 15%)</p>
                <p>₹900</p>
              </div>
              <div className="total-amount">
                <p>Total Amount</p>
                <p>₹8,630</p>
              </div>
            </div>

            <button className="make-payment">make payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
