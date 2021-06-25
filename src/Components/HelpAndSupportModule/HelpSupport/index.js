import React, { useState, useReducer, useEffect, useCallback } from "react";
import { withRouter } from "react-router";
//import LeftSideBar from "src\Components\OnBording\SubModules\DashBoardCO\components\LeftSideBar.js";
import LeftSideBar from "../../OnBording/SubModules/DashBoardCO/components/LeftSideBar.js";
import HelpSideBar from "../HelpSupportSidebar";
import "./style.css";
const HelpSupport = () => {

  const [value, setState] = useState(null);
  useEffect(() => {
    console.log(value);
  }, [value]);


  return (
    <div className="help-side-bar">
      <LeftSideBar />
      <HelpSideBar onChange={setState} />
      <div className="row m-4">
        <div className="col-12">
          <div className="help-container">
            <iframe src={value}></iframe>
            {/* <div className="help-container-title">
              What is Settlement Scheme 2020 all about?
            </div>
            <div className="help-container-text">
              In view of the large-scale disruption caused by the COVID-19 pandemic, markets regulator Sebi has extended till 31 December the one-time settlement scheme for entities that executed reversal of trades in stock options segment of the BSE during 2014 and 2015.

              The settlement scheme, introduced by the regulator in July, commenced on 1 August, 2020 and was supposed to end on 31 October, 2020.

              However, amidst the disruption caused by the pandemic, Sebi received many representations seeking extension of the period of the scheme, the regulator said in a public notice issued late on Saturday.

            </div> */}
          </div>
        </div>

      </div>
    </div>
  )
}

export default withRouter(HelpSupport);