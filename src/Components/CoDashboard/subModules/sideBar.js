import React from 'react';
import "./style.css";
// import SideBarBg from "../../../../assets/Images/Onboarding/side-bar-bg.png";
import sideBarlogo from "../../../assets/Icons/sideBarlogo.png";
import SideBaruser from "../../../assets/Icons/sideBaruser.png";
import taskIcon from "../../../assets/Icons/taskIcon.png";
import btnicon from "../../../assets/Icons/btn-icon.png";
import siderBarbtnArrow from "../../../assets/Icons/siderBarbtnArrow.png";
import actionArrow from "../../../assets/Icons/actionArrow.png";
import complteTaskIcon from "../../../assets/Icons/complteTaskIcon.png";
import inprogressicon from "../../../assets/Icons/inprogressicon.png";
import scheduledIcon from "../../../assets/Icons/scheduledIcon.png";
import siderBarbtnArrowTop from "../../../assets/Icons/siderBarbtnArrowTop.png";


function SideBarCo() {
    return (
        <div className="side-bar">
            <div className="left-bar">
                <div className="logo">
                    <img src={sideBarlogo} alt="sideBarlogo"/>
                </div>
                <div className="taskIcon">
                    <img src={taskIcon} alt="taskIcon"/>
                </div>
                
                <div className="user">
                    <img src={SideBaruser} alt="SideBaruser"/>
                </div>


            </div>
            <div className="right-side">
                <div className="user-title">Hi Naresh Jain,</div>
                <div className="bold-title-sidebar">Here is a quick overview for you!</div>
                <div className="two-btn">
                    <button className="btn sidebar-btn-one">
                        <div className="d-flex">
                            <div className="icon-left"><img src={btnicon} alt="btn-icon" /> </div>
                            <div className="icon-right-text">
                                <div className="small-text"> B&K Securities</div>
                                <div className="big-text">Compliant (8/10) <img src={siderBarbtnArrowTop} alt="btn Arrow top" /></div>
                            </div>
                            
                        </div>
                        <div className="btn-data">
                               
                                <div class="compliant-option">
                                    <p className="compliant-title-left">NSDL</p>
                                    <ul className="list-group list-group-horizontal">
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                    </ul>
                                </div>
                                <div class="compliant-option">
                                    <p className="compliant-title-left">CDSL</p>
                                    <ul className="list-group list-group-horizontal">
                                    <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                    </ul>
                                </div>
                                <div class="compliant-option">
                                    <p className="compliant-title-left">NSE</p>
                                    <ul className="list-group list-group-horizontal">
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="red-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                    </ul>
                                </div>
                                <div class="compliant-option">
                                    <p className="compliant-title-left">BSE</p>
                                    <ul className="list-group list-group-horizontal">
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                    </ul>
                                </div>
                                <div class="compliant-option">
                                    <p className="compliant-title-left">NSE</p>
                                    <ul className="list-group list-group-horizontal">
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="red-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                    </ul>
                                </div>
                                <div class="compliant-option">
                                    <p className="compliant-title-left">BSE</p>
                                    <ul className="list-group list-group-horizontal">
                                    <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="green-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                        <li className="gray-box"></li>
                                    </ul>
                                </div>
                             
                        </div>
                    </button> 
                    <button className="btn sidebar-btn-one">
                        <div className="d-flex">
                            <div className="icon-left"><img src={btnicon} alt="btn-icon" /> </div>
                            <div className="icon-right-text">
                                <div className="small-text"> B&K Trading</div>
                                <div className="big-text">Compliant (4/10) <img src={siderBarbtnArrow} alt="btn Arrow" /></div>
                            </div>
                        </div>
                    </button>                    
                </div>
                <div className="take-action-grid shadow bg-white rounded">
                    <div className="take-action-small-title">Immediately</div>
                    <div className="take-action-title">Take Action</div>
                    <div className="action-bottom-grid">
                        <div className="left-grid-action">
                            <span className="red-circle">4</span>
                            <div className="take-action-left">
                                Risk & Delays<img className="btn-icon" src={actionArrow} alt="btn-icon" />                             
                            </div>
                        </div>
                        <div className="right-grid-action">
                            <span className="blue-circle">4</span>
                            <div className="take-action-right">
                            Pending Action<img className="btn-icon" src={actionArrow} alt="btn-icon" />   
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="sidebar-month-grid shadow bg-white rounded">
                    <div className="take-action-small-title">This Month</div>
                    <div className="take-action-title">Things are on track!</div>
                    <div className="task-details-grid">
                        <div className="complte-task-title text-left"><img className="mr-2" src={complteTaskIcon} alt="complte-Task-icon" /> Completed Tasks <span className="text-right"> 24</span></div>
                        <div className="complte-task-title text-left"><img className="mr-2" src={inprogressicon} alt="in-progress-icon" /> In-progress <span className="text-right"> 16</span></div>
                        <div className="complte-task-title text-left"><img className="mr-2" src={scheduledIcon} alt="scheduled-icon" /> Scheduled <span className="text-right"> 14</span></div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SideBarCo;
