import { useState } from "react";
import SideBar from "../VerificationFlow/components/SideBarInputControlTeamMember";
import PersonalDetails from "./components/PersonalDetails";

function VerificationFlow() {
  return (
    <div className="row">
      <div className="col-12 padding-right">
        <PersonalDetails />
      </div>
    </div>
  );
}

export default VerificationFlow;
