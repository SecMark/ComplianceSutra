import React, { useState, useEffect } from "react";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import HelpGetInTouchModal from "../HelpGetInTouchModal";

const NOOP = () => { };

function HelpSideBar({ onChange = NOOP }) {

  const [modalShow, setModalShow] = React.useState(false); //state use for show modal

  const [content, setContent] = useState(''); //state use for set content
  useEffect(() => {
    onChange(content);
  }, [content, onChange]);

  const onClick = (mode) => {
    setContent(mode);
  }


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
            <span className="getintouch" onClick={() => setModalShow(true)}>
              ?
            </span>
          </div>
        </div>
        <div className="helptsupport_menu-items">
          <div className="helptsupport-cotitle mb-2">
            Managing your acount
          </div>
          <ul>
            <li onClick={() => onClick('http://beta.capmtech.com/#/')}>
              <span> 
                <a >
                  Sed quia consequuntur magni dolores eos qui ratione?
                </a>
              </span>
          
            </li>
            <li onClick={() => onClick('')}>
              <span>
                <a>
                  Lorem ipsum dolor sit amet, consectetur adipiscin?
                </a>
              </span>
          
            </li>
            <li onClick={() => onClick('')}>
              <span>
                <a>
                  Consectetur, adipisci velit, sed quia non nu?
                </a>
              </span>
          
            </li>
          </ul><br /><br />
          <div className="helptsupport-cotitle mb-2">
            Returns & Refunds
          </div>
          <ul>
            <li onClick={() => onClick('')}>
              <span>
                <a>Sed quia consequuntur magni dolores eos qui ratione?</a>
              </span>
          
            </li>
            <li onClick={() => onClick('')}>
              <span>
                <a>Lorem ipsum dolor sit amet, consectetur adipiscin?</a>
              </span>
          
            </li>
          </ul><br /><br />
          <div className="helptsupport-cotitle mb-2">
            Account Creation Process
          </div>
          <ul>
            <li onClick={() => onClick('')}>
              <span>
                <a>Sed quia consequuntur magni dolores eos qui ratione?</a>
              </span>
          
            </li>
            <li onClick={() => onClick('')}>
              <span>
                <a>Lorem ipsum dolor sit amet, consectetur adipiscin?</a>
              </span>
          
            </li>
          </ul>
        </div>
      </div>
    </div >
  )
}

export default withRouter(HelpSideBar)