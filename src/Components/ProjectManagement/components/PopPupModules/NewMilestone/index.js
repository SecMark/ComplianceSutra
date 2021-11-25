import React from 'react';
import './style.css';
import { DatePicker } from "antd";
import { borderRadius, height } from '@mui/system';

function Newmilestone() {

    return (
        <div className="body">
            <h1>Milestone</h1>
            <div className="main-rectangle">
                <div className="text-heading">New Milestone</div>
                <div className="text-name">Milestone</div>
                 <div className="inputvalue">
                 <input type="text" name="name"/>
                  </div>
                 <div className="text-start-date">Start Date</div>
                 <div className="text-end-date">End Date</div>

                 <div className="start-date-rectangle">
                    <DatePicker  className="radius"
                            style={{ width: "100%", color: "#000", border: "1px solid #ced4da", height:"100%"}}
                            format="DD MMMM Y"
                
                    />
                 </div>
                 <div className="end-date-rectangle">
                    <DatePicker className="radius-first"
                            style={{ width: "100%", color: "#000", border: "1px solid #ced4da", height:"100%"}}
                            format="DD MMMM Y"
                
                    />
                </div>
                    <div className="submitbutton">
                            <button
                                className="btn save-details common-button  mb-2"
                                >
                                submit  
                            </button>
                    </div> 
                    <div className="cancelbutton">
                        <button
                            className="button button2"
                            >
                            cancel 
                        </button>
                    </div>   
                   
            </div> 

        </div>
    )
}

export default Newmilestone
