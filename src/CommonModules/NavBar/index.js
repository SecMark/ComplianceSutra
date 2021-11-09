import React from "react";
import "./style.css";
import Logo from "../../assets/Images/CAPMLanding/NavLogo.svg";
import {Link} from "react-router-dom";
function NavBar() {
  return (
    <div>
      <div className="container navbar-bottom-border">
        <nav className="navbar navbar-expand-lg navbar-light">
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
            {/* <li className="nav-item dropdown">
                <a
                  className="nav-link nav-link-fonts dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All Products
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link nav-link-fonts dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Business
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li> */}
              <li className="nav-item">
                <a className="nav-link nav-link-fonts" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-fonts" href="#">
                  Support
                </a>
              </li>
            </ul>
            <div className="my-2 my-lg-0">
             <ul className="navbar-nav">
             <li className="nav-item">
                <a className="nav-link nav-link-fonts" href="#">
                  Contact Sales
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-fonts" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
               <Link to="/sign-up"> <button className="navbar-getstarted-button" href="#">
                  Get Started 
                </button></Link>
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
