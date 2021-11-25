import React from 'react'
import "./style.css"
import Select from 'react-select'
function Tasklist() {
        let marriedstatus=[
            {   
            value:1,
            label:"single"
            }, 
            {   
            value:2,
            label:"Married"
            }, 
            {   
            value:3,
            label:"Unmarried"
            }
        ]

    return (
      
        <div>
            <div className="body">
             <div className="main-rectangle-task">
                <div className="text-heading-task">Task List</div>
                <div className="text-name-task">Task List</div>
                <div className="inputvalue-task">
                  <input type="text" name="name"/>
                </div>
                <div className="choose-task"> Choose from Tasklist
                   
                </div>
                <div className="template-task">Template</div>
                <div className="milestone-name-task">Milestone</div>    
                 <div className="dropdown-back">
                  <Select  options={marriedstatus}></Select>
                 </div>

                <div className="submitbutton-task">
                            <button
                                className="btn save-details common-button  mb-2" 
                                >
                                submit  
                            </button>
                </div> 
                <div className="cancelbutton-task">
                        <button
                            className="button button2"
                            >
                            cancel 
                        </button>
                </div>   
                   
              </div> 

        </div>
        </div>
    )
}

export default Tasklist
