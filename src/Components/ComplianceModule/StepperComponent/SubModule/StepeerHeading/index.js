import React from 'react';
import { useSpring, animated } from 'react-spring'

function StepeerHeading({ content }) {
    const props = useSpring({ delay: 700, opacity: 1, from: { opacity: 0, } })
    return (<>
     <div className="stepeer-heading">
      <div className="">
        {
            content && content.icon !== "" && content.header !== "" && content.description !== "" && (<div className="stepeer-heading">
                <div style={props} className="animate__animated animate__fadeInDown">
                    <animated.div className="heading">
                        <img className="mobileHide" src={content.icon} alt="CalenderIcon" />
                        <p className="heading-title">{content.header}</p>
                        <p className="heading-description">{content.description}</p>
                    </animated.div>
                </div>
            </div>)
        }
        </div>
        </div>
    </>
    )
}


export default StepeerHeading;