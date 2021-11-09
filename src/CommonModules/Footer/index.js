import React from "react";
import "./style.css";
import headerLogo from "../../assets/Images/logo.png";
import {Link} from "react-router-dom";
export default function Footer() {
  return (
    <footer class="bg-dark text-center footer-link">
      <div className="container">
        <div class="row">
          <div class="col-lg-4 col-md-4 text-left">
            <a href="#">
              <img className="header-logo" src={headerLogo} alt="logoaa" />
              <span className="capmtech-text">COMPLIANCE SUTRA</span>
            </a>
          <Link to="/sign-up">  <button className="get-started">GET STARTED</button> </Link>
          </div>

          <div class="col-lg-2 offset-lg-2 col-md-6 mb-4 mb-md-0">
            <div className="footer-title">Our Products</div>
            <div className="links-grid">
              <p>
                <a href="#!" class="footer-link">
                  Compliance
                </a>
              </p>
              <p>
                <a href="#!" class="footer-link">
                  Audit
                </a>
              </p>
              <p>
                <a href="#!" class="footer-link">
                  Process
                </a>
              </p>
            </div>
          </div>

          <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
            <div className="footer-title">About us</div>

            <ul class="list-unstyled mb-0 text-left">
              <li>
                <a href="#!" class="footer-link">
                  Meet the Team
                </a>
              </li>
              <li>
                <a href="#!" class="footer-link">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#!" class="footer-link">
                  Career
                </a>
              </li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
            <div className="footer-title">Contact Us</div>

            <ul class="list-unstyled mb-0 text-left">
              <li>
                <a href="#!" class="footer-link">
                  +91 9876543210
                </a>
              </li>
              <li>
                <a href="#!" class="footer-link">
                  help@capmtech.in
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="copyright-grid">
              <div class="text-center p-3">
                © 2020 Copyright:
                <a class="footer-link" href="">
                  MDBootstrap.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
