import React, { useEffect, useState, useMemo } from "react";
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
import { actions as companyAction } from "../../../../../../OnBording/redux/actions";
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
import countryList from "react-select-country-list";
import License from "../ChooseLicenses/License";
function CoManagment({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
 const options = useMemo(() => countryList().getData(), []);
// const options = ["India","Albania","south Africa"]

  const [editShow, setEditShow] = useState(false);
  const [doEdit, setdoEdit] = useState(undefined);
  const [showAdd, setShowAdd] = useState(false);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [companyDetailsBackup, setCompanyDetailsBackup] = useState([]);

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
  const [companyTypeInfo, setCompanyTypeoInfo] = useState([]);
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
    let array = [];
    let mobArray2 = [];
    const companyType =
      state &&
      state?.complianceOfficer &&
      state?.complianceOfficer?.companyInfo?.companyLicenseData;

    companyType?.company_list.map((item) => {
      array.push({ value: item, label: item });
    });

    companyType &&
      companyType.Industry_list.map((item) => {
        mobArray2.push({ value: item, label: item });
      });

    setCategoryTypes(mobArray2);
    setCompanyTypeoInfo(array);
  }, []);

  useEffect(() => {
    initialDispatch();
  }, []);

  const initialDispatch = () => {
    setSelectedIndex(undefined);
    setSelectedCompany(undefined);
    setCompanyDetails([]);

    dispatch(coActions.getCompanyTypeRequest());
  };

  useEffect(() => {
    const tempUsers =
      state &&
      state.taskReport &&
      state.taskReport.companyTypeInfo &&
      state.taskReport.companyTypeInfo.CompanyInfo;
    if (tempUsers != undefined && tempUsers.length > 0) {
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
        isExist: true,
        isEdited: false,
      };
    });

    setCompanyDetails(updateCompanyDetails);
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
      isExist: false,
      isEdited: true,
    };

    var tempCompanyData = [...companyDetails];
    tempCompanyData.push(tempNewCompany);
    setCompanyDetails(tempCompanyData);
    setSelectedIndex(tempCompanyData.length - 1);
    setShowAdd(true);
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
        country: "India",
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
      setEditShow(true)
      const re = /^(?=.*\S).+$/;
      if (e.target.value && !re.test(e.target.value)) {
        return "";
      } else {
        companyList[index].company_name = e.target.value;
      }
    } else if (name === "company_type") {
      setEditShow(true)
      companyList[index].company_type = e;
    } else if (name === "company_country") {
      let countryvalue = countryList().getLabel(e)
      setEditShow(true)
      companyList[index].company_country = countryvalue;

    } else if (name === "company_pincode") {
      console.log("setshowad",showAdd )
      setEditShow(true)
      companyList[index].company_pincode = e.target.value;
    } else if (name == "compliance_officer") {
      setEditShow(true)
      console.log("Gadsfasdfsdfsdf", e);
      companyList[index].compliance_officer = [
        {
          email: e.userEmail,
          full_name: e.UserName,
        },
      ];
      setAssignPromptIndex(undefined);
      hideBlock();
    } else {
      companyList[index].business_category = e;
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
    console.log(companyList);
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
    setSelectedIndex(fieldData);
    setSelectedCompany(undefined);
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
    console.log("have to set this fields", fields, index, licenseList);
    setFields({
      ...fields,
      selectedLiecenseIdArray: licenseList,
    });

    let compDetails = [...companyDetails];

    compDetails[index].licenses= licenseList;
    setCompanyDetails(compDetails);
    setEditShow(true)
    // let FieldObj = {
    //   ...temp,
    //   selectedLiecenseIdArray: licenseList,
    // };
    //  temp[index].selectedLiecenseIdArray = licenseList;
    // setFields(temp);
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
         company : selectedCompany.company_docname
        })
      );
      dispatch(coActions.getCompanyTypeRequest());
      setDeleteBoxHideShow(false);
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
    const payload = {
      company_docname: tempCoCompany[index].company_docname,
      company_name:tempCoCompany[index].company_name ,
      company_type: tempCoCompany[index].company_type,
      company_country:tempCoCompany[index].company_country ,
      company_pincode:tempCoCompany[index].company_pincode,
      business_category:tempCoCompany[index].business_category ,
      compliance_officer:tempCoCompany[index].compliance_officer ,
      licenses:tempCoCompany[index].licenses ,
    };

    dispatch(coActions.insCertificateDetailsRequest(payload));
    // dispatch(coActions.getCompanyTypeRequest());
    initialDispatch();
    setShowAdd(false);
    setEditShow(undefined);
    setSelectedIndex(undefined);
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
              console.log("got this items", item);
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
                      <div className="holding-list-bold-title">
                        <Searchable
                          value={item.company_type}
                          className="form-control border-0"
                          placeholder={
                            item.company_type
                              ? item.company_type
                              : "Select Type"
                          } // by default "Search"
                          notFoundText="No result found" // by default "No result found"
                          options={companyTypeInfo}
                          onSelect={(e) =>
                            selectedIndex === undefined ||
                            selectedIndex === index
                              ? handelChange(e, "company_type", index, item)
                              : true
                          }
                          listMaxHeight={200} //by default 140
                        />
                      </div>
                    </td>
                    <td className="dropList">
                      <div className="holding-list-bold-title">
                        <Searchable
                          options={options}
                          placeholder={
                            item.company_country
                              ? item.company_country
                              : "Select Type"
                          }
                          className="form-control border-0"
                          value={item.company_country}
                          onSelect={(e) =>
                            
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
                      </div>
                    </td>
                    <td className="dropList">
                      <div className="holding-list-bold-title">
                        <Searchable
                          //value={item.selectedCategory}
                          className="form-control border-0"
                          placeholder={
                            item.business_category ? item.business_category : "Select Category"
                          } // by default "Search"
                          notFoundText="No result found" // by default "No result found"
                          options={categoryTypes}
                          onSelect={(e) =>
                            selectedIndex === undefined ||
                            selectedIndex === index
                              ? handelChange(e, "companyCategory", index, item)
                              : true
                          }
                          listMaxHeight={200} //by default 140
                        />
                      </div>
                    </td>
                    <td>
                      {!item.isExist && item?.compliance_officer.length !== 0 && (
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
                          {"  Hre"}
                        </div>
                      )}

                      {!item.isExist && item?.compliance_officer.length === 0 && (
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
                                        onChange={(e) => handleUserSearch(e)}
                                        value={userSearchText}
                                      />
                                    </div>
                                    <span className="or-devider"> or</span>
                                    <button
                                      className="btn save-details assign-me"
                                      onClick={() => {
                                        console.log("user Login", loggedUser);
                                        handelChange(
                                          loggedUser,
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
                                    userData.length > 0 &&
                                    userData.map((user) => {
                                      console.log("user", user);
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
                        {item.licenses.length <= 0 && (
                          <button
                            id={"addLicense" + index}
                            className={item.company_name !== "" &&
                            item.company_type !== "" 
                             ?"btn buttonprimary": "btn buttonprimarygray"}
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
                              item.company_name !== "" &&
                              item.company_type !== "" &&
                              item.licenses.length != 0 &&
                              editShow 
                                ? greenCheck
                                : grayCheck
                            }
                            alt="check Icon"
                            onClick={() => {
                              item.company_name !== "" &&
                                item.company_type !== "" &&
                                item.licenses.length != 0 &&
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
