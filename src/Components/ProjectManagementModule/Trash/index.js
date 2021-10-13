import {React,useState} from 'react'
import "./style.css"    
import Projects from "./TrashList/Projects";
import Milestone from "./TrashList/Milestones";
import Task from "./TrashList/Task";

const Trash =()=> {
       const [options, setOptions] = useState("list");
    const selectProfileOption = (option) => {
        setOptions(option);
      };
    return (
        <div>
         {/* <h1>Trash</h1> */}
            <div className="Rectangle" id="res">
                    <div className="mainHeading"><h4>Trash</h4></div>
                        <div className="options-list">       
                                    <div id="res1"
                                        onClick={() => selectProfileOption("list")}
                                        className={options === "list" && "activation-1"}
                                    >
                                        <div className="getoption-1">Projects</div>
                                   </div>
                                    <div id="res2"
                                        onClick={() => selectProfileOption("milestone")}
                                        className={options === "milestone" && "activation-2"}
                                    >
                                    <div className="getoption-2">Milestone</div>
                                    </div>
                                    <div id="res3"
                                        onClick={() => selectProfileOption("tasks")}
                                        className={options === "tasks" && "activation-3"}
                                        >
                                        <div className="getoption-3">Tasks</div>
                                    </div>
                                        <div className="rectangle_1">
                                            <div className="underText">The projects automaticaly remove from Trash after 30 days    </div>
                                        </div>
                                        <div class="getLine-25"></div>       
                            </div> 
                        {options === "list" && <Projects/>}
                        {options === "milestone" && <Milestone />}
                        {options === "tasks" && <Task/>}
            </div>
        </div>
    )
}
export default Trash
