import React from 'react';
import "./style.css";
import arrow from '../../../assets/Icons/arrow.png';
import accountCircleGreen from '../../../assets/Icons/accountCircleGreen.png';
import accountCirclePurple from '../../../assets/Icons/accountCirclePurple.png';
import accountCircleOrange from '../../../assets/Icons/accountCircleOrange.png';




function ComplianceDemo5() {
    return (
        <div>
            <div className="mobile-padding">
               <div className="task-details-right-side-grid-demo5">                  
                  <div className="">
                     <div className="white-box-task-deatils">
                        <div className="blue-grid-left">
                           {/* <div className="col-12 pl-0 pr-0">
                              <div className="complinace-right-grid-title d-block d-sm-none"> My Task</div> 
                                 <div className="task-detail-btn1">
                                 <div className="task-detail-btn-text">
                                       <p className="task-detail-btn-title">NSE <span className="dueBtn">DUE TODAY</span></p>
                                       <p className="alignright"><img src={accountCircle} alt="acount Circle" /></p>
                                 </div>                                 
                              </div>  
                           </div> */}
                           <div className="col-12 pl-0 pr-0">
                           <div className="complinace-right-grid-title d-block d-sm-none"> My Task</div> 
                              <div className="task-detail-btn2">
                                 <div className="task-detail-btn-text">
                                       <p className="task-detail-btn-title">BSE </p>
                                       <p className="alignright"><img src={accountCircleGreen} alt="acount Circle" /></p>
                                 </div>
                                 <div className="d-block d-sm-none">
                                 <div className="col-12 row pl-0 pr-0 margin-left-right">
                                    <div className="col-4 pl-0 pr-0">
                                       <p className="left-blur-text">Task</p>
                                    </div>
                                    <div className="col-8 pr-0 pl-0">
                                       <p className="right-bold-text">Weekly Enhanced Supervision Reporting</p>
                                    </div>
                                 </div>
                                 <div className="col-12 row pl-0 pr-0 margin-left-right">
                                    <div className="col-4 pl-0 pr-0">
                                       <p className="left-blur-text">Due Date</p>
                                    </div>
                                    <div className="col-8 pr-0 pl-0">
                                       <p className="right-bold-text">16 Mar 21</p>
                                    </div>
                                 </div>
                                 <div className="col-12 row pl-0 pr-0 margin-left-right">
                                    <div className="col-4 pl-0 pr-0">
                                       <p className="left-blur-text">File</p>
                                    </div>
                                    <div className="col-8 pr-0 pl-0">
                                       <p className="blue-right-text">ADD FILE</p>
                                    </div>
                                 </div>
                                 <div className="col-12 row pl-0 pr-0 margin-left-right">
                                    <div className="col-4 pl-0 pr-0">
                                       <p className="left-blur-text">Status</p>
                                    </div>
                                    <div className="col-8 pr-0 pl-0">
                                       <p className="right-bold-text">Pending</p>
                                    </div>
                                 </div>
                                 <div className="col-12 row pl-0 pr-0 margin-left-right">
                                       <button className="mark-done-button">MARK AS DONE</button>
                                 </div>
                              </div>
                              </div>  
                           </div>
                           <div className="col-12 pl-0 pr-0">
                              <div className="task-detail-btn3">
                                 <div className="task-detail-btn-text">
                                       <p className="task-detail-btn-title">CDSL </p>
                                       <p className="alignright"><img src={accountCirclePurple} alt="acount Circle" /></p>
                                 </div>
                              </div>  
                           </div>
                           <div className="col-12 pl-0 pr-0">
                              <div className="task-detail-btn4">
                                 <div className="task-detail-btn-text">
                                       <p className="task-detail-btn-title">MCX </p>
                                       <p className="alignright"><img src={accountCircleOrange} alt="acount Circle Orange" /></p>
                                 </div>
                              </div>  
                           </div>
                        </div>
                        <div className="right-white-grid  d-none d-sm-block">
                           <div className="complinace-right-grid-title"> Task Details</div> 
                           <div className="arrow-preview-next  d-none d-sm-block"> <img src={arrow} alt="arrow left" />   </div> 
                           <div className="col-12 row pl-0 pr-0 margin-left-right">
                              <div className="col-4 pl-0 pr-0">
                                 <p className="left-blur-text">Task</p>
                              </div>
                              <div className="col-8 pr-0 pl-0">
                                 <p className="right-bold-text">Weekly Enhanced Supervision Reporting</p>
                              </div>
                           </div>
                           <div className="col-12 row pl-0 pr-0 margin-left-right">
                              <div className="col-4 pl-0 pr-0">
                                 <p className="left-blur-text">Due Date</p>
                              </div>
                              <div className="col-8 pr-0 pl-0">
                                 <p className="right-bold-text">16 Mar 21</p>
                              </div>
                           </div>
                           <div className="col-12 row pl-0 pr-0 margin-left-right">
                              <div className="col-4 pl-0 pr-0">
                                 <p className="left-blur-text">File</p>
                              </div>
                              <div className="col-8 pr-0 pl-0">
                                 <p className="blue-right-text">ADD FILE</p>
                              </div>
                           </div>
                           <div className="col-12 row pl-0 pr-0 margin-left-right">
                              <div className="col-4 pl-0 pr-0">
                                 <p className="left-blur-text">Status</p>
                              </div>
                              <div className="col-8 pr-0 pl-0">
                                 <p className="right-bold-text">Pending</p>
                              </div>
                           </div>
                           <div className="col-12 row pl-0 pr-0 margin-left-right">
                                 <button className="mark-done-button">MARK AS DONE</button>
                           </div>
                        </div> 
                     </div>
                  </div>
               </div>
            </div>
        </div>
    )
}


export default ComplianceDemo5;