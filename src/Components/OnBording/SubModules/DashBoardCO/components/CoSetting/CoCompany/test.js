import React, { useEffect, useState } from "react";
import "./style.css";
import companyDropArrow from "../../../../../../../assets/Icons/companyDropArrow.png";
import blackDeleteIcon from "../../../../../../../assets/Icons/blackDeleteIcon.png";
import redCheck from "../../../../../../../assets/Icons/redCheck.png";
import plusIcon2 from "../../../../../../../assets/Icons/plusIcon3.png";
import grayCheck from "../../../../../../../assets/Icons/grayCheck.png";
import greenCheck from "../../../../../../../assets/Icons/greenCheck.png";
import assignIconCircle from "../../../../../../../assets/Icons/assignIconCircle.png";
import whiteDeleteIcon from "../../../../../../../assets/Icons/whiteDeleteIcon.png";
import smallClose from "../../../../../../../assets/Icons/smallClose.png";
import grayPlusIcon from "../../../../../../../assets/Icons/grayPlusIcon.png";
import closeBlack from "../../../../../../../assets/Icons/closeBlack.png";
import checkIocnSmall from "../../../../../../../assets/Icons/checkIocnSmall.png";
import mobileAssignIconSmall from "../../../../../../../assets/Icons/mobileAssignIconSmall.png";
import { toast } from "react-toastify";
import Dropdown from "react-dropdown";
import { actions as coActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import LicenseDrawer from "../ChooseLicenses";
import api from "../../../../../../../apiServices";
import { useOuterClick } from "./utils";
import { Modal } from "react-responsive-modal";
import Searchable from "react-searchable-dropdown";
import { isMobile } from "react-device-detect";
function CoManagment({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [editShow, setEditShow] = useState(false);
  const [doEdit, setdoEdit] = useState(undefined);
  const [showAdd, setShowAdd] = useState(false);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [companyDetailsBackup, setCompanyDetailsBackup] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [companyTypesBackup, setCompanyTypesBackup] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [categoryTypesBackup, setCategoryTypesBackup] = useState([]);
  const [coHoveredIndex, setCoHoveredIndex] = useState(undefined);
  const [licenseModalHideShow, setLicenseModalHideShow] = useState(false);
  const [fields, setFields] = useState(null);
  const [userData, setUserData] = useState([]);
  const [userDataBackup, setUserDataBackup] = useState([]);
  const [assignPromptIndex, setAssignPromptIndex] = useState(undefined);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [selectedCompany, setSelectedCompany] = useState(undefined);
  const [toastType, setToastType] = useState(undefined);
  const [deleteBoxHideShow, setDeleteBoxHideShow] = useState(false);
  const [userSearchText, setUserSearchText] = useState("");
  const innerRef = useOuterClick((e) => {
    if (
      assignPromptIndex != undefined &&
      !e.target.id.includes("assign-prompt")
    )
      setAssignPromptIndex(undefined);
  });

  const loggedUser =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo;

  useEffect(() => {
    initialDispatch();
  }, []);

  const initialDispatch = () => {
    setSelectedIndex(undefined);
    setSelectedCompany(undefined);
    setCompanyDetails([]);
    dispatch(
      coActions.getEntityLicenseTaskRequest({
        coUserId: loggedUser.UserID,
      })
    );

    setTimeout(() => {
      dispatch(
        coActions.getCompanyTypeRequest({
          category: "",
          country: "INDIA",
          eid: "",
        })
      );
    }, 10);

    setTimeout(() => {
      dispatch(
        coActions.userByRoleRequest({
          coUserId: loggedUser.UserID,
          coUserType: 3,
          ecoUserId: "",
        })
      );
    }, 10);
  };

  useEffect(() => {
    const companyTypes =
      state &&
      state.taskReport &&
      state.taskReport.companyTypeInfo &&
      state.taskReport.companyTypeInfo.CompanyInfo &&
      state.taskReport.companyTypeInfo.CompanyInfo[0] &&
      state.taskReport.companyTypeInfo.CompanyInfo[0][0] &&
      state.taskReport.companyTypeInfo.CompanyInfo[0][0].CompanyType;

    const categoryTypes =
      state &&
      state.taskReport &&
      state.taskReport.companyTypeInfo &&
      state.taskReport.companyTypeInfo.CompanyInfo &&
      state.taskReport.companyTypeInfo.CompanyInfo[2] &&
      state.taskReport.companyTypeInfo.CompanyInfo[2][0] &&
      state.taskReport.companyTypeInfo.CompanyInfo[2][0].Categories;

    if (companyTypes != undefined) {
      let companyoptions = [];
      companyTypes.map((item) => {
        let option = { value: item.EntityTypeID, label: item.EntityTypeDesc };
        companyoptions.push(option);
      });
      setCompanyTypes(companyoptions);
      setCompanyTypesBackup(companyoptions);
    }

    if (categoryTypes != undefined) {
      let categoryoptions = [];
      categoryTypes.map((item) => {
        if (item.Category !== "" || item.Category !== "") {
          let option = { value: item.Category, label: item.Category };
          categoryoptions.push(option);
        }
      });
      setCategoryTypes(categoryoptions);
      setCategoryTypesBackup(categoryoptions);
    }
  }, [state.taskReport.companyTypeInfo]);

  useEffect(() => {
    let tempCoCompany =
      state &&
      state.taskReport &&
      state.taskReport.coEntityLicenseTask &&
      state.taskReport.coEntityLicenseTask.entityLicenseInfo;
    if (tempCoCompany != undefined) {
      let finalCoCompany = [];
      tempCoCompany.forEach((element) => {
        let tempLicenseArr = [];
        element.Licenses.map((item) => tempLicenseArr.push(item.LicenseID));
        let obj = {
          ...element,
          coUserID: element.UserID,
          selectedCompany:
            element.EntityTypeID != undefined
              ? { value: element.EntityTypeID, label: element.EntityType }
              : null,
          selectedCategory:
            element.Category != undefined
              ? { value: element.Category, label: element.Category }
              : null,
          companyNameError: "",
          isExist: true,
          isEdited: false,
          selectedLicenseArray: tempLicenseArr,
        };
        finalCoCompany.push(obj);
      });

      setCompanyDetails(finalCoCompany);
      setCompanyDetailsBackup(finalCoCompany);
    }
  }, [state.taskReport.coEntityLicenseTask]);

  useEffect(() => {
    const tempUsers =
      state &&
      state.taskReport &&
      state.taskReport.getUserByRole &&
      state.taskReport.getUserByRole.getUserByRole;
    if (tempUsers != undefined && tempUsers.length > 0) {
      let users = [];
      tempUsers.forEach((element) => {
        element.GEN_Users.map((item) => {
          const obj = {
            UserName: item.UserName,
            userEmail: item.EmailID,
            UserID: item.UserID,
          };
          users.push(obj);
        });
      });

      setUserData(users);
      setUserDataBackup(users);
    }
  }, [state.taskReport.getUserByRole]);

  useEffect(() => {
    let addEditStatus =
      state &&
      state.taskReport &&
      state.taskReport.CompanyAddEditStatus &&
      state.taskReport.CompanyAddEditStatus.Status;
    if (addEditStatus != undefined) {
      if (addEditStatus === "Success" && selectedIndex != undefined) {
        setToastType(1);
        toast.success("Company details added");
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
          toast.error("Something went wrong");
        }

        //document.getElementById("toasterPrompt").classList.add("show");
        setTimeout(() => {
          //document.getElementById("toasterPrompt").classList.remove("show");
        }, 5000);
      }
    }
  }, [state.taskReport.CompanyAddEditStatus]);

  useEffect(() => {
    let deleteStatus =
      state &&
      state.taskReport &&
      state.taskReport.companyDeleteStatus &&
      state.taskReport.companyDeleteStatus.Status;
    if (deleteStatus != undefined) {
      if (deleteStatus === "Success") {
        setSelectedCompany(undefined);
        setDeleteBoxHideShow(false);
        initialDispatch();
      } else {
        setSelectedCompany(undefined);
        setDeleteBoxHideShow(false);
      }
    }
  }, [state.taskReport.companyDeleteStatus]);

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
      EntityName: "",
      EntityType: "",
      Category: "",
      EntityTypeID: 0,
      CO: undefined,
      coUserID: undefined,
      EntityGroupID: 0,
      UserID: "",
      Licenses: [],
      selectedCompany: null,
      selectedCategory: null,
      companyNameError: "",
      isExist: false,
      isEdited: true,
      selectedLicenseArray: [],
    };

    var tempCompanyData = [...companyDetails];
    tempCompanyData.push(tempNewCompany);
    setCompanyDetails(tempCompanyData);
    setSelectedIndex(tempCompanyData.length - 1);
    setShowAdd(true);
  };

  const openChooseLicenseModel = (type, index, item) => {
    let selectedObj = companyDetails[index];
    let FieldObj = {
      category: selectedObj.Category,
      selectedLiecenseIdArray: selectedObj.selectedLicenseArray,
    };
    setFields(FieldObj);
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
    if (name === "companyName") {
      const re = /^(?=.*\S).+$/;
      if (e.target.value && !re.test(e.target.value)) {
        return "";
      } else {
        companyList[index].EntityName = e.target.value;
      }
    } else if (name === "companyType") {
      companyList[index].selectedCompany = companyTypes[e - 1];
      companyList[index].EntityType = companyTypes[e - 1].label;
      companyList[index].EntityTypeID = companyTypes[e - 1].value;
    } else if (name == "complianceOfficer") {
      companyList[index].CO = e.UserName;
      companyList[index].coUserID = e.UserID;
      setAssignPromptIndex(undefined);
      hideBlock();
    } else {
      companyList[index].selectedCategory = { value: e, label: e };
      companyList[index].Category = e;
      if (item.isExist) {
        if (
          selectedCompany != undefined &&
          companyList[index].Category === selectedCompany.Category
        ) {
          companyList[index].selectedLicenseArray =
            selectedCompany.selectedLicenseArray;
          if (
            companyList[index].EntityTypeID === selectedCompany.EntityTypeID &&
            companyList[index].Category === selectedCompany.Category &&
            companyList[index].coUserID === selectedCompany.coUserID
          ) {
            setSelectedIndex(undefined);
            itemIndex = undefined;
          }
        } else {
          companyList[index].selectedLicenseArray = [];
        }
      } else {
        companyList[index].selectedLicenseArray = [];
      }
    }
    setSelectedIndex(itemIndex);
    setCompanyDetails(companyList);

    setTimeout(() => {
      // if (item.isExist === false) {
      if (
        companyList[index].EntityName != "" &&
        //companyList[index].selectedCompany != null &&
        companyList[index].selectedCategory != null &&
        //companyList[index].coUserID != null &&
        companyList[index].companyNameError === ""
      ) {
        let Button = document.getElementById("addLicense" + index);
        if (Button != null) {
          Button.className = "btn buttonprimary";
          Button.disabled = false;
        }
      } else {
        let Button = document.getElementById("addLicense" + index);
        if (Button != null) {
          Button.className = "btn buttonprimarygray";
          Button.disabled = true;
        }
      }

      // else {
      //     const isSameLicenses = checkWithPreviousLicenses(selectedCompany.selectedLicenseArray, companyList[index].selectedLicenseArray)
      //     if (companyList[index].EntityType === selectedCompany.EntityType &&
      //         companyList[index].Category === selectedCompany.Category &&
      //         companyList[index].coUserID === selectedCompany.coUserID &&
      //         isSameLicenses === true) {
      //         setSelectedIndex(undefined)
      //         setSelectedCompany(undefined)
      //     }
      // }
    }, 100);
  };

  const validateExistingName = (e, index) => {
    if (e.target.value != selectedCompany.EntityName && e.target.value != "") {
      validateCompanyName(e, index);
    } else {
      let tempCoCompany = [...companyDetails];
      const isSameLicenses = checkWithPreviousLicenses(
        selectedCompany.selectedLicenseArray,
        tempCoCompany[index].selectedLicenseArray
      );
      tempCoCompany[index].EntityName = selectedCompany.EntityName;
      tempCoCompany[index].isEdited = false;

      if (
        tempCoCompany[index].EntityTypeID === selectedCompany.EntityTypeID &&
        tempCoCompany[index].Category === selectedCompany.Category &&
        tempCoCompany[index].coUserID === selectedCompany.coUserID &&
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
        loginID: e.target.value.trim(),
        pwd: "",
        rememberme: 0,
        loginty: "AdminCompany",
      };
      let companyList = [...companyDetails];
      api
        .post("/api/availabilityCheck", payload)
        .then(function (response) {
          if (response && response.data && response.data.Status === "True") {
            companyList[index].companyNameError = "Company alreday exists";
            if (!companyList[index].isExist) {
              let Button = document.getElementById("addLicense" + index);
              Button.className = "btn buttonprimarygray";
              Button.disabled = true;
            }
          } else {
            companyList[index].companyNameError = "";
            if (
              //companyList[index].selectedCompany != null &&
              companyList[index].selectedCategory != null &&
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

    let tempCoCompany = [...companyDetails];
    const isSameLicenses = checkWithPreviousLicenses(
      selectedCompany.selectedLicenseArray,
      fieldData.selectedLiecenseIdArray
    );
    if (isSameLicenses === false || isSameLicenses === undefined) {
      tempCoCompany[selectedIndex].selectedLicenseArray =
        fieldData.selectedLiecenseIdArray;
      setCompanyDetails(tempCoCompany);
    } else {
      if (
        tempCoCompany[selectedIndex].EntityTypeID ===
          selectedCompany.EntityTypeID &&
        tempCoCompany[selectedIndex].Category === selectedCompany.Category &&
        tempCoCompany[selectedIndex].coUserID === selectedCompany.coUserID &&
        tempCoCompany[selectedIndex].EntityName === selectedCompany.EntityName
      ) {
        setSelectedIndex(undefined);
        setSelectedCompany(undefined);
      }
    }
  };

  const handleDeleteClick = (item, flag) => {
    if (flag === 1) {
      if (selectedIndex === undefined && companyDetails.length > 1) {
        setSelectedCompany({ ...item });
        setDeleteBoxHideShow(true);
      }
    } else if (flag === 2) {
      dispatch(
        coActions.deleteCompanyRequest({
          gUserID: loggedUser.UserID,
          settingType: 2,
          actionFlag: 3,
          EntityID: selectedCompany.EntityId,
          licID: 0,
          uUserID: 0,
          utype: 0,
          notificationList: "",
          pwd: "",
        })
      );
    } else {
      setSelectedCompany(undefined);
      setDeleteBoxHideShow(false);
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
  const handleUndoChanges = (index) => {
    let tempCoCompany = [...companyDetails];
    if (tempCoCompany[index].isExist) {
      tempCoCompany[index].selectedCompany = selectedCompany;
      tempCoCompany[index].isEdited = false;
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
    let selectedLiecenseList = tempCoCompany[index].selectedLicenseArray;
    const licenseIDgrpStr =
      selectedLiecenseList.length > 0 ? selectedLiecenseList.join(",") : "";

    const payload = {
      licenseSubID: 0,
      entityId:
        tempCoCompany && tempCoCompany[index] && tempCoCompany[index].isExist
          ? tempCoCompany[index].EntityId
          : 0,
      userId: loggedUser.UserID,
      entityName: tempCoCompany[index].EntityName,
      coUserId: tempCoCompany[index].coUserID,
      status: 0,
      licenseIDgrp: licenseIDgrpStr,
      category: tempCoCompany[index].Category,
      cmptype: tempCoCompany[index].EntityTypeID.toString(),
    };

    dispatch(coActions.insCertificateDetailsRequest(payload));
    setShowAdd(false);
    setEditShow(undefined);
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
    }
  };

  const checkButtonDisabledColor = (key) => {
    const list = [...companyDetails];
    let isNext = true;
    list &&
      list.map((item, index) => {
        if (index === key) {
          if (
            item.EntityName === "" ||
            item.Category === "" ||
            item.companyNameError != ""
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

  const editCompanymobile = (item, index) => {
    return (
      <>
        {
          <div className="company-detail-mobile-box">
            {/* {item.EntityName!= "" &&  <div className="brokrage-title">{item.EntityName}</div>} */}
            <div class="">
              <div class="input-box-mobile">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder={"Enter Name"}
                  id={"nameInputBox" + index}
                  autoComplete="off"
                  name="companyName"
                  disabled={item.isExist ? true : false}
                  value={item.EntityName}
                  onBlur={(e) => {
                    !item.isExist
                      ? validateCompanyName(e, index)
                      : validateExistingName(e, index);
                  }}
                  onChange={(e) =>
                    selectedIndex === undefined || selectedIndex === index
                      ? handelChange(e, "companyName", index, item)
                      : true
                  }
                />
              </div>

              <div className="input-box-mobile">
                {/* {companyTypes && companyTypes.length > 0 && 
                        <Dropdown
                            arrowClosed={<span className="arrow-closed" />}
                            arrowOpen={<span className="arrow-open" />}
                            options={companyTypes} value={item.selectedCompany}
                            placeholder="Select Type"
                            onChange={(e) => (selectedIndex === undefined || selectedIndex === index) ? handelChange(e, "companyType", index, item) : true} 
                        />} */}
                {companyTypes && companyTypes.length > 0 && (
                  <Searchable
                    value={item.selectedCompany}
                    className="form-control border-0"
                    placeholder={
                      item.EntityType ? item.EntityType : "Select Type"
                    } // by default "Search"
                    notFoundText="No result found" // by default "No result found"
                    options={companyTypes}
                    onSelect={(e) =>
                      selectedIndex === undefined || selectedIndex === index
                        ? handelChange(e, "companyType", index, item)
                        : true
                    }
                    listMaxHeight={200} //by default 140
                  />
                )}
                {/* <input type="text" class="form-control border-0" placeholder="Select Type" name="companyType" autocomplete="off" value="" />
                            <div class="dropdown-user-list display-none" id="CompanyTypeMobile-0">
                                <div class="user-list-row">
                                    <div class="dropdown-email">None</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Individual</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Partnership Firm</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">HUF</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">LLP</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Pvt. Ltd.</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Ltd.</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Co-op Bank</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Co-op Society</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">One Person Company</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Sole Propriter</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Corporate Body</div>
                                    <div class="border-dropdown"></div>
                                </div>
                            </div> */}
              </div>
              <div class="input-box-mobile">
                {/* {categoryTypes && categoryTypes.length > 0 &&
                            <Dropdown
                                arrowClosed={<span className="arrow-closed" />}
                                arrowOpen={<span className="arrow-open" />}
                                options={categoryTypes} value={item.selectedCategory}
                                placeholder="Select Category"
                                onChange={(e) => (selectedIndex === undefined || selectedIndex === index) ? handelChange(e, "companyCategory", index, item) : true} 
                            />} */}

                {categoryTypes && categoryTypes.length > 0 && (
                  <Searchable
                    value={item.selectedCompany}
                    className="form-control border-0"
                    placeholder={
                      item.Category ? item.Category : "Select Category"
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

                {/* <input type="text" autocomplete="off" class="form-control border-0" placeholder="Select Category" name="category" value="" />
                            <div class="dropdown-user-list display-none" id="CategoryMobile-0">
                                <div class="user-list-row">
                                    <div class="dropdown-email">Advisory Services</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">ALL</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Depository Participants</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">General</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">General1</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Non Banking Activity</div>
                                    <div class="border-dropdown"></div>
                                </div>
                                <div class="user-list-row">
                                    <div class="dropdown-email">Stock Broking</div>
                                    <div class="border-dropdown"></div>
                                </div>
                            </div> */}
              </div>
              <div className="flex mb-3">
                <div className="col-3 pl-0 pr-0">
                  <div className="assign-co">Assign CO:</div>
                </div>
                <div className="col-9 pr-0 pl-0">
                  {item.CO && (
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
                        {getNameInitials(item.CO)}
                      </div>
                      <div class="login-assign-title-strip">{item.CO}</div>
                    </div>
                  )}

                  {!item.isExist && item.coUserID === undefined && (
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
                                  "complianceOfficer",
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
                            userData.length > 0 &&
                            userData.map((user) => {
                              return (
                                <>
                                  <div
                                    className="email-list-row"
                                    onClick={() =>
                                      handelChange(
                                        user,
                                        "complianceOfficer",
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
                  {/* {assignPromptIndex === index &&
                                                    <div ref={innerRef} className="col-9" id={"assign-prompt " + index}>
                                                        <div className="bottom-tool-tip">
                                                            <div className="shadow-tooltip">
                                                                <div className="">
                                                                    <div className="tool-tip-head">
                                                                        <div className="add-Email">
                                                                            <div className="form-group">
                                                                                <input type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Enter name or email"
                                                                                    onChange={(e) => handleUserSearch(e)}
                                                                                    value={userSearchText} />
                                                                            </div>
                                                                            <span className="or-devider"> or</span>
                                                                            <button className="btn save-details assign-me" onClick={() => handelChange(loggedUser, "complianceOfficer", index, item)}>Assign to me</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="divide-space"><div className="space-border-header"></div></div>
                                                                    <div className="email-list-box">
                                                                        {userData && userData.length > 0 && userData.map((user) => {
                                                                            return (
                                                                                <>
                                                                                    <div className="email-list-row" onClick={() => handelChange(user, "complianceOfficer", index, item)}>
                                                                                        <span className="name-circle">{getNameInitials(user.UserName)}</span>
                                                                                        <span className="name-of-emailer">{user.UserName}</span>
                                                                                        <span className="last-email-box">{user.userEmail}</span>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>} */}
                </div>
              </div>
              {item.selectedLicenseArray.length > 0 && (
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
                        {item.selectedLicenseArray.length > 0
                          ? item.selectedLicenseArray.length
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div class="input-box-mobile mb-0">
                {item.selectedLicenseArray.length == 0 && (
                  <button
                    onClick={() => openChooseLicenseModel(2, index, item)}
                    className={
                      checkButtonDisabledColor(index)
                        ? " btn add-license-mobile "
                        : "btn add-license-mobile-co-company"
                    }
                    disabled={checkButtonDisabledColor(index) ? false : true}
                  >
                    add licenses
                    {item.EntityName === "" ||
                    item.EntityType === "" ||
                    item.Category === "" ||
                    item.companyNameError !== "" ? (
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
                      item.Category !== "" &&
                      item.EntityName !== "" &&
                      item.EntityType !== "" &&
                      item.selectedLicenseArray.length != 0
                        ? "btn mobile-save-company-blue"
                        : "btn mobile-save-company"
                    }
                    disabled={
                      item.Category !== "" &&
                      item.EntityName !== "" &&
                      item.EntityType != "" &&
                      item.selectedLicenseArray.length != 0
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
      item.EntityType === "" ||
      item.Category == "" ||
      item.Licenses.length === 0 ||
      item.isEdited ||
      item.EntityName === ""
    ) {
      return <>{editCompanymobile(item, index)}</>;
    } else {
      return (
        <>
          <div class="company-details-mobile-view">
            <div class="d-flex">
              <div class="col-10 pl-0">
                <div className="d-flex">
                  <div class="bk-seq-title-mobile">{item.EntityName}</div>
                  <div class="license-count-selected-mobile">
                    {item.selectedLicenseArray.length}
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
                  <div class="comapany-label-mobile">{item.EntityType}</div>
                  <div class="comapany-label-mobile">{item.Category}</div>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <div class="col-10 pl-0">
                <div className="d-flex">
                  <div class="license-count-mobile">
                    {getNameInitials(item.CO)}
                  </div>
                  <div class="bk-seq-title-bottom-mobile">{item.CO}</div>
                </div>
              </div>
              <div class="col-2 pr-0">
                <div class="edit-delete">
                  <div class="">
                    {companyDetails.length > 1 && (
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

  const setData = (index) => {
    var companyList = companyDetails;
    companyList[index].isEdited = true;
    setCompanyDetails(companyList);
    setdoEdit(index);
    setEditShow(true);
  };

  const setCancelData = (index) => {
    var companyList = companyDetails;
    companyList[index].isEdited = false;
    setCompanyDetails(companyList);
    setdoEdit(index);
    setEditShow(false);
    if (!companyDetails[index].isExist) {
      companyList.pop();
      setCompanyDetails(companyList);
      setSelectedIndex(undefined);
    }
  };

  return (
    <div className="co-personal-grid">
      {!isMobile && (
        <div id="drawerParent" className="">
          <div id="drawerChild" className="sideBarFixed">
            {licenseModalHideShow && (
              <LicenseDrawer
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
            {licenseModalHideShow && (
              <LicenseDrawer
                fields={fields}
                close={(data, action) => close(data, action)}
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
                                <div class="bk-seq-title-mobile">{item.EntityName}</div>
                                <div class="license-count-selected-mobile">{item.selectedLicenseArray.length}</div>
                            </div>
                        </div>
                        <div class="col-2 pr-0">
                            <div class="mobile-edit-option" onClick={() => setData(index)}>edit</div>
                            
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-12 pl-0 pb-2">
                            <div className="">
                                <div class="comapany-label-mobile">{item.EntityType}</div>
                                <div class="comapany-label-mobile">{item.Category}</div>                                
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
                                    { companyDetailsBackup.length > 1 && <img className="" src={whiteDeleteIcon} alt="white Delete Icon" onClick={() => handleDeleteClick(item, 1)}/>}
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
            companyDetails.map((item, index) =>
              addNewCompanymobile(item, index)
            )}
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
              <th scope="col">Business category</th>
              <th scope="col">Compliance Officer</th>
              <th scope="col">Licenses</th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {companyDetails != undefined &&
              companyDetails.length > 0 &&
              companyTypes.length > 0 &&
              categoryTypes.length > 0 &&
              companyDetails.map((item, index) => {
                return (
                  <>
                    <tr className="focusRemove">
                      <td className="companyName">
                        {item.isExist && !item.isEdited && (
                          <div
                            className="bk-Securities"
                            onClick={() =>
                              selectedIndex === undefined ||
                              selectedIndex === index
                                ? handleOnNameClick(index, item)
                                : true
                            }
                          >
                            {item.EntityName}
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
                              name="companyName"
                              disabled={item.isExist ? true : false}
                              value={item.EntityName}
                              onBlur={(e) => {
                                !item.isExist
                                  ? validateCompanyName(e, index)
                                  : validateExistingName(e, index);
                              }}
                              onChange={(e) =>
                                selectedIndex === undefined ||
                                selectedIndex === index
                                  ? handelChange(e, "companyName", index, item)
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
                        <div className="holding-list-bold-title">
                          {companyTypes && companyTypes.length > 0 && (
                            <Searchable
                              value={item.selectedCompany}
                              className="form-control border-0"
                              placeholder={
                                item.EntityType
                                  ? item.EntityType
                                  : "Select Type"
                              } // by default "Search"
                              notFoundText="No result found" // by default "No result found"
                              options={companyTypes}
                              onSelect={(e) =>
                                selectedIndex === undefined ||
                                selectedIndex === index
                                  ? handelChange(e, "companyType", index, item)
                                  : true
                              }
                              listMaxHeight={200} //by default 140
                            />
                          )}
                          {/* {companyTypes && companyTypes.length > 0 && <Dropdown
                                                        arrowClosed={<span className="arrow-closed" />}
                                                        arrowOpen={<span className="arrow-open" />}
                                                        options={companyTypes} value={item.selectedCompany}
                                                        placeholder="Select an option"
                                                        onChange={(e) => (selectedIndex === undefined || selectedIndex === index) ? handelChange(e, "companyType", index, item) : true} />} */}
                        </div>
                      </td>
                      <td className="dropList">
                        <div className="holding-list-bold-title">
                          {categoryTypes && categoryTypes.length > 0 && (
                            <Searchable
                              //value={item.selectedCategory}
                              className="form-control border-0"
                              placeholder={
                                item.Category
                                  ? item.Category
                                  : "Select Category"
                              } // by default "Search"
                              notFoundText="No result found" // by default "No result found"
                              options={categoryTypes}
                              onSelect={(e) =>
                                selectedIndex === undefined ||
                                selectedIndex === index
                                  ? handelChange(
                                      e,
                                      "companyCategory",
                                      index,
                                      item
                                    )
                                  : true
                              }
                              listMaxHeight={200} //by default 140
                            />
                          )}
                          {/* {categoryTypes && categoryTypes.length > 0 && <Dropdown
                                                        arrowClosed={<span className="arrow-closed" />}
                                                        arrowOpen={<span className="arrow-open" />}
                                                        options={categoryTypes} value={item.selectedCategory}
                                                        placeholder="Select an option"
                                                        onChange={(e) => (selectedIndex === undefined || selectedIndex === index) ? handelChange(e, "companyCategory", index, item) : true} />} */}
                        </div>
                      </td>
                      <td>
                        {item.coUserID !== undefined && (
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
                              {getNameInitials(item.CO)}
                            </span>{" "}
                            {item.CO}{" "}
                          </div>
                        )}
                        {!item.isExist && item.coUserID === undefined && (
                          <div
                            className="assign-with-icon"
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
                                            "complianceOfficer",
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
                                      userData.length > 0 &&
                                      userData.map((user) => {
                                        return (
                                          <>
                                            <div
                                              className="email-list-row"
                                              onClick={() =>
                                                handelChange(
                                                  user,
                                                  "complianceOfficer",
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
                        )}
                      </td>
                      <td>
                        <div className="license-count-lable">
                          <div>
                            {item.selectedLicenseArray.length > 0
                              ? item.selectedLicenseArray.length
                              : ""}
                          </div>
                          {item.selectedLicenseArray.length > 0 && (
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
                          {item.selectedLicenseArray.length <= 0 && (
                            <button
                              id={"addLicense" + index}
                              className="btn buttonprimarygray"
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
                          companyDetails.length > 1 && (
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
                                item.Category !== "" &&
                                item.EntityName !== "" &&
                                item.EntityType !== "" &&
                                item.selectedLicenseArray.length != 0
                                  ? greenCheck
                                  : grayCheck
                              }
                              alt="check Icon"
                              onClick={() => {
                                item.Category !== "" &&
                                  item.EntityName !== "" &&
                                  item.EntityTypeID != 0 &&
                                  item.selectedLicenseArray.length != 0 &&
                                  handleSaveChanges(index);
                              }}
                            />
                            <img
                              className="delete-Icon-check"
                              src={redCheck}
                              alt="delete Icon"
                              onClick={() => handleUndoChanges(index)}
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
