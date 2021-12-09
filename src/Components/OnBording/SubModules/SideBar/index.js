import React from "react";
import "./sideBar.css";
import SideBarBg from "../../../../assets/Images/Onboarding/side-bar-bg.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar-image-outer">
        <span className="image-span">
          <div className="image-inner">
            <img src={SideBarBg} alt="" />
          </div>
        </span>
      </div>
      <div className="sidbarBottom-grid">
        <div className="">
          <Carousel
            className="css-crousel"
            showArrows={true}
            autoPlay={true}
            interval={5000}
            infiniteLoop={true}
          >
            <div>
              <div className="big-title">
                Never miss a<br /> deadline
              </div>
              <div className="small-title">
                Track and complete your <br />
                compliance activities on time
              </div>
            </div>
            <div>
              <div className="big-title">
                Completion & <br /> performance
                <br />
                tracked
              </div>
              <div className="small-title">
                Keep track of task completion and <br />
                team performance both via
                <br /> dashboard and regular reports
              </div>
            </div>
            <div>
              <div className="big-title">
                Anticipate risks <br /> & be agile
              </div>
              <div className="small-title">
                Anticipate risks and manage
                <br /> unexpected delays by taking
                <br /> corrective actions
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
