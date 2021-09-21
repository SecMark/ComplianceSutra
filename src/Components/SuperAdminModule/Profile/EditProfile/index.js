import React, { useState, useEffect } from "react";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { IoAddCircle } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import { actions as coActions } from "../../../OnBording/SubModules/DashBoardCO/redux/actions";

const EditProfile = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [valuesBackup, setValuesBackup] = useState(null);
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);
  const [userInfoBackup, setUserInfoBackup] = useState(null);
  const [valuesChanged, setValuesChanged] = useState(false);
  const [values, setValues] = useState({
    userName: "",
    designation: "",
    emailId: "",
    mobileNo: "",
  });
  const [error, setError] = useState("");
  const [LicenceValue, setLicenceValue] = useState([]);
  const designationOptions = [
    {
      value: "Super Admin",
      label: "Super Admin",
    },
    {
      value: "Compliance Officer",
      label: "Compliance Officer",
    },
    {
      value: "Expert Reviewer",
      label: "Expert Reviewer",
    },
  ];
  const LicenseCertified = [
    {
      id: 1,
      value: "Goods and Service Tax",
    },
    {
      id: 2,
      value: "National Stock Exchange",
    },
    {
      id: 3,
      value: "Custom Duty",
    },
  ];
  const loggedUser = state && state.auth && state.auth.loginInfo;

  useEffect(() => {
    dispatch(
      coActions.availabilityCheckequest({
        loginID: loggedUser.EmailID,
        loginty: "AdminEmail",
      })
    );
  }, []);
  useEffect(() => {
    const _name =
      state &&
      state.taskReport &&
      state.taskReport.userAvailability &&
      state.taskReport.userAvailability.availabilityInfo &&
      state.taskReport.userAvailability.availabilityInfo.UserName;
    const _designation =
      state &&
      state.taskReport &&
      state.taskReport.userAvailability &&
      state.taskReport.userAvailability.availabilityInfo &&
      state.taskReport.userAvailability.availabilityInfo.Designation;
    const _emailId =
      state &&
      state.taskReport &&
      state.taskReport.userAvailability &&
      state.taskReport.userAvailability.availabilityInfo &&
      state.taskReport.userAvailability.availabilityInfo.EmailID;
    const _mobile =
      state &&
      state.taskReport &&
      state.taskReport.userAvailability &&
      state.taskReport.userAvailability.availabilityInfo &&
      state.taskReport.userAvailability.availabilityInfo.Mobile;
    const _userInfo =
      state &&
      state.taskReport &&
      state.taskReport.userAvailability &&
      state.taskReport.userAvailability.availabilityInfo;

    let userObj = {
      userName: _name != "" && _name != undefined ? _name : "",
      designation:
        _designation != "" && _designation != undefined ? _designation : "",
      emailId: _emailId != "" && _emailId != undefined ? _emailId : "",
      mobileNo: _mobile != "" && _mobile != undefined ? Number(_mobile) : "",
    };
    setValuesBackup(userObj);
    setUserInfoBackup(_userInfo);
    setValues(userObj);
  }, [state.taskReport.userAvailability]);
  const LicenseOptions = [
    { value: "NSE", label: "NSE", isFixed: "true" },
    { value: "BSE", label: "BSE", isFixed: true },
    { value: "CDS", label: "CDS", isFixed: true },
    { value: "CDS", label: "CDS", isFixed: true },
    { value: "CD", label: "CD", isFixed: true },
    { value: "CDSE", label: "CDSE", isFixed: true },
    { value: "CDSF", label: "CDSF", isFixed: true },
    { value: "CESE", label: "CESE", isFixed: true },
    { value: "ESEF", label: "ESEF", isFixed: true },
    { value: "ESEA", label: "ESEA", isFixed: true },
  ];
  const IndustryOptions = [
    { value: "Brokerage", label: "Brokerage" },
    {
      value: "Non-commercial services",
      label: "Non-commercial services",
    },
  ];

  const onChangeHandler = (name) => (event) => {
    if (name === "userName" || name === "designation") {
      const re = /^[a-z|A-Z_ ]*$/;
      if (event.target.value && !re.test(event.target.value)) {
        return "";
      }
    }
    if (name === "mobileNo") {
      const mobileNumberReg = /^[0-9]{0,10}$/;
      if (!mobileNumberReg.test(Number(event.target.value))) {
        return "";
      }
      setNumber(event.target.value);
    }
    if (name === "emailId") {
      setEmail(event.target.value);
    }
    setValuesChanged(true);
    setValues({ ...values, [name]: event.target.value });

    // }
  };

  const onDropDownChnage = (selectedOptions) => {
    let licarray = [];
    selectedOptions.forEach((element) => {
      licarray.push(element.value);
    });
    setError("");
    setLicenceValue(licarray);
    setValuesChanged(true);
  };

  const onSubmit = () => {
    let payload = {
      adminName: values.userName,
      adminMobile: values.mobileNo,
      adminEmail: values.emailId,
      userType: values.emailId !== valuesBackup.emailId ? 9 : 1,
      actionFlag: 2,
      designation: values.designation,
      userID: userInfoBackup.UserID,
    };
    dispatch(coActions.coDetailsInsUpdDelRequest(payload));
    setValuesChanged(false);
  };
  const onHandelSubmit = () => {
    if (LicenceValue.length === 0) {
      setError("please select at least one licence");
    } else {
      onSubmit();
    }
  };

  const DesignationStyles = {
    menu: (provided) => ({
      ...provided,
      width: 200,

      color: "black",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
    }),

    container: (provided) => ({
      ...provided,
      width: 280,

      margin: "0px 8px",
      fontSize: "15px",
    }),
    dropdownIndicator: () => ({
      color: "black",
      paddingRight: 4,
    }),

    singleValueLabel: () => ({
      backgroundColor: "white",
      padding: 2,
      margin: 2,
      borderRadius: 8,
    }),
    singleValue: () => ({
      border: "none",
      color: "black",
      fontSize: "85%",
      display: "flex",
    }),
    option: () => ({
      "&:hover": {
        backgroundColor: "#f7f4fe",
      },
      padding: 8,
      marginBottom: 5,
    }),
    indicatorSeparator: () => ({
      backgroundColor: "#f7f4fe",
    }),
    control: () => ({
      backgroundColor: "white",

      border: "1px solid #e4e4e4",
      display: "flex",
      borderRadius: 7,
      height: 40,
      fontWeight: "500",
    }),
  };

  return (
    <div className="DetailsContainer">
      <div className="DetailsHeader">
        <h3>Profile Details</h3>
        <div id="Line"></div>
      </div>
      <div className="DetailsForm">
        <form action="">
          <div className="FormElement">
            <p>Email-Id:</p>
            <div className="lockemail">
              <input
                type="text"
                defaultValue="rameshkumar@secmark.co.in"
                value={values.emailId}
                onChange={onChangeHandler("emailId")}
                disabled
              />
              <MdLock
                style={{
                  right: "26.5rem",
                  top: "9.1rem",
                }}
              />
            </div>
          </div>
          <div className="FormElement">
            <p>Full Name:</p>
            <input
              type="text"
              defaultValue="Ramesh Kumar"
              value={values.userName}
              onChange={onChangeHandler("userName")}
            ></input>
          </div>
          <div className="FormElement">
            <p>Designation:</p>

            <Select
              styles={DesignationStyles}
              defaultValue={designationOptions[0]}
              options={designationOptions}
            />
          </div>
          <div className="FormElement">
            <p>Phone Number:</p>
            <input
              type="text"
              defaultValue="+91  9434721588"
              value={values.mobileNo}
              onChange={onChangeHandler("mobileNo")}
            />
          </div>
        </form>
        <div className="FormElement">
          <p>License Certification In:</p>
          <div className="LicenseCertified">
            {LicenseCertified.map((license) => {
              return <p>{license.value}</p>;
            })}
          </div>
        </div>

        <div className="ProfileSubmit">
          <button
            disabled={valuesChanged === false}
            onClick={() => onHandelSubmit()}
          >
            SAVE CHANGES
          </button>
          {valuesChanged && (
            <button
              id="Discard"
              onClick={() => {
                setValues(valuesBackup);
                setValuesChanged(false);
              }}
            >
              DISCARD CHANGES
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
