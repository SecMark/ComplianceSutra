import React from "react";
import "./style.css";
import SideBar from "../OnBording/SubModules/SideBar";
import SideBarInputControl from "../OnBording/SubModules/SideBarInputControl";
import GetStart from "../OnBording/SubModules/GetStarted";
import VerifyEmail from "../OnBording/SubModules/VerifyEmail";
import EmailVerify from "../OnBording/SubModules/EmailVerify";
import CompanyDetails from "../OnBording/SubModules/CompanyDetails";
import PersonalDetails from "../OnBording/SubModules/PersonalDetails";
import AddedCompanyLicenses from "../OnBording/SubModules/AddedCompanyLicenses";
import AssignTask from "../OnBording/SubModules/AssignTask";
import SendOTP from "../OnBording/SubModules/SendOTP";
import ChooseLicenses from "../OnBording/SubModules/ChooseLicenses";
import YourAreDone from "../OnBording/SubModules/YourAreDone";

function OnBoarding() {
  return (
    <div className="row back-color">
      {/* <div className="col-3 left-fixed">
                <div className="on-boarding">
                    <SideBar />
                    <SideBarInputControl />
                    </div>
                </div> */}

      <div className="col-12">
        {/* <GetStart />  */}
        {/* <VerifyEmail /> */}
        {/* <EmailVerify />  */}
        {/* <PersonalDetails />  */}
        {/* <CompanyDetails/>  */}
        {/* <ChooseLicenses /> */}
        <AddedCompanyLicenses />
        {/* <AssignTask/> */}
        {/* <SendOTP /> */}
        {/* <YourAreDone /> */}
        {/* <LicenseDrawer /> */}
      </div>
    </div>
  );
}
export default OnBoarding;
