import React from 'react';
import "./style.css";
import accountCircle from '../../../assets/Icons/accountCircle.png';
function ComplianceDemo1() {
    return (
        <div>
            <div className="right-side-grid">
                <div className="right-comp-calender">
                    <div className="">
                        <div className="calender-header">
                            <div className="rightComp-calender-title"> Compliance Calendar 2021</div>
                            <div className="month-strip">
                                <div className="month-title">Jan</div>
                                <div className="month-title">Feb</div>
                                <div className="month-title">Mar</div>
                                <div className="month-title">Apr</div>
                                <div className="month-title">May</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="calender-data col-12">
                                <div className="col-2 border-box"></div>
                                <div className="col-2 border-box"></div>
                                <div className="col-2 border-box"></div>
                                <div className="col-2 border-box"></div>
                                <div className="col-2 border-box border-0"></div>
                                <div className="two-label-grid">
                                    <div className="compliance-Blue-Label-Left">
                                        <div className="animate__animated animate__fadeInLeft animate__delay-1s col-6 pl-0 pr-0">
                                            <div className="nse-blue-btn">
                                                <div className="nse-icon-text">
                                                    <p className="nse-title">NSE <span className="dueBtn">DUE TODAY</span></p>
                                                    <p className="alignright"><img src={accountCircle} alt="acount Circle" /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="animate__animated animate__fadeInRight animate__delay-2s col-6 pl-0 pr-0">
                                            <div className="nse-purple-btn">
                                                <div className="nse-icon-text">
                                                    <p className="nse-title">CDSL</p>
                                                    <p className="assign-title">ASSIGN</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="middle-label-grid">
                                    <div className=" col-12 pl-0 pr-0">
                                        <div className=" animate__animated animate__fadeInLeft animate__delay-3s compliance-bse-middle-label">
                                            <div className="pista-label-btn">
                                                <div className="nse-icon-text">
                                                    <p className="nse-title">BSE</p>
                                                    <p className="assign-title">ASSIGN</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-label-grid">
                                    <div className="col-12 pl-0 pr-0">
                                        <div className="animate__animated animate__fadeInRight animate__delay-4s compliance-bottom-label">
                                            <div className="calender-last-Btn">
                                                <div className="nse-icon-text">
                                                    <p className="nse-title">MCX</p>
                                                    <p className="assign-title">ASSIGN</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="two-label-grid-mobile d-block d-sm-none">
                                    <div className=" compliance-Blue-Label-Left-mobile">
                                        <div className="col-6 pl-0 pr-0 animate__animated animate__fadeInLeft animate__delay-4s">
                                            <div className="nse-blue-btn">
                                                <div className="nse-icon-text">
                                                    <p className="nse-title">NSE <span className="dueBtn">DUE TODAY</span></p>
                                                    <p className="alignright"><img src={accountCircle} alt="acount Circle" /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 pl-0 pr-0 animate__animated animate__fadeInLeft animate__delay-2s  d-none d-sm-block">
                                            <div className="nse-purple-btn">
                                                <div className="nse-icon-text">
                                                    <p className="nse-title">CDSL</p>
                                                    <p className="assign-title">ASSIGN</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* <div className="right-comp-calender">
                <div className="">
                    <div className="">
                        <div className="rightComp-calender-title"> Compliance Calendar 2021</div> 
                        <div className="month-strip">
                            <div className="month-title">Jan</div>
                            <div className="month-title">Feb</div>
                            <div className="month-title">Mar</div>
                            <div className="month-title">Apr</div>
                            <div className="month-title">May</div>
                        </div>
                    
                        <div className="compliance-Blue-Label-Left">
                            <div className="nse-blue-btn">
                                <div className="nse-icon-text">
                                    <p className="nse-title">NSE <span className="dueBtn">DUE TODAY</span></p>
                                    <p className="alignright"><img src={accountCircle} alt="acount Circle" /></p>
                                </div>
                            </div>
                            <div className="nse-purple-btn">
                                <div className="nse-icon-text">
                                    <p className="nse-title">CDSL</p>
                                    <p className="assign-title">ASSIGN</p>
                                </div>
                            </div>
                        </div>
                        <div className="compliance-bse-middle-label">
                            <div className="pista-label-btn">
                            <div className="nse-icon-text">
                                <p className="nse-title">BSE</p>
                                <p className="assign-title">ASSIGN</p>
                                </div>
                            </div>                                
                        </div>
                        <div className="compliance-bottom-label">
                            <div className="calender-last-Btn">
                            <div className="nse-icon-text">
                                <p className="nse-title">MCX</p>
                                <p className="assign-title">ASSIGN</p>
                                </div>
                            </div>                                
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}


export default ComplianceDemo1;