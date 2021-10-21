import React from 'react'
import Delete from "../../../../../src/assets/Images/Delete.png"
import Vector from "../../../../../src/assets/Images/Vector.png"

const Projects =()=> {
    return (
        <div>
       
            <div className="takeRectangle">
                <div className="project-milestone">Project Name</div>
                <div className="complete-owner">Completed</div>
                <div className="own-startdate">Owner</div>
                <div className="task">Tasks</div>
                <div className="milestone">Milestone</div>
                <div className="due">Duration</div>
                <div className="srtDate">Start Date</div>
                <div className="endDate">End Date</div>

                    <div className="management-figma">Managment Design
                        <div className="percentage">66%</div>
                        <div className="name">Ajit</div>  
                        <div className="devideby">2/2</div> 
                        <div className="devideby1">0/1</div> 
                        <div className="days">2 Days</div> 
                        <div className="calendar">16 Aug 2021</div> 
                        <div className="calendar1">21 Aug 2021</div> 
                        <div className="vectBack"></div>
                        <div className="projectImage"><img src={Vector}/></div>
                        <div className="image-dele"><img src={Delete}/></div> 
                        <div className="rectDelete">
                        </div>
                    </div>
                    <div className="getLine-26"></div>

                      <div className="python-advord">Python Learning
                        <div className="percentage">0%</div>
                        <div className="name">Kevin</div>  
                        <div className="devideby">0/0</div> 
                        <div className="devideby1">0/1</div> 
                        <div className="days">1 Days</div> 
                        <div className="calendar">14 Aug 2021</div> 
                        <div className="calendar1">21 Aug 2021</div> 
                        <div className="vectBack"></div>
                        <div className="projectImage"><img src={Vector}/></div>
                        <div className="image-dele"><img src={Delete}/></div> 
                        <div className="rectDelete">
                        </div>
                         <div className="getLine-26"></div>
                    </div>
                      <div className="user-testing">User Testing 2.0
                        <div className="percentage">70%</div>
                        <div className="name">Ajit Shaha</div>  
                        <div className="devideby">2/2</div> 
                        <div className="devideby1">0/1</div> 
                        <div className="days">1 Days</div> 
                        <div className="calendar">15 Aug 2021</div> 
                        <div className="calendar1">21 Aug 2021</div> 
                        <div className="vectBack"></div>
                        <div className="projectImage"><img src={Vector}/></div>
                        <div className="image-dele"><img src={Delete}/></div> 
                        <div className="rectDelete">
                        </div>
                         <div className="getLine-26"></div>
                    </div>
                      <div className="management-design">Managment Design
                        <div className="percentage">66%</div>
                        <div className="name">Ajit</div>  
                        <div className="devideby">2/2</div> 
                        <div className="devideby1">0/1</div> 
                        <div className="days">2 Days</div> 
                        <div className="calendar">16 Aug 2021</div> 
                        <div className="calendar1">21 Aug 2021</div> 
                        <div className="vectBack"></div>
                        <div className="projectImage"><img src={Vector}/></div>
                        <div className="image-dele"><img src={Delete}/></div> 
                        <div className="rectDelete">
                        </div>
                         <div className="getLine-26"></div>
                    </div>     
            </div>        
        </div>                              
    )
}

export default Projects;
