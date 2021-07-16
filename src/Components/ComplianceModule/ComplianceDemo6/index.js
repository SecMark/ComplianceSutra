import React from 'react';
import "./style.css";
import accountCircle from '../../../assets/Icons/accountCircle.png';
import arrow from '../../../assets/Icons/arrow.png';
import accountCircleGreen from '../../../assets/Icons/accountCircleGreen.png';
import accountCirclePurple from '../../../assets/Icons/accountCirclePurple.png';
import vacation from '../../../assets/Icons/vacation.png';
import regulatory from '../../../assets/Icons/regulatory.png';

import cup from '../../../assets/Icons/cup.png';
import { useSpring, animated } from 'react-spring';
function ComplianceDemo6() {
   const topPerformer = useSpring({
      transform: "scale(1)",
      opacity: 1,
      delay: 300,
      from: {
         transform: "scale(0.5847)",
         opacity: 0,
      }
   });
   const regulatoryChanges = useSpring({
      transform: "scale(1)",
      opacity: 1,
      delay: 700,
      from: {
         transform: "scale(0.5847)",
         opacity: 0,
      }
   });
   const propsSpring = useSpring({
      left: 0,
      opacity: 1,
      delay: 100,
      from: {
         right: "-20px",
         opacity: 0,
      }
   });
   return (
      <div>
         <div className="potential-risks-mobile-padding">
            <div className="potential-risks-right-side-grid">
               <div className="potential-risks-white-box">
                  <div className="potential-risks-right-grid-title"> Potential Risks</div>
                  <div className="potential-risks-arrow-preview-next  d-none d-sm-block"> <img src={arrow} alt="arrow left" />   </div>
               </div>

               <animated.div style={topPerformer} className="potential-risks-top-performance">
                  <img src={vacation} alt="vacation" />
                  <p className="potential-risks-performance-text">VACATION</p>
               </animated.div>
               <animated.div style={regulatoryChanges} className="potential-risks-top-performance-last">
                  <img src={regulatory} alt="regulatory" />
                  <p className="potential-risks-performance-text">REGULATORY CHANGES</p>
               </animated.div>
               <animated.div style={propsSpring} className="potential-risks-btn-grid">
                  <div className="potential-risks-btn1">
                     <div className="potential-risks-icon-text">
                           <p className="potential-risks-white">Potential Risks </p>
                           <p className="potential-risks-alignright red-circle">3</p>
                     </div>
                  </div> 
                  <div className="potential-risks-btn2">
                     <div className="potential-risks-icon-text">
                           <p className="potential-risks-title">NSE <span className="potential-risks-dueBtn">DUE TODAY</span></p>
                           <p className="potential-risks-alignright "><img src={accountCircle} alt="acount Circle" /></p>
                     </div>
                  </div> 
                  <div className="potential-risks-btn3">
                     <div className="potential-risks-icon-text">
                           <p className="potential-risks-title">BSE <span className="potential-risks-dueBtn-blck">REGULATION CHANGED</span></p>
                           <p className="potential-risks-alignright "><img src={accountCircleGreen} alt="acount Circle" /></p>
                     </div>
                  </div> 
                  <div className="potential-risks-btn4">
                     <div className="potential-risks-icon-text">
                           <p className="potential-risks-title">CDSL <span className="potential-risks-dueBtn-blck">TIME OFF</span></p>
                           <p className="potential-risks-alignright "><img src={accountCirclePurple} alt="acount Circle purple" /></p>
                     </div>
                  </div>
               </animated.div>
            </div>
         </div>
      </div>

   )
}


export default ComplianceDemo6;