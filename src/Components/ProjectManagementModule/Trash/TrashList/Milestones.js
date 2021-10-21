import React from 'react'
import Delete from "../../../../../src/assets/Images/Delete.png"
import Vector from "../../../../../src/assets/Images/Vector.png"

const  Milestones =()=> {
    return (
        <div>
            <div className="takeRectangle">
                <div className="project-milestone">Milestone</div>
                <div className="complete-owner">Owner</div>
                <div className="own-startdate">Start Date</div>
                <div className="endDate1">End Date</div>
                <div className="duration">Duration</div>
                <div className="assiTo">Assigned To</div>
                <div className="comletion">Completation</div>

                    <div className="pro1">Discussion with Client
                        <div className="fullName">Ajit Shah</div>
                        <div className="startDate">16 Aug 2021</div>  
                        <div className="endDte">21 Aug 2021</div> 
                        <div className="mannualDays">3 Days</div> 
                        <div className="shortName">Ajit</div> 
                        <div className="percantages">40%</div> 
                        <div className="vectBack"></div>
                        <div className="projectImage"><img src={Vector}/></div>
                        <div className="image-dele"><img src={Delete}/></div> 
                        <div className="rectDelete">
                        </div>
                    </div>
                    <div className="management-figma">Figma Learning
                        <div className="fullName">Ajit Shah</div>
                        <div className="startDate">16 Aug 2021</div>  
                        <div className="endDte">21 Aug 2021</div> 
                        <div className="mannualDays">1 Days</div> 
                        <div className="shortName">1 Days</div> 
                        <div className="percantages">50%</div> 
                        <div className="vectBack"></div>
                        <div className="projectImage"><img src={Vector}/></div>
                        <div className="image-dele"><img src={Delete}/></div> 
                        <div className="rectDelete">
                        </div>
                    </div>
                    <div className="python-advord">Meeting with Advord
                        <div className="fullName">Keshav D.</div>
                        <div className="startDate">20 Aug 2021</div>  
                        <div className="endDte">20 Aug 2021</div> 
                        <div className="mannualDays">1 Days</div> 
                        <div className="shortName">Ajit</div> 
                        <div className="percantages">0%</div> 
                        <div className="vectBack"></div>
                        <div className="projectImage"><img src={Vector}/></div>
                        <div className="image-dele"><img src={Delete}/></div> 
                        <div className="rectDelete">
                        </div>  
                    </div>
            </div>
        </div>
    )
}

export default Milestones
