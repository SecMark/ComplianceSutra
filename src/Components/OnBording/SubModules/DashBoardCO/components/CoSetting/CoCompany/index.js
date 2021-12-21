import React, { useEffect, useState, useMemo } from "react";
import "./style.css";
import blackDeleteIcon from "../../../../../../../assets/Icons/blackDeleteIcon.png";
import redCheck from "../../../../../../../assets/Icons/redCheck.png";
import grayCheck from "../../../../../../../assets/Icons/grayCheck.png";
import greenCheck from "../../../../../../../assets/Icons/greenCheck.png";
import assignIconCircle from "../../../../../../../assets/Icons/assignIconCircle.png";
import smallClose from "../../../../../../../assets/Icons/smallClose.png";
import closeBlack from "../../../../../../../assets/Icons/closeBlack.png";
import checkIocnSmall from "../../../../../../../assets/Icons/checkIocnSmall.png";
import { actions as companyAction } from "../../../../../../OnBording/redux/actions";
import mobileAssignIconSmall from "../../../../../../../assets/Icons/mobileAssignIconSmall.png";
import grayPlusIcon from "../../../../../../../assets/Icons/grayPlusIcon.png";
import whiteDeleteIcon from "../../../../../../../assets/Icons/whiteDeleteIcon.png";
import plusIcon2 from "../../../../../../../assets/Icons/plusIcon3.png";

