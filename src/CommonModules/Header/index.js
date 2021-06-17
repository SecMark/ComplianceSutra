import React from "react";
import { useSpring, animated } from "react-spring";
import "./style.css";
import headerLogo from "../../assets/Images/logo.png";
export default function Header() {
  const props = useSpring({
    delay: 700,
    marginTop: "0px",
    opacity: 1,
    from: { opacity: 0, marginTop: "-300px" },
  });
  return (
    <animated.div style={props} className="header-demo">
      <div className="container">
        <div className="header-logo">
          <div className="row">
            <div className="col-8">
              <ul className="list-inline">
                <li className="list-inline-item">
                  {" "}
                  <a href="#">
                    <img className="header-logo" src={headerLogo} alt="logo" />
                    <span className="camp">COMPLIANCE SUTRA</span>
                  </a>
                </li>
                <li className="list-inline-item mobile-hide">
                  <span className="compliance">Compliance Module Demo</span>
                </li>
              </ul>
            </div>
            <div className="col-4 skip-demo-section">
              <p className="skip-demo" disabled>
                SKIP DEMO
              </p>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
}
