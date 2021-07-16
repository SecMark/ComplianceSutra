import React from 'react';
import "./style.css";
import arrow from '../../../assets/Icons/arrow.png';
import progressUser from '../../../assets/Icons/progressUser.png';
import progressUserGreen from '../../../assets/Icons/progressUserGreen.png';
import progressUserOrange from '../../../assets/Icons/progressUserOrange.png';
import progressUserPink from '../../../assets/Icons/progressUserPink.png';
import cup from '../../../assets/Icons/cup.png';
import { useSpring, animated } from 'react-spring';

function ComplianceDemo3() {
   const propsAverage = useSpring({ width: 220, from: { width: 0, transition: "1s" } });
   const propsBest = useSpring({ width: 478, from: { width: 0, transition: "1s" } });
   const propsPoor = useSpring({ width: 112, from: { width: 0, transition: "1s" } });
   const propsGood = useSpring({ width: 320, from: { width: 0, transition: "1s" } });
   const topPerformer = useSpring({
      transform: "scale(1)",
      opacity: 1,
      delay:700,
      from: {
         transform: "scale(0.5847)",
         opacity: 0,
      }
   });

   return (
      <div>
         <div className="mobile-padding1">
            <div className="complinace-right-side-grid-demo3">
               <div className="">
                  <div className="">
                     <div className="white-box-demo3">
                        <div className="complinace-right-grid-title"> Team Performance</div>
                        <div className="arrow-preview-next  d-none d-sm-block"> <img src={arrow} alt="arrow left" />   </div>
                     </div>
                  </div>
                  <animated.div style={topPerformer} className="top-performance">
                     <img src={cup} alt="Cup Icon" />
                     <p className="performance-text">TOP PERFORMER</p>
                  </animated.div>
               </div>
               <div className="progress-grid">
                  <div className="purple-progress">
                     <ul className="list-group list-group-horizontal">
                        <li><img className="d-none d-sm-block d-xs-none" src={progressUser} alt="arrow left" /></li>
                        <li className="w-100">
                           <p className="progress-user-name"><img className="d-block d-sm-none" src={progressUser} alt="User Blue" /> Prakash Khot <span className="right-text">AVERAGE</span></p>
                           <div className="progress">
                              <animated.div style={propsAverage} className="progress-bar active-purple" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></animated.div>
                           </div>
                        </li>
                     </ul>
                  </div>
                  <div className="purple-progress">
                     <ul className="list-group list-group-horizontal">
                        <li><img className="d-none d-sm-block d-xs-none" src={progressUserGreen} alt="arrow left" /></li>
                        <li className="w-100">
                           <p className="progress-user-name"><img className="d-block d-sm-none" src={progressUserGreen} alt="User Green" /> Sameet Sansan <span className="right-text">BEST</span></p>
                           <div className="progress">
                              <animated.div style={propsBest} className="progress-bar active-green" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></animated.div>
                           </div>
                        </li>
                     </ul>
                  </div>
                  <div className="purple-progress">
                     <ul className="list-group list-group-horizontal">
                        <li><img className="d-none d-sm-block d-xs-none" src={progressUserOrange} alt="arrow left" /></li>
                        <li className="w-100">
                           <p className="progress-user-name"><img className="d-block d-sm-none" src={progressUserOrange} alt="User Orange" /> Rajesh Kumar <span className="right-text">POOR</span></p>
                           <div className="progress">
                              <animated.div style={propsPoor} className="progress-bar active-orange" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></animated.div>
                           </div>
                        </li>
                     </ul>
                  </div>
                  <div className="purple-progress">
                     <ul className="list-group list-group-horizontal">
                        <li><img className="d-none d-sm-block d-xs-none" src={progressUserPink} alt="Pink Circle" /></li>
                        <li className="w-100">
                           <p className="progress-user-name"><img className="d-block d-sm-none" src={progressUserPink} alt="Pink Circle" /> Pradeep Reddy <span className="right-text">GOOD</span></p>
                           <div className="progress">
                              <animated.div style={propsGood} className="progress-bar active-pink" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></animated.div>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}


export default ComplianceDemo3;