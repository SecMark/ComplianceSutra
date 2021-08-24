import React, { useState, useEffect } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import SideBar from "../../../../Components/OnBording/SubModules/SideBar";
import { actions as signInSignUpActions } from "../../redux/actions";
import validator from "validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Login({ history }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [visible, setVisibility] = useState(false);

  const Icon = (<FontAwesomeIcon icon={  visible ? "eye-slash" : "eye" }
  onClick={() => setVisibility(visiblity => !visiblity)}
  />
  )
  const InputType = visible ? "text" : "password";
  

  const [values, setValues] = useState({
    LoginId: "",
    Pwd: "",
    rememberme: 0,
    Loginty: "AdminEmail",
  });
  const [passwordState, setPasswordState] = useState({
    minlength: false,
    uppercaseandlowercase: false,
    alphabetsandigit: false,
  });
  const [errors, setErrors] = useState({
    emailErr: "",
    passwordErr: "",
  });
  const [isValidate, setIsValidate] = useState(false);

  const userID =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo.UserID;

  const userDetails = state && state.auth && state.auth.loginInfo;
  const onChangeHandler = (name) => (event) => {
    let passwordReg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (name === "LoginId") {
      let inputKey = "emailErr";
      if (!validator.isEmail(event.target.value)) {
        setErrors({ ...errors, [inputKey]: "Email is invalid" });
      } else {
        setErrors({ ...errors, [inputKey]: "" });
      }
    }

    setValues({ ...values, [name]: event.target.value });
  };

  // useEffect(() => {
  //   if (userID) {
  //     if (userDetails.UserType === 4) {
  //       history.push("/dashboard")
  //     }else{
  //       history.push("/dashboard-view")
  //     }
  //   }
  // }, [])

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (values.LoginId === "" || values.Pwd === "" || errors.emailErr !== "") {
      return;
    }
    dispatch(
      signInSignUpActions.signInRequest({
        LoginId: values.LoginId,
        Pwd: values.Pwd,
        rememberme: values.rememberme ? 1 : 0,
        Loginty: "AdminEmail",
        history: history,
      })
    );

    setTimeout(() => {
      let status = state.auth.loginSuccess;
      if (status === false) {
        let tempErr = [{ ...errors, ["emailErr"]: "Email Is Invalid" }];
        // tempErr.emailErr = "Email Is Invalid"
        // setErrors(tempErr)
      }
    }, 1000);
  };

  const redirectToForgotPasswordScreen = () => {
    return history.push("/forgot-password");
  };
  const redirectToSignupScreen = () => {
    return history.push("/");
  };
  return (
    <div className="row get-login-mobile">
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
        <div className="get-main-login">
          <div className="container">
            <div className="">
              <div className="get-started-header">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="header_logo">
                      {/* <a href="#" style={{'cursor': 'auto'}}> */}
                      <img
                        src={comtech}
                        alt="COMPLIANCE SUTRA"
                        title="COMPLIANCE SUTRA"
                      />
                      <span className="camp">COMPLIANCE SUTRA</span>
                      {/* </a> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="comtech_login comtech_form_wrapper">
                <p className="comtech_login_title">
                  Login to COMPLIANCE SUTRA!
                </p>
                <div className="comtech_form_wrapper">
                  <div className="form-group">
                    <label htmlFor="Company Email">Company Email</label>
                    <input
                      type="text"
                      className={
                        "form-control" +
                        (errors && errors.emailErr !== ""
                          ? " input-error error-msg-border"
                          : " ") +
                        // ( values && values.LoginId !== "" ? "  succes-input-borde" : " 11-1succes-input-border")
                        (values && values.LoginId === ""
                          ? ""
                          : " countryCode-sucess   ") +
                        (errors.emailErr == "" && " activeForm-control")
                      }
                      placeholder="Enter your company email"
                      value={values.LoginId}
                      onChange={onChangeHandler("LoginId")}
                    />
                    {errors && errors.emailErr !== "" && (
                      <p className="input-error-message">Email is invalid</p>
                    )}
                    {/* {values && values.LoginId === "" && <p className="input-error-message">
                                            Company email is required
                                     </p>} */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="Company Email">Password</label>
                    <div className="">
                      <input
                        type={InputType}
                        className={
                          "form-control" +
                          (errors && errors.passwordErr !== ""
                            ? " error-msg-border"
                            : "") +
                          (values && values.Pwd === ""
                            ? ""
                            : " activeForm-control")
                        }
                        placeholder="Enter your password"
                        value={values.Pwd}
                        onChange={onChangeHandler("Pwd")}
                        onKeyPress={handleKeyPress}
                      />

                          <span className="password-toggle-ico">{Icon}</span> 

                      {/* {errors && errors.passwordErr !== "" && <p className="input-error-message">
                                                Password is invalid
                                     </p>} */}
                      {/* {values && values.Pwd === "" && <p className="input-error-message">
                                                Password is required
                                     </p>} */}
                      {/* <ul className="Instruction">
                                                <li>
                                                    <div className={passwordState.minlength === false ? "error" : "green-dot"} ></div>At least 8 characters—the more characters, the better
                    </li>
                                                <li>
                                                    <div className={passwordState.uppercaseandlowercase === false ? "error" : "green-dot"}></div>A mixture of both uppercase and lowercase
                      letters
                    </li>
                                                <li>
                                                    <div className={passwordState.alphabetsandigit === false ? "error" : "green-dot"}></div>A mixture of letters and numbers
                    </li>
                                            </ul> */}
                    </div>
                  </div>
                  {/* <div className="custom-control custom-checkbox">
                                        <input type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck"
                                            value={values.rememberme}
                                            onChange={onChangeHandler('rememberme')}
                                            name="example1" />
                                        <label className="custom-control-label" htmlFor="customCheck">Keep me signed in</label>
                                    </div> */}
                  <div className="d-flex login-forgot">
                    <button
                      style={{ cursor: "pointer" }}
                      type="submit"
                      onClick={() => onSubmit()}
                      className="btn common-button-login"
                    >
                      Login
                    </button>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => redirectToForgotPasswordScreen()}
                      className="forgot-pass"
                    >
                      {" "}
                      FORGOT PASSWORD
                    </span>
                  </div>
                </div>
              </div>
              <div className="login-bottom">
                <div className="bottom-logo-strip">
                  <div className="row aligncenter">
                    <div className="col-md-6 col-xs-12">
                      <p
                        onClick={() => redirectToSignupScreen()}
                        style={{ cursor: "pointer" }}
                        className="account-link"
                      >
                        Don't have an account?
                        <span className="login-link"> SIGNUP</span>
                      </p>
                    </div>
                    <div className="col-md-6 col-xs-12 d-none d-sm-block text-right">
                      {/* <a href="#" style={{'cursor': 'auto'}}> */}
                      <span className="powerBy">Powered by</span>
                      <img
                        className="header_logo footer-logo-secmark"
                        src={secmark}
                        alt="SECMARK"
                        title="SECMARK"
                      />
                      {/* </a> */}
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

export default withRouter(Login);
