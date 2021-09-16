import React, { useState, useEffect } from "react";
import "./style.css";
import ReAssignTasksModal from "../../../../../../ReAssignTasks";
import api from "../../../../../../../apiServices";
import redCheck from "../../../../../../../assets/Icons/redCheck.png";
import greenCheck from "../../../../../../../assets/Icons/greenCheck.png";
import closeBlack from "../../../../../../../assets/Icons/closeBlack.png";
import changeRoleClose from "../../../../../../../assets/Icons/changeRoleClose.png";
import dropDownIcon from "../../../../../../../assets/Icons/dropDownIcon.png";
import threeDots from "../../../../../../../assets/Icons/threeDots.PNG";
import teamSearch from "../../../../../../../assets/Icons/teamSearch.png";
import closeIconGray from "../../../../../../../assets/Icons/closeIconGray.png";
import searchIcon from "../../../../../../../assets/Icons/searchIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { useOuterClick } from "../../RightSideGrid/outerClick";
import { Modal } from "react-responsive-modal";
import Dropdown from "react-dropdown";
import { toast } from "react-toastify";
import "react-responsive-modal/styles.css";
import { isEmail } from "../../../../AssignTask/utils";

var _ = require("lodash");

function CoManagment({ handleClose }) {
  const options = [
    { value: "4", label: "Team Member" },
    { value: "3", label: "Compliance Officer" },
    { value: "5", label: "Approver" },
  ];

  const filterOptions = [
    { value: "0", label: "None" },
    { value: "4", label: "Team Members" },
    { value: "5", label: "Approvers" },
    { value: "3", label: "CO" },
    { value: "az", label: "A > Z" },
    { value: "za", label: "Z > A" },
  ];

  const optionsInputBoxRole = [
    { value: "4", label: "Team Member" },
    { value: "3", label: "Compliance Officer" },
    { value: "5", label: "Approver" },
  ];

  const roleOptionMobile = [
    { value: "4", label: "Team Member" },
    { value: "3", label: "Compliance Officer" },
    { value: "5", label: "Approver" },
  ];

  let defaultFilterOptions = filterOptions[0];
  let defaultOption = options[0];

  let defaultoptionsInputBoxRole = optionsInputBoxRole[0];
  const [addNew, setAddNew] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);

  const auth = state && state.auth;
  const userDetails = auth && auth.loginInfo;

  const [searchText, setSearchText] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [inputTeamMember, setInputTeamMember] = useState({
    fullName: "",
    email: "",
    role: [],
  });
  const [isValidate, setIsValidate] = useState(false);

  const [roleTitle, setRoleTitle] = useState("");

  const [teamMemberData, setMemberData] = useState([]);

  const [fields, setFields] = useState([
    {
      id: "",
      index: 0,
      initialsName: "",
      fullName: "",
      role: "",
      roleDropDown: "",
      email: "",
      mobileNuber: "",
      showAcceptDelectIcon: false,
    },
  ]);

  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);

  const [role, setRole] = useState([]);
  const [filterOption, setFilterOption] = useState("");

  const [visible, setVisible] = useState(false);
  const [openPopupIndex, setOpenPopupIndex] = useState("");
  const [deleteMemeberIndex, setDeleteMemberIndex] = useState("");
  const [fieldArray, setFieldsArray] = useState([
    {
      id: "",
      index: 0,
      initialsName: "",
      fullName: "",
      role: "",
      UserType: "",
      roleDropDown: "",
      email: "",
      mobileNuber: "",
      showAcceptDelectIcon: false,
    },
  ]);

  const [currentRow, setCurrentRow] = useState([]);

  const [fieldArrayBackup, setFieldsArrayBackup] = useState([
    {
      id: "",
      index: 0,
      initialsName: "",
      fullName: "",
      role: "",
      UserType: "",
      roleDropDown: "",
      email: "",
      mobileNuber: "",
      showAcceptDelectIcon: false,
    },
  ]);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const innerRef = useOuterClick((e) => {
    // if (openPopupIndex !== "") setOpenPopupIndex("");
  });

  const [currentIndex, setCurrentIndex] = useState("");

  const [isShowReAssignModal, setIsShowReAssignModal] = useState(false);
  const [isShowReAssignModalMobile, setIsShowReAssignModalMobile] =
    useState(false);
  const [reAssignUserType, setReAssignUserType] = useState(null);
  const [reAssignUserId, setReAssignUserId] = useState(null);

  const handleChangeInput = (e) => {};

  useEffect(() => {
    getSettingData();
    setFilterOption(filterOptions[0]);
  }, []);
  // useEffect(() => {
  //     dispatch(adminMenuActions.setActiveTabInSetting("team-member"))
  // }, [])

  const getSettingData = () => {
    const payload = {
      gUserID: auth && auth.loginInfo && auth.loginInfo.UserID,
      settingType: 6,
      actionFlag: 0,
      entityID: 0,
      licID: 0,
      uUserID: 0,
      utype: 0,
      // notificationList: "",
      // pwd: "",
      fullName: "",
      emailID: "",
      // mobile: "",
    };
    api
      .post("/api/CoSettings", payload)
      .then(function (response) {
        if (response && response.data && response.data.length > 0) {
          setMemberData(response.data);
        } else {
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  };
  const onChangeRoleClick = (type, item, index) => {
    if (item.id) {
      api.post(`/api/getUserTask?userID=${item.id}`).then((response) => {
        if (response && response.data && response.data.Status === true) {
          if (type === "desktop") {
            changeRole(index);
            setOpenPopupIndex("");
          } else if (type === "mobile") {
            changeRoleMobile(item, index);
            setOpenPopupIndex("");
          }
        } else if (
          response &&
          response.data &&
          response.data.Status === false
        ) {
          toast.error(
            "Please re-assign all your tasks first then change the role."
          );
          setOpenPopupIndex("");
        } else {
          toast.error("Something went wrong. Please try again after some time");
          setOpenPopupIndex("");
        }
      });
    }
  };
  const mobileFilterRef = useOuterClick((e) => {
    if (showMobileFilter === true) {
      setShowMobileFilter(false);
    }
  });

  const changeRoleMobile = (item, index) => {
    fields &&
      fields[openPopupIndex] &&
      setRoleTitle(fields[openPopupIndex].role);
    setCurrentIndex(index);
    const drawerParent = document.getElementById("drawerParent");
    const drawerChild = document.getElementById("drawerChild");
    if (drawerParent) {
      drawerParent.classList.add("overlayChangeRole");
      drawerChild.style.bottom = "0%";
    }
    setCurrentRow(item);
  };
  const closeChangeRole = () => {
    const drawerParent = document.getElementById("drawerParent");
    const drawerChild = document.getElementById("drawerChild");
    if (drawerParent) {
      drawerParent.classList.remove("overlayChangeRole");
      drawerChild.style.bottom = "-100%";
    }
    setCurrentRow([]);
  };

  const getInitials = (name) => {
    const nameArray = name ? name.split(" ") : " ";
    if (nameArray.length > 1) {
      return `${nameArray[0].slice(0, 1)}${nameArray[nameArray.length - 1]
        .slice(0, 1)
        .toUpperCase()}`;
    } else {
      return `${nameArray[0].slice(0, 2).toUpperCase()}`;
    }
  };
  useEffect(() => {
    let fieldArray = [];
    if (teamMemberData && teamMemberData.length > 0) {
      teamMemberData.map((item, index) => {
        let obj = {
          id: item.UserID,
          index: index,
          fullName: item.FullName,
          initialsName: getInitials(
            item.FullName && item.FullName.toUpperCase()
          ),
          role: item.UserRole,
          roleDropDown: "",
          UserType: item.UserType,
          email: item.EmailID,
          mobileNuber: item.Mobile,
          showAcceptDelectIcon: false,
        };
        fieldArray.push(obj);
      });
      setFields(fieldArray);
      setFieldsArray(fieldArray);
      setFieldsArrayBackup(fieldArray);
    }
  }, [teamMemberData]);

  const onDeletePress = (index) => {
    setOpenPopupIndex("");
    const payload = {
      gUserID: auth && auth.loginInfo && auth.loginInfo.UserID,
      settingType: 6,
      actionFlag: 3,
      entityID: 0,
      licID: 0,
      uUserID: fields && fields[index] && fields[index].id,
      utype: 0,
      // notificationList: "",
      // pwd: "",
      fullName: "",
      emailID: "",
      // mobile: "",
    };
    api
      .post("/api/CoSettings", payload)
      .then(function (response) {
        if (response && response.data && response.data.length > 0) {
          if (response.data[0].Status === "Updated") {
            toast.success("Deleted records sucessfully");
            getSettingData();
            setVisible(false);
            setOpenPopupIndex("");
          }
        } else {
          toast.error("Something went wrong !!!");
          setVisible(false);
          setOpenPopupIndex("");
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  };

  const _createDelectActionModal = (index) => {
    // setOpenPopupIndex("");
    return (
      <div className="deletemodal">
        <Modal
          blockScroll={false}
          classNames={{
            overlayAnimationIn: "",
            overlayAnimationOut: "",
            modalAnimationIn: "",
            modalAnimationOut: "",
            modal: "customModal",
          }}
          open={visible}
          center={true}
          showCloseIcon={false}
          onClose={() => setVisible(false)}
          //modalId="governance"
          styles={{ width: 373, height: 210, overflow: "hidden" }}
          onOverlayClick={() => setVisible(false)}
        >
          <div className="model-design-delete-company big-height">
            <div className="delete-record-title">Delete company record?</div>
            <div className="delete-desc">
              Are you sure you want to delete the record of &nbsp;team
              member&nbsp;? All assigned tasks will be deleted. You will have to
              re-assign those tasks to other members. re-assign those tasks to
              other members.
            </div>
            <div className="last-two-model-btn" style={{ marginTop: 20 }}>
              <button
                onClick={() => {
                  setVisible(false);
                  setOpenPopupIndex("");
                  setDeleteMemberIndex("");
                }}
                className="btn cancel-delete"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  onDeletePress(deleteMemeberIndex);
                  setDeleteMemberIndex("");
                }}
                className="btn delete-Record"
              >
                DELETE
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
    const filterData = [...fieldArray];
    if (e.target.value !== "") {
      let data = [];
      let value = e.target.value;

      data = filterData.filter((field) => {
        return (
          field.email.toLowerCase().includes(value.toLowerCase()) ||
          field.role.toLowerCase().includes(value.toLowerCase()) ||
          field.fullName.toLowerCase().includes(value.toLowerCase()) ||
          field.mobileNuber.toLowerCase().includes(value.toLowerCase())
        );
      });

      setFields(data);
    } else {
      setFields(filterData);
    }
  };

  const onClickSearchMobileIcon = () => {
    const element = document.getElementById("searchBox");
    if (element) {
      element.classList.remove("searchBoxMobile");
    }
    const filterArray = [...fieldArray];
    if (isSearchOpenMobile) {
      setFields(filterArray);
      setIsSearchOpenMobile(false);
    } else {
      setIsSearchOpenMobile(true);
    }

    setSearchText("");
  };
  const onClickSearchIcon = () => {
    const filterArray = [...fieldArray];
    if (isSearchOpen) {
      setFields(filterArray);
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
    }
    setSearchText("");
  };

  const _filterBy = (filterOption, mobileFilter) => {
    let data = [];
    if (mobileFilter === undefined) {
      setFilterOption(filterOption);
      if (filterOption.value === "za") {
        data = _.values(fieldArray).sort((a, b) =>
          b.fullName.localeCompare(a.fullName)
        );
        setFields(data);
      } else if (filterOption.value === "az") {
        data = _.values(fieldArray).sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );
        setFields(data);
      } else if (filterOption.value === "0") {
        const list = [...fieldArrayBackup];
        setFields(list);
      } else if (filterOption.value === "3") {
        data = fieldArray.filter(function (item) {
          return item.UserType === parseInt(filterOption.value);
        });
        setFields(data);
      } else if (filterOption.value === "4") {
        data = fieldArray.filter(function (item) {
          return item.UserType === parseInt(filterOption.value);
        });
        setFields(data);
      } else if (filterOption.value === "5") {
        data = fieldArray.filter(function (item) {
          return item.UserType === parseInt(filterOption.value);
        });
        setFields(data);
      }
    } else {
      setShowMobileFilter(false);
      if (filterOption === "za") {
        data = _.values(fieldArray).sort((a, b) =>
          b.fullName.localeCompare(a.fullName)
        );
        setFields(data);
      } else if (filterOption === "az") {
        data = _.values(fieldArray).sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );
        setFields(data);
      } else if (filterOption === "0") {
        const list = [...fieldArrayBackup];
        setFields(list);
      } else if (filterOption === "3") {
        data = fieldArray.filter(function (item) {
          return item.UserType === parseInt(filterOption);
        });
        setFields(data);
      } else if (filterOption === "4") {
        data = fieldArray.filter(function (item) {
          return item.UserType === parseInt(filterOption);
        });
        setFields(data);
      } else if (filterOption === "5") {
        data = fieldArray.filter(function (item) {
          return item.UserType === parseInt(filterOption);
        });
        setFields(data);
      }
    }
  };

  const openPopup = (index) => {
    setOpenPopupIndex(index);
  };
  const changeRole = (key) => {
    setOpenPopupIndex("");
    const list = [...fields];
    list[key].showAcceptDelectIcon = true;
    setFields(list);
  };

  const onConfirmChangeRole = (data, key, dropDown) => {
    let userType = 0;
    if (key !== "") {
      userType =
        fields &&
        fields[key] &&
        fields[key].roleDropDown &&
        fields[key].roleDropDown.value;
    } else if (key === "" && dropDown) {
      userType = dropDown.value;
    }
    const payload = {
      gUserID: auth && auth.loginInfo && auth.loginInfo.UserID,
      settingType: 6,
      actionFlag: 2,
      entityID: 0,
      licID: 0,
      uUserID: data.id,
      utype: userType ? parseInt(userType) : 0,
      // notificationList: "",
      // pwd: "",
      fullName: "",
      emailID: "",
      // mobile: "",
    };
    if (userType) {
      api
        .post("/api/CoSettings", payload)
        .then(function (response) {
          if (response && response.data && response.data.length > 0) {
            if (response.data[0].Status === "Updated") {
              toast.success("User role changed sucessfully");
              getSettingData();
            }
          } else {
            toast.error("Something went wrong !!!");
          }
        })
        .catch(function (error) {
          if (error) {
          }
        });
    }
  };

  const cancelCheckIcon = (key) => {
    const list = [...fields];
    list[key].showAcceptDelectIcon = false;
    setFields(list);
  };
  const onChangeRoleDropDown = (data, key) => {
    defaultOption = data;
    onClickRoleDropDown(data, key);
  };

  const onClickRoleDropDown = (data, index) => {
    const list = [...fields];
    list[index].roleDropDown = data;
    setFields(list);
  };

  const handleChangeInputBoxRole = (value) => {
    setInputTeamMember({ ...inputTeamMember, ["role"]: value });
  };

  const handleChangeInputBoxRoleMobile = (value) => {
    setInputTeamMember({ ...inputTeamMember, ["role"]: value });
  };

  const handleChangeRoleMobile = (value) => {
    setInputTeamMember({ ...inputTeamMember, ["role"]: value });
    onConfirmChangeRole(currentRow, openPopupIndex, value);
    closeChangeRole();
  };
  const onChangeHandler = (name) => (e) => {
    setIsValidEmail(true);
    setAlreadyExist(false);
    const { name, value } = e.target;
    if (name === "fullName") {
      const re = /^[a-z|A-Z_ ]*$/;
      if (e.target.value && !re.test(e.target.value)) {
        return "";
      }
    }
    if (name === "email") {
      onValidateEmail(e);
    }
    setInputTeamMember({ ...inputTeamMember, [name]: e.target.value });
  };

  const onValidateEmail = async (e) => {
    if (isEmail(e.target.value)) {
      let email = e.target.value;

      let emailAssign = teamMemberData.find((item) => item.EmailID === email);

      if (emailAssign === undefined) {
        setAlreadyExist(false);
        let payload = {
          loginID: e.target.value,
          pwd: "",
          rememberme: 0,
          loginty: "AdminEmail",
        };
        await api
          .post("/api/availabilityCheck", payload)
          .then(function (response) {
            if (response && response.data && response.data.Status === "True") {
              setIsValidEmail(false);
            } else {
              setIsValidEmail(true);
            }
          })
          .catch(function (error) {
            if (error) {
            }
          });
      } else {
        setAlreadyExist(true);
      }
    }
  };
  const checkButtonDisabled = () => {
    let isNext = true;
    if (
      inputTeamMember.fullName === "" ||
      inputTeamMember.email === "" ||
      inputTeamMember.role.length === 0 ||
      !isEmail(inputTeamMember.email)
    ) {
      isNext = false;
      return isNext;
    }
    return isNext;
  };
  const onAddNewMemberMobile = () => {
    const drawerParent = document.getElementById("drawerParentAddNew");
    const drawerChild = document.getElementById("drawerChildAddNew");
    if (drawerParent) {
      drawerParent.classList.add("overlayAccount");
      drawerChild.style.bottom = "0%";
    }
  };

  const closeMemberMobilePOP = () => {
    const drawerParent = document.getElementById("drawerParentAddNew");
    const drawerChild = document.getElementById("drawerChildAddNew");
    if (drawerParent) {
      drawerParent.classList.remove("overlayAccount");
      drawerChild.style.bottom = "-100%";
    }
  };
  const MoreDetails = (item) => {
    setCurrentRow(item);
    const drawerParent = document.getElementById("moreDetailsParent");
    const drawerChild = document.getElementById("moreDetailsChild");
    if (drawerParent) {
      drawerParent.classList.add("overlayMoreDetails");
      drawerChild.style.bottom = "0%";
    }
  };

  const closeMoreDetails = () => {
    const drawerParent = document.getElementById("moreDetailsParent");
    const drawerChild = document.getElementById("moreDetailsChild");
    if (drawerParent) {
      drawerParent.classList.remove("overlayMoreDetails");
      drawerChild.style.bottom = "-100%";
    }
    setCurrentRow([]);
  };

  const serachOpenMobile = () => {
    setIsSearchOpenMobile(true);
    const element = document.getElementById("searchBox");
    if (element) {
      element.classList.add("searchBoxMobile");
    }
  };
  const onsubmit = (str) => {
    setIsValidate(true);
    if (
      inputTeamMember.fullName === "" ||
      inputTeamMember.email === "" ||
      !isEmail(inputTeamMember.email) ||
      inputTeamMember.role.length === 0 ||
      !isValidEmail
    ) {
      return "";
    }
    let _userRole = inputTeamMember.role;
    setIsValidate(false);
    const payload = {
      gUserID: auth && auth.loginInfo && auth.loginInfo.UserID,
      settingType: 6,
      actionFlag: 1,
      entityID: 0,
      licID: 0,
      uUserID: 0,
      utype:
        _userRole && typeof _userRole === "object"
          ? parseInt(_userRole.value)
          : parseInt(_userRole),
      // notificationList: "",
      // pwd: "",
      fullName: inputTeamMember.fullName,
      emailID: inputTeamMember.email,
      // mobile: ""
    };
    if (_userRole) {
      api
        .post("/api/CoSettings", payload)
        .then(function (response) {
          if (response && response.data) {
            if (response.data.Status === false) {
              toast.error("Something went wrong !!!");
            } else {
              toast.success("The invitation has been sent through email");
              setTimeout(() => {
                setAddNew(false);
                setInputTeamMember({
                  fullName: "",
                  email: "",
                  role: [],
                });
              }, 800);
              getSettingData();
              if (str && str === "mobile") {
                closeMemberMobilePOP();
              }
            }
          } else {
            toast.error("Something went wrong !!!");
          }
        })
        .catch(function (error) {
          if (error) {
          }
        });
    }
  };
  return (
    <div className="co-team-member">
      <ReAssignTasksModal
        openModal={isShowReAssignModal}
        setShowModal={setIsShowReAssignModal}
        userType={reAssignUserType}
        userId={reAssignUserId}
      />
      <ReAssignTasksModal
        openModal={isShowReAssignModalMobile}
        setShowModal={setIsShowReAssignModalMobile}
        userType={reAssignUserType}
        userId={reAssignUserId}
      />
      {visible &&
        deleteMemeberIndex !== "" &&
        _createDelectActionModal(deleteMemeberIndex)}
      <div className="d-none d-md-block">
        <div className="d-flex">
          <div className="personal-mgt-title">Team Members </div>
          {!isSearchOpen && (
            <div className="right-search-bar">
              <span className="filter-text">Filter by:</span>
              <Dropdown
                onChange={(value) => _filterBy(value)}
                arrowClosed={<span className="arrow-closed" />}
                arrowOpen={<span className="arrow-open" />}
                options={filterOptions}
                value={filterOption}
                placeholder="Select an option"
              />
              <span onClick={() => onClickSearchIcon()} className="search-icon">
                <img src={teamSearch} alt="team Search Icon" />
              </span>
              {userDetails && userDetails.UserType !== 6 && (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setAddNew(true)}
                  className="add-new-plus"
                >
                  add new +
                </div>
              )}
            </div>
          )}
          {isSearchOpen && (
            <div className="right-search-bar searchBox">
              <div className="input-group form-group">
                {searchText.length > 0 ? (
                  <input
                    className="form-control setPlaceHolder textwithoutFocus"
                    type="text"
                    placeholder="Search by name, email and number"
                    value={searchText}
                    onChange={(e) => handleSearchInputChange(e)}
                  />
                ) : (
                  <input
                    className="form-control setPlaceHolder"
                    type="text"
                    placeholder="Search by name, email and number"
                    value={searchText}
                    onChange={(e) => handleSearchInputChange(e)}
                  />
                )}
                <img
                  className="IconGray"
                  src={searchIcon}
                  alt="team Search Icon"
                />
                <span className="input-group-append">
                  <button
                    onClick={() => onClickSearchIcon()}
                    className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5"
                    type="button"
                  >
                    <img src={closeIconGray} alt="team Search Icon" />
                  </button>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <div className="d-block d-md-none">
          <div className="mobile-py">
            <div className="d-flex position-relative">
              <div className="col-10 col-sm-12 col-md-12 col-xl-12 pl-0">
                <div className="personal-mgt-title">Team Members</div>
              </div>
              <div className="col-2 col-sm-12 col-md-12 col-xl-12 d-block d-md-none">
                <img
                  className="close-icon-personal"
                  src={closeBlack}
                  onClick={() => {
                    handleClose(true);
                  }}
                  alt="close Black"
                />
              </div>
            </div>
          </div>
          <div className="scroll-personal-grid position-relative">
            {/* <div className="">
                    <div className="col-12">
                    <div className="right-search-bar searchBox">
                        <div className="input-group form-group">
                            <img className="IconGrayInput" src={searchIcon} alt="team Search Icon" />

                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search by name, email and number"
                                value=""
                                
                            />
                            <span className="input-group-append">
                                <button className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5" type="button">
                                    <img src={closeIconGray} alt="team Search Icon" />
                                </button>
                            </span>
                        </div>
                    </div>
                    </div>
                    </div>
                    <br /> */}
            <div className="d-flex position-relative">
              <div className="col-4 col-sm-2 col-md-2 col-xl-2 pl-0">
                {userDetails && userDetails.UserType !== 6 ? (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => onAddNewMemberMobile(true)}
                    className="add-new-plus"
                  >
                    add new +
                  </div>
                ) : (
                  <div
                    className="add-new-plus"
                    style={{ height: "20px", cursor: "auto" }}
                  ></div>
                )}
              </div>
              <div className="col-8 col-sm-12 col-md-12 col-xl-12 pl-0">
                {!isSearchOpenMobile && (
                  <div className="">
                    <img
                      onClick={() => setShowMobileFilter(true)}
                      className="dropDownIcon"
                      src={dropDownIcon}
                      alt="close Black"
                    />
                    {showMobileFilter && !isSearchOpenMobile && (
                      <div ref={mobileFilterRef}>
                        {" "}
                        <div className="dropDown-tooltip">
                          <div
                            onClick={() => _filterBy("0", "mobileFilter")}
                            className="change-role"
                          >
                            None
                          </div>
                          <div
                            onClick={() => _filterBy("4", "mobileFilter")}
                            className="change-role"
                          >
                            Team Member
                          </div>
                          <div
                            onClick={() => _filterBy("5", "mobileFilter")}
                            className="change-role"
                          >
                            Approver
                          </div>
                          <div
                            onClick={() => _filterBy("3", "mobileFilter")}
                            className="change-role"
                          >
                            CO
                          </div>
                          <div
                            onClick={() => _filterBy("az", "mobileFilter")}
                            className="change-role"
                          >{`A > Z`}</div>
                          <div
                            onClick={() => _filterBy("za", "mobileFilter")}
                            className="change-role"
                          >
                            {`Z < A`}{" "}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div id="searchBox" className="right-search-bar searchBox">
                  <div className="input-group form-group">
                    <img
                      onClick={() => serachOpenMobile()}
                      className="IconGray"
                      src={searchIcon}
                      alt="team Search Icon"
                    />

                    {isSearchOpenMobile && (
                      <div className="searchBox">
                        <div className="input-group form-group">
                          {searchText.length > 0 ? (
                            <input
                              className="form-control setPlaceHolder placeHold textwithoutFocus"
                              type="text"
                              placeholder="Search by name, email and number"
                              value={searchText}
                              onChange={(e) => handleSearchInputChange(e)}
                            />
                          ) : (
                            <input
                              className="form-control setPlaceHolder placeHold"
                              type="text"
                              placeholder="Search by name, email and number"
                              value={searchText}
                              onChange={(e) => handleSearchInputChange(e)}
                            />
                          )}
                          <span className="input-group-append">
                            <button
                              className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5"
                              type="button"
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                onClick={() => onClickSearchMobileIcon()}
                                src={closeIconGray}
                                alt="team Search Icon"
                              />
                            </button>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 pl-0 pr-0">
              <div className="line-after-heaing"></div>
            </div>
            {fields &&
              fields.length > 0 &&
              fields.map((item, index) => (
                <div className="team-member-list">
                  <div className="d-flex">
                    <div className="left-side-circleName">
                      <div className="col-12 pl-0">
                        <div className="holding-list-bold-title-background">
                          <span className="circle-dp">
                            {getInitials(item.fullName)}
                          </span>{" "}
                          {item.fullName}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="left-side-circleName">
                      <div className="col-10 pl-0">
                        <div className="roleEmailText">{item.role}</div>
                      </div>
                      <div className="col-2 pl-0">
                        {item.showAcceptDelectIcon === false &&
                          teamMemberData &&
                          teamMemberData.length > 0 && (
                            <img
                              className="three-dot"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setReAssignUserType(
                                  fieldArray.filter(
                                    (users) => users.id === item.id
                                  )[0].UserType
                                );
                                setReAssignUserId(item.id);
                                if (openPopupIndex !== "") {
                                  setOpenPopupIndex("");
                                } else {
                                  openPopup(index);
                                }
                              }}
                              src={threeDots}
                              alt="three Dots Icon"
                            />
                          )}

                        {openPopupIndex !== "" && openPopupIndex === index && (
                          <div
                            ref={innerRef}
                            className="three-dot-tooltip"
                            style={{
                              height: `${
                                userDetails && userDetails.UserType === 6
                                  ? "44px"
                                  : "177px"
                              }`,
                            }}
                          >
                            <div
                              className="change-role"
                              onClick={() => {
                                MoreDetails(item);
                                setOpenPopupIndex("");
                              }}
                            >
                              More details
                            </div>
                            {userDetails && userDetails.UserType !== 6 && (
                              <>
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    onChangeRoleClick("mobile", item, index);
                                    // changeRoleMobile(item, index);
                                    // setOpenPopupIndex("");
                                  }}
                                  className="change-role"
                                >
                                  Change role
                                </div>
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setIsShowReAssignModalMobile(true);
                                    setOpenPopupIndex("");
                                  }}
                                  className="change-role"
                                >
                                  Re-Assign
                                </div>

                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setVisible(true);
                                    setDeleteMemberIndex(index);
                                    setOpenPopupIndex("");
                                  }}
                                  className="delete-member"
                                >
                                  Delete member
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="bottom-line"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div id="moreDetailsParent" className="">
        <div id="moreDetailsChild" className="bottomBarFixedMoreDetails">
          <div className="change-role-mobile">
            {" "}
            <img
              style={{ cursor: "pointer" }}
              onClick={() => closeMoreDetails()}
              className=""
              src={changeRoleClose}
              alt="close Black"
            />{" "}
            More Details
          </div>
          {currentRow && Object.keys(currentRow).length > 0 && (
            <div>
              <div className="d-flex row">
                <div className="col-2">
                  <span className="role-text">Email:</span>
                </div>
                <div className="col-10 pl-0">
                  <span className="user-email-right-mobile">
                    {currentRow && currentRow.email && currentRow.email}
                  </span>
                </div>
              </div>
              <div className="d-flex row">
                <div className="col-2">
                  <span className="role-text">Mobile:</span>
                </div>
                <div className="col-10 pl-0">
                  <span className="user-email-right-mobile">
                    {currentRow &&
                      currentRow.mobileNuber &&
                      currentRow.mobileNuber}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div id="drawerParent" className="">
        <div id="drawerChild" className="bottomBarFixedChangeRole">
          <div className="change-role-mobile">
            {" "}
            <img
              style={{ cursor: "pointer" }}
              onClick={() => closeChangeRole()}
              className=""
              src={changeRoleClose}
              alt="close Black"
            />{" "}
            Change role
          </div>
          <div className="d-flex row">
            <div className="col-2">
              <span className="role-text">Role</span>
            </div>
            <div className="col-10 pl-0">
              <Dropdown
                style={{ width: 240 }}
                onChange={(value) => handleChangeRoleMobile(value)}
                arrowClosed={<span className="arrow-closed" />}
                arrowOpen={<span className="arrow-open" />}
                options={roleOptionMobile}
                value={roleTitle}
                placeholder="Select role"
              />
            </div>
          </div>
          {/* <div className="d-flex row">
                    
                        <div className="col-2"><span className="role-text">Email:</span></div>
                        <div className="col-10 pl-0"><span className="user-email-right-mobile">animeshmishra@bnksecurities.com</span></div>
                    </div>
                    <div className="d-flex row">
                    
                        <div className="col-2"><span className="role-text">Mobile:</span></div>
                        <div className="col-10 pl-0"><span className="user-email-right-mobile">+91 9876543211</span></div>
                    </div> */}
          {/* <span onClick={() => closeMoreDetails()}>More Deatils</span> */}
        </div>
      </div>
      {/* <div className="border-header"></div> */}
      <div id="drawerParentAddNew" className="">
        <div id="drawerChildAddNew" className="sideBarFixedAccount">
          <div className="change-role-mobile">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => closeMemberMobilePOP()}
              className=""
              src={changeRoleClose}
              alt="close Black"
            />{" "}
            Add New{" "}
          </div>
          {/* <span onClick={() => closeMemberMobilePOP()}>close</span> */}
          <div className="col-12 pl-0 pr-0">
            <div className="form-group">
              <label className="label-mobile">Full name</label>
              <input
                type="text"
                name="fullName"
                value={inputTeamMember.fullName}
                onChange={onChangeHandler("fullName")}
                className="form-control countryCode-sucess"
                placeholder="Enter member's full name"
              />
              {isValidate && inputTeamMember.fullName === "" && (
                <p className="input-error-message">Member name is required</p>
              )}
            </div>
            <div className="form-group">
              <label className="label-mobile">Email-Id</label>
              <input
                type="text"
                type="text"
                name="email"
                value={inputTeamMember.email}
                onChange={onChangeHandler("email")}
                onBlur={(e) => onValidateEmail(e)}
                className="form-control countryCode-sucess"
                placeholder="Enter member's email"
              />
              {inputTeamMember.email !== "" &&
                !isEmail(inputTeamMember.email) && (
                  <p className="input-error-message">Email is invalid</p>
                )}

              {inputTeamMember.email !== "" && alreadyExist === true ? (
                <p className="input-error-message absPosition">
                  Email already assigned to another role
                </p>
              ) : (
                inputTeamMember.email !== "" &&
                !isValidEmail && (
                  <p className="input-error-message absPosition">
                    Email is already exists
                  </p>
                )
              )}
            </div>
            <div className="form-group">
              <label className="label-mobile">Role</label>
              <Dropdown
                style={{ width: 240 }}
                onChange={(value) => handleChangeInputBoxRoleMobile(value)}
                arrowClosed={<span className="arrow-closed" />}
                arrowOpen={<span className="arrow-open" />}
                options={optionsInputBoxRole}
                value={
                  inputTeamMember.role.length === 0
                    ? null
                    : inputTeamMember.role
                }
                placeholder="Select role"
              />
            </div>
          </div>
          <div className="row aligncenter last-two-btn">
            <div className="col-12 col-sm-12 col-md-12 col-xl-12 flex pl-0">
              <button
                disabled={
                  checkButtonDisabled() !== true ||
                  alreadyExist === true ||
                  isValidEmail === false
                    ? true
                    : false
                }
                onClick={() => onsubmit("mobile")}
                className={
                  checkButtonDisabled() !== true ||
                  alreadyExist === true ||
                  isValidEmail === false
                    ? "btn save-details common-button-disabled btn-width  "
                    : "btn save-details btn invite-blue-btn btn-width"
                }
              >
                invite
              </button>
              <div
                onClick={() => {
                  closeMemberMobilePOP();
                  setInputTeamMember({
                    fullName: "",
                    email: "",
                    role: [],
                  });
                }}
                className="discard-label-link"
              >
                cancel
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-personal-grid d-none d-md-block position-relative">
        <table className="table co-company-details-tbl table_legenda">
          {/* <caption className="add-company-link">
                        Add another company
    </caption> */}
          <thead>
            <tr>
              <th className="tw-30" clscope="col">
                Full name
              </th>
              <th className="tw-20" scope="col">
                {" "}
                role{" "}
              </th>
              <th className="tw-30" scope="col">
                Email-ID
              </th>
              <th className="tw-15" scope="col">
                Mobile No.
              </th>
              <th className="tw-8" scope="col">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {addNew && (
              <tr className="focusRemove" style={{ height: "93px" }}>
                <td>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      name="fullName"
                      value={inputTeamMember.fullName}
                      onChange={onChangeHandler("fullName")}
                      className="form-control countryCode-sucess full-btn-tabel"
                      placeholder="Enter member's full name"
                    />
                    {isValidate && inputTeamMember.fullName === "" && (
                      <p className="input-error-message absPosition">
                        Member name is required
                      </p>
                    )}
                  </div>
                </td>
                <td>
                  <Dropdown
                    style={{ width: 240 }}
                    onChange={(value) => handleChangeInputBoxRole(value)}
                    arrowClosed={<span className="arrow-closed" />}
                    arrowOpen={<span className="arrow-open" />}
                    options={optionsInputBoxRole}
                    value={
                      inputTeamMember.role.length === 0
                        ? null
                        : inputTeamMember.role
                    }
                    placeholder="Select role"
                  />
                </td>

                <td>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      name="email"
                      value={inputTeamMember.email}
                      onChange={onChangeHandler("email")}
                      onBlur={(e) => onValidateEmail(e)}
                      className="form-control countryCode-sucess"
                      placeholder="Enter member's email"
                    />
                    {inputTeamMember.email !== "" &&
                      !isEmail(inputTeamMember.email) && (
                        <p className="input-error-message absPosition">
                          Email is invalid
                        </p>
                      )}

                    {inputTeamMember.email !== "" && alreadyExist === true ? (
                      <p className="input-error-message absPosition">
                        Email already assigned to another role
                      </p>
                    ) : (
                      inputTeamMember.email !== "" &&
                      !isValidEmail && (
                        <p className="input-error-message absPosition">
                          Email is already exists
                        </p>
                      )
                    )}
                  </div>
                </td>
                <td>
                  <button
                    disabled={
                      checkButtonDisabled() !== true ||
                      alreadyExist === true ||
                      isValidEmail === false
                        ? true
                        : false
                    }
                    onClick={() => onsubmit()}
                    className={
                      checkButtonDisabled() !== true ||
                      alreadyExist === true ||
                      isValidEmail === false
                        ? "btn save-details common-button-disabled btn-width"
                        : " btn save-details common-button btn-width "
                    }
                  >
                    invite
                  </button>
                </td>
                <td>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setAddNew(false);
                      setInputTeamMember({
                        fullName: "",
                        email: "",
                        role: [],
                      });
                    }}
                    className="cancelLink"
                  >
                    Cancel
                  </div>
                </td>
              </tr>
            )}
            {fields &&
              fields.length > 0 &&
              fields.map((item, index) => (
                <tr className="focusRemove">
                  {item && item.fullName !== "" && (
                    <td>
                      <div className="holding-list-bold-title-background">
                        <span className="circle-dp">{item.initialsName}</span>{" "}
                        <div className="nameCirle"> {item.fullName} </div>
                      </div>
                    </td>
                  )}
                  {item.showAcceptDelectIcon === false && (
                    <td>
                      <div className="roleEmailText">{item.role}</div>
                    </td>
                  )}
                  {item.showAcceptDelectIcon === true && (
                    <td>
                      <Dropdown
                        onChange={(value) => onChangeRoleDropDown(value, index)}
                        arrowClosed={<span className="arrow-closed" />}
                        arrowOpen={<span className="arrow-open" />}
                        options={options}
                        value={fields && fields[index].roleDropDown}
                        defaultValue={defaultOption}
                        placeholder="Select an option"
                      />
                    </td>
                  )}

                  <td className="dropList">
                    <div className="roleEmailText">{item.email}</div>
                  </td>
                  <td>
                    <div className="contact-team"> {item.mobileNuber}</div>
                  </td>
                  {item.showAcceptDelectIcon === false &&
                    teamMemberData &&
                    teamMemberData.length > 0 &&
                    userDetails &&
                    userDetails.UserType !== 6 && (
                      <td className="pl-0">
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setReAssignUserType(
                              fieldArray.filter(
                                (users) => users.id === item.id
                              )[0].UserType
                            );
                            setReAssignUserId(item.id);
                            if (openPopupIndex !== "") {
                              setOpenPopupIndex("");
                            } else {
                              openPopup(index);
                            }
                          }}
                          className="aaaa float-right"
                        >
                          <img
                            className="three-dot"
                            src={threeDots}
                            alt="three Dots Icon"
                          />
                        </div>
                        {openPopupIndex !== "" && openPopupIndex === index && (
                          <div className="last-td" ref={innerRef}>
                            <div className="three-dot-tooltip">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  onChangeRoleClick("desktop", item, index);
                                  // changeRole(index);
                                  // setOpenPopupIndex("");
                                }}
                                className="change-role"
                              >
                                Change role
                              </div>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setIsShowReAssignModal(true);
                                  setOpenPopupIndex("");
                                }}
                                className="change-role"
                              >
                                Re-Assign Tasks
                              </div>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setVisible(true);
                                  setDeleteMemberIndex(index);
                                  setOpenPopupIndex("");
                                }}
                                className="delete-member"
                              >
                                Delete member
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    )}
                  {item.showAcceptDelectIcon === true && (
                    <td className="float-right border-0">
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => onConfirmChangeRole(item, index)}
                        className="check-Icon-circle"
                        src={greenCheck}
                        alt="check Icon"
                      />
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => cancelCheckIcon(index)}
                        className="delete-Icon-check"
                        src={redCheck}
                        alt="delete Icon"
                      />
                    </td>
                  )}

                  {/* {openPopupIndex !== "" && openPopupIndex === index && (<td className="last-td" ref={innerRef}>
                                    <div className="three-dot-tooltip">
                                        <div style={{ cursor: "pointer" }} onClick={() => changeRole(index)} className="change-role">Change role</div>
                                        <div style={{ cursor: "pointer" }} onClick={() => setVisible(true)} className="delete-member">Delete member</div>
                                    </div>
                                </td>)} */}
                </tr>
              ))}
            {/* <tr className="focusRemove">
                            <td>
                                <div className="holding-list-bold-title-background"><span className="circle-dp">DP</span> Dhananjay Prakash </div>
                            </td>
                            <td>
                                <Dropdown
                                    arrowClosed={<span className="arrow-closed" />}
                                    arrowOpen={<span className="arrow-open" />}
                                    options={options} value={defaultOption}
                                    placeholder="Select an option" />

                            </td>
                            <td className="dropList">
                                <div className="roleEmailText">
                                    animeshm@bnksecurities.com
                            </div>
                            </td>
                            <td>
                                <div className="contact-team"> +91 9876453211</div>
                            </td>
                            <td className="float-right border-0">
                                <img className="check-Icon-circle" src={greenCheck} alt="check Icon" />
                                 <img className="delete-Icon-check" src={grayCheck} alt="check Icon" /> 
                                <img className="delete-Icon-check" src={redCheck} alt="delete Icon" />

                            </td>
                        </tr> */}
            {/* <tr className="focusRemove">
                            <td>
                                <div className="holding-list-bold-title-background"><span className="circle-dp">DP</span> Dhananjay Prakash </div>
                            </td>
                            <td>
                                <div className="roleEmailText">
                                    Team Member
                          </div>
                            </td>
                            <td className="dropList">
                                <div className="roleEmailText">
                                    animeshm@bnksecurities.com
                            </div>
                            </td>
                            <td>
                                <div className="contact-team"> +91 9876453211</div>
                            </td>
                            <td>
                                <span><img className="three-dot" src={threeDots} alt="three Dots Icon" /></span>
                                <div className="three-dot-tooltip">
                                    <div className="change-role">Change role</div>
                                    <div className="delete-member">Delete member</div>
                                </div>
                            </td>
                        </tr> */}
            {/* <tr className="focusRemove">
                            <td>
                                <div className="holding-list-bold-title-background"><span className="circle-dp">DP</span> Dhananjay Prakash </div>
                            </td>
                            <td>
                                <Dropdown arrowClosed={<span className="arrow-closed" />}
                                    arrowOpen={<span className="arrow-open" />} options={options} value={defaultOption} placeholder="Select an option" />

                            </td>
                            <td className="dropList">
                                <div className="roleEmailText">
                                    animeshm@bnksecurities.com
                         </div>
                            </td>
                            <td>
                                <div className="contact-team"> +91 9876453211</div>
                            </td>
                            <td className="float-right border-0">
                                <img className="check-Icon-circle" src={greenCheck} alt="check Icon" />
                                <img className="delete-Icon-check" src={grayCheck} alt="check Icon" /> 
                                <img className="delete-Icon-check" src={redCheck} alt="delete Icon" />

                            </td>
                        </tr> */}
            {/* <tr className="focusRemove">
                            <td>
                                <div className="holding-list-bold-title-background"><span className="circle-dp">DP</span> Dhananjay Prakash </div>
                            </td>
                            <td>
                                <Dropdown arrowClosed={<span className="arrow-closed" />}
                                    arrowOpen={<span className="arrow-open" />} options={options} value={defaultOption} placeholder="Select an option" />

                            </td>
                            <td className="dropList">
                                <div className="roleEmailText">
                                    animeshm@bnksecurities.com
                            </div>
                            </td>
                            <td>
                                <div className="contact-team"> +91 9876453211</div>
                            </td>
                            <td className="float-right border-0">
                                <img className="check-Icon-circle" src={greenCheck} alt="check Icon" />
                                 <img className="delete-Icon-check" src={grayCheck} alt="check Icon" /> 
                                <img className="delete-Icon-check" src={redCheck} alt="delete Icon" />

                            </td>
                        </tr> */}
            {/* <tr className="focusRemove">
                            <td>
                                <div className="holding-list-bold-title-background"><span className="circle-dp">DP</span> Dhananjay Prakash </div>
                            </td>
                            <td>
                                <Dropdown arrowClosed={<span className="arrow-closed" />}
                                    arrowOpen={<span className="arrow-open" />} options={options} value={defaultOption} placeholder="Select an option" />

                            </td>
                            <td className="dropList">
                                <div className="roleEmailText">
                                    animeshm@bnksecurities.com
                        </div>
                            </td>
                            <td>
                                <div className="contact-team"> +91 9876453211</div>
                            </td>
                            <td className="float-right border-0">
                                <img className="check-Icon-circle" src={greenCheck} alt="check Icon" />
                                 <img className="delete-Icon-check" src={grayCheck} alt="check Icon" />
                                <img className="delete-Icon-check" src={redCheck} alt="delete Icon" />

                            </td>
                        </tr>
                        <tr className="focusRemove">
                            <td>
                                <div className="holding-list-bold-title-background"><span className="circle-dp">DP</span> Dhananjay Prakash </div>
                            </td>
                            <td>
                                <Dropdown arrowClosed={<span className="arrow-closed" />}
                                    arrowOpen={<span className="arrow-open" />} options={options} value={defaultOption} placeholder="Select an option" />

                            </td>
                            <td className="dropList">
                                <div className="roleEmailText">
                                    animeshm@bnksecurities.com
                               </div>
                            </td>
                            <td>
                                <div className="contact-team"> +91 9876453211</div>
                            </td>
                            <td className="float-right border-0">
                                <img className="check-Icon-circle" src={greenCheck} alt="check Icon" />
                                 <img className="delete-Icon-check" src={grayCheck} alt="check Icon" /> 
                                <img className="delete-Icon-check" src={redCheck} alt="delete Icon" />

                            </td>
                        </tr> */}
            {/* <tr className="focusRemove">
            <td>
               <div className="bk-Securities">B&K Insurance</div>
            </td>
            <td>
            <Dropdown arrowClosed={<span className="arrow-closed" />}
            arrowOpen={<span className="arrow-open" />} options={options} value={defaultOption} placeholder="Select an option" />
            </td>
            <td className="dropList">
            <Dropdown arrowClosed={<span className="arrow-closed" />}
            arrowOpen={<span className="arrow-open" />} options={options} value={defaultOption} placeholder="Select an option" />
            </td>
            <td>
               <div className="assign-with-icon"><img className="delete-Icon-check" src={assignIconCircle} alt="check Icon" /> assign </div>
            </td>
            <td>
              <div className="holding-list-bold-title"> <button className="btn buttonprimarygray">Add Licenses</button> </div>
            </td>
            <td>                              
             <img className="delete-Icon-check" src={greenCheck} alt="check Icon" /> 
             <img className="delete-Icon-check" src={grayCheck} alt="check Icon" /> <img className="delete-Icon-check" src={redCheck} alt="delete Icon" />
            </td>
        </tr> */}
          </tbody>
        </table>
      </div>
      {/* <div className="bottom-logo-strip personal-details">
                <div className="row aligncenter">
                    <div className="col-12">
                        <div className="company-delete-right-bottom"><img className="check-icon-small" src={checkIocnSmall} alt="close Gray Icon" /> Member removed  <img className="small-icon-close" src={smallClose} alt="close Gray Icon" /></div>
                    </div>
                </div>
            </div> */}
    </div>
  );
}

export default CoManagment;