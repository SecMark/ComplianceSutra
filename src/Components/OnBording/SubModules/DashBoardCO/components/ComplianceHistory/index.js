import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../BoardView/style.css";
import "./style.css";
import SideBarInputControl from "../../components/LeftSideBar";
import Cobg from "../../../../../../assets/Images/Onboarding/co-bg.png";
import sideBarlogo from "../../../../../../assets/Icons/sideBarlogo.png";
import downLoadIcon from "../../../../../../assets/Icons/downLoadIcon.png";
import Icon from "../../../../../../assets/Icons/Icon.png";
import companyDropArrow from "../../../../../../assets/Icons/companyDropIcon.png";



import togglemobile from "../../../../../../assets/Icons/togglemobile.png"
import complteTaskIcon from "../../../../../../../src/assets/Icons/complteTaskIcon.png";
import inprogressicon from "../../../../../../../src/assets/Icons/inprogressicon.png";
import scheduledIcon from "../../../../../../../src/assets/Icons/scheduledIcon.png";
import { actions as taskReportActions } from "../../redux/actions";
import { isMobile } from "react-device-detect"
import { toast } from "react-toastify";
import { withRouter } from 'react-router-dom';
import { actions as adminMenuActions } from "../../MenuRedux/actions"
import { actions as notificationActions } from ".././notification/Redux/actions.js";
function ComplianceHistory({ history }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [isTaskListOpen, setIsTaskListOpen] = useState(false);
    const [isTaskApproved, setIsTaskApproved] = useState(false);
    const [click, setClick] = useState("")

    const taskList =
        state &&
        state.taskReport &&
        state.taskReport.taskReport &&
        state.taskReport.taskReport.taskReport &&
        state.taskReport.taskReport.taskReport;

    const entityID =
        state &&
        state.complianceOfficer &&
        state.complianceOfficer.personalInfo &&
        state.complianceOfficer.personalInfo.data &&
        state.complianceOfficer.personalInfo.data[0][0] &&
        state.complianceOfficer.personalInfo.data[0][0] &&
        state.complianceOfficer.personalInfo.data[0][0].UserDetails &&
        state.complianceOfficer.personalInfo.data[0][0].UserDetails[0] &&
        state.complianceOfficer.personalInfo.data[0][0].UserDetails[0].EntityID;

    const userData =
        state &&
        state.complianceOfficer &&
        state.complianceOfficer.personalInfo &&
        state.complianceOfficer.personalInfo.data &&
        state.complianceOfficer.personalInfo.data[0][0] &&
        state.complianceOfficer.personalInfo.data[0][0] &&
        state.complianceOfficer.personalInfo.data[0][0].UserDetails &&
        state.complianceOfficer.personalInfo.data[0][0].UserDetails[0] &&
        state.complianceOfficer.personalInfo.data[0][0].UserDetails[0];

    const userID = state && state.auth && state.auth.loginInfo && state.auth.loginInfo.UserID

    const userDetails =
        state &&
        state.auth &&
        state.auth.loginInfo;

    const companyName =
        state &&
        state.complianceOfficer &&
        state.complianceOfficer.personalInfo &&
        state.complianceOfficer.personalInfo.formDataPersonalData &&
        state.complianceOfficer.personalInfo.formDataPersonalData.entityName;

    const taskIdFromNR = state && state.NotificationRedu &&
        state.NotificationRedu.taskID
    useEffect(() => {
        if (taskIdFromNR !== null) {
            dispatch(
                notificationActions.setTaskID(null))
        }
    }, [])
    // useEffect(() => {
    //     if (userID === undefined) {
    //         history.push("/login")
    //     }
    // }, [])

    useEffect(() => {
        dispatch(
            taskReportActions.taskReportRequest(
                {
                    userID: userDetails.UserID,
                    usertype: userDetails.UserType
                }
            ),
        )
    }, [state.adminMenu.currentMenu]);

    useEffect(() => {
        // if(window.location.href.includes("dashboard") && state.adminMenu.currentMenu!=="taskList"){
        //   dispatch(adminMenuActions.setCurrentMenu("dashboard"));
        // }

    }, [])

    const onHBMenu = () => {
        const drawerParent = document.getElementById("sideBarParent");
        const drawerChild = document.getElementById("sideBarChild");
        if (drawerParent) {
            drawerParent.classList.add("overlay");
            drawerChild.style.left = "0%";
        }

    }


    return (
        <div>
            <div className="row dashboard-view-mobile-top">
                <div className="mobile-head d-block d-sm-none">
                    <div className="d-flex">
                        <div
                            className="w-25"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                onHBMenu()
                            }}
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
            <div className="row co-dashboard">

                {!isMobile && <div className="left-fixed d-none d-sm-block">
                    <div className="on-boarding">
                        {/* <SideBar /> */}
                        <SideBarInputControl
                            isTaskListOpen={isTaskListOpen}
                            setIsTaskListOpen={setIsTaskListOpen}

                        />
                    </div>
                </div>
                }
                <div className="col-12 col-sm-3 col-md-3 col-xl-3 new-side-bar">
                    <div className="scroll-inside-new">
                        <div className="all-companies-task-grid-1 co-history">
                        
                        <div class="right-side">
                        <div class="bold-title-sidebar">Compliance History</div>
                            <div class="desc-title">Search for all your tasks here, lorem
                           ipsum dolor smit amet,</div>
                       <div className="form-div">
                        <form>
                        <div class="form-group pos-rel">
                        <label for="From">From:</label>
                        <input value="20 June 2021" type="text" class="form-control" id="From" placeholder="20 June 2021" />
                        <img src={Icon} className="cal-icon"/>
                    </div>
                    <div class="form-group pos-rel">
                        <label for="To">To:</label>
                        <input value="18 July 2021" type="text" class="form-control" id="To" placeholder="18 July 2021" />
                        <img src={Icon} className="cal-icon"/>
                    </div>
                    <div class="form-group pos-rel">
                        <label for="Company">Company:</label>
                        <input value="B&K Securities" type="text" class="form-control" id="Company" placeholder="B&K Securities" />
                        <img src={companyDropArrow} className="down-icon"/>
                    </div>
                    <div class="form-group pos-rel">
                        <label for="License">License:</label>
                        <input value="Select License" type="text" class="form-control" id="License" placeholder="Select License" />
                        <img src={companyDropArrow} className="down-icon"/>
                    </div>
                        </form>
                       </div>
                            
                        </div>
                
                        </div>
                        
                    </div>
                </div>

                <div className="col-12 right-side-bar-new">
                    <img className="right-bg" src={Cobg} alt="" />
                    <div className="all-companies-task-grid mobile-dashboard-view">

         

                    <div className="mobile-height-dasboardView">
    <div className="companies-sub-title w-25 d-none d-sm-block">Results:

    </div>
    <div className="result-data">
      <div className="row border-btm-head">
          <div className="col-md-2 pl-0">
          <p className="table-head">  completed on</p>
        
          </div>
          <div className="col-md-3">
         <p className="table-head">   tASK NAME  </p>
          </div>
          <div className="col-md-2">
           <p className="table-head">  assigned to  </p>
          </div>
          <div className="col-md-2">
           <p className="table-head">   Due date   </p>
          </div>
          <div className="col-md-2">
          <p className="table-head">   status  </p>
          </div>
          <div className="col-md-1">
          <p className="table-head">    download  </p>
          </div>
      </div>
      <div className="row border-btm">
          <div className="col-md-2 pl-0">
          <p className="date-label">02 Jan 2021</p>
        
          </div>
          <div className="col-md-3">
         <p className="task-name-label">Enhanced supervision reporting </p>
          </div>
          <div className="col-md-2">
           <p className="assign-label-name"> <span className="asign-circle">BK</span>Bharat Kedia </p>
          </div>
          <div className="col-md-2">
          <p className="date-label">02 Jan 2021</p>
          </div>
          <div className="col-md-2">
          <p className="status-delay">  Delayed  </p>
          </div>
          <div className="col-md-1">
          <p className="downlod-icon"> <img src={downLoadIcon} /></p>
          </div>
      </div>
      <div className="row border-btm">
          <div className="col-md-2 pl-0">
          <p className="date-label">02 Jan 2021</p>
        
          </div>
          <div className="col-md-3">
         <p className="task-name-label">Uploading of Holding Statement </p>
          </div>
          <div className="col-md-2">
           <p className="assign-label-name"> <span className="asign-circle">BK</span>Bharat Kedia </p>
          </div>
          <div className="col-md-2">
          <p className="date-label">02 Jan 2021</p>
          </div>
          <div className="col-md-2">
          <p className="status-ontime">  On Time  </p>
          </div>
          <div className="col-md-1">
          <p className="downlod-icon"> <img src={downLoadIcon} /></p>
          </div>
      </div>
      <div className="row border-btm">
          <div className="col-md-2 pl-0">
          <p className="date-label">02 Jan 2021</p>
        
          </div>
          <div className="col-md-3">
         <p className="task-name-label">Enhanced supervision reporting of Filing the Report </p>
          </div>
          <div className="col-md-2">
           <p className="assign-label-name"> <span className="asign-circle">BK</span>Bharat Kedia </p>
          </div>
          <div className="col-md-2">
          <p className="date-label">02 Jan 2021</p>
          </div>
          <div className="col-md-2">
          <p className="status-pendig">  pending  </p>
          </div>
          <div className="col-md-1">
          <p className="downlod-icon"> <img src={downLoadIcon} /></p>
          </div>
      </div>
      <div className="row border-btm">
          <div className="col-md-2 pl-0">
          <p className="date-label">02 Jan 2021</p>
        
          </div>
          <div className="col-md-3">
         <p className="task-name-label">Enhanced supervision reporting </p>
          </div>
          <div className="col-md-2">
           <p className="assign-label-name"> <span className="asign-circle">BK</span>Bharat Kedia </p>
          </div>
          <div className="col-md-2">
          <p className="date-label">02 Jan 2021</p>
          </div>
          <div className="col-md-2">
          <p className="status-delay">  Delayed  </p>
          </div>
          <div className="col-md-1">
          <p className="downlod-icon"> <img src={downLoadIcon} /></p>
          </div>
      </div>
      <div className="row border-btm">
          <div className="col-md-2 pl-0">
          <p className="date-label">02 Jan 2021</p>
        
          </div>
          <div className="col-md-3">
         <p className="task-name-label">Uploading of Holding Statement </p>
          </div>
          <div className="col-md-2">
           <p className="assign-label-name"> <span className="asign-circle">BK</span>Bharat Kedia </p>
          </div>
          <div className="col-md-2">
          <p className="date-label">02 Jan 2021</p>
          </div>
          <div className="col-md-2">
          <p className="status-ontime">  On Time  </p>
          </div>
          <div className="col-md-1">
          <p className="downlod-icon"> <img src={downLoadIcon} /></p>
          </div>
      </div>
      <div className="row border-btm">
          <div className="col-md-2 pl-0">
          <p className="date-label">02 Jan 2021</p>
        
          </div>
          <div className="col-md-3">
         <p className="task-name-label">Enhanced supervision reporting of Filing the Report </p>
          </div>
          <div className="col-md-2">
           <p className="assign-label-name"> <span className="asign-circle">BK</span>Bharat Kedia </p>
          </div>
          <div className="col-md-2">
          <p className="date-label">02 Jan 2021</p>
          </div>
          <div className="col-md-2">
          <p className="status-pendig">  pending  </p>
          </div>
          <div className="col-md-1">
          <p className="downlod-icon"> <img src={downLoadIcon} /></p>
          </div>
      </div>
    </div>
  
    <div className="d-flex pl-0">
        <div className="overview-mobile d-block d-sm-none">Overview</div>
        <div className="companies-sub-title d-block d-sm-none">Results:</div>
    </div>
    {/* <div className="w-75 d-none d-sm-block">
        <div className="only-search-icon">
           aaaaaaaa <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABHNCSVQICAgIfAhkiAAAAthJREFUSEvtlE1o0nEYx///IUxSZNM5lTllzKl/35iL5sJm0qVLdViH2G106TA6dGqHHbp06RBRnTrsEgyCTkFsEcQSrZWYyprgdL6wTU334gszPUz7/kaBDN1fxXaa8ONBfr//83levs9DU2f8o8+YR50DO17xpktarVaHQJfgkG9SODGapqutRsQKBEidSCQe7e7ujmazWaarq4vi8/lxkUjkgX0qFApdrUBPBcZiMebg4GBpa2tLyeVyKXKQFVUul6lCoUAplco4j8d7qNFo3jQLbQgkmfl8vo/RaFQxMDAQkclkC4ODg044/o2MLfv7+7OhUEiDuzSA0z09PZ+agTYE7uzsLHo8nmmJRBIZHx+fRWbLtQ4RkCEQCLwOBoOjRqNxRaVS3cCbQzZoXSARyNra2vtUKsVotdp5hULxuJ6jXC53HVVY7u7u/mWxWG4C6G4XOOFwOL6Sfk1OTtphP9dzhMA0Xq/3A8qrNJvN9yCkV+0CLzudzi8EaLVaJ2C/NQAq/X7/cjqd1ppMpgdSqfRZu8AhlGoFkSt0Ot19COZlA+All8v1/ejoiLLZbFcRmKNdII1ReAvRTA0PDwchittwtn5CNNzt7e0lt9ttNxgMqyMjI0Q0e20ByUfIzoqRWIzH4wrI3ieXy+cEAkEMVyWcfsCeICB7X19fUa/Xz/X29r5gg5H7Uwc/HA7fAfg5nPdDEMcbhsPhFPP5PJPJZCixWHxYKpWyUPEe7mYwk142KOtqwzq7hrU2D2FYisXihUqlQmEMKAhkFWttCUvg1ubm5kVUIIKy3kWmdRX9LxBWIHkI+fNgdMlk8gr5CxH9gF0nPcPqs29sbCxgUQw1A20KyFamWijKGlWr1TPItK5iOwIkAdVCsdR/jo2NTaECoZPBdgxIHKPPZqzDdxBWmWEYG4CJ/wr822/ZsfxpOlmvFR3NkK3XrHPYjINW35xn2GrFWN//ARdsQiw/VRqQAAAAAElFTkSuQmCC"
                alt="sidebar Check Icon"
            />
        </div>
    </div>
    <div className="col-5 d-block d-sm-none mobile">
        <div className="only-search-icon">
            <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABHNCSVQICAgIfAhkiAAAAthJREFUSEvtlE1o0nEYx///IUxSZNM5lTllzKl/35iL5sJm0qVLdViH2G106TA6dGqHHbp06RBRnTrsEgyCTkFsEcQSrZWYyprgdL6wTU334gszPUz7/kaBDN1fxXaa8ONBfr//83levs9DU2f8o8+YR50DO17xpktarVaHQJfgkG9SODGapqutRsQKBEidSCQe7e7ujmazWaarq4vi8/lxkUjkgX0qFApdrUBPBcZiMebg4GBpa2tLyeVyKXKQFVUul6lCoUAplco4j8d7qNFo3jQLbQgkmfl8vo/RaFQxMDAQkclkC4ODg044/o2MLfv7+7OhUEiDuzSA0z09PZ+agTYE7uzsLHo8nmmJRBIZHx+fRWbLtQ4RkCEQCLwOBoOjRqNxRaVS3cCbQzZoXSARyNra2vtUKsVotdp5hULxuJ6jXC53HVVY7u7u/mWxWG4C6G4XOOFwOL6Sfk1OTtphP9dzhMA0Xq/3A8qrNJvN9yCkV+0CLzudzi8EaLVaJ2C/NQAq/X7/cjqd1ppMpgdSqfRZu8AhlGoFkSt0Ot19COZlA+All8v1/ejoiLLZbFcRmKNdII1ReAvRTA0PDwchittwtn5CNNzt7e0lt9ttNxgMqyMjI0Q0e20ByUfIzoqRWIzH4wrI3ieXy+cEAkEMVyWcfsCeICB7X19fUa/Xz/X29r5gg5H7Uwc/HA7fAfg5nPdDEMcbhsPhFPP5PJPJZCixWHxYKpWyUPEe7mYwk142KOtqwzq7hrU2D2FYisXihUqlQmEMKAhkFWttCUvg1ubm5kVUIIKy3kWmdRX9LxBWIHkI+fNgdMlk8gr5CxH9gF0nPcPqs29sbCxgUQw1A20KyFamWijKGlWr1TPItK5iOwIkAdVCsdR/jo2NTaECoZPBdgxIHKPPZqzDdxBWmWEYG4CJ/wr822/ZsfxpOlmvFR3NkK3XrHPYjINW35xn2GrFWN//ARdsQiw/VRqQAAAAAElFTkSuQmCC"
                alt="sidebar Check Icon"
            />
        </div>
    </div> */}
</div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default withRouter(ComplianceHistory);
