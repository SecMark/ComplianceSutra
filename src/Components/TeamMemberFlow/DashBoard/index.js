import React, { useState } from "react";
import "./style.css";
import Cobg from "../../../assets/Images/Onboarding/co-bg.png";
import TeamSidebar from "./components/TeamMemberSidebar/";
import RightSideGrid from "./components/TeamMemberTaskDetails/";
import FileUpload from "./components/TeamMemberFileUpload/";

function TeamMember() {
  const [showDescription, setShowDescription] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  return (
    <div className="row team-dashboard">
      <div
        className="col-4 left-fixed left-side-width"
        style={{ maxWidth: showDescription ? "30%" : "5.65vw" }}
      >
        <div className="side-inner">
          <TeamSidebar
            showDescription={showDescription}
            isMarked={isMarked}
            setIsMarked={setIsMarked}
          />
        </div>
      </div>

      <div className={showDescription ? "col-12 pd-right" : "col-12"}>
      <img className="right-bg" src={Cobg} alt=""/>
        {!showDescription ? (
          <RightSideGrid
            showDescription={showDescription}
            setShowDescription={setShowDescription}
            setIsMarked={setIsMarked}
            isMarked={isMarked}
          />
        ) : (
          <FileUpload
            setShowDescription={setShowDescription}
            setIsMarked={setIsMarked}
            isMarked={isMarked}
          />
        )}
      </div>
    </div>
  );
}

export default TeamMember;
