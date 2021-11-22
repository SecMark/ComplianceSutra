import React from "react";
import "./style.css";
import Logo from "../../../assets/Images/CAPMLanding/NavLogo.svg";
import {Link} from "react-router-dom";
function NavBar() {
  return (
    <div>
      <div className="container navbar-bottom-border">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand navbar-heading" href="fake_page">
           <img src={Logo} alt="Logo"/> COMPLIANCE SUTRA
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            
              <li className="nav-item">
                <a className="nav-link compliance-module-demo-text" href="#!">
                  Compliance Module Demo
                </a>
              </li> 
            </ul>
            <div className="my-2 my-lg-0">
             <ul className="navbar-nav">
              <li className="nav-item">
               <Link to="/sign-up" className="navbar-getstarted-button-demo">
                  Skip Demo
                </Link>
              </li>
             </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
