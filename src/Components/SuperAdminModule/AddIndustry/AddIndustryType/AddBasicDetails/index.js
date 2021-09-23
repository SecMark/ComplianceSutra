import React, { useState } from "react";
import "./style.css";
import DatePicker from "../../../../../CommonModules/sharedComponents/Datepicker";
import DropDown from "../../DropDown";
import { useDispatch, useSelector } from "react-redux";
// import Datepicker from "../../../../../CommonModules/sharedComponents/Datepicker";

function ADDBasicDetails({ basicDetails, handleChnageBasicDetails }) {
  const [drp, setDrp] = useState(["apple", "banana", "pineapple"]);
  const state = useSelector((state) => state);
  const actionDispatch = useDispatch();
  return (
    <div className="mt-3">
      <div className="BasicDetal-heading">
        <h1>Basic Details</h1>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <lable className="BD-lable" htmlFor="NameofSubTask">
              Name of the Industry
            </lable>
            <input
              type="text"
              className={`form-control BD-input`}
              id="NameofSubTask"
              name="industryName"
              value={basicDetails.industryName}
              onChange={handleChnageBasicDetails}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <DropDown
              options={drp}
              lableTitle="Industry Applicable In"
              inputTitle="England"
              dispatch={actionDispatch}
            />
          </div>
          <div className="col">
            <lable className="BD-lable mb-3" htmlFor="activateon">
              Activate Industry On
            </lable>
            <DatePicker
              name="industryactivateon"
              dispatch={actionDispatch}
              actionType="SET_ACTIVATE_INDUSTRY_ON"
              pageName={"insutrytype"}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <lable className="BD-lable mb-2" htmlFor="Description">
              Short Description
            </lable>
            <textarea
              className="IT-description"
              id="Description"
              name="shortDescription"
              value={basicDetails.shortDescription}
              onChange={handleChnageBasicDetails}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ADDBasicDetails;
