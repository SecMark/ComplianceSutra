import React, { useState } from "react";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import HelpGetInTouchModal from "../HelpGetInTouchModal"

function HelpSideBar() {

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="helpsupport-side-bar bg-white">

      {/* Popups Start*/}
      <HelpGetInTouchModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {/* Popups End*/}

      <div className="get-main-helpsupportCo p-3">
        <div className="row">
          <div className="col-8">
            <p className="helpsupport-title ">Help & Support</p>

          </div>
          <div className="col-4">
            <span className="getintouch"  onClick={() => setModalShow(true)}>
              ?
            </span>
          </div>
        </div>
        <div className="helptsupport_menu-items">
          <div className="helptsupport-cotitle mb-2">
            Managing your acount
          </div>
          <ul>
            <li>
              <span>Sed quia consequuntur magni dolores eos qui ratione?</span>
              {/* <p className="arrowIcon">></p> */}
            </li>
            <li>
              <span>Lorem ipsum dolor sit amet, consectetur adipiscin?</span>
              {/* <p className="arrowIcon">></p> */}
            </li>
            <li>
              <span>Consectetur, adipisci velit, sed quia non nu?</span>
              {/* <p className="arrowIcon">></p> */}
            </li>
          </ul><br /><br />
          <div className="helptsupport-cotitle mb-2">
            Returns & Refunds
          </div>
          <ul>
            <li>
              <span>Sed quia consequuntur magni dolores eos qui ratione?</span>
              {/* <p className="arrowIcon">></p> */}
            </li>
            <li>
              <span>Lorem ipsum dolor sit amet, consectetur adipiscin?</span>
              {/* <p className="arrowIcon">></p> */}
            </li>
          </ul><br /><br />
          <div className="helptsupport-cotitle mb-2">
            Account Creation Process
          </div>
          <ul>
            <li>
              <span>Sed quia consequuntur magni dolores eos qui ratione?</span>
              {/* <p className="arrowIcon">></p> */}
            </li>
            <li>
              <span>Lorem ipsum dolor sit amet, consectetur adipiscin?</span>
              {/* <p className="arrowIcon">></p> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default withRouter(HelpSideBar)