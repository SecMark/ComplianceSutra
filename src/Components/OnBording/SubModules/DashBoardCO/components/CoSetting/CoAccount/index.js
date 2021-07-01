import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import Drawer from "./LicenseDrawer";
import closeBlack from "../../../../../../../assets/Icons/closeBlack.png";
import { useDispatch, useSelector } from "react-redux";
import { actions as coActions } from "../../../redux/actions";
import { isMobile } from "react-device-detect";
import cross from "../../../../../../../assets/Icons/closeIcon1.png";
import { AiFillCheckCircle, AiOutlineInfo } from "react-icons/ai";
import { HiMinusSm, HiPlus } from "react-icons/hi";
function CoAccount({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [flagCount, setFlagcount] = useState(0);
  const [fields, setFields] = useState(undefined);
  const [licenseDrawerHideShow, setLicenseDrawerHideShow] = useState(false);
  const [isSliderCheck, setIsSliderCheck] = useState(false);
  const [showAddLiceOption, setShowAddLiceOption] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const loggedUser =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo;

  useEffect(() => {
    initialDispatch();
  }, []);

  const initialDispatch = () => {
    dispatch(
      coActions.getCoAccountRequest({
        gUserID: loggedUser.UserID,
        settingType: 3,
        actionFlag: 0,
        entityID: 0,
        licID: 0,
        uUserID: 0,
        utype: 0,
        notificationList: "",
        pwd: "",
      })
    );
  };

  useEffect(() => {
    const accountInfo =
      state &&
      state.taskReport &&
      state.taskReport.coAccountInfo &&
      state.taskReport.coAccountInfo.coAccount;

    if (accountInfo != undefined) {
      const count = accountInfo[0].Flag;
      setFlagcount(count);
      if (count > 0) {
        setIsSliderCheck(true);
      } else {
        setIsSliderCheck(false);
      }
    }
  }, [state.taskReport.coAccountInfo]);

  useEffect(() => {
    const updateStatus =
      state && state.taskReport && state.taskReport.coAccountUpdStatus;

    if (updateStatus != undefined && updateStatus.Status === "Success") {
      initialDispatch();
    }
  }, [state.taskReport.coAccountUpdStatus]);

  const onAddLicenseLabelClickMobile = () => {
    if (isSliderCheck) {
      let fieldObj = {
        selectedLicenseArray: [],
      };
      setFields(fieldObj);
      setLicenseDrawerHideShow(true);

      const drawerParent = document.getElementById("drawerParentMobile");
      const drawerChild = document.getElementById("drawerChildMobile");
      if (drawerParent) {
        drawerParent.classList.add("overlayAccount");
        drawerChild.style.bottom = "0%";
      }
    }
  };

  const closeMobile = (data, action) => {
    const drawerParent = document.getElementById("drawerParentMobile");
    const drawerChild = document.getElementById("drawerChildMobile");
    if (drawerParent) {
      drawerParent.classList.remove("overlayAccount");
      drawerChild.style.transition = "1.5s linear;";
      drawerChild.style.bottom = "-100%";
    }
    if (action == 1) {
      const licenseIDgrpStr =
        data.selectedLicenseArray.length > 0
          ? data.selectedLicenseArray.join(",")
          : "";
      dispatch(
        coActions.coAccountUpdateRequest({
          gUserID: loggedUser.UserID,
          settingType: 3,
          actionFlag: 2,
          entityID: 0,
          licID: licenseIDgrpStr,
          uUserID: 0,
          utype: 0,
          notificationList: "",
          pwd: "",
        })
      );
    }
  };

  const onAddLicenseLabelClick = () => {
    if (isSliderCheck) {
      let fieldObj = {
        selectedLicenseArray: [],
      };
      setFields(fieldObj);
      setLicenseDrawerHideShow(true);
      if (!isMobile) {
        const drawerParent = document.getElementById("drawerParent");
        const drawerChild = document.getElementById("drawerChild");
        if (drawerParent) {
          drawerParent.classList.add("overlay");
          drawerChild.style.right = "0px";
        }
      } else {
        const drawerParent = document.getElementById("drawerParentMobile");
        const drawerChild = document.getElementById("drawerChildMobile");
        if (drawerParent) {
          drawerParent.classList.add("overlayAccount");
          drawerChild.style.bottom = "0%";
        }
      }
    }
  };

  const close = (data, action) => {
    if (!isMobile) {
      const drawerParent = document.getElementById("drawerParent");
      const drawerChild = document.getElementById("drawerChild");
      if (drawerParent) {
        drawerParent.classList.remove("overlay");
        drawerChild.style.transition = "1.5s linear;";
        drawerChild.style.right = "-100%";
      }
      setLicenseDrawerHideShow(false);
    } else {
      const drawerParent = document.getElementById("drawerParentMobile");
      const drawerChild = document.getElementById("drawerChildMobile");
      if (drawerParent) {
        drawerParent.classList.remove("overlayAccount");
        drawerChild.style.transition = "1.5s linear;";
        drawerChild.style.bottom = "-100%";
      }
    }

    if (action == 1) {
      const licenseIDgrpStr =
        data.selectedLicenseArray.length > 0
          ? data.selectedLicenseArray.join(",")
          : "";
      dispatch(
        coActions.coAccountUpdateRequest({
          gUserID: loggedUser.UserID,
          settingType: 3,
          actionFlag: 2,
          entityID: 0,
          licID: licenseIDgrpStr,
          uUserID: 0,
          utype: 0,
          notificationList: "",
          pwd: "",
        })
      );
    }
  };

  const onSliderChange = () => {
    setIsSliderCheck(!isSliderCheck);
  };

  return (
    <div className="co-account ">
      {isAddUserModalOpen && (
        <div className="modal-container">
          <div className="modal-main">
            <div className="modal-content">
              <div className="modal-body-container">
                <div className="header">
                  <h3>Add User</h3>
                  <img
                    src={cross}
                    alt=""
                    onClick={() => setIsAddUserModalOpen(!isAddUserModalOpen)}
                  />
                </div>
                <div className="select-section">
                  <button className="info-button">
                    <AiOutlineInfo />
                  </button>
                  <span className="select-user">
                    you can only select users in a batch of 5
                  </span>
                </div>
                <div className="counter-buttons">
                  <button className="counter">
                    <HiMinusSm />
                  </button>
                  <h2 className="counter-count">25</h2>
                  <button className="counter">
                    <HiPlus />
                  </button>
                </div>

                <div className="account-info">
                  <div>
                    <span>Amount to pay</span>
                    <h3>₹5,000</h3>
                  </div>
                  <button className="procced-buy">Procceed to buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isUpgradeModalOpen && (
        <div className="modal-upgrade-container">
          <div className="modal-upgrade-main">
            <div className="modal-upgrade-content">
              <div className="modal--upgrade-body-container">
                <div className="upgrade-header">
                  <h3>Your trial has ended</h3>
                </div>
                <div className="upgrade-benefits">
                  <h3>Upgrade now to get following benefits!</h3>
                </div>
              </div>
              <div className="add-multiple-users">
                <AiFillCheckCircle />
                <p>Add multiple number of users</p>
              </div>
              <div className="add-multiple-users">
                <AiFillCheckCircle />
                <p>Expert review service</p>
              </div>
              <div className="add-multiple-users">
                <AiFillCheckCircle />
                <p>Flexible payment options. Cancel anytime</p>
              </div>
              <div className="add-multiple-users">
                <AiFillCheckCircle />
                <p>Cancel anytime</p>
              </div>
              <div>
                <button className="upgrade-now-button">Upgrade now</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isMobile && (
        <div id="drawerParent" className="">
          <div id="drawerChild" className="sideBarFixed">
            {licenseDrawerHideShow && (
              <Drawer
                fields={fields}
                close={(data, action) => close(data, action)}
              />
            )}
          </div>
        </div>
      )}
      {isMobile && (
        <div id="drawerParentMobile" className="">
          <div id="drawerChildMobile" className="sideBarFixedAccount">
            <Drawer
              fields={fields}
              close={(data, action) => close(data, action)}
            />
          </div>
        </div>
      )}
      <div className="d-flex">
        <div className="col-10 col-sm-12 col-md-12 col-xl-12 pl-0">
          <div className="personal-mgt-title">Account</div>
        </div>
        <div className="col-2 col-sm-12 col-md-12 col-xl-12 d-block d-sm-none">
          <img
            className="close-icon-personal"
            src={closeBlack}
            alt="close Black"
            onClick={() => {
              handleClose(true);
            }}
          />
        </div>
      </div>

      <div class="border-header d-none d-sm-block"></div>
      <div className="scroll-sction">
        <div className="channel-div">
          <div className="row pl-0">
            <div className="col-7">
              <div className="acc-div">
                <div className="licences-toggle">
                  <p className="normaltext">
                    COMPLIANCE SUTRA Expert &nbsp;
                    <span className="d-none d-sm-block">
                      {" "}
                      License Review
                    </span>{" "}
                    <span className="review">{flagCount}</span>
                  </p>
                  <p className="normaltext d-block d-sm-none">
                    {" "}
                    License Review{" "}
                  </p>
                </div>
                {isSliderCheck && isMobile && (
                  <p
                    style={{
                      cursor: "pointer",
                      opacity: isSliderCheck > 0 ? 1 : 0.7,
                    }}
                    onClick={() => onAddLicenseLabelClick()}
                    className="add-remove"
                  >
                    Add/remove licenses
                  </p>
                )}
                {isSliderCheck && !isMobile && (
                  <p
                    style={{
                      cursor: "pointer",
                      opacity: isSliderCheck > 0 ? 1 : 0.7,
                    }}
                    onClick={() => onAddLicenseLabelClick()}
                    className="add-remove"
                  >
                    Add/remove licenses
                  </p>
                )}
              </div>
            </div>
            <div className="col-3">
              <div className="check-box-acc">
                <label class="switch" id="licenses">
                  <input
                    htmlFor="licenses"
                    id="licenseSetting"
                    type="checkbox"
                    checked={isSliderCheck}
                    onClick={(e) => onSliderChange()}
                  />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div className="col-md-10 col-sm-10 payment-detail">
              <h2 className="payment-plan">Payment plan</h2>
              <button
                className="upgrade-button"
                onClick={() => setIsUpgradeModalOpen(!isUpgradeModalOpen)}
              >
                upgrade now
              </button>
            </div>
            <div className="col-md-10 col-sm-6 payment-detail-plan">
              <h2 className="payment-type">Type of plan</h2>
              <h2 className="payment-trail">30 Days Free Trail</h2>
            </div>
            <div className="col-md-10 col-sm-10 payment-detail-plan">
              <h2 className="payment-type">Trail ends</h2>
              <h2 className="payment-trail">24 July 2021</h2>
            </div>
            <div className="col-md-10 col-sm-10 payment-detail-plan">
              <h2 className="payment-type">No. of users</h2>
              <div className="add-user-container">
                <button
                  className="add-users-button"
                  onClick={() => setIsAddUserModalOpen(true)}
                >
                  Add Users
                </button>
                <h2 className="payment-trail">5</h2>
              </div>
            </div>
            <div className="col-10 payment-detail-plan">
              <h2 className="payment-type">Your Licenses</h2>
              <div className="edit-container">
                <button className="edit-button">Edit License</button>
                <h2 className="payment-trail">5</h2>
              </div>
            </div>
            <div className="col-10 payment-detail-plan">
              <h2 className="payment-type">Payment Method</h2>
              <div className="edit-container">
                <button className="edit-button">Change</button>
                <h2 className="payment-trail">**** **** 9999</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CoAccount;
