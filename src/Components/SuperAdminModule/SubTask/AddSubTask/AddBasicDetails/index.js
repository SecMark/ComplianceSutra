import React, { useState } from "react";
import "./style.css";
import { DatePicker } from "antd";
import DropDown from "../../DropDown";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// import Datepicker from "../../../../../CommonModules/sharedComponents/Datepicker";

function ADDBasicDetails({ basicDetails, handleChnageBasicDetails }) {
  const [drp, setDrp] = useState(["apple", "banana", "pineapple"]);
  const [addDatePicker, setAddDatePicker] = useState(0);
  const state = useSelector((state) => state);

  return (
    <div className="mt-3">
      <div className="BasicDetal-heading">
        <h1>Basic Details</h1>
      </div>
      <div className="form-group">
        <lable className="BD-lable" htmlFor="NameofSubTask">
          Name of the Subtask
        </lable>
        <input
          type="text"
          className={`form-control BD-input`}
          id="NameofSubTask"
          name="subTaskName"
          value={basicDetails.subTaskName}
          onChange={handleChnageBasicDetails}
        />
        <div className="row mt-3">
          <div className="col">
            <DropDown
              options={state.HistoryReducer.companyList}
              lableTitle="Associate Licence"
              inputTitle="Associate Licence"
              //  dispatch={actionDispatch}
            />
          </div>
          <div className="col">
            <DropDown
              options={state.HistoryReducer.companyList}
              lableTitle="Associate Sub Licence"
              inputTitle="Sub Associate"
              //  dispatch={actionDispatch}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <lable className="BD-lable mb-2" htmlFor="activateon">
              Activate Licence on
            </lable>
            <DatePicker className="BD-Datepicker" name="activateon" />
          </div>
          <div className="col">
            {/* <lable className="BD-lable mb-2" htmlFor="activateon">
                    occurence(Frequency) 
                </lable> */}
            <DropDown
              options={state.HistoryReducer.companyList}
              lableTitle="occurence(Frequency)"
              inputTitle="Sub Associate"
              //  dispatch={actionDispatch}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <lable className="BD-lable mb-2" htmlFor="activateon">
              Complitiion Date
            </lable>
            <DatePicker className="BD-Datepicker" name="activateon" />
          </div>
          <div className="col">
            <lable className="BD-lable mb-2" htmlFor="activateon">
              Due Date
            </lable>
            <DatePicker className="BD-Datepicker" name="activateon" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            {addDatePicker > 0 && (
              <>
                <lable className="BD-lable mb-2" htmlFor="activateon">
                  Temporary Due Date
                </lable>
                <DatePicker className="BD-Datepicker" />
              </>
            )}
          </div>
          <div className="col">
            {addDatePicker === 2 && (
              <>
                <lable className="BD-lable mb-2" htmlFor="activateon">
                  Another Temporary Due Date
                </lable>
                <DatePicker className="BD-Datepicker" />
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div
              className="mt-2"
              onClick={() => setAddDatePicker(addDatePicker + 1)}
            >
              <AiFillPlusCircle className="BD-Add-button" />{" "}
              <span className="BD-Addtempo">ADD TEMPORARY DUE DATE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ADDBasicDetails;
