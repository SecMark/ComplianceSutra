import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import Drawer from "./LicenseDrawer";
import closeBlack from "../../../../../../../assets/Icons/closeBlack.png";
import { useDispatch, useSelector } from "react-redux";
import { actions as coActions } from "../../../redux/actions";
import { isMobile } from "react-device-detect";
import PaymentSection from "../../../../../../PaymentModule/PaymentSection";

function CoAccount({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [flagCount, setFlagcount] = useState(0);
  const [fields, setFields] = useState(undefined);
  const [licenseDrawerHideShow, setLicenseDrawerHideShow] = useState(false);
  const [isSliderCheck, setIsSliderCheck] = useState(false);
  const [showAddLiceOption, setShowAddLiceOption] = useState(false);

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

  const openLicenseDrawer = () => {
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
  };
  return (
    <div className="co-account ">
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

            <PaymentSection openLicenseDrawer={openLicenseDrawer} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CoAccount;
