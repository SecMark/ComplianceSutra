import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

function ReviewAndConfirm({ handleEditBasicClick, handlePreviousClick }) {
  const state = useSelector((state) => state);

  return (
    <div>
      <div>
        <div className="row">
          <div className="col">
            <h1 className="ReviewConfirm__heading">Basic Details</h1>
          </div>
          <div className="col">
            <h1
              className="ReviewConfirm__heading_Edit"
              onClick={() => handleEditBasicClick(3)}
            >
              Edit
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Name of the Industry</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">
            {state.AddIndustryReducer.industryName}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Industry Activation Date</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">14 Apr,2021</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Industry Active in</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">{state.AddIndustryReducer.industryApplicableIn}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Short Description</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">
            {state.AddIndustryReducer.shortDescription}
          </p>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col">
            <h1 className="ReviewConfirm__heading">Licenses Details</h1>
          </div>
          <div className="col">
            <h1
              className="ReviewConfirm__heading_Edit"
              onClick={() => handlePreviousClick(3)}
            >
              Edit
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Active Licenses</p>
        </div>
        <div className="col">
          {state.AddIndustryReducer.associateLicense.map((value, i) => (
            <p key={i} className="ReviewConfirm__subheadingsAns">
              {value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewAndConfirm;
