import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import leftTopCorner from "../../../assets/Images/Compliancedemo/left-top-corner.png";
import Calendar from "../../../assets/Images/Compliancedemo/calnderLast.png";
import { useDispatch, useSelector } from "react-redux";
import { actions as emailActions } from "../../OnBording/redux/actions";
import Leaderboard from "../../../assets/Images/Compliancedemo/leaderboard.png";
import Teamperformance from "../../../assets/Images/Compliancedemo/team-performance.png";
import BackDrop from "../../../CommonModules/sharedComponents/Loader/BackDrop";
import { toast } from "react-toastify";
import DemoEnd from "../DemoNav";
import { isEmail } from "./utils";
import axiosInstance from "../../../apiServices";

function ComplianceDemo7() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [inputBorder, setInputBorder] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [show, setShow] = useState(false);
  const [checkBoxState, setCheckBoxState] = useState(false);
  const [values, setValues] = useState({
    loginID: "",
    loginty: "AdminEmail",
  });

  let emailAlreadExist =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.emailAlreadExist;
  let isLoading =
    state && state?.complianceOfficer && state?.complianceOfficer.loader;
  useEffect(() => {
    dispatch(emailActions.setLoader(false));
  }, []);
  useEffect(() => {
    console.log({ emailAlreadExist, isEmail: isEmail(values.loginID) });
    if (isEmail(values.loginID))
      if (
        emailAlreadExist === false &&
        emailAlreadExist !== "" &&
        isEmail(values.loginID)
      ) {
        setIsEmailExist(false);
      } else if (
        emailAlreadExist === true &&
        emailAlreadExist !== "" &&
        isEmail(values.loginID)
      ) {
        setIsEmailExist(true);
      }
  }, [emailAlreadExist, values.loginID]);

  const onChangeHandler = (name) => (event) => {
    if (name === "loginID" && isEmail(event.target.value)) {
      axiosInstance
        .post("compliance.api.avabilityCheck", { email: event.target.value })
        .then((response) => {
          if (
            response &&
            response.data &&
            response.data.message &&
            response.data.message.status === true
          ) {
            dispatch(
              emailActions.verifyEmailRequestFailed({
                verifyEmail: false,
                emailAlreadyExistMessage: true,
                email: event.target.value,
              })
            );
          } else if (
            response &&
            response.data &&
            response.data.message &&
            response.data.message.status === false
          ) {
            dispatch(
              emailActions.verifyEmailRequestFailed({
                verifyEmail: false,
                emailAlreadyExistMessage: false,
                email: event.target.value,
              })
            );
          }
        });
    } else if (name === "loginID" && !isEmail(event.target.value)) {
      setIsEmailExist(false);
    }
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = () => {
    setIsValidate(true);
    if (!isEmail(values.loginID) || values.loginID === "") {
      return;
    }
    setIsValidate(false);
    setIsEmailExist(false);
    if (checkBoxState === true) {
      dispatch(
        emailActions.verifyEmailRequest({
          email: values.loginID,
        })
      );
      dispatch(emailActions.setLoader(true));
      setTimeout(() => {
        let status = state.complianceOfficer.isVerifiedEmail;
      }, [100]);
    } else if (!checkBoxState) {
      toast.error("Please accept the terms and conditions to go ahead");
    }
  };
  const onCheckboxChange = (e) => {
    setCheckBoxState(e.target.checked);
  };

  return (
    <div>
      <div>
        <DemoEnd />
      </div>
      <div className="compliance-end">
        <BackDrop isLoading={isLoading} />
        <div
          className="left-top-corner"
          style={{
            backgroundImage: `url(${leftTopCorner})`,
            objectFit: "cover",
          }}
        >
          {/* <img src={leftTopCorner} alt="left-top-corner" /> */}
        </div>
        <div className="back-ground-image">
          <div className="left-section">
            <div className="container">
              <div className="heading-section">
                <p className="compliance compliance-mobile">
                  Compliance Module Demo
                </p>
                <p className="title-hassle">
                  Hassle free <br />
                  compliance!
                </p>
                <p className="title-hassle-desc">
                  Access to both macro and micro level view of <br />
                  things with regular status updates on your
                  <br /> WhatsApp and mail.
                </p>
                <Link
                  class="btn get-started-button common-button"
                  to="/sign-up"
                >
                  GET STARTED
                </Link>
                {/* <button type="button" class="btn get-started-button common-button">GET STARTED</button> */}
              </div>
              <div className="email-subscribe">
                <p className="email-label">
                  Want to share this with your manager or peers?
                </p>
                <div class="newsletter">
                  <div class="content">
                    <div class="input-group">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Enter email"
                        onChange={onChangeHandler("loginID")}
                      />

                      <span class="input-group-btn">
                        <button
                          class="btn invite-btn"
                          type="submit"
                          onClick={() => onSubmit()}
                          disabled={
                            isEmailExist ||
                            isValidate ||
                            !isEmail(values.loginID)
                          }
                        >
                          INVITE
                        </button>
                      </span>
                    </div>
                    {isValidate && values.loginID === "" && (
                      <p className="input-error-message">Email is required</p>
                    )}
                    {values.loginID !== "" && !isEmail(values.loginID) && (
                      <p className="input-error-message">
                        Please enter valid email address
                      </p>
                    )}
                    {isEmailExist && isEmailExist === true && (
                      <p className="input-error-message">
                        Email already exists please login
                      </p>
                    )}
                    <div className="custom-control custom-checkbox">
                      <input
                        id="magicBtn"
                        type="checkbox"
                        className="custom-control-input"
                        style={{ width: "1rem", height: "1.25rem" }}
                        onChange={(e) => onCheckboxChange(e)}
                        checked={checkBoxState}
                      />

                      <label className="custom-control-label" for="magicBtn">
                        I agree to all the
                      </label>
                      <button className="Terms" onClick={() => setShow(true)}>
                        Terms & Conditions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="right-section">
              <img
                className="performance"
                src={Teamperformance}
                alt="Teamperformance"
              />
              <img
                className="Leaderboard"
                src={Leaderboard}
                alt="Leaderboard"
              />
              <img className="Calendar" src={Calendar} alt="Calendar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceDemo7;
