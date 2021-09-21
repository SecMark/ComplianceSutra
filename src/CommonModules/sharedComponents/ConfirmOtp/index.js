import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../../apiServices";
import { toast } from "react-toastify";

function ConfirmOtp(props) {
  const [otpValid, setOtpInValid] = useState("");
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [showResendSection, setShowResendSection] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setShowResendSection(true);
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(45);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const resendOTP = () => {
    setShowResendSection(false);
    let payload = {
      phn: "",
      email: "email",
    };
    api
      .post("/api/sendmsgwithverificationcode", payload)
      .then(function (response) {
        // handle success
        if (response && response.data && response.data.statuscode === "200") {
          toast.success(
            "The OTP has been sent to your registered mobile number"
          );
        } else {
          toast.error("something went wrong please try again !!!");
        }
      })
      .catch(function (error) {});
    setSeconds(45);
  };

  return (
    <div className="confirm-otp-container mt-4">
      <h4>Enter OTP to Confirm Changes</h4>
      <span>sent to ravi.ramaiya@secmark.in</span>
      <input type="text" className="form-control" style={{ width: "300px" }} />

      {!showResendSection && (
        <p style={{ display: "flex" }} className="Resend-OTP-in">
          {" "}
          Resend OTP in:
          <span className="second">
            {minutes === 0 && seconds === 0 ? null : (
              <p style={{ fontStyle: "bold" }} className="count-text-sec">
                {" "}
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            )}
          </span>
        </p>
      )}
      {showResendSection && (
        <p>
          {" "}
          <span className="resend-text">
            <b>Didn't receive an OTP?</b>
          </span>
          <span onClick={() => resendOTP()} className="resend">
            RESEND
          </span>
        </p>
      )}
    </div>
  );
}

export default ConfirmOtp;
