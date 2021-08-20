import React from "react";
import MobileLeftSidebar from "../../../OnBording/SubModules/DashBoardCO/components/MobileLeftSidebar";
import togglemobile from "../../../../assets/Icons/togglemobile.png";
import sideBarlogo from "../../../../assets/Icons/sideBarlogo.png";
function MobileHeader() {
  const onHBMenu = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.add("overlay");
      drawerChild.style.left = "0%";
    }
  };
  const closeMobileSidebar = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.remove("overlay");
      drawerChild.style.left = "-100%";
    }
  };
  return (
    <div>
      <div className="d-block d-md-none">
        <div id="sideBarParent" className="">
          <div id="sideBarChild" className="leftSideBarFixed">
            <MobileLeftSidebar
              className="d-block d-md-none"
              close={() => closeMobileSidebar()}
            />
          </div>
        </div>
      </div>
      <div className="mobile-head d-block d-md-none">
        <div className="d-flex">
          <div
            className="w-25"
            style={{ cursor: "pointer" }}
            onClick={() => onHBMenu()}
          >
            <img src={togglemobile} alt="toggle mobile" />
          </div>
          <div className="w-75">
            {" "}
            <img
              className="mobile-logo"
              src={sideBarlogo}
              alt="sideBarlogo"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
