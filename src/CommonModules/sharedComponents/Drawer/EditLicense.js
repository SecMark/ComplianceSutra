import React, { useState, useEffect, useRef } from "react";

import RightImageBg from "../../../assets/Images/Onboarding/RectangleOnboadign.png";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { actions as coActions } from "../../../Components/OnBording/SubModules/DashBoardCO/redux/actions";

import assignIcon1 from "../../../assets/Icons/assignIcon.png";
import assignIcon3 from "../../../assets/Icons/assignIcon2.png";
import assignIcon5 from "../../../assets/Icons/assignIcon3.png";
import assignIcon2 from "../../../assets/Icons/assignIcon4.png";
import assignIcon4 from "../../../assets/Icons/assignIcon5.png";
import constant from "../constants/constant";
import {
  getPayment,
  mainSelectedLicense,
} from "../../../Components/ExpertReviewModule/Redux/actions";

function EditLicenses({ fields, close }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [licenseList, setLicenseList] = useState({});
  const [selectedLiecenseIdArray, setSelectedLicenseIdArray] = useState([]);
  const loggedUser =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo;
  useEffect(() => {
    dispatch(
      coActions.getCoAccountLicensesRequest({
        gUserID: loggedUser.UserID,
        settingType: 3,
        actionFlag: 1,
        entityID: 0,
        licID: 0,
        uUserID: 0,
        utype: 0,
        notificationList: "",
        pwd: "",
      })
    );
  }, []);

  useEffect(() => {
    const coLicensesData =
      state &&
      state.taskReport &&
      state.taskReport.coAccountLicenses &&
      state.taskReport.coAccountLicenses.coLicenses;
    console.log(coLicensesData);
    if (coLicensesData != undefined) {
      let LicenseList = [];
      let tempSelectedLicenses = [];
      coLicensesData &&
        coLicensesData.length > 0 &&
        coLicensesData.map((item) => {
          let tempArray = [];
          item.GEN_License &&
            item.GEN_License.length > 0 &&
            item.GEN_License.map((element) => {
              let LicenseObj = {
                Category: element.Category,
                LicenseCode: element.LicenseCode,
                LicenseId:
                  element.GEN_EntityApplicableLicenses[0].ApplicableLicenseId,
                Flag: element.GEN_EntityApplicableLicenses[0].Flag,
                EntityId: element.GEN_EntityApplicableLicenses[0].EntityGroupID,
              };
              if (element.GEN_EntityApplicableLicenses[0].Flag > 0) {
                tempSelectedLicenses.push(
                  element.GEN_EntityApplicableLicenses[0].ApplicableLicenseId
                );
              }
              tempArray.push(LicenseObj);
            });
          let finalObj = {
            EntityName: item.EntityName,
            LicenseList: tempArray,
          };
          LicenseList.push(finalObj);
        });

      setLicenseList(LicenseList);
      setSelectedLicenseIdArray(tempSelectedLicenses);
    }
  }, [state.taskReport.coAccountLicenses]);

  const onClickLiencesCheckbox = (e, item, parentCheck) => {
    var array = [...selectedLiecenseIdArray];
    if (e.target.classList.contains("sub-checkbox")) {
      if (e.target.checked) {
        let itemindex = array.indexOf(item.LicenseId);
        if (itemindex === -1) {
          array.push(parseInt(item.LicenseId));
        }
        parentCheck.forEach((x) => {
          if (array.indexOf(x.LicenseId) === -1) {
            e.target
              .closest(".drower")
              .querySelector(
                ".down-arrow .custom-control-input"
              ).checked = false;
            return;
          }
          e.target
            .closest(".drower")
            .querySelector(".down-arrow .custom-control-input").checked = true;
        });
        setSelectedLicenseIdArray(array);
      } else {
        const newArray = array.filter(
          (checkedItem) => checkedItem !== parseInt(item.LicenseId)
        );
        e.target
          .closest(".drower")
          .querySelector(".down-arrow .custom-control-input").checked = false;
        setSelectedLicenseIdArray(newArray);
      }
    } else {
      if (e.target.checked) {
        item.LicenseList.forEach((x) => {
          let itemindex = array.indexOf(x.LicenseId);
          if (itemindex === -1) {
            array.push(parseInt(x.LicenseId));
          }
        });
        setSelectedLicenseIdArray(array);
      } else {
        let tempObj = item.LicenseList;
        tempObj.forEach((x) => {
          let itemindex = array.indexOf(x.LicenseId);
          if (itemindex != -1) {
            array.splice(itemindex, 1);
          }
        });
        setSelectedLicenseIdArray(array);
      }
    }
  };

  const onClickArrow = (index) => {
    const color = document.getElementById(`grid${index}`);
    const arrow = document.getElementById(`arrow${index}`);
    const SortBar = document.getElementById(`content${index}`);
    if (arrow && SortBar) {
      if (
        arrow.classList.contains("downArrow") &&
        SortBar.classList.contains("accordian-bar-with-min")
      ) {
        arrow.classList.remove("downArrow");
        arrow.classList.add("upArrow");
        color.classList.add("accordian-grid-active");
        SortBar.classList.add("filter-price-height");
        SortBar.classList.add("accordian-bar-with-fullheight");
      } else if (
        arrow.classList.contains("upArrow") &&
        SortBar.classList.contains("filter-price-height")
      ) {
        SortBar.classList.remove("filter-price-height");
        SortBar.classList.remove("accordian-bar-with-fullheight");
        arrow.classList.remove("upArrow");
        color.classList.remove("accordian-grid-active");
        arrow.classList.add("downArrow");
      }
    }
  };

  const setCerificateDetails = () => {
    const selectedLicense = [];
    licenseList.map((list) => {
      if (selectedLiecenseIdArray.includes(list.LicenseList[0].LicenseId)) {
        list.LicenseList.map((listOfLicense) => {
          if (selectedLiecenseIdArray.includes(listOfLicense.LicenseId)) {
            selectedLicense.push(listOfLicense);
          }
        });
      }
    });

    const paymentArray = selectedLicense.map((licenses) => {
      return {
        gid: state?.auth?.loginInfo.UserID,
        eid: licenses.EntityId,
        cat: constant.complianceOfficer,
        prodid: licenses.LicenseCode,
      };
    });
    dispatch(mainSelectedLicense(paymentArray));
    const payload = {
      flag: 1,
      pmtArray: JSON.stringify(paymentArray),
    };
    dispatch(getPayment(payload));

    callClose(2);
  };

  const setCerificateDetailsMobile = () => {
    var fieldObj = { ...fields };
    fieldObj.selectedLicenseArray = selectedLiecenseIdArray;
    close(fieldObj, 1);
  };
  const callClose = (type) => {
    var fieldObj = { ...fields };
    if (type === 1) {
      fieldObj.selectedLicenseArray = selectedLiecenseIdArray;
    }

    close(fieldObj, type);
  };

  const renderData = (item, parentCheck) => {
    return (
      <div className="accordian-date-drower">
        <div className="col-12 col-md-6 pl-0">
          <div className="goods-services">
            <div className="custom-control custom-checkbox">
              <input
                value={item.LicenseId}
                type="checkbox"
                onChange={(e) => onClickLiencesCheckbox(e, item, parentCheck)}
                className="custom-control-input sub-checkbox"
                id={item.LicenseId}
                name="example2"
                checked={
                  selectedLiecenseIdArray &&
                  selectedLiecenseIdArray.length > 0 &&
                  selectedLiecenseIdArray.includes(item.LicenseId)
                }
              />
              <label className="custom-control-label" htmlFor={item.LicenseId}>
                &nbsp;
              </label>
            </div>
            <span className="bold-text">{item.LicenseCode}</span>:
            <span className="small-gray">{item.Category}</span>
          </div>
          <div className="tasks-count d-block d-sm-none">{item.Flag} Tasks</div>
        </div>
        <div className="col-6 col-md-6 pl-2 d-none d-sm-block">
          <div className="tasks-count">{item.Flag} Tasks</div>
        </div>
      </div>
    );
  };

  const chooseImage = (index) => {
    if (index == 0 || index % 5 == 0) {
      return assignIcon1;
    }
    if (index == 1 || index % 5 == 1) {
      return assignIcon2;
    }
    if (index == 2 || index % 5 == 2) {
      return assignIcon3;
    }
    if (index == 3 || index % 5 == 3) {
      return assignIcon4;
    }
    if (index == 4 || index % 5 == 4) {
      return assignIcon5;
    }
  };

  const renderCheckBox = (item, index) => {
    let temp = item.EntityName;
    let isChecked = null;
    item.LicenseList.some((x) => {
      if (selectedLiecenseIdArray.indexOf(x.LicenseId) === -1) {
        isChecked = false;
        return true;
      } else {
        isChecked = true;
        return false;
      }
    });
    return (
      <input
        type="checkbox"
        value={temp}
        onChange={(e) => onClickLiencesCheckbox(e, item, null)}
        className="custom-control-input"
        id={temp}
        name={temp}
        checked={isChecked}
      />
    );
  };
  return (
    <div className="get-main">
      <div className="container-fluid pl-0 pr-0">
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
                  onClick={() => callClose(2)}
                  src={closeIcon}
                  alt="closeIcon"
                />
              </div>
              <div className="col-6 pl-0 d-block d-sm-none text-right mt-0">
                <button
                  style={{ zIndex: "99999999" }}
                  disabled={
                    selectedLiecenseIdArray &&
                    selectedLiecenseIdArray.length === 0
                  }
                  onClick={() => setCerificateDetailsMobile()}
                  className="btn mb-2 save-details common-button-next"
                >
                  CONFIRM
                </button>
              </div>
            </div>
            <p className="licenses-title">
              {" "}
              Choose Licenses
              {/* <span className="search-icon"><img onClick={() => setSearchEnable(true)} src={search} alt="search Icon" /></span> */}
            </p>
          </div>
        </div>

        <div className="scroll-div">
          <div className="scroll-div">
            {licenseList &&
              licenseList.length > 0 &&
              licenseList.map((item, index) => (
                <div
                  key={index}
                  id={`grid${item.EntityName}`}
                  className="accordian-grid drower"
                >
                  <div className="row">
                    <div className="col-10 col-sm-6 col-md-6 col-xl-6">
                      <div className="two-icon choose-licence-btn">
                        <div className="down-arrow">
                          <div className="custom-control custom-checkbox">
                            {renderCheckBox(item, index)}
                            <label
                              className="custom-control-label"
                              htmlFor={item.EntityName}
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                        <div className="assign-icon">
                          <img src={chooseImage(index)} alt="assignIcon" />
                        </div>
                        <div className="gst-type-licence">
                          {item.EntityName}
                          <div className="count-task-num d-block d-sm-none">
                            {" "}
                            {item.LicenseList && item.LicenseList.length}{" "}
                            Licenses{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-sm-4 col-md-4 pl-0 d-none d-sm-block">
                      <div className="count-task-num">
                        {" "}
                        {item.LicenseList &&
                          item.LicenseList.length} Licenses{" "}
                      </div>
                    </div>
                    <div
                      onClick={() => onClickArrow(item.EntityName)}
                      className="col-2 col-sm-2 col-md-2"
                    >
                      <div className="liecense down-arrow float-right">
                        <div
                          id={`arrow${item.EntityName}`}
                          className="downArrow"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    id={`content${item.EntityName}`}
                    className="accordian-bar-with-min accordian-grid accordian-grid-active border-0"
                  >
                    <div>
                      {item.LicenseList.map((subTask) => (
                        <div>{renderData(subTask, item.LicenseList)}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bottom-logo-strip-drower">
          <div className="row aligncenter">
            <div className="col-12">
              {selectedLiecenseIdArray &&
              selectedLiecenseIdArray.length !== 0 ? (
                <button
                  disabled={
                    selectedLiecenseIdArray &&
                    selectedLiecenseIdArray.length === 0
                  }
                  onClick={() => setCerificateDetails()}
                  style={{
                    backgroundColor:
                      selectedLiecenseIdArray &&
                      selectedLiecenseIdArray.length === 0
                        ? "#e4e4e4"
                        : "#6c5dd3",
                    color:
                      selectedLiecenseIdArray &&
                      selectedLiecenseIdArray.length === 0 &&
                      "#aeaeae",
                  }}
                  className="btn save-details common-button-drower  mb-2"
                >
                  Add selected licences
                </button>
              ) : (
                <button
                  disabled={
                    selectedLiecenseIdArray &&
                    selectedLiecenseIdArray.length === 0
                  }
                  style={{
                    backgroundColor:
                      selectedLiecenseIdArray &&
                      selectedLiecenseIdArray.length === 0
                        ? "#e4e4e4"
                        : "#6c5dd3",
                    color:
                      selectedLiecenseIdArray &&
                      selectedLiecenseIdArray.length === 0 &&
                      "#aeaeae",
                  }}
                  className="btn save-details common-button-drower  mb-2"
                >
                  Add selected licences
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditLicenses;
