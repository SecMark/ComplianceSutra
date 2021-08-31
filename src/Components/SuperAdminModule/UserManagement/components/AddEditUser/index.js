import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router";
import { AiOutlineClose } from "react-icons/ai";
import "./style.css";

const AddEditUser = (props) => {
  return (
    <div className="spacing">
      <div className="row">
        <div className="col-md-12">
          <AiOutlineClose
            size={20}
            style={{ fontWeight: "bold" }}
            onClick={() => props.onCloseTab()}
          />
          <div style={{ height: 20 }}></div>
          <h3 style={{ color: "#2c2738" }}>Add New Team Member</h3>
          <hr />
          {/* Progress Bar Over Here */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h6 style={{ color: "#2c2738" }}>Personal Details</h6>
        </div>
        <div className="col-md-6">
          <label className="form-control-label">Team Member's Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Full Name"
          />
        </div>
        <div className="col-md-6">
          <label className="form-control-label">Email ID</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email ID"
          />
        </div>
        <div className="col-md-6">
          <label className="form-control-label">Mobile No.</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Mobile No"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="10"
          />
        </div>
        <div className="col-md-6">
          <label className="form-control-label">Current Address Pincode</label>
          <input
            type="number"
            className="form-control"
            placeholder="6 Digits"
          />
        </div>
        <div className="col-md-12 mt-4">
          <h6 style={{ color: "#2c2738" }}>Internal Role Details</h6>
        </div>
        <div className="col-md-6">
          <label className="form-control-label">Select Role</label>
          <select className="form-control">
            <option>Team Member</option>
            <option>Super Admin</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AddEditUser);
