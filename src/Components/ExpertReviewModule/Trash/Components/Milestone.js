import React from 'react'
import Delete from "../../../../../src/assets/Images/Delete.png"
import Vector from "../../../../../src/assets/Images/Vector.png"
function Milestone() {
    return (
        <div>
            <div className="takeRectangle">
                <div className="pro">Milestone</div>
                <div className="comp">Owner</div>
                <div className="own">Start Date</div>
                <div className="endDate1">End Date</div>
                <div className="due1">Duration</div>
                <div className="assiTo">Assigned To</div>
                <div className="comle">Completation</div>

                    <div className="pro1">Discussion with Client
                        <div className="own1">Ajit Shah</div>
                        <div className="own2">16 Aug 2021</div>  
                        <div className="own3">21 Aug 2021</div> 
                        <div className="own4">3 Days</div> 
                        <div className="own5">Ajit</div> 
                        <div className="own6">40%</div> 
                        <div className="vectBack"></div>
                        <div className="projectImage"><img src={Vector}/></div>
                        <div className="comp9"><img src={Delete}/></div> 
                        <div className="rectDelete">
                        </div>
                    </div>
                    <div className="pro1">Figma Learning
                        <div className="own1">Ajit Shah</div>
                        <div className="own2">16 Aug 2021</div>  
                        <div className="own3">21 Aug 2021</div> 
                        <div className="own4">1 Days</div> 
                        <div className="own5">1 Days</div> 
                        <div className="own6">50%</div> 
                        <div className="vectBack"></div>
                        <div className="projectImage"><img src={Vector}/></div>
                        <div className="comp9"><img src={Delete}/></div> 
                        <div className="rectDelete">
                        </div>
                    </div>
                    <div className="pro1">Meeting with Advord
                        <div className="own1">Keshav D.</div>
                        <div className="own2">20 Aug 2021</div>  
                        <div className="own3">20 Aug 2021</div> 
                        <div className="own4">1 Days</div> 
                        <div className="own5">Ajit</div> 
                        <div className="own6">0%</div> 
                        <div className="vectBack"></div>
                        <div className="projectImage"><img src={Vector}/></div>
                        <div className="comp9"><img src={Delete}/></div> 
                        <div className="rectDelete">
                        </div>  
                    </div>
            </div>
        </div>
    )
}

export default Milestone
