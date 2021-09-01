import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import "./style.css";
import api from "../../../../apiServices";
import Select, { components } from "react-select";
import { IoAddCircle } from "react-icons/io5";
import { MdLock } from "react-icons/md";

const ProfileDetails = () => {
  const state = useSelector((state)=>state);
  const dispatch = useDispatch();
  const [email,setEmail] = useState(null);
  const [number,setNumber] =useState(null);
  const [values, setValues] = useState({
    userName: "",
    designation: "",
    emailId: "",
    mobileNo: "",
    countrycode: "",
  });
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
      countrycode:
        _userInfo !== "" && _userInfo !== undefined
          ? _userInfo.countrycode
          : "",
    };

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

  const customStyles = {
    multiValue: () => ({
      border: "none",
      color: "#9386ad",
      fontSize: "85%",
      display: "flex",
    }),
    multiValueLabel: () => ({
      backgroundColor: "#f7f4fe",
      padding: 2,
      margin: 3,

      borderRadius: 8,
    }),
    indicatorSeparator: () => ({
      backgroundColor: "#f7f4fe",
    }),
    control: () => ({
      paddingTop: 1,
      display: "flex",
      flexDirection: "column",
    }),
    container: () => ({
      border: "none",
      width: "400px",
      marginLeft: "130px",
      zIndex: 1,
    }),
    menu: () => ({
      paddingTop: 3,
      height: "100px",
      overflowY: "scroll",
    }),

    multiValueRemove: () => ({
      display: "none",
    }),

    dropdownIndicator: () => ({
      paddingRight: 10,
      cursor: "pointer",
    }),
    clearIndicator: () => ({
      display: "none",
    }),
  };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <IoAddCircle style={{ color: "#6c5dd3", marginRight: "3" }} />
          <span
            style={{
              color: "#6c5dd3",
              fontWeight: "500",
            }}
          >
            ADD NEW
          </span>
        </components.DropdownIndicator>
      )
    );
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
            <MdLock
              style={{
                position: "absolute",
                right: "17.5rem",
                margin: "7px",
                top: "8.6rem",
              }}
            />
            <input
              type="text"
              defaultValue="rameshkumar@secmark.co.in"
              value={values.emailId}
              disabled
            />
          </div>
          <div className="FormElement">
            <p>Full Name:</p>
            <input type="text" defaultValue="Ramesh Kumar"
            value={values.userName}
            ></input>
          </div>
          <div className="FormElement">
            <p>Phone Number:</p>
            <input type="text" defaultValue="+91  9434721588" 
            value={values.mobileNo}
            />
          </div>
          <div className="FormElement">
            <p>Designation:</p>
            <input type="text" defaultValue="Expert Reviewer" 
            value={values.designation}
            />
          </div>
        </form>
        <div className="FormElement">
          <p>License Expert in:</p>
          <Select
            components={{ DropdownIndicator }}
            isMulti
            styles={customStyles}
            defaultValue={LicenseOptions[0]}
            options={LicenseOptions || []}
          />
        </div>
        <div className="FormElement">
          <p>Industry Expert in:</p>
          <Select
            components={{ DropdownIndicator }}
            isMulti
            styles={customStyles}
            defaultValue={IndustryOptions[0]}
            options={IndustryOptions || []}
          />
        </div>
        <div className="ProfileSubmit">
          <button>SAVE CHANGES</button>
          <button id="Discard">DISCARD CHANGES</button>
        </div>
      </div>
    </div>
  );
};
export default ProfileDetails;
