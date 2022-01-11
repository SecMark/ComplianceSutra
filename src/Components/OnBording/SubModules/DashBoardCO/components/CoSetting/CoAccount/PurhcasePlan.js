import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import Drawer from "./LicenseDrawer";

import { useDispatch, useSelector } from "react-redux";
import { actions as coActions } from "../../../redux/actions";
import { isMobile } from "react-device-detect";

import UpgradeYourAccount from "../../../../../../PaymentModule/UpgradeYourAccount";

import Payment from "../../../../../../../CommonModules/sharedComponents/Drawer/Payment";

import { clearLicense } from "../../../../../../ExpertReviewModule/Redux/actions";
import Modal from "antd/lib/modal/Modal";
import PaymentLicenses from "../ChooseLicenses/PaymentLicenses";

import { actions as companyActions } from "../../../../../../OnBording/redux/actions";
import HistoryList from "./History";

function PurhcasePlan({ handleClose }) {
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

  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    initialDispatch();
    dispatch(clearLicense());

    dispatch(
      companyActions.getLicenseList({
        industry_type: "General",
        country: "India",
      })
    );
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
    setIsShowPayment(!isShowPayment);
  };
  return (
    <>
      <Modal
        visible={isShowFilter}
        width={1000}
        footer={null}
        //onOk={this.handleOk}
        onCancel={() => setIsShowFilter(false)}
      >
        <div className="">
          <PaymentLicenses />
        </div>
      </Modal>

      <Modal
        visible={showHistory}
        width={1000}
        footer={null}
        //onOk={this.handleOk}
        onCancel={() => setShowHistory(false)}
      >
        <div className="">
          <HistoryList />
        </div>
      </Modal>

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
              <div className="col-10 col-md-10 col-xl-9 col-sm-8 pl-0">
                <div className="personal-mgt-title">Account</div>
              </div>
              <div className="col-2 col-md-2 col-xl-3 col-sm-4">
                <button className="deactivate-account">
                  Deactivate Account
                </button>
              </div>
            </div>

            <div class="border-header d-none d-sm-block"></div>
            <div className="payment-container">
              <div className="d-flex payment-plan-header">
                <div className="col-10 col-md-10 col-xl-9 payment-plan">
                  <p>Payment</p>
                  <a
                    href="javascript:void(0)"
                    className="history-anchor"
                    onClick={() => setShowHistory(true)}
                  >
                    History
                  </a>
                </div>
                <div className="col-10 col-md-10 col-xl-3">
                  <button
                    onClick={() =>
                      setIsUpgradeYourAccountOpen(!isUpgradeYourAccountOpen)
                    }
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
              <div className="d-flex payment-plan-body">
                <div className="col-6 col-md-6 ">
                  <div className="d-flex justify-content-between">
                    <p>Payment Method</p>
                    <span>30 Days Free Trail</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Next Billing Date</p>
                    <span>24th Aug,2021</span>
                  </div>
                </div>

                <div className="col-6 col-md-6 ">
                  <div className="d-flex justify-content-between">
                    <p>Number of users</p>
                    <span>15</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Your Licensed</p>
                    <span>5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="license-container">
              <div className="d-flex license-plan-header">
                <div className="col-10 col-md-10 col-xl-9 license-plan">
                  <div className="d-flex">
                    <div>
                      <p>ComplianceSutra Expert License Review (8)</p>
                    </div>
                    <div className="ml-4 mt-1">
                      <label className="switch" id="weekly">
                        <input
                          htmlFor="weekly"
                          id="weeklySetting"
                          type="checkbox"
                          checked={false}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="col-3 col-md-3 col-xl-3">
                  <button onClick={() => setIsShowFilter(true)}>
                    Add License
                  </button>
                </div>
              </div>
              <div className="border-class">
                <div class="border-header d-none d-sm-block"></div>
              </div>
              <div className="d-flex license-plan-body">
                <table className="license-table">
                  <thead>
                    <th>Services</th>
                    <th>Licenses</th>
                    <th>Due Date</th>
                    <th align="center"> Enable/Disable</th>
                  </thead>
                  <tbody className="mt-5">
                    <tr>
                      <td>PMS : Portfolio Manager</td>
                      <td>GST</td>
                      <td>12-02-2022</td>
                      <td align="center">
                        {" "}
                        <div className="">
                          <label className="switch" id="weekly">
                            <input
                              htmlFor="weekly"
                              id="weeklySetting"
                              type="checkbox"
                              checked={false}
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>PMS : Portfolio Manager</td>
                      <td>GST</td>
                      <td>12-02-2022</td>
                      <td align="center">
                        {" "}
                        <div className="">
                          <label className="switch" id="weekly">
                            <input
                              htmlFor="weekly"
                              id="weeklySetting"
                              type="checkbox"
                              checked={false}
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>PMS : Portfolio Manager</td>
                      <td>GST</td>
                      <td>12-02-2022</td>
                      <td align="center">
                        {" "}
                        <div className="">
                          <label className="switch" id="weekly">
                            <input
                              htmlFor="weekly"
                              id="weeklySetting"
                              type="checkbox"
                              checked={false}
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <UpgradeYourAccount
            setIsUpgradeYourAccountOpen={setIsUpgradeYourAccountOpen}
            isUpgradeYourAccountOpen={isUpgradeYourAccountOpen}
          />
        )}
      </div>
    </>
  );
}
export default PurhcasePlan;
