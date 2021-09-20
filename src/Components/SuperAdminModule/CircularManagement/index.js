import React, { useState } from 'react';
import "./style.css";
import StepperProgressIcon from "../../../../src/assets/Icons/stepper-progress-cricle.png";
import StepperCheckIcon from "../../../../src/assets/Icons/check-icon-disable.png";
import StepperCheckIconActive from "../../../../src/assets/Icons/check-icon.png";
import Drawer from "../../../CommonModules/sharedComponents/Drawer"
import Stepper from '../../../CommonModules/sharedComponents/Stepper';
import  DatePicker  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import plusIcon from "../../../../src/assets/Icons/plusIcon.png"



const Circular = () =>{
    
  
    const [sortBy, setSortBy] = useState("Alphabatically");
    const [openRightTab, setOpenRightTab] = useState(true);

    const dropdownlist = ["item1", "item2", "item3"]
    const [firstdropdown, setFirstdropdown] = useState("I am the first!");
    const [seconddropdown, setSeconddropdown] = useState("I am the first!");
    const [thirddropdown, setThirddropdown] = useState("I am the first!");

    const [addData, setVal] = useState("");
    const [addedData, showData] = useState(0);
    const handleChange  = (e, editor) =>{
      const data  = editor.getData();
      setVal(data);
    }

    const [startDate, setStartDate] = useState(new Date());
    
    const steps = [
            {
              id: 1,
              text: "Add Basic Details",
            },
            {
              id: 2,
              text: "Add Expert Review Details",
            },
            {
              id: 3,
              text: "Submit Your Docs",
            },
        ];

        
        const [stepper, setStepper] = useState({
            stepperAcitveSlide: 1,
            stepperCompletedSlides: [],
        });

        const handleStepClick = (step) => {
            // Changing Steps
            const completedSlides = stepper.stepperCompletedSlides;
            if (completedSlides.includes(step)) {
              setStepper({
                ...stepper,
                stepperCompletedSlides: completedSlides.filter((item) => item !== step),
                stepperAcitveSlide: step,
              });
            }
          };

    return (

        <div>
            <Drawer isOpen={openRightTab} setIsOpen={setOpenRightTab}>
                <div className="title">Add a New Circular</div>
                  <div className="cs-drawer__horizontal-line"></div> 
                    {/* <div className="stepper"> <Stepper steps={steps} stepper={stepper}/></div> */}
                    <div className="stepper mb-5 d-flex align-items-center justify-content-center">
                      <div className="stepper-item position-relative d-flex align-items-center">
                          <img
                            src={
                              stepper.stepperAcitveSlide === 1
                                ? StepperProgressIcon
                                : stepper.stepperCompletedSlides.includes(1)
                                ? StepperCheckIconActive
                                : StepperCheckIcon
                            }
                            onClick={() => handleStepClick(1)}
                            className="stepper-image"
                            alt="progress"
                          />
                          <div className="stepper-horizontal-line"></div>
                          {stepper.stepperAcitveSlide === 1 && (
                              <p className="stepper-tex stepper-text--left position-absolute">
                                Add Basic Details
                              </p>
                            )}
                          </div>
                          <div className="stepper-item position-relative d-flex align-items-center">
                            <img
                              onClick={() => handleStepClick(2)}
                              src={
                                stepper.stepperAcitveSlide === 2
                                  ? StepperProgressIcon
                                  : stepper.stepperCompletedSlides.includes(2)
                                  ? StepperCheckIconActive
                                  : StepperCheckIcon
                              }
                              className="stepper-image"
                              alt="progress"
                            />
                          <div className="stepper-horizontal-line"></div>
                          {stepper.stepperAcitveSlide === 2 && (
                                  <p className="stepper-text-review stepper-text--center position-absolute">
                                    Add Expert Review Details
                                  </p>
                                )}
                              </div>
                          <div className="stepper-item position-relative d-flex align-items-center">
                                <img
                                  src={
                                    stepper.stepperAcitveSlide === 3
                                      ? StepperProgressIcon
                                      : stepper.stepperCompletedSlides.includes(3)
                                      ? StepperCheckIconActive
                                      : StepperCheckIcon
                                  }
                                  className="stepper-image"
                                  alt="progress"
                                />
                          {stepper.stepperAcitveSlide === 3 && (
                                <p className="stepper-text stepper-text--right position-absolute">
                                  Review Details & Confirm
                                </p>
                              )}
                          </div>
                      </div>
      
                  {stepper.stepperAcitveSlide === 1 && (
                    <>
                        <div className="BasicDetails">Basic Details</div>
                        <div className="DI">Date of issuance </div>
                        <div class="rect">
                            <div className="Date">
                              <DatePicker
                               selected={startDate}
                               onChange={(date) => setStartDate(date)} 
                               dateFormat="dd/MM/yyyy"
                               isClearable
                              placeholderText="Select Date"
                              />

                              {/* <div className="cal">
                                   <AiOutlineCalendar />
                              </div> */}

                          {/* <div className="img" alt="calendar">
                                <img src={calendar}/>  
                          </div>  */}
                            </div>
                            </div>                           
                        <div className="UI">Update issued by</div>
                        <div class="Rectangle-2">
                                <select className="firstdrop"
                                        // id="first"
                                        value={thirddropdown}
                                        onChange={e=> setThirddropdown(e.target.value)}
                                        onBlur={e=> setThirddropdown(e.target.value)}
                                        disabled={!dropdownlist.length}>
                                          <option>Select issure from the list</option>
                                          <option>Select a Mainlicense</option>
                                </select>

                
                        </div>
                        <div className="Link">  Link of the Circular</div>
                      
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Paste the URL of the circular here"
                          />
              
                        <div className="CN"> Circular Number 
                           
                        </div>

                                  <input
                                      type="text"
                                      className="form-control-1"
                                      placeholder="Type for the circular number"
                                  />

                        <div className="Topic-for-the-circular">  Topic for the circular</div>
                                  <input
                                      type="text"
                                      className="form-control-2"
                                      placeholder="Type the topic here"
                                 />

                        <div className="CircularDetails">Circular Details</div>
                      
                        <div className="TitleCircular">Title of the Circular</div>

                        
                        {/* <div class="Rectangle-7">
                        <span class="Enter-the-full-titlename-of-the-circular">
                          Enter the full title/name of the circular
                        </span> 
                        </div> */}

                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter the full title/name of the cicular"
                                  />

                        <div className="GistOverview">Gist/Overview</div>
                            {/* <div class="Rectangle-8"> */}
                            {/* <span class="Write-a-short-synopsis-of-the-circular-or-its-key-points">
                              Write a short synopsis of the circular or its key points
                            </span> */}
                            <input
                                      type="text"
                                      className="form-control-8"
                                      // placeholder="Write a short synopsis of the circular or its key points"
                                  />

                        {/* </div> */}

                        {/* <CKEditor editor={ClassicEditor} 
                                 data={addData} onChange={handleChange}>
                        </CKEditor> */}

                                  {/* <input
                                      type="text"
                                      className="form-control-3"
                                      placeholder="Write a short synopsis of the circular or its key points" 
                                  /> */}

                        <div className="Associated-Circular-Documents"> Associated Circular Documents</div>

                        <div className="Abstract-3D-Kite">
                        <img  src={plusIcon}/>
                           Add New File</div>
                        
                        <div className="LD">  License Related Details</div>

                        <div className="License-impacted-by-Circular">License impacted by Circular</div>
                             
                        <div class="Rectangle-2">
                        <select 
                                // id="first"
                                value={firstdropdown}
                                onChange={e=> setFirstdropdown(e.target.value)}
                                onBlur={e=> setFirstdropdown(e.target.value)}
                                disabled={!dropdownlist.length}>
                                  <option>Goods and Service Tax</option>
                                  <option>Select a Mainlicense</option>
                        </select>
                        </div>

                        <div className="Delete">Delete</div>

                        <div className="SubLicense-impacted-by-the-Circular"> SubLicense impacted by the Circular</div>
                        <div class="Rectangle-2">
                        <select 
                                // id="first"
                                value={seconddropdown}
                                onChange={e=> setSeconddropdown(e.target.value)}
                                onBlur={e=> setSeconddropdown(e.target.value)}
                                disabled={!dropdownlist.length}>
                                  <option>Select a Sublicense</option>
                                  <option>Select a Mainlicense</option>
                        </select>
                        </div>

                        <div className="Delete">Delete</div>

                        <div className="Addnew">
                        
                        <img  src={plusIcon}/>
                        <span class="Abstract-3D-Kit">
                          Add New License
                        </span>
                        <img  src={plusIcon}/>
                        <span class="Abstract-3D-Kit">
                          Add Sub license
                        </span>
                        <img  src={plusIcon}/>
                        <span class="Abstract-3D-Kit">
                          Add Subtask
                        </span>

                        </div>
                        
                        <br></br>
                        <div className="button">
                            <button
                              className="primary-button mt-3 d-block"
                              onClick={() => setStepper({
                                ...stepper,
                                stepperAcitveSlide: 2,
                                stepperCompletedSlides: [
                                  ...stepper.stepperCompletedSlides,
                                  1,
                                ],
                              })}
                            >
                              Next
                            </button>
                        </div>
                      </> 
                  )}


                {stepper.stepperAcitveSlide === 2 && (
                      <>
                            <div><h1>content</h1></div>
                            <div><h1>content</h1></div>
                            <div><h1>content</h1></div>
                            

                        <div className="col-12 mt-5">
                              <button
                                className="primary-button primary-button--outlined mr-3"
                                onClick={() => handleStepClick(stepper.stepperAcitveSlide - 1)}
                              >
                                go back
                              </button>
                              <button
                                className="primary-button"
                                onClick={() =>
                                  setStepper({
                                    ...stepper,
                                    stepperAcitveSlide: 3,
                                    stepperCompletedSlides: [
                                      ...stepper.stepperCompletedSlides,
                                      2,
                                    ],
                                  })
                                }
                              >
                                Next
                              </button>
                        </div>
                      </>
                  )}             
          </Drawer>  
           
      </div>
    );
};

export default Circular

