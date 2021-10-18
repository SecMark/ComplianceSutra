import React from 'react'
import Vector from "../../../../../src/assets/Images/Vector.png"
import Delete from "../../../../../src/assets/Images/Delete.png"

function Task() {
    return (
        <div>
            {/* <h1>Task</h1> */}
            <div className="rectangleFirst">
                <div className="fillColor"></div>
                <div className="textHeading">Hello Design</div>
                <div className="vect"></div>
                <div className="forImg"><img src={Vector}/></div>
                <div className="forImg1"><img src={Delete}/></div>
                <div className="rectDelete2">
                </div>
            </div>
          
            <div className="rectangleSecond">
            <div className="fillColor"></div>
                <div className="textHeading">Project Discuss Meeting</div>
                <div className="vect"></div>
                <div className="forImg"><img src={Vector}/></div>
                <div className="forImg1"><img src={Delete}/></div>
                <div className="DeleteRect">
                </div>
            </div>

            <div className="rectangleThird">
            <div className="fillColor"></div>
                <div className="textHeading">Demo To Nikhil</div>
                <div className="vect"></div>
                <div className="forImg"><img src={Vector}/></div>
                <div className="forImg1"><img src={Delete}/></div>
                <div className="rectDelete2">
                </div>
            </div>
            <div className="rectangleFourth">
            <div className="fillColor"></div>
                <div className="textHeading">New Employee Verification</div>
                <div className="vect"></div>
                <div className="forImg"><img src={Vector}/></div>
                <div className="forImg1"><img src={Delete}/></div>
                <div className="DeleteRect">
                </div>
            </div>

            <div className="rectangleFive">
            <div className="fillColor"></div>
                <div className="textHeading">Demo To Nikhil</div>
                <div className="vect"></div>
                <div className="forImg"><img src={Vector}/></div>
                <div className="forImg1"><img src={Delete}/></div>
                <div className="rectDelete2">
                </div>
            </div>
           
        </div>
    )
}

export default Task
