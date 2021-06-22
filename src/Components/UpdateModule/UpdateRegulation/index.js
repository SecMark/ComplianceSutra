import React, { useState, useReducer, useEffect } from "react";
import horizontalbars from "../../../assets/Icons/horizontalbars.png";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import { withRouter } from "react-router";

const UpdatesRegulation = (props) => {
  return (
    <div className="">
      <LeftSideBar />
      <div className="">
        <div className="row">
          <div className="col-md-5">
            <h2 className="main-title">
              New Regulations <img src={horizontalbars} />
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(UpdatesRegulation);