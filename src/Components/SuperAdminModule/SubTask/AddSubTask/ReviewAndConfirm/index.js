import React from "react";
import "./style.css";

function ReviewAndConfirm({ handleEditBasicClick, handlePreviousClick }) {
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
          <p className="ReviewConfirm__subheadings">Name of the Subtask</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">
            Quetrly Review Of Stock Exchnage
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Associate Licence</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">
            National Stock Exchnage
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Associate Sub Licence</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">Registration</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Licence Activation date</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">14th Apr, 2021</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Occurence</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">Monthly</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Due Date</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">14th Apr, 2021</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Deadline</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">14th Apr, 2021</p>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col">
            <h1 className="ReviewConfirm__heading">
              Reference Documnets & Links
            </h1>
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
          <p className="ReviewConfirm__subheadings">Documents</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">Document 1</p>
          <p className="ReviewConfirm__subheadingsAns">Document2</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="ReviewConfirm__subheadings">Links</p>
        </div>
        <div className="col">
          <p className="ReviewConfirm__subheadingsAns">Link 1</p>
          <p className="ReviewConfirm__subheadingsAns">Link 2</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewAndConfirm;
