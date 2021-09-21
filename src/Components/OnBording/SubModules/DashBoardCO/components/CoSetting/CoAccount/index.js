import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import Drawer from "./LicenseDrawer";
import closeBlack from "../../../../../../../assets/Icons/closeBlack.png";
import { useDispatch, useSelector } from "react-redux";
import { actions as coActions } from "../../../redux/actions";
import { isMobile } from "react-device-detect";
import PaymentSection from "../../../../../../PaymentModule/PaymentSection";
import UpgradeYourAccount from "../../../../../../PaymentModule/UpgradeYourAccount";
import ChooseLicenses from "../../../../../../../CommonModules/sharedComponents/Drawer/License";
import Payment from "../../../../../../../CommonModules/sharedComponents/Drawer/Payment";
import { BsPencil } from "react-icons/bs";
import { RiRefreshFill } from "react-icons/ri";
import EditLicenses from "../../../../../../../CommonModules/sharedComponents/Drawer/EditLicense";
import { clearLicense } from "../../../../../../ExpertReviewModule/Redux/actions";
import api from "../../../../../../../../src/apiServices";

function CoAccount({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [flagCount, setFlagcount] = useState(0);
  const [fields, setFields] = useState(undefined);
  const [licenseDrawerHideShow, setLicenseDrawerHideShow] = useState(false);
  const [isSliderCheck, setIsSliderCheck] = useState(false);
  const [showAddLiceOption, setShowAddLiceOption] = useState(false);
  const [isUpgradeYourAccountOpen, setIsUpgradeYourAccountOpen] =
    useState(false);
  const [isPaidMember, setIsPaidMember] = useState(false);

  const [isShowEditLicense, setIsShowEditLicense] = useState(false);

  const [paymentDetail, setPaymentDetail] = useState({});

  useEffect(() => {
    initialDispatch();
    dispatch(clearLicense());
  }, []);

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
        setIsSliderCheck(false);
      } else {
        setIsSliderCheck(false);
      }
    }
  }, [state.taskReport.coAccountInfo]);

  useEffect(() => {
    const updateStatus =
      state && state.taskReport && state.taskReport.coAccountUpdStatus;
  }, []);

  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowPayment, setIsShowPayment] = useState(false);
  const [erServiceStatus, seterServiceStatus] = useState("Active");
  const [isMainPayment, setIsMainPayment] = useState(false);

  const loggedUser =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo;

  const companyDetail = state && state?.taskReport?.coAccountInfo?.coAccount;

  useEffect(() => {
    initialDispatch();
  }, []);

  useEffect(() => {
    setPaymentDetail(state?.taskReport?.paymentDetail?.coAccount);
  }, [state && state?.taskReport?.paymentDetail?.coAccount]);

  const initialDispatch = () => {
    dispatch(
      coActions.getPaymentRequest({
        gUserID: loggedUser.UserID,
        settingType: 3,
        actionFlag: 5,
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
      setIsShowFilter(false);
      setIsSliderCheck(false);
      setIsMainPayment(false);
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

  const editclose = (data, action) => {
    if (!isMobile) {
      const drawerParent = document.getElementById("drawerParent");
      const drawerChild = document.getElementById("drawerChild");
      if (drawerParent) {
        drawerParent.classList.remove("overlay");
        drawerChild.style.transition = "1.5s linear;";
        drawerChild.style.right = "-100%";
      }
      setIsShowEditLicense(false);
    } else {
      const drawerParent = document.getElementById("drawerParentMobile");
      const drawerChild = document.getElementById("drawerChildMobile");
      if (drawerParent) {
        drawerParent.classList.remove("overlayAccount");
        drawerChild.style.transition = "1.5s linear;";
        drawerChild.style.bottom = "-100%";
      }
    }
  };

  const onSliderChange = () => {
    setIsSliderCheck(!isSliderCheck);
    if (!isSliderCheck) {
      setIsShowFilter(true);
      setIsMainPayment(true);
    }
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

  const paymentDrawer = () => {
    setIsShowFilter(false);
    //setIsSliderCheck(!isSliderCheck);
    //setIsMainPayment(false);
    setIsShowPayment(!isShowPayment);
  };

  const deactivateER = () => {
    api.post(`/api/CoSettings`, {
      gUserID: loggedUser.UserID,
      settingType: 3,
      actionFlag: 6,
    });
  };
  return (
    <>
      {isShowFilter && (
        <div
          className={`license-popup ${isShowFilter && "popup-open"}`}
          style={{
            boxShadow: isShowFilter
              ? "1px 1px 9999px 9999px rgba(0,0,0,0.7)"
              : "none",
          }}
        >
          <div className="">
            <ChooseLicenses
              fields={fields}
              close={(data, action) => close(data, action)}
              paymentDrawer={paymentDrawer}
              isMainPayment={isMainPayment}
            />
          </div>
        </div>
      )}
      {/* Payment Drawer */}
      <div
        className={`license-popup ${isShowPayment && "popup-open"}`}
        style={{
          boxShadow: isShowPayment
            ? "1px 1px 9999px 9999px rgba(0,0,0,0.7)"
            : "none",
        }}
      >
        <div className="">
          <Payment
            paymentDrawer={paymentDrawer}
            setIsSliderCheck={setIsSliderCheck}
            isMainPayment={isMainPayment}
          />
        </div>
      </div>

      {/* Edit License */}
      {isShowEditLicense && (
        <div
          className={`license-popup ${isShowEditLicense && "popup-open"}`}
          style={{
            boxShadow: isShowEditLicense
              ? "1px 1px 9999px 9999px rgba(0,0,0,0.7)"
              : "none",
          }}
        >
          <div className="">
            <EditLicenses
              fields={fields}
              close={(data, action) => editclose(data, action)}
            />
          </div>
        </div>
      )}
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
        {!isUpgradeYourAccountOpen ? (
          <>
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
                    handleClose(false);
                  }}
                />
              </div>
            </div>

            <div class="border-header d-none d-sm-block"></div>
            <div className="scroll-sction">
              <div className="channel-div">
                <div className="row pl-0">
                  <div className="col-12">
                    <p className="grey-text">Services</p>
                  </div>
                  <div className="col-9 col-md-7 col-sm-7">
                    <div className="acc-div">
                      <div className="licences-toggle">
                        <p className="normaltext">
                          COMPLIANCE SUTRA Expert &nbsp;
                          <span className="d-none d-sm-block">
                            {" "}
                            License Review
                          </span>{" "}
                        </p>
                        <p className="normaltext d-block d-sm-none">
                          {" "}
                          License Review{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <button
                      className={
                        erServiceStatus === "Active"
                          ? "service-status-active"
                          : "service-status"
                      }
                    >
                      {erServiceStatus}
                    </button>
                  </div>
                </div>

                {erServiceStatus !== "Active" && (
                  <div className="row">
                    <div className="col mt-2">
                      <button
                        className="service-setup"
                        onClick={() => setIsShowFilter(!isShowFilter)}
                      >
                        setup now
                      </button>
                      <button className="service-read-more">read more</button>
                    </div>
                  </div>
                )}

                {erServiceStatus === "Active" && (
                  <div>
                    <div className="active-license-detail">
                      <div className="row pl-0 active-license">
                        <div className="col-9">
                          <p>Active Licences and Subsidaries</p>
                        </div>
                        <div className="col-3" onClick={openLicenseDrawer}>
                          <p
                            style={{
                              color: "#6c5dd3",
                              textAlign: "right",
                              cursor: "pointer",
                            }}
                          >
                            <BsPencil />
                            Edit
                          </p>
                        </div>
                      </div>

                      <div className="row pl-0 active-license-buttons">
                        <div className="col">
                          {companyDetail?.[0]?.Palns?.map((licenses) => (
                            <button>{licenses.LicenseCode}</button>
                          ))}
                        </div>
                      </div>

                      <div className="row pl-0 active-license">
                        <div className="col-9">
                          <p>Subscription</p>
                        </div>
                        <div className="col-3">
                          <p
                            style={{
                              color: "#6c5dd3",
                              textAlign: "right",
                              cursor: "pointer",
                            }}
                          >
                            <RiRefreshFill
                              style={{
                                color: "#6c5dd3",
                                fontSize: "15px",
                              }}
                            />
                            Change
                          </p>
                        </div>
                      </div>

                      <div className="row pl-0 active-license-buttons">
                        <div className="col">
                          <button>Monthly plan @₹1244</button>
                          <button>Validity till 15 Aug</button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="deactivate-service"
                      onClick={() => deactivateER()}
                    >
                      Deactivate Service
                    </button>
                  </div>
                )}

                <div style={{ width: "600px" }}>
                  <PaymentSection
                    openLicenseDrawer={openLicenseDrawer}
                    setUpgradeYourPlan={setIsUpgradeYourAccountOpen}
                    isPaidMember={isPaidMember}
                    setIsPaidMember={setIsPaidMember}
                    setIsShowEditLicense={setIsShowEditLicense}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <UpgradeYourAccount
              handleClose={handleClose}
              setUpgradeYourAccount={setIsUpgradeYourAccountOpen}
              isSliderCheck={isSliderCheck}
              flagCount={flagCount}
              onSliderChange={onSliderChange}
              setIsPaidMember={setIsPaidMember}
              isShowEditLicense={isShowEditLicense}
              setIsShowEditLicense={setIsShowEditLicense}
              setIsMainPayment={setIsMainPayment}
            />
          </>
        )}
      </div>
    </>
  );
}
export default CoAccount;
