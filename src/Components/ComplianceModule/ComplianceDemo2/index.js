import React from 'react';
import "./style.css";
import checkCircle from '../../../assets/Icons/checkCircle.png';
import arrow from '../../../assets/Icons/arrow.png';
import accountCircleGreenmobile from '../../../assets/Icons/accountCircleGreen.png';
import accountCirclePurple from '../../../assets/Icons/accountCirclePurple.png';
import accountCircleOrange from '../../../assets/Icons/accountCircleOrange.png';


function ComplianceDemo2() {
    return (
        <div>
            <div className="mobile-padding">
            <div className="complinace-right-side-grid-demo-2">
               <div className="">
                  <div className="">
                     <div className="white-box-demo2">
                        <div className="complinace-right-grid-title"> Compliance Tasks</div>
                        <div className="arrow-preview-next  d-none d-sm-block"> <img src={arrow} alt="arrow left" />   </div>
                        <div className="">
                           <div className="animate__animated animate__fadeInLeft  complinace-right-blue-btn">
                              <div className="complinace-right-icon-text">
                                 <p className="complinace-right-title">NSE </p>
                                 <p className="align-right"><span className="percent-value">100%</span> <img src={checkCircle} alt="acount Circle" /></p>
                                 {/* <p class="alignright">100% <img src="./images/checkCircle.png" alt="acount Circle" /></p> */}
                              </div>
                           </div>
                        </div>
                        <div className="">
                           <div className="animate__animated animate__fadeInRight animate__delay-1s compliance-task-green-btn">
                              <div className="green-btn-dark">
                                 <div className="complinace-right-icon-text">
                                    <p className="complinace-right-title">BSE </p>
                                    <p className="align-right">50% </p>
                                 </div>
                              </div>
                              <p className="green-user-icon"><img src={accountCircleGreenmobile} alt="account Circle Green" /></p>
                           </div>
                        </div>
                        <div className="">
                           <div className="animate__animated animate__fadeInLeft animate__delay-2s compliance-task-purple-btn">
                              <div className="purple-btn-dark">
                                 <div className="complinace-right-icon-text">
                                    <p className="complinace-right-title">CDSL </p>
                                    <p className="align-right">75% </p>
                                 </div>
                              </div>
                              <p className="green-user-icon"><img src={accountCirclePurple} alt="account Circle Purple" /></p>
                           </div>
                        </div>
                        <div className="">
                           <div className="animate__animated animate__fadeInRight animate__delay-3s compliance-task-creme-btn">
                              <div className="creme-btn-dark">
                                 <div className="complinace-right-icon-text">
                                    <p className="complinace-right-title">MCX </p>
                                    <p className="align-right">35% </p>
                                 </div>
                              </div>
                              <p className="green-user-icon"><img src={accountCircleOrange} alt="account Circle Purple" /></p>
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


export default ComplianceDemo2;