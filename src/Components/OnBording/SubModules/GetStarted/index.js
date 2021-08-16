import React, { useState, useEffect } from "react";
import "./style.css";
import "../../style.css";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../SideBar";
import { withRouter } from "react-router-dom";
import { isEmail } from "../../utils.js";
import { actions as emailActions } from "../../../OnBording/redux/actions";
import { toast } from "react-toastify";
import Modal from "../../../Terms&Conditions/Modal";
import Terms from "../../../Terms&Conditions/Terms";

function GetStart({ history }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [checkBoxState, setCheckBoxState] = useState(false);

  let emailAlreadExist =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.emailAlreadExist;

  useEffect(() => {
    if (emailAlreadExist === false && emailAlreadExist !== "") {
      setIsEmailExist(false);
    } else if (emailAlreadExist === true && emailAlreadExist !== "") {
      setIsEmailExist(true);
    }
  }, [emailAlreadExist]);

  const [values, setValues] = useState({
    loginID: "",
    pwd: "",
    rememberme: 0,
    loginty: "AdminEmail",
  });
  const [inputBorder, setInputBorder] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [show, setShow] = useState(false);
  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const redirectToLogin = () => {
    return history.push("/login");
  };
  const onCheckboxChange = (e) => {
    setCheckBoxState(e.target.checked);
  };
  const onAgreeAndContinue = () => {
    setCheckBoxState(true);
  };
  const onDisagree = () => {
    setCheckBoxState(false);
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
          LoginID: values.loginID,
          Pwd: "",
          rememberme: "0",
          Loginty: values.loginty,
          history,
        })
      );
      setTimeout(() => {
        let status = state.complianceOfficer.isVerifiedEmail;
      }, [100]);
    } else if (!checkBoxState) {
      toast.error("Please accept the terms and conditions to go ahead");
    }
  };

  return (
    <div className="row getStartMobile">
      <Modal>
        <Terms
          show={show}
          setShow={setShow}
          onAgreeAndContinue={onAgreeAndContinue}
          onDisagree={onDisagree}
        />
      </Modal>
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          <SideBar />
        </div>
      </div>
      <div className="col-12 padding-right">
        <img
          className="bottom-right-bg"
          src={RightImageBg}
          alt="RightImageBg"
        />
        <div className="get-main-get-start">
          <div className="container">
            <div className="">
              <div className="get-started-header">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="header_logo">
                      <img
                        src={comtech}
                        alt="COMPLIANCE SUTRA"
                        title="COMPLIANCE SUTRA"
                      />
                      <span className="camp">COMPLIANCE SUTRA</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wrapper_login get-started-btn">
                <p className="login_title">Get Started!</p>
                <div className="form_wrapper">
                  <div className="form-group">
                    <label htmlFor="Company Email">Company Email</label>
                    <input
                      type="text"
                      className={
                        "form-control " +
                        ((isValidate && values.loginID === "") ||
                        (values.loginID !== "" &&
                          isValidate &&
                          !isEmail(values.loginID))
                          ? "input-error"
                          : "") +
                        (values.loginID !== "" && isEmail(values.loginID)
                          ? " activeForm-control"
                          : "") +
                        (!isEmail(values.loginID) && values.loginID !== ""
                          ? "  input-error"
                          : " ")
                      }
                      placeholder="Enter your company email"
                      value={values.loginID}
                      onChange={onChangeHandler("loginID")}
                    />
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
                  </div>
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

                  <button
                    type="submit"
                    onClick={() => onSubmit()}
                    className="btn verify-email common-button"
                  >
                    Verify Email
                  </button>
                  <p className="activate-link">
                    We will send an activation link on your email
                  </p>
                </div>
              </div>
              <div className="get-started-bottom">
                <div className="bottom-logo-strip">
                  <div className="row aligncenter">
                    <div className="col-md-6 col-xs-12">
                      <p
                        onClick={() => redirectToLogin()}
                        className="account-link"
                      >
                        Already have an account?
                        <span
                          style={{ cursor: "pointer" }}
                          className="login-link ml-2"
                        >
                          {" "}
                          LOGIN
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6 col-xs-12 d-none d-sm-block text-right">
                      <span className="powerBy">Powered by</span>
                      <img
                        className="header_logo footer-logo-secmark"
                        src={secmark}
                        alt="SECMARK"
                        title="SECMARK"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(GetStart);
