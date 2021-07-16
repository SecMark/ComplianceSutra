import React from 'react'
import "./style.css"
import threeDots from "../../../../../../assets/Icons/threeDots.PNG";
import mobileSteperIcon from "../../../../../../assets/Icons/mobileSteperIcon.png";
function BoardView({ }) {

    return (
        <div className="board-tab-design">
            <div className="task-grid-scroll">
                <div className="take-action">
                    <div className="task-list-grid">
                        <div className="col-12">
                            <div className="row">                    
                                <div className="col-3">
                                    <div className="top-board-grid">
                                        <div className="top-board-title">Risks</div>
                                        <div className="float-right">
                                            <img
                                            className="three-dot three-dot-small"                           
                                            src={threeDots}
                                            alt="three Dots Icon"
                                            />
                                        </div>                                        
                                    </div>
                                    <div className="risk-pink-grid">
                                        <div className="nse-label">NSE</div>
                                        <div className="w-100 d-flex pb-20">
                                            <div className="checkIcon">
                                                <img
                                                className="three-dot three-dot-small"                           
                                                src={mobileSteperIcon}
                                                alt="three Dots Icon"
                                                />
                                            </div>
                                            <div className="checkIconText">Uploading of Holding Statement</div>
                                        </div>
                                        <div className="w-100 d-flex">
                                            <div className="d-flex w-50">
                                                <div className="pjCircle">
                                                    <span className="pjText">pj</span>
                                                </div>
                                                <div className="circle-flex-text">Priyal Jain</div>
                                            </div>
                                            <div className="w-50">
                                                <span className="red-day">Yesterday</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="risk-pink-grid">
                                        <div className="nse-label">NSE</div>
                                        <div className="w-100 d-flex pb-20">
                                            <div className="checkIcon">
                                                <img
                                                className="three-dot three-dot-small"                           
                                                src={mobileSteperIcon}
                                                alt="three Dots Icon"
                                                />
                                            </div>
                                            <div className="checkIconText">Uploading of Holding Statement</div>
                                        </div>
                                        <div className="w-100 d-flex">
                                            <div className="d-flex w-50">
                                                <div className="pjCircle">
                                                    <span className="pjText">pj</span>
                                                </div>
                                                <div className="circle-flex-text">Priyal Jain</div>
                                            </div>
                                            <div className="w-50">
                                                <span className="red-day">Yesterday</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="top-board-grid">
                                        <div className="top-board-title-black">In Progress</div>
                                        <div className="float-right">
                                            <img
                                            className="three-dot three-dot-small"                           
                                            src={threeDots}
                                            alt="three Dots Icon"
                                            />
                                        </div>                                        
                                    </div>
                                    <div className="progress-white-grid">
                                        <div className="nse-label">NSE</div>
                                        <div className="w-100 d-flex pb-20">
                                            <div className="checkIcon">
                                                <img
                                                className="three-dot three-dot-small"                           
                                                src={mobileSteperIcon}
                                                alt="three Dots Icon"
                                                />
                                            </div>
                                            <div className="checkIconText">Uploading of Holding Statement</div>
                                        </div>
                                        <div className="w-100 d-flex">
                                            <div className="d-flex w-50">
                                                <div className="pjCircle">
                                                    <span className="pjText">pj</span>
                                                </div>
                                                <div className="circle-flex-text">Priyal Jain</div>
                                            </div>
                                            <div className="w-50">
                                                <span className="gray-date">08 Mar</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-white-grid">
                                        <div className="nse-label">NSE</div>
                                        <div className="w-100 d-flex pb-20">
                                            <div className="checkIcon">
                                                <img
                                                className="three-dot three-dot-small"                           
                                                src={mobileSteperIcon}
                                                alt="three Dots Icon"
                                                />
                                            </div>
                                            <div className="checkIconText">Uploading of Holding Statement</div>
                                        </div>
                                        <div className="w-100 d-flex">
                                            <div className="d-flex w-50">
                                                <div className="pjCircle">
                                                    <span className="pjText">pj</span>
                                                </div>
                                                <div className="circle-flex-text">Priyal Jain</div>
                                            </div>
                                            <div className="w-50">
                                                <span className="gray-date">08 Mar</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="top-board-grid">
                                        <div className="top-board-title-black">Completed</div>
                                        <div className="float-right">
                                            <img
                                            className="three-dot three-dot-small"                           
                                            src={threeDots}
                                            alt="three Dots Icon"
                                            />
                                        </div>                                        
                                    </div>
                                    <div className="progress-white-grid">
                                        <div className="nse-label">NSE</div>
                                        <div className="w-100 d-flex pb-20">
                                            <div className="checkIcon">
                                                <img
                                                className="three-dot three-dot-small"                           
                                                src={mobileSteperIcon}
                                                alt="three Dots Icon"
                                                />
                                            </div>
                                            <div className="checkIconText">Uploading of Holding Statement</div>
                                        </div>
                                        <div className="w-100 d-flex">
                                            <div className="d-flex w-50">
                                                <div className="pjCircle">
                                                    <span className="pjText">pj</span>
                                                </div>
                                                <div className="circle-flex-text">Priyal Jain</div>
                                            </div>
                                            <div className="w-50">
                                                <span className="gray-date">08 Mar</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-white-grid">
                                        <div className="nse-label">NSE</div>
                                        <div className="w-100 d-flex pb-20">
                                            <div className="checkIcon">
                                                <img
                                                className="three-dot three-dot-small"                           
                                                src={mobileSteperIcon}
                                                alt="three Dots Icon"
                                                />
                                            </div>
                                            <div className="checkIconText">Uploading of Holding Statement</div>
                                        </div>
                                        <div className="w-100 d-flex">
                                            <div className="d-flex w-50">
                                                <div className="pjCircle">
                                                    <span className="pjText">pj</span>
                                                </div>
                                                <div className="circle-flex-text">Priyal Jain</div>
                                            </div>
                                            <div className="w-50">
                                                <span className="gray-date">08 Mar</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="top-board-grid">
                                        <div className="top-board-title-black">Approval Pending</div>
                                        <div className="float-right">
                                            <img
                                            className="three-dot three-dot-small"                           
                                            src={threeDots}
                                            alt="three Dots Icon"
                                            />
                                        </div>                                        
                                    </div>
                                    <div className="progress-white-grid">
                                        <div className="nse-label">NSE</div>
                                        <div className="w-100 d-flex pb-20">
                                            <div className="checkIcon">
                                                <img
                                                className="three-dot three-dot-small"                           
                                                src={mobileSteperIcon}
                                                alt="three Dots Icon"
                                                />
                                            </div>
                                            <div className="checkIconText">Uploading of Holding Statement</div>
                                        </div>
                                        <div className="w-100 d-flex">
                                            <div className="d-flex w-50">
                                                <div className="pjCircle">
                                                    <span className="pjText">pj</span>
                                                </div>
                                                <div className="circle-flex-text">Priyal Jain</div>
                                            </div>
                                            <div className="w-50">
                                                <span className="gray-date">08 Mar</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-white-grid">
                                        <div className="nse-label">NSE</div>
                                        <div className="w-100 d-flex pb-20">
                                            <div className="checkIcon">
                                                <img
                                                className="three-dot three-dot-small"                           
                                                src={mobileSteperIcon}
                                                alt="three Dots Icon"
                                                />
                                            </div>
                                            <div className="checkIconText">Uploading of Holding Statement</div>
                                        </div>
                                        <div className="w-100 d-flex">
                                            <div className="d-flex w-50">
                                                <div className="pjCircle">
                                                    <span className="pjText">pj</span>
                                                </div>
                                                <div className="circle-flex-text">Priyal Jain</div>
                                            </div>
                                            <div className="w-50">
                                                <span className="gray-date">08 Mar</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BoardView;