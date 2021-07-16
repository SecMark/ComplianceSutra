import React from 'react';
import "./style.css";
import arrow from '../../../assets/Icons/arrow.png';
function ComplianceDemo16() {
    return (
        <div>
            <div className="mobile-padding-last-demo">
               <div className="compliance-right-side-grid-demo">                  
                  <div className="">
                     <div className="white-box-task-deatils">
                        
                        <div className="right-white-grid">
                           <div className="complinace-right-grid-title"> Compliance History</div> 
                           <div className="arrow-preview-next  d-none d-sm-block"> <img src={arrow} alt="arrow left right" />   </div> 
                           <div className="year-text">2015</div>
                           <div className="pl-1 animate__animated animate__fadeInLeft mobile-padding">
                              <div className="col-12 pl-0 pr-0">
                              <div className="compliance-histort-btn2">
                                 <div className="compliance-icon-text">
                                       <p className="potential-risks-title">NSE </p>
                                       <p className="potential-risks-alignright file-blue-text">2 Files</p>
                                 </div>
                              </div>
                              </div> 
                              <div className="col-12 pl-0 pr-0">
                              <div className="compliance-histort-btn3">
                                 <div className="compliance-icon-text">
                                       <p className="potential-risks-title">BSE </p>
                                       <p className="potential-risks-alignright file-green-text">6 Files</p>
                                 </div>
                              </div>
                              </div> 
                              <div className="col-12 pl-0 pr-0">
                                 <div className="task-detail-btn3">
                                    <div className="task-detail-btn-text">
                                          <p className="task-detail-btn-title">CDSL </p>
                                          <p className="alignright file-purple-text">2 Files</p>
                                    </div>
                                 </div>  
                              </div>
                              <div className="col-12 pl-0 pr-0">
                                 <div className="task-detail-btn4">
                                    <div className="task-detail-btn-text">
                                          <p className="task-detail-btn-title">MCX </p>
                                          <p className="alignright file-creme-text">12 Files</p>
                                    </div>
                                 </div>  
                              </div>
                           </div>
                        </div> 
                        <div className="blue-grid-left animate__animated animate__fadeInRight"> 
                        <div className="year-text-right">2016</div>                         
                        <div className="col-12 pl-0 pr-0">
                              <div className="compliance-histort-btn2">
                                 <div className="compliance-icon-text">
                                       <p className="potential-risks-title">NSE </p>
                                       <p className="potential-risks-alignright file-blue-text">4 Files</p>
                                 </div>
                              </div>
                              </div> 
                              <div className="col-12 pl-0 pr-0">
                              <div className="compliance-histort-btn3">
                                 <div className="compliance-icon-text">
                                       <p className="potential-risks-title">BSE </p>
                                       <p className="potential-risks-alignright file-green-text">8 Files</p>
                                 </div>
                              </div>
                              </div> 
                              <div className="col-12 pl-0 pr-0">
                                 <div className="task-detail-btn3">
                                    <div className="task-detail-btn-text">
                                          <p className="task-detail-btn-title">CDSL </p>
                                          <p className="alignright file-purple-text">2 Files</p>
                                    </div>
                                 </div>  
                              </div>
                              <div className="col-12 pl-0 pr-0">
                                 <div className="task-detail-btn4">
                                    <div className="task-detail-btn-text">
                                          <p className="task-detail-btn-title">MCX </p>
                                          <p className="alignright file-creme-text">12 Files</p>
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


export default ComplianceDemo16;