import { toast } from "react-toastify";
import { actions as coActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../../../../../apiServices";
import { useOuterClick } from "./utils";
import { Modal } from "react-responsive-modal";
import Searchable from "react-searchable-dropdown";
import { isMobile } from "react-device-detect";
import plusIcon from "../../../../../../../assets/Icons/plusIcon3.png";
import License from "../ChooseLicenses/License";
import countryList from "react-select-country-list";
import axiosInstance from "../../../../../../../apiServices";
import Select from "react-select";

function CoManagment({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const options = useMemo(() => countryList().getData(), []);
  const [editShow, setEditShow] = useState(false);
  const [doEdit, setdoEdit] = useState(undefined);
  const [showAdd, setShowAdd] = useState(false);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [companyDetailsBackup, setCompanyDetailsBackup] = useState([]);
  const [companyTypesBackup, setCompanyTypesBackup] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);

  const [categoryTypesBackup, setCategoryTypesBackup] = useState([]);
  const [coHoveredIndex, setCoHoveredIndex] = useState(undefined);
  const [licenseModalHideShow, setLicenseModalHideShow] = useState(false);
  const [fields, setFields] = useState(null);
  const [userData, setUserData] = useState([]);
  const [addAnotherCompliance, setAddanotherCompiance] = useState([]);
  const [userDataBackup, setUserDataBackup] = useState([]);
  const [assignPromptIndex, setAssignPromptIndex] = useState(undefined);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [selectedCompany, setSelectedCompany] = useState(undefined);
  const [undoSelectedCompany, setUndoSelectedCompany] = useState(undefined);
  const [toastType, setToastType] = useState(undefined);
  const [deleteBoxHideShow, setDeleteBoxHideShow] = useState(false);
  const [userSearchText, setUserSearchText] = useState("");
  const [companyTypeInfo, setCompanyTypeoInfo] = useState([]);
  const [validEmail, setValidEmail] = useState(true);
  const [validPincode, setValidPincode] = useState("");
  const [err, setErr] = useState(true);
  const innerRef = useOuterClick((e) => {
    if (
      assignPromptIndex != undefined &&
      !e.target.id.includes("assign-prompt")
    )
      setAssignPromptIndex(undefined);
  });

  const loggedUser =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo;

  // useEffect(() => {
  //   let array = [];
  //   let mobArray2 = [];
  //   const companyType =
  //     state &&
  //     state?.complianceOfficer &&
  //     state?.complianceOfficer?.companyInfo?.companyLicenseData;

  //   companyType?.company_list.map((item) => {
  //     array.push({ value: item, label: item });
  //   });

  //   companyType &&
  //     companyType.Industry_list.map((item) => {
  //       mobArray2.push({ value: item, label: item });
  //     });

  //   setCategoryTypes(mobArray2);
  //   setCompanyTypeoInfo(array);
  // }, []);

  useEffect(() => {
    initialDispatch();
    fetchIndustryCompnayType();
    // dispatch(companyAction.companyTypeRequest());
  }, []);
  const setData = (index) => {
    var companyList = companyDetails;
    companyList[index].isEdited = true;
    setCompanyDetails(companyList);
    setdoEdit(index);
    setEditShow(true);
  };
  const initialDispatch = () => {
    setSelectedIndex(undefined);
    setSelectedCompany(undefined);
    setCompanyDetails([]);
    dispatch(coActions.getCompanyTypeRequest());
  };

  const selectStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgb(228 228 228/30%)",
      border: "0px",
      borderRadius: "5px",
    }),
  };
  const fetchIndustryCompnayType = () => {
    api
      .post("compliance.api.getIndustryCompanyDetails")
      .then((response) => {
        if (response.data.message.status === true) {
          let array = [];
          let mobArray2 = [];

          response.data.message?.company_list.map((item) => {
            array.push({ value: item, label: item });
          });

          response.data.message?.Industry_list.map((item) => {
            mobArray2.push({ value: item, label: item });
          });

          setCategoryTypes(mobArray2);
          setCompanyTypeoInfo(array);
        } else {
          toast.error(
            response.data.message.status_response,
            "failed to load compnay list and industry list"
          );
        }
      })
      .catch((error) => {
        toast.error(error, "failed to load compnay list and industry list");
      });
  };

  useEffect(() => {
    const tempUsers =
      state &&
      state.taskReport &&
      state.taskReport.companyTypeInfo &&
      state.taskReport.companyTypeInfo.CompanyInfo;
    if (tempUsers != undefined && tempUsers?.length > 0) {
      let users = [];
      tempUsers.forEach((element) => {
        element.compliance_officer.map((item) => {
          const obj = {
            UserName: item.full_name,
            userEmail: item.email,
          };
          users.push(obj);
        });
      });

      setUserData(users);
      setUserDataBackup(users);
    }
  }, [state.taskReport.companyTypeInfo.CompanyInfo]);
  useEffect(() => {
    let addEditStatus =
      state &&
      state.taskReport &&
      state.taskReport.CompanyAddEditStatus &&
      state.taskReport.CompanyAddEditStatus.Status;
    if (addEditStatus != undefined) {
      if (addEditStatus === "Success" && selectedIndex != undefined) {
        setToastType(1);
        setErr(true);
        //document.getElementById("toasterPrompt").classList.add("show");
        setTimeout(() => {
          //document.getElementById("toasterPrompt").classList.remove("show");
          setSelectedCompany(undefined);
          setSelectedIndex(undefined);
          setCompanyDetails([]);
          initialDispatch();
        }, 5000);
      } else {
        setToastType(2);
        if (addEditStatus !== "Success") {
          setErr(false);
        }
      }
    }
  }, [state.taskReport.CompanyAddEditStatus]);

  useEffect(() => {
    const companyTypes =
      state && state?.taskReport && state?.taskReport?.companyTypeInfo;

    const updateCompanyDetails = companyTypes?.CompanyInfo?.map((values) => {
      return {
        company_docname: values.company_docname,
        company_name: values.company_name,
        company_type: values.company_type,
        company_country: values.company_country,
        company_pincode: values.company_pincode,
        business_category: values.business_category,
        compliance_officer: values.compliance_officer,
        licenses: values.license,
        selectedLicenseArray: values.license,
        companyNameError: "",
        pinCodeError: "",
        isExist: true,
        isEdited: false,
      };
    });

    setCompanyDetails(updateCompanyDetails);
    setCompanyDetailsBackup(updateCompanyDetails);
  }, [state.taskReport.companyTypeInfo.CompanyInfo]);

  const getNameInitials = (name) => {
    if (name != undefined) {
      let initials = "";
      initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");
      return initials.toUpperCase();
    }
  };

  const handleAddCompany = () => {
    let tempNewCompany = {
      company_docname: "",
      company_name: "",
      company_type: "",
      company_country: "",
      company_pincode: "",
      business_category: "",
      compliance_officer: [],
      licenses: [],
      selectedLicenseArray: [],
      companyNameError: "",
      pinCodeError: "",
      isExist: false,
      isEdited: true,
    };

    var tempCompanyData = [...companyDetails];
    tempCompanyData.push(tempNewCompany);
    setCompanyDetails(tempCompanyData);
    setSelectedIndex(tempCompanyData?.length - 1);
    setShowAdd(true);
  };

  const pinCodeValidation = async (pincode, index) => {
    if (pincode !== "") {
      let payload = {
        pincode: pincode,
      };
      let companyList = [...companyDetails];
      await api
        .post("compliance.api.checkPincode", payload)
        .then((response) => {
          if (response.data.message.status === !true) {
            companyList[index].pinCodeError = "Invalid Pincode";
            let Button = document.getElementById("addLicense" + index);
            Button.className = "btn buttonprimarygray";
            Button.disabled = true;
          } else if (response.data.message.status === true) {
            companyList[index].pinCodeError = "";
            let Button = document.getElementById("addLicense" + index);
            Button.className = "btn buttonprimary";
            Button.disabled = false;
          }
          setCompanyDetails(companyList);
        })
        .catch(function (error) {});
    }
  };

  const openChooseLicenseModel = (type, index, item) => {
    let selectedObj = companyDetails[index].business_category;
    let lic = companyDetails[index].licenses;
    let FieldObj = {
      ...fields,
      category: selectedObj,
      selectedLiecenseIdArray: lic,
    };
    setFields(FieldObj);
    dispatch(
      companyAction.getLicenseList({
        industry_type: companyDetails[index].business_category,
        country: companyDetails[index].company_country,
      })
    );
    if (!isMobile) {
      const drawerParent = document.getElementById("drawerParent");
      const drawerChild = document.getElementById("drawerChild");
      if (drawerParent) {
        drawerParent.classList.add("overlay");
        drawerChild.style.right = "0px";
      }
    }
    if (isMobile) {
      const drawerParent = document.getElementById("drawerParentMobile");
      const drawerChild = document.getElementById("drawerChildMobile");
      if (drawerParent) {
        drawerParent.classList.add("overlayAccount");
        drawerChild.style.bottom = "0%";
      }
    }
    setSelectedIndex(index);
    if (selectedCompany === undefined) {
      setSelectedCompany({ ...item });
    }

    setLicenseModalHideShow(true);
  };
  const handelChange = (e, name, index, item) => {
    let itemIndex = index;
    if (item.isExist && selectedCompany === undefined) {
      setSelectedCompany({ ...item });
    }
    let companyList = [...companyDetails];
    if (name === "company_name") {
      validateCompanyName(e, index);
      setEditShow(true);
      const re = /^(?=.*\S).+$/;
      if (e.target.value && !re.test(e.target.value)) {
        return "";
      } else {
        companyList[index].company_name = e.target.value;
      }
    } else if (name === "company_type") {
      setEditShow(true);
      companyList[index].company_type = e;
    } else if (name === "company_country") {
      let countryvalue = countryList().getLabel(e.value);
      setEditShow(true);
      companyList[index].company_country = countryvalue;
      companyList[index].licenses = "";
    } else if (name === "company_pincode") {
      let { value } = e.target;
      pinCodeValidation(value, index);
      setEditShow(true);
      companyList[index].company_pincode = e.target.value;
    } else if (name === "compliance_officer") {
      setEditShow(true);
      companyList[index].compliance_officer = [
        {
          email: e.userEmail || e.email || e.EmailID,
          full_name: e.UserName,
        },
      ];
      setAssignPromptIndex(undefined);
      hideBlock();
    } else {
      companyList[index].business_category = e;
      companyList[index].licenses = "";
      setSelectedIndex(index);
      setEditShow(true);
      setShowAdd(true);
      // if (item.isExist) {
      //   if (
      //     selectedCompany != undefined &&
      //     companyList[index].Category === selectedCompany.Category
      //   ) {
      //     companyList[index].selectedLicenseArray =
      //       selectedCompany.selectedLicenseArray;
      //     if (
      //       companyList[index].EntityTypeID === selectedCompany.EntityTypeID &&
      //       companyList[index].Category === selectedCompany.Category &&
      //       companyList[index].coUserID === selectedCompany.coUserID
      //     ) {
      //       setSelectedIndex(undefined);
      //       itemIndex = undefined;
      //     }
      //   } else {
      //     companyList[index].selectedLicenseArray = [];
      //   }
      // } else {
      //   companyList[index].selectedLicenseArray = [];
      // }
    }
    setSelectedIndex(itemIndex);
    setCompanyDetails(companyList);
  };

  const validateExistingName = (e, index) => {
    if (
      e.target.value != selectedCompany.company_name &&
      e.target.value != ""
    ) {
      validateCompanyName(e, index);
    } else {
      let tempCoCompany = [...companyDetails];
      const isSameLicenses = checkWithPreviousLicenses(
        selectedCompany.selectedLicenseArray,
        tempCoCompany[index].selectedLicenseArray
      );
      tempCoCompany[index].company_name = selectedCompany.company_name;
      tempCoCompany[index].isEdited = false;

      if (
        tempCoCompany[index].company_docname ===
          selectedCompany.company_docname &&
        tempCoCompany[index].business_category ===
          selectedCompany.business_category &&
        tempCoCompany[index].company_docname ===
          selectedCompany.company_docname &&
        isSameLicenses === true
      ) {
        setSelectedIndex(undefined);
        setSelectedCompany(undefined);
      }
      setCompanyDetails(tempCoCompany);
    }
  };
  const validateCompanyName = (e, index) => {
    if (e.target.value != "") {
      let payload = {
        company_name: e.target.value.trim(),
      };
      let companyList = [...companyDetails];
      api
        .post("compliance.api.avabilityCheck", payload)
        .then(function (response) {
          if (response && response.data && response.data.message.status) {
            companyList[index].companyNameError = "Company alreday exists";
            if (!companyList[index].isExist) {
              let Button = document.getElementById("addLicense" + index);
              Button.className = "btn buttonprimarygray";
              Button.disabled = true;
            }
          } else {
            companyList[index].companyNameError = "";
            if (
              companyList[index].company_name != null &&
              companyList[index].business_category != null &&
              //companyList[index].coUserID != null &&
              !companyList[index].isExist
            ) {
              let Button = document.getElementById("addLicense" + index);
              Button.className = "btn buttonprimary";
              Button.disabled = false;
            }
          }
          setCompanyDetails(companyList);
        })
        .catch(function (error) {
          if (error) {
          }
        });
    } else {
      let companyList = [...companyDetails];
      companyList[index].companyNameError = "";
      setCompanyDetails(companyList);
    }
  };

  const checkWithPreviousLicenses = (prevLicenses, newLicenses) => {
    let status = undefined;
    newLicenses.some((item) => {
      if (!prevLicenses.includes(item)) {
        status = false;
        return true;
      }
    });
    return status;
  };

  const close = (fieldData) => {
    if (!isMobile) {
      const drawerParent = document.getElementById("drawerParent");
      const drawerChild = document.getElementById("drawerChild");
      if (drawerParent) {
        drawerParent.classList.remove("overlay");
        drawerChild.style.right = "-100%";
      }
      setLicenseModalHideShow(false);
    }
    if (isMobile) {
      const drawerParent = document.getElementById("drawerParentMobile");
      const drawerChild = document.getElementById("drawerChildMobile");
      if (drawerParent) {
        drawerParent.classList.remove("overlayAccount");
        drawerChild.style.transition = "1.5s linear;";
        drawerChild.style.bottom = "-100%";
      }
      setLicenseModalHideShow(false);
    }
    setSelectedIndex(fieldData);
    // setSelectedCompany(undefined);
    // let tempCoCompany = [...companyDetails];
    // const isSameLicenses = checkWithPreviousLicenses(
    //   selectedCompany.selectedLicenseArray,
    //   fields.selectedLiecenseIdArray
    // );
    // if (isSameLicenses === false || isSameLicenses === undefined) {
    //   tempCoCompany[selectedIndex].selectedLicenseArray =
    //     fields.selectedLiecenseIdArray;
    //   setCompanyDetails(tempCoCompany);
    // } else {
    //   if (
    //     tempCoCompany[selectedIndex].company_docname ===
    //       selectedCompany.company_docname &&
    //     tempCoCompany[selectedIndex].business_category === selectedCompany.business_category &&
    //     tempCoCompany[selectedIndex].company_docname === selectedCompany.company_docname &&
    //     tempCoCompany[selectedIndex].company_type === selectedCompany.company_type
    //   ) {
    //     setSelectedIndex(undefined);
    //     setSelectedCompany(undefined);
    //   }
    // }
  };
  const addLicense = (index, licenseList) => {
    setEditShow(true);
    setFields({
      ...fields,
      selectedLiecenseIdArray: licenseList,
    });

    let compDetails = [...companyDetails];

    compDetails[index].licenses = licenseList;
    setCompanyDetails(compDetails);
    setEditShow(true);
  };

  const handleDeleteClick = (item, flag) => {
    if (flag === 1) {
      if (selectedIndex === undefined && companyDetails?.length > 1) {
        setSelectedCompany({ ...item });
        setDeleteBoxHideShow(true);
      }
    } else if (flag === 2) {
      dispatch(
        coActions.deleteCompanyRequest({
          company: selectedCompany.company_docname,
        })
      );
      setDeleteBoxHideShow(false);
    } else {
      setSelectedCompany(undefined);
      setDeleteBoxHideShow(false);
    }
  };
  const editCompanymobile = (item, index) => {
    return (
      <>
        {
          <div className="company-detail-mobile-box">
            {/* {item.company_name!= "" &&  <div className="brokrage-title">{item.company_name}</div>} */}
            <div class="">
              <div class="input-box-mobile">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder={"Enter Name"}
                  id={"nameInputBox" + index}
                  autoComplete="off"
                  name="company_name"
                  disabled={item.isExist ? true : false}
                  value={item.company_name}
                  onBlur={(e) => {
                    !item.isExist
                      ? validateCompanyName(e, index)
                      : validateExistingName(e, index);
                  }}
                  onChange={(e) =>
                    selectedIndex === undefined || selectedIndex === index
                      ? handelChange(e, "company_name", index, item)
                      : true
                  }
                />
              </div>

              {/* <div className="input-box-mobile">
                {companyTypes && companyTypes?.length > 0 && (
                  <Searchable
                    value={item.selectedCompany}
                    className="form-control border-0"
                    placeholder={
                      item.company_type ? item.company_type : "Select Type"
                    } // by default "Search"
                    notFoundText="No result found" // by default "No result found"
                    options={companyTypes}
                    onSelect={(e) =>
                      selectedIndex === undefined || selectedIndex === index
                        ? handelChange(e, "company_type", index, item)
                        : true
                    }
                    listMaxHeight={200} //by default 140
                  />
                )}
              </div> */}

              <div class="input-box-mobile">
                {categoryTypes && categoryTypes?.length > 0 && (
                  <Searchable
                    value={item.selectedCompany}
                    className="form-control border-0"
                    placeholder={
                      item.business_category
                        ? item.business_category
                        : "Select Category"
                    } // by default "Search"
                    notFoundText="No result found" // by default "No result found"
                    options={categoryTypes}
                    onSelect={(e) =>
                      selectedIndex === undefined || selectedIndex === index
                        ? handelChange(e, "companyCategory", index, item)
                        : true
                    }
                    listMaxHeight={200} //by default 140
                  />
                )}
              </div>
              <div className="input-box-mobile d-flex align-items-center justify-content-start">
                <div className="assign-co">Type:</div>
                {companyTypeDropDown(item, index)}
              </div>
              <div className="input-box-mobile d-flex align-items-center justify-content-start">
                <div className="assign-co">Country:</div>
                <div className="holding-list-bold-title">
                  <Select
                    options={options}
                    value={{
                      value: item.company_country,
                      label: item.company_country,
                    }}
                    styles={selectStyle}
                    onChange={(e) =>
                      selectedIndex === undefined || selectedIndex === index
                        ? handelChange(e, "company_country", index, item)
                        : true
                    }
                  />
                </div>
              </div>
              <div className="input-box-mobile d-flex align-items-center justify-content-start">
                <div className="assign-co">Pincode:</div>
                <div className="bk-Securities">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Pincode"
                    name="company_pincode"
                    value={item.company_pincode}
                    onChange={(e) =>
                      selectedIndex === undefined || selectedIndex === index
                        ? handelChange(e, "company_pincode", index, item)
                        : true
                    }
                  />
                  {item.pinCodeError != "" && (
                    <p className="input-error-message">{item.pinCodeError}</p>
                  )}
                </div>
              </div>
              <div className="flex mb-3">
                <div className="col-3 pl-0 pr-0">
                  <div className="assign-co">Assign CO:</div>
                </div>
                <div className="col-9 pr-0 pl-0">
                  {item.compliance_officer &&
                    item?.compliance_officer?.length > 0 && (
                      <div
                        className="d-flex"
                        style={{ marginLeft: 15 }}
                        onClick={() =>
                          selectedIndex === undefined || selectedIndex === index
                            ? showBlock()
                            : true
                        }
                      >
                        <div class="login-assign-count-mobile">
                          {getNameInitials(
                            item?.compliance_officer[0].full_name
                          )}
                        </div>
                        <div class="login-assign-title-strip">
                          {item?.compliance_officer[0].full_name ||
                            item?.compliance_officer[0].email}
                        </div>
                      </div>
                    )}

                  {!item.isExist && item?.compliance_officer?.length === 0 && (
                    <div
                      className="assign-circle-text"
                      onClick={() =>
                        selectedIndex === undefined || selectedIndex === index
                          ? showBlock()
                          : true
                      }
                    >
                      <img src={mobileAssignIconSmall} alt="close Gray Icon" />{" "}
                      assign
                    </div>
                  )}
                  {/* <img src={mobileAssignIconSmall} alt="close Gray Icon" /> assign</div> */}
                  <div id="drawerParent2" className="">
                    <div
                      id="drawerChild2"
                      className="sideBarAssignTaskSettings"
                    >
                      <div
                        className="d-flex"
                        style={{ padding: 20, paddingLeft: 0 }}
                      >
                        <div className="col-2 col-sm-12 col-md-12 col-xl-12 d-block d-sm-none">
                          <img
                            className="close-icon-personal"
                            src={closeBlack}
                            alt="close Black"
                            onClick={() => {
                              hideBlock();
                            }}
                          />
                        </div>
                        <div className="col-10 col-sm-12 col-md-12 col-xl-12 pl-0">
                          <div className="personal-mgt-title">Assign CO</div>
                        </div>
                      </div>
                      <div className="bottom-tool-tip" style={{ left: 1 }}>
                        <div className="tool-tip-head">
                          <div className="add-Email">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name or email"
                                onChange={(e) => handleUserSearch(e)}
                                value={userSearchText}
                              />
                            </div>
                            <span className="or-devider"> or</span>
                            <button
                              className="btn save-details assign-me"
                              onClick={() =>
                                handelChange(
                                  loggedUser,
                                  "compliance_officer",
                                  index,
                                  item
                                )
                              }
                            >
                              Assign to me
                            </button>
                          </div>
                        </div>
                        <div className="divide-space">
                          <div className="space-border-header"></div>
                        </div>
                        <div className="email-list-box">
                          {userData &&
                            userData?.length > 0 &&
                            userData.map((user) => {
                              return (
                                <>
                                  <div
                                    className="email-list-row"
                                    onClick={() =>
                                      handelChange(
                                        user,
                                        "compliance_officer",
                                        index,
                                        item
                                      )
                                    }
                                  >
                                    <span className="name-circle">
                                      {getNameInitials(user.UserName)}
                                    </span>
                                    <span className="name-of-emailer">
                                      {user.UserName}
                                    </span>
                                    <span className="last-email-box">
                                      {user.userEmail}
                                    </span>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {item.licenses?.length > 0 && (
                <div className="flex">
                  <div className="col-3 pl-0 pr-0">
                    <div className="liences-mobile">Licenses:</div>
                  </div>
                  <div className="col-9 pr-0 pl-0">
                    <div className="d-flex">
                      <div
                        style={{ marginLeft: 15 }}
                        class="assign-total-count-mobile"
                        onClick={() => openChooseLicenseModel(2, index, item)}
                      >
                        {item.licenses?.length > 0 ? item.licenses?.length : ""}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div class="input-box-mobile mb-0">
                {item.licenses?.length === 0 && (
                  <button
                    onClick={() => openChooseLicenseModel(2, index, item)}
                    // className={
                    //   checkButtonDisabledColor(index)
                    //     ? " btn add-license-mobile "
                    //     : "btn add-license-mobile-co-company"
                    // }
                    disabled={
                      item.company_name === "" ||
                      item.company_type === "" ||
                      item.business_category === "" ||
                      item.companyNameError !== "" ||
                      item.company_country === ""
                    }
                    className={`${
                      item.company_name === "" ||
                      item.company_type === "" ||
                      item.business_category === "" ||
                      item.companyNameError !== "" ||
                      item.company_country === ""
                        ? "btn add-license-mobile-co-company"
                        : "btn add-license-mobile"
                    }`}
                  >
                    add licenses
                    {item.company_name === "" ||
                    item.company_type === "" ||
                    item.business_category === "" ||
                    item.companyNameError !== "" ||
                    item.company_country === "" ? (
                      <img src={grayPlusIcon} alt="grayPlusIcon" />
                    ) : (
                      <img
                        src={plusIcon2}
                        alt="PlusIcon"
                        className="addLicencePlus2"
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
            <div class="">
              <div class="row align-right">
                <div class="col-12 col-sm-12 col-md-12 col-xl-12 flex">
                  <div
                    class="cancel-link-mobile"
                    onClick={() => handleUndoChanges(index)}
                  >
                    CANCEL
                  </div>
                  <button
                    className={
                      item.business_category !== "" &&
                      item.company_name !== "" &&
                      item.company_type !== "" &&
                      item.licenses?.length !== 0 &&
                      item.company_pincode !== "" &&
                      item.company_country !== ""
                        ? "btn mobile-save-company-blue"
                        : "btn mobile-save-company"
                    }
                    disabled={
                      item.business_category !== "" &&
                      item.company_name !== "" &&
                      item.company_type !== "" &&
                      item.licenses?.length !== 0 &&
                      item.company_pincode !== "" &&
                      item.company_country !== ""
                        ? false
                        : true
                    }
                    onClick={() => handleSaveChanges(index)}
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </>
    );
  };
  const addNewCompanymobile = (item, index) => {
    if (
      item.company_type === "" ||
      item.business_category == "" ||
      item.Licenses?.length === 0 ||
      item.isEdited ||
      item.company_name === ""
    ) {
      return <>{editCompanymobile(item, index)}</>;
    } else {
      return (
        <>
          <div class="company-details-mobile-view">
            <div class="d-flex">
              <div class="col-10 pl-0">
                <div className="d-flex">
                  <div class="bk-seq-title-mobile">{item.company_name}</div>
                  <div class="license-count-selected-mobile">
                    {item.selectedLicenseArray?.length}
                  </div>
                </div>
              </div>
              <div class="col-2 pr-0">
                <div class="mobile-edit-option" onClick={() => setData(index)}>
                  edit
                </div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-12 pl-0 pb-2">
                <div className="">
                  <div class="comapany-label-mobile">{item.company_type}</div>
                  <div class="comapany-label-mobile">
                    {item.business_category}
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-10 pl-0">
                <div className="d-flex">
                  <div class="license-count-mobile">
                    {item?.compliance_officer?.length > 0 &&
                      getNameInitials(item?.compliance_officer[0]?.full_name)}
                  </div>
                  <div class="bk-seq-title-bottom-mobile">
                    {item?.compliance_officer?.length > 0 &&
                      item?.compliance_officer[0]?.full_name}
                  </div>
                </div>
              </div>
              <div class="col-2 pr-0">
                <div class="edit-delete">
                  <div class="">
                    {companyDetails?.length > 0 && (
                      <img
                        className=""
                        src={whiteDeleteIcon}
                        alt="white Delete Icon"
                        onClick={() => handleDeleteClick(item, 1)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {companyDetails[index].isEdited && editCompanymobile(item, index)}
        </>
      );
    }
  };

  const renderConfirmationModel = () => {
    const currentCompanyName = selectedCompany.EntityName;
    return (
      <Modal
        blockScroll={false}
        classNames={{
          overlayAnimationIn: "",
          overlayAnimationOut: "",
          modalAnimationIn: "",
          modalAnimationOut: "",
          modal: "customModal-company",
        }}
        open={deleteBoxHideShow}
        center={true}
        showCloseIcon={false}
        onClose={() => handleDeleteClick(null, 3)}
        //modalId="governance"
        styles={{ width: 373, height: 210, overflow: "hidden" }}
        onOverlayClick={() => handleDeleteClick(null, 3)}
      >
        <div className="model-design-delete-company big-height-company">
          <div className="delete-record-title">Delete company record?</div>
          <div className="delete-desc">
            Are you sure you want to delete the record of &nbsp;
            {currentCompanyName}&nbsp;? All selected licenses and assigned tasks
            will be deleted.
          </div>
          <div className="last-two-model-btn">
            <button
              onClick={() => handleDeleteClick(null, 3)}
              className="btn cancel-delete"
            >
              CANCEL
            </button>
            <button
              onClick={() => handleDeleteClick(selectedCompany, 2)}
              className="btn delete-Record"
            >
              DELETE
            </button>
          </div>
        </div>
      </Modal>
    );
  };
  const handleUndoChanges = (index, item) => {
    setSelectedCompany({ ...item });
    setUndoSelectedCompany({ ...item });
    let tempCoCompany = [...companyDetails];
    if (tempCoCompany[index]?.isExist) {
      tempCoCompany[index] = {
        ...tempCoCompany[index],
        ...selectedCompany,
        isEdited: false,
        pinCodeError: "",
      };
    } else {
      tempCoCompany.splice(index, 1);
    }
    setdoEdit(index);
    setEditShow(false);
    setSelectedCompany(undefined);
    setSelectedIndex(undefined);
    setShowAdd(false);
    setCompanyDetails(tempCoCompany);
  };
  const handleSaveChanges = (index) => {
    let tempCoCompany = [...companyDetails];
    const payload = {
      company_docname: tempCoCompany[index].company_docname,
      company_name: tempCoCompany[index].company_name,
      company_type: tempCoCompany[index].company_type,
      company_country: tempCoCompany[index].company_country,
      company_pincode: tempCoCompany[index].company_pincode,
      business_category: tempCoCompany[index].business_category,
      compliance_officer: tempCoCompany[index].compliance_officer,
      licenses: tempCoCompany[index].licenses,
    };

    dispatch(coActions.insCertificateDetailsRequest(payload));

    setShowAdd(false);
    setEditShow(undefined);
    // setSelectedIndex(undefined);
    tempCoCompany[index].isEdited = false;
    setCompanyDetails(tempCoCompany);
  };

  const handleOnNameClick = (index, item) => {
    if (selectedIndex === undefined || selectedIndex === index) {
      let tempCoCompany = [...companyDetails];
      tempCoCompany[index].isEdited = true;
      setSelectedIndex(index);
      setSelectedCompany({ ...item });
      setCompanyDetails(tempCoCompany);
      setTimeout(() => {
        document.getElementById("nameInputBox" + index).focus();
      }, 500);
    }
  };

  const handleUserSearch = (e) => {
    setUserSearchText(e.target.value);
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      )
    ) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
    if (e.target.value === "") {
      setUserData(userDataBackup);
    } else {
      let tempArray = [];
      userDataBackup.filter((item) => {
        if (
          item.UserName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.userEmail.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          tempArray.push(item);
        }
      });
      setUserData(tempArray);
      setAddanotherCompiance(tempArray);
    }
  };

  const checkButtonDisabledColor = (key) => {
    const list = [...companyDetails];
    let isNext = true;
    list &&
      list.map((item, index) => {
        if (index === key) {
          if (
            item.company_name === "" ||
            item.business_category === "" ||
            item.companyNameError !== "" ||
            item.license?.length === 0 ||
            validEmail
          ) {
            isNext = false;
            return isNext;
          }
        }
      });
    return isNext;
  };

  const showBlock = () => {
    const drawerParent = document.getElementById("drawerParent2");
    const drawerChild = document.getElementById("drawerChild2");
    if (drawerParent) {
      drawerParent.classList.add("overlayAssignTask");
      drawerChild.style.bottom = "0%";
    }
  };
  const hideBlock = () => {
    const drawerParent = document.getElementById("drawerParent2");
    const drawerChild = document.getElementById("drawerChild2");
    if (drawerParent) {
      drawerParent.classList.remove("overlayAssignTask");
      drawerChild.style.bottom = "-100%";
    }
  };

  const companyTypeDropDown = (item, index) => {
    return (
      <div className="holding-list-bold-title">
        {/* <Searchable
          value={{value : item.company_type
      }}
          className="form-control border-0"
          placeholder={item.company_type ? item.company_type : "Select Type"}
           // by default "No result found hj"
          options={companyTypeInfo}
          onSelect={(e) =>
            selectedIndex === undefined || selectedIndex === index
              ? handelChange(e, "company_type", index, item)
              : true
          }
          listMaxHeight={200}
        /> */}
        <Select
          value={{ value: item.company_type, label: item.company_type }}
          styles={selectStyle}
          options={companyTypeInfo}
          onChange={(e) =>
            selectedIndex === undefined || selectedIndex === index
              ? handelChange(e.value, "company_type", index, item)
              : true
          }
        />
      </div>
    );
  };
  const countryDropDown = () => {};
  const businessCategoryDropDown = () => {};
  return (
    <div className="co-personal-grid">
      {!isMobile && (
        <div id="drawerParent" className="">
          <div id="drawerChild" className="sideBarFixed">
            {licenseModalHideShow && (
              <License
                setEditShow={setEditShow}
                fields={fields}
                addLicense={addLicense}
                index={selectedIndex}
                closeDrawer={close}
              />
            )}
          </div>
        </div>
      )}
      {isMobile && (
        <div id="drawerParentMobile" className="">
          <div id="drawerChildMobile" className="sideBarFixedAccount">
            {licenseModalHideShow && (
              <License
                setEditShow={setEditShow}
                fields={fields}
                addLicense={addLicense}
                index={selectedIndex}
                closeDrawer={close}
              />
            )}
          </div>
        </div>
      )}
      {deleteBoxHideShow && renderConfirmationModel()}
      <div className="d-flex">
        <div className="col-10 col-sm-12 col-md-12 col-xl-12 pl-0">
          <div className="personal-mgt-title">Company</div>
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
      <div className="border-header d-none d-sm-block"></div>
      <div class="d-block d-sm-none">
        {/* { companyDetailsBackup && companyDetailsBackup.map((item,index)=>
                {
                return (<>
                <div class="company-details-mobile-view">
                    <div class="d-flex">
                        <div class="col-10 pl-0">
                            <div className="d-flex"> 
                                <div class="bk-seq-title-mobile">{item.company_name}</div>
                                <div class="license-count-selected-mobile">{item.selectedLicenseArray?.length}</div>
                            </div>
                        </div>
                        <div class="col-2 pr-0">
                            <div class="mobile-edit-option" onClick={() => setData(index)}>edit</div>
                            
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-12 pl-0 pb-2">
                            <div className="">
                                <div class="comapany-label-mobile">{item.company_type}</div>
                                <div class="comapany-label-mobile">{item.business_category}</div>                                
                            </div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-10 pl-0">
                            <div className="d-flex">
                                <div class="license-count-mobile">{getNameInitials(item.CO)}</div>
                                <div class="bk-seq-title-bottom-mobile">{item.CO}</div>
                            </div>
                        </div>
                        <div class="col-2 pr-0">
                            <div class="edit-delete">
                                <div class="">
                                    { companyDetailsBackup?.length > 1 && <img className="" src={whiteDeleteIcon} alt="white Delete Icon" onClick={() => handleDeleteClick(item, 1)}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {editShow && doEdit != undefined && doEdit == index && editCompanymobile(item,index)}
                </>
                )})} */}

        <div className="col-12 pl-0 pr-0">
          {companyDetails &&
            companyDetails.map((item, index) => {
              return addNewCompanymobile(item, index);
            })}
          {/* <div class="col-12 pl-0">
                            <caption className="add-company-link" onClick={() => (selectedIndex === undefined) ? handleAddCompany() : null} >
                                Add another company
                            </caption>
                    </div>  */}
        </div>

        <div class="col-12 pl-0">
          <caption
            className="add-company-link"
            onClick={() =>
              selectedIndex === undefined ? handleAddCompany() : null
            }
          >
            Add another company
          </caption>
        </div>
      </div>
      <div className="scroll-personal-grid d-none d-sm-block table-responsive">
        <table className="settingCompanyTable table co-company-details-tbl table-responsive">
          <caption
            className="add-company-link"
            onClick={() =>
              selectedIndex === undefined ? handleAddCompany() : null
            }
          >
            Add another company
          </caption>
          <thead>
            <tr>
              <th scope="col">Company Name</th>
              <th scope="col">Company Type</th>
              <th scope="col">Country</th>
              <th scope="col">Pincode</th>
              <th scope="col">Business category</th>
              <th scope="col">Compliance Officer</th>
              <th scope="col">Licenses</th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {companyDetails?.map((item, index) => {
              return (
                <>
                  <tr className="focusRemove">
                    <td className="companyName">
                      {item?.isExist && !item?.isEdited && (
                        <div
                          className="bk-Securities"
                          onClick={() =>
                            selectedIndex === undefined ||
                            selectedIndex === index
                              ? handleOnNameClick(index, item)
                              : true
                          }
                        >
                          {item.company_name}
                        </div>
                      )}
                      {(!item.isExist || (item.isExist && item.isEdited)) && (
                        <>
                          <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Company Name"
                            id={"nameInputBox" + index}
                            autoComplete="off"
                            name="company_name"
                            disabled={item.isExist ? true : false}
                            value={item.company_name}
                            onBlur={(e) => {
                              !item.isExist
                                ? validateCompanyName(e, index)
                                : validateExistingName(e, index);
                            }}
                            onChange={(e) =>
                              selectedIndex === undefined ||
                              selectedIndex === index
                                ? handelChange(e, "company_name", index, item)
                                : true
                            }
                          />
                          {item.companyNameError != "" && (
                            <p className="input-error-message">
                              {item.companyNameError}
                            </p>
                          )}
                        </>
                      )}
                    </td>
                    <td className="dropList">
                      {companyTypeDropDown(item, index)}
                    </td>
                    <td className="dropList">
                      <div className="holding-list-bold-title">
                        <Select
                          options={options}
                          value={{
                            value: item.company_country,
                            label: item.company_country,
                          }}
                          styles={selectStyle}
                          onChange={(e) =>
                            selectedIndex === undefined ||
                            selectedIndex === index
                              ? handelChange(e, "company_country", index, item)
                              : true
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="bk-Securities">
                        <input
                          type="text"
                          className="form-control border-0"
                          placeholder="Pincode"
                          name="company_pincode"
                          value={item.company_pincode}
                          onChange={(e) =>
                            selectedIndex === undefined ||
                            selectedIndex === index
                              ? handelChange(e, "company_pincode", index, item)
                              : true
                          }
                        />
                        {item.pinCodeError != "" && (
                          <p className="input-error-message">
                            {item.pinCodeError}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="dropList">
                      <div className="holding-list-bold-title">
                        <Select
                          value={{
                            value: item.business_category,
                            label: item.business_category,
                          }}
                          styles={selectStyle}
                          options={categoryTypes}
                          onChange={(e) =>
                            selectedIndex === undefined ||
                            selectedIndex === index
                              ? handelChange(
                                  e.value,
                                  "companyCategory",
                                  index,
                                  item
                                )
                              : true
                          }
                        />
                      </div>
                    </td>
                    <td>
                      {!item.isExist && item?.compliance_officer?.length !== 0 && (
                        <div
                          className={
                            "holding-list-bold-title-background " +
                            (coHoveredIndex === index ? "activeName" : "")
                          }
                          onClick={() =>
                            selectedIndex === undefined ||
                            selectedIndex === index
                              ? setAssignPromptIndex(index)
                              : true
                          }
                          onMouseOver={() => setCoHoveredIndex(index)}
                          onMouseOut={() => setCoHoveredIndex(undefined)}
                        >
                          <span className="circle-dp">
                            {getNameInitials(
                              item?.compliance_officer[0]?.full_name
                            )}
                          </span>{" "}
                          {item?.compliance_officer[0]?.full_name}{" "}
                        </div>
                      )}
                      {item.isExist && (
                        <div
                          className={
                            "holding-list-bold-title-background " +
                            (coHoveredIndex === index ? "activeName" : "")
                          }
                          onClick={() =>
                            selectedIndex === undefined ||
                            selectedIndex === index
                              ? setAssignPromptIndex(index)
                              : true
                          }
                          onMouseOver={() => setCoHoveredIndex(index)}
                          onMouseOut={() => setCoHoveredIndex(undefined)}
                        >
                          <span className="circle-dp">
                            {getNameInitials(
                              item?.compliance_officer[0]?.full_name
                            )}
                          </span>{" "}
                          {item?.compliance_officer[0]?.full_name}
                        </div>
                      )}

                      {!item.isExist && item?.compliance_officer?.length === 0 && (
                        <div
                          className="assign-with-icofn"
                          onClick={() =>
                            selectedIndex === undefined ||
                            selectedIndex === index
                              ? setAssignPromptIndex(index)
                              : true
                          }
                        >
                          <img
                            className="delete-Icon-check"
                            src={assignIconCircle}
                            alt="check Icon"
                          />{" "}
                          assign{" "}
                        </div>
                      )}
                      {assignPromptIndex === index && (
                        <div
                          ref={innerRef}
                          className="col-9"
                          id={"assign-prompt " + index}
                        >
                          <div className="bottom-tool-tip">
                            <div className="shadow-tooltip">
                              <div className="">
                                <div className="tool-tip-head">
                                  <div className="add-Email">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter name or email"
                                        onChange={(e) =>
                                          handleUserSearch(e, index)
                                        }
                                        value={userSearchText}
                                      />
                                    </div>
                                    <span className="or-devider"> or</span>
                                    <button
                                      className="btn save-details assign-me"
                                      onClick={() => {
                                        handelChange(
                                          {
                                            userEmail: loggedUser.email,
                                            UserName: loggedUser.full_name,
                                          },
                                          "compliance_officer",
                                          index,
                                          item
                                        );
                                      }}
                                    >
                                      Assign to me
                                    </button>
                                  </div>
                                </div>
                                <div className="divide-space">
                                  <div className="space-border-header"></div>
                                </div>
                                <div className="email-list-box">
                                  {userData &&
                                    userData?.length > 0 &&
                                    userData.map((user) => {
                                      return (
                                        <>
                                          <div
                                            className="email-list-row"
                                            onClick={() =>
                                              handelChange(
                                                user,
                                                "compliance_officer",
                                                index,
                                                item
                                              )
                                            }
                                          >
                                            <span className="name-circle">
                                              {getNameInitials(user.UserName)}
                                            </span>
                                            <span className="name-of-emailer">
                                              {user.UserName}
                                            </span>
                                            <span className="last-email-box">
                                              {user.userEmail}
                                            </span>
                                          </div>
                                        </>
                                      );
                                    })}
                                  {userSearchText !== "" && (
                                    <a
                                      className="dropbox-add-line"
                                      href="#!"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handelChange(
                                          {
                                            userEmail: userSearchText,
                                            UserName: userSearchText,
                                          },
                                          "compliance_officer",
                                          index,
                                          item
                                        );
                                      }}
                                    >
                                      <img
                                        src={plusIcon}
                                        alt="account Circle Purple"
                                      />
                                      {!validEmail && (
                                        <div
                                          className=""
                                          style={{
                                            color: "#ef5d5d",
                                            paddingLeft: "7px",
                                            position: "absolute",
                                          }}
                                        >
                                          Please Enter valid Email
                                        </div>
                                      )}
                                      {userSearchText !== "" &&
                                        `Invite '${userSearchText}' via email`}
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="license-count-lable">
                        <div>
                          {item?.licenses?.length > 0
                            ? item?.licenses?.length
                            : ""}
                        </div>
                        {item?.licenses?.length > 0 && (
                          <button
                            id={"editLicense" + index}
                            className="btn buttonprimary"
                            onClick={() =>
                              openChooseLicenseModel(2, index, item)
                            }
                          >
                            edit licenses
                          </button>
                        )}
                        {item.licenses?.length <= 0 && (
                          <button
                            id={"addLicense" + index}
                            className={
                              item.company_name !== "" &&
                              item.company_type !== ""
                                ? "btn buttonprimary"
                                : "btn buttonprimarygray"
                            }
                            onClick={() =>
                              openChooseLicenseModel(1, index, item)
                            }
                          >
                            Add Licenses
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="deleteIconCheck">
                      {item.isExist &&
                        selectedIndex != index &&
                        companyDetails?.length > 1 && (
                          <img
                            className="delete-Icon-personal"
                            src={blackDeleteIcon}
                            alt="company Drop Arrow Icon"
                            onClick={() => handleDeleteClick(item, 1)}
                          />
                        )}
                      {selectedIndex === index && (
                        <div>
                          <img
                            className="delete-Icon-check"
                            src={
                              item.company_name !== "" &&
                              item.company_type !== "" &&
                              item.licenses?.length != 0 &&
                              item.pinCodeError === "" &&
                              editShow &&
                              validEmail
                                ? greenCheck
                                : grayCheck
                            }
                            alt="check Icon"
                            onClick={() => {
                              item.company_name !== "" &&
                                item.company_type !== "" &&
                                item.licenses?.length != 0 &&
                                item.pinCodeError === "" &&
                                handleSaveChanges(index);
                            }}
                          />
                          <img
                            className="delete-Icon-check"
                            src={redCheck}
                            alt="delete Icon"
                            onClick={() => handleUndoChanges(index, item)}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div id={"toasterPrompt"} className="bottom-logo-strip personal-details">
        <div className="row aligncenter">
          <div className="col-12">
            <div className="company-delete-right-bottom">
              <img
                className="check-icon-small"
                src={toastType === 1 ? checkIocnSmall : redCheck}
                alt="close Gray Icon"
              />
              {toastType === 1
                ? "Company details added"
                : "Company cant be added."}
              <img
                className="small-icon-close"
                src={smallClose}
                alt="close Gray Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoManagment;
