import React, { useState,useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ToggleButton from "../../../../../CommonModules/sharedComponents/ToggleButton";
import Drawer from "../../../../../CommonModules/sharedComponents/Drawer"
import StepperProgressIcon from "../../../../../../src/assets/Icons/stepper-progress-cricle.png";
import StepperCheckIcon from "../../../../../../src/assets/Icons/check-icon-disable.png";
import StepperCheckIconActive from "../../../../../../src/assets/Icons/check-icon.png";
import Dropdown from "react-dropdown";
import Datepicker from "../../../../../CommonModules/sharedComponents/Datepicker";
import { AiFillPlusCircle } from "react-icons/ai";
import {AiFillFile} from "react-icons/ai"


const TaskOverview = () => {
const [selectedFile, setSelectedFile] = useState();
const [isSelected, setIsSelected] = useState(false);
const changeHandler = (event) => {
  setSelectedFile(event.target.files[0]);
  setIsSelected(true);
  const { files } = event.target;
      if (files && files.length) {
        const filename = files[0].name;
  
        var parts = filename.split(".");
        const fileType = parts[parts.length - 1];
        console.log("fileType", parts,fileType); 
      }
};
const handleSubmission = () => {
  inputFile.current.click();
};
 const inputFile = useRef(null);
//  const handleFileSelect = (e) =>{
//   inputFile.current.click();
//   }
//   const handleFileUpload = e => {
//     const { files } = e.target;
//     if (files && files.length) {
//       const filename = files[0].name;

//       var parts = filename.split(".");
//       const fileType = parts[parts.length - 1];
//       console.log("fileType", parts,fileType); 
     
//     }
//   };
const changeHandler1 = (event) => {
  setSelectedFile(event.target.files[0]);
  setIsSelected(true);
  const { files } = event.target;
      if (files && files.length) {
        const filename = files[0].name;
  
        var parts = filename.split(".");
        const fileType = parts[parts.length - 1];
        console.log("fileType", parts,fileType); 
      }
};
const handleSubmission1 = () => {
  inputFile1.current.click();
};
 const inputFile1 = useRef(null);
  // const inputFile1 = useRef(null);
  // const handleFileSelect1 = (e) =>{
  //   inputFile.current.click();
  //   }
  //   const handleFileUpload1 = e => {
  //     const { files } = e.target;
  //     if (files && files.length) {
  //       const filename = files[0].name;
  
  //       var parts = filename.split(".");
  //       const fileType = parts[parts.length - 1];
  //       console.log("fileType", parts,fileType); 
  //     }
  //   };

  const actionDispatch = useDispatch();
  
  const [openRightTab, setOpenRightTab] = useState(true);

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
      {
        id: 4,
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
    const dropdownlist = ["item1", "item2", "item3"]
    const [firstdropdown, setFirstdropdown] = useState("I am the first!");
    const [seconddropdown, setSeconddropdown] = useState("I am the first!");
    const [thirddropdown, setThirddropdown] = useState("I am the first!");
    const [fourthdropdown, setFourthdropdown] = useState("I am the first!");
    const [fipthdropdown, setFipthdropdown] = useState("I am the first!");

  return (
    <div>
      
         <Drawer isOpen={openRightTab} setIsOpen={setOpenRightTab}>
                    <div className="title"> Edit Sub Task Details</div>
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
                                    Edit  Basic Details
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
                                    Edit References
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
                                    <div className="stepper-horizontal-line"></div>
                            {stepper.stepperAcitveSlide === 3 && (
                                    <p className="stepper-detail stepper-text--right position-absolute">
                                   Add Updates
                                    </p>
                                    
                                )}
                                
                            </div>
                            <div className="stepper-item position-relative d-flex align-items-center">
                                    <img
                                    src={
                                        stepper.stepperAcitveSlide === 4
                                        ? StepperProgressIcon
                                        : stepper.stepperCompletedSlides.includes(4)
                                        ? StepperCheckIconActive
                                        : StepperCheckIcon
                                    }
                                    className="stepper-image"
                                    alt="progress"
                                    />
                            {stepper.stepperAcitveSlide === 4 && (
                                    <p className="stepper-detail stepper-text--right position-absolute">
                                    Review Details & Confirm
                                    </p>
                                    
                                )}
                                
                            </div>
                        </div>

                     {/* Stepper 1 */}

                {stepper.stepperAcitveSlide === 1 && (
                  <>
                      <div className="basic-details">  Basic Details</div>
                      <div className="name-subtask">Name of the Subtask</div>
                      <div className=" Fill-Subsheet ">

                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Fill Subsheet for Form 283B"
                                  />
                      </div>
                      <div className="first-step">
                        <div className="select-ass-license"> Select Associated License</div>
                   
                        <div className="select-ass-sublicense">  Select Associated Sub License </div>
                        <select className="form-control side-overview__show-by--dropdown-1"
                                        // id="first"
                                        value={firstdropdown}
                                        onChange={e=> setFirstdropdown(e.target.value)}
                                        onBlur={e=> setFirstdropdown(e.target.value)}
                                        disabled={!dropdownlist.length}>
                                          <option>Goods & Service Tax</option>
                                          <option> Service Tax</option>                     
                        </select>
                        <select className="form-control side-overview__show-by--dropdown-2"
                                        // id="first"
                                        value={seconddropdown}
                                        onChange={e=> setSeconddropdown(e.target.value)}
                                        onBlur={e=> setSeconddropdown(e.target.value)}
                                        disabled={!dropdownlist.length}>
                                          <option>Select Sublicense</option>  
                                          <option>Select license</option>                
                        </select>
                      </div>
                      <div className="second-step">
                          <div className="activate-subtask"> Activate Subtask on</div>
                          <div className="occurance-frequency">  Occurance (Frequency)</div>
                          <div className="Datepicker-1">
                            <Datepicker
                                      // value={state.HistoryReducer.from}
                                      name="from"
                                      dispatch={actionDispatch}
                                      actionType="SELECT_FROM_DATE"    
                            />  
                          </div>   
                          <select className="form-control side-overview__show-by--dropdown-3"
                                        // id="first"
                                        value={thirddropdown}
                                        onChange={e=> setThirddropdown(e.target.value)}
                                        onBlur={e=> setThirddropdown(e.target.value)}
                                        disabled={!dropdownlist.length}>
                                          <option>Monthly</option>
                                          <option>Yearly</option>                   
                          </select>
                      </div>
                      <div className="third-step">
                        <div className="complition-date">Completion Date</div>
                        <div className="due-date">  Due Date</div>
                        <select className="form-control side-overview__show-by--dropdown-4"
                                        // id="first"
                                        value={fourthdropdown}
                                        onChange={e=> setFourthdropdown(e.target.value)}
                                        onBlur={e=> setFourthdropdown(e.target.value)}
                                        disabled={!dropdownlist.length}>
                                          <option>15th of Every Month</option>
                                          <option>16th of Every Year</option>                   
                          </select>
                          <select className="form-control side-overview__show-by--dropdown-5"
                                        // id="first"
                                        value={fipthdropdown}
                                        onChange={e=> setFipthdropdown(e.target.value)}
                                        onBlur={e=> setFipthdropdown(e.target.value)}
                                        disabled={!dropdownlist.length}>
                                          <option>3rd Before Complition Date</option>
                                          <option>16th of Every Year</option>                   
                          </select>
                      </div>
                      <div className="fourth-steps">
                        <div className="temporary-due-date">Temporary Due Date</div>
                        <div className="Datepicker-1">
                            <Datepicker
                                      // value={state.HistoryReducer.from}
                                      name="from"
                                      dispatch={actionDispatch}
                                      actionType="SELECT_FROM_DATE"    
                            />  
                          </div> 
                      </div>

                      <div className="plus-circul"><AiFillPlusCircle />
                          <div className="temporary_date">  Add temporary Due Date</div>
                      </div>
                      <div className="button">
                            <button
                              className="primary-button-1 mt-3 d-block"
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
                      </div><br/>
                  </> 
                )}


              {stepper.stepperAcitveSlide === 2 && (
                <>
                    <div className="referance-document">  Reference Documents</div>
                    <div class="">
                      <div className="pdf-file">
                      <input
                            style={{ display: "none" }}
                            // accept=".zip,.rar"
                            ref={inputFile1}
                            onChange={changeHandler1}
                            type="file"
                          />
                            {isSelected ? (
                                    <div>
                                      <div className="FileNaming1">Filename: {selectedFile.name}</div>
                                      {/* <p>Filetype: {selectedFile.type}</p>
                                      <p>Size in bytes: {selectedFile.size}</p>
                                      <p>
                                        lastModifiedDate:{' '}
                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                      </p> */}
                                    </div>
                                  ) : (
                                   <div className="empty"></div>
                                  )}
                        
                      <AiFillFile onClick={handleSubmission1}/></div>
                      {/* <div className="pdf-text"> GST Statement pt2.pdf</div> */}
                      <div className="change">Change</div>
                      <div className="deleting-1">Delete</div>
                    </div>

                    <div className="plus-circul-1"><AiFillPlusCircle />
                          <div className="add_new_file">  Add New File</div>
                    </div>
                    <div className="reference-link">  Reference Link</div>
                    <div className="add-reference-link">

                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder=" Add your link here"
                                  />
                      </div>
                      <div className="plus-circul-2"><AiFillPlusCircle />
                          <div className="add_new_link">  Add New Link</div>
                       </div>

                       <div className="goBackButton">
                              <button
                                onClick={() => handleStepClick(stepper.stepperAcitveSlide - 1)}
                                className="primary-button-2"
                              >
                                Go Back
                              </button>
                        </div>  
                        <div className="NextButton">   
                              <button
                                className="primary-button-3"
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

                  {stepper.stepperAcitveSlide === 3 && (
                    <>  
                          <div className="add-an-update"> Add an update</div>   
                          <div className="short-description"> Short Description</div>
                          <div className="short-description-1">
                                <textarea placeholder=" Write a description about the update"></textarea>
                           </div>

                           <div className="attach-link">  Attach Link</div>
                           <div className="attach-link-1">

                                  <input
                                      type="message"
                                      className="form-control"
                                       placeholder="Type or Copy the notice link here"
                                  />
                                  
                            </div>
                            <div className="plus-circul-3"><AiFillPlusCircle />
                                <div className="add_new_link-3">  Add New Link</div>
                            </div>
                            <div className="refference-attach">Attach Reference</div>
                            <div className="plus-circul-4"><AiFillPlusCircle />
                                <div className="add-reference-file">  Add References Files</div>
                            </div>
                            <div className="goBackButton-1">
                              <button
                                onClick={() => handleStepClick(stepper.stepperAcitveSlide - 1)}
                                className="primary-button-3"
                              >
                                Go Back
                              </button>
                        </div>  
                        <div className="NextButton-1">   
                              <button
                                className="primary-button-3"
                                onClick={() =>
                                  setStepper({
                                    ...stepper,
                                    stepperAcitveSlide: 4,
                                    stepperCompletedSlides: [
                                      ...stepper.stepperCompletedSlides,
                                      3,
                                    ],
                                  })
                                }
                              >
                                Next
                              </button>
                        </div>
                    </> 
              )}      
                {stepper.stepperAcitveSlide === 4 && (
                    <>    
                          <div className="basic_dte">  Basic Details</div>
                          <div className="edt">EDIT</div>
                          <div className="nameofsubtask"> Name of the sub task</div>
                          <div className="fillsheet"> Fill Subsheet for Form 283B</div>
                          <div className="associatlicense"> Associated License</div>
                          <div className="goodsservice">  Good and Service Tax</div>
                          <div className="associAtesubLicenses"> Associate Sub License</div>
                          <div className="goodform"> Goods Form</div>
                          <div className="activationDate">  License Activation Date</div>
                          <div className="apr">  14 Apr, 2021</div>
                          <div className="occurenceFreq">  Occurance/Frequency</div>
                          <div className="monty">Monthly</div>
                          <div className="compliDate">  Completion Date</div>
                          <div className="everyMonth"> 21st of every Month</div>
                          <div className="duedate">Due Date</div>
                          <div className="beforduedate">  3 days before due date</div>
                          <div className="tempduedate"> Temporary Due Date</div>
                          <div className="octnine">  16 Oct, 2021</div>

                          <div className="documentsLink">  Reference Documents & links</div>
                          <div className="docu">  Documents</div>
                          <div className="divfile">
                          <input
                            style={{ display: "none" }}
                            // accept=".zip,.rar"
                            ref={inputFile}
                            onChange={changeHandler}
                            type="file"
                          />

                            {isSelected ? (
                                    <div>
                                      <div className="FileNaming">Filename: {selectedFile.name}</div>
                                      {/* <p>Filetype: {selectedFile.type}</p>
                                      <p>Size in bytes: {selectedFile.size}</p>
                                      <p>
                                        lastModifiedDate:{' '}
                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                      </p> */}
                                    </div>
                                  ) : (
                                   <div className="empty"></div>
                                  )}

                          <AiFillFile onClick={handleSubmission} />
                           {/* <input  type="file"/>  */}
                            {/* <div className="pdftext">  GST Statement pt2.pdf</div> */}
                          </div>

                          <div className="goBackButton-2">
                              <button
                                onClick={() => handleStepClick(stepper.stepperAcitveSlide - 1)}
                                className="primary-button-4"
                              >
                                Go Back
                              </button>
                        </div>  
                        <div className="NextButton-2">   
                              <button
                                className="primary-button-4"
                              >
                                CONFIRMS & UPDATE DETAILS
                              </button>
                        </div><br/>
                        
                       
                    </> 
              )}  
            </Drawer>

      <div className="w-100 d-flex align-items-center">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Status</p>
        </div>
        <div className="col-6">
          <ToggleButton
            onChangeHandler={(value) => {
              // Action for toggle
            }}
          />
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Task added on </p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">March 03, 2021</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Task active from</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">March 03, 2021</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">latest updates on</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">May 16, 2021</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Last updated by</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">ashu kumar</p>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-4">
        <h6>Task Related Details</h6>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Frequency</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">Monthly</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Occurs on</p>
        </div>
        <div className="col-6 d-flex align-items-center">
          <p className="task-data__field-value">15th of every month</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Completion Date</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">15 Aug, 2021</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Due Date</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">12 Aug, 2021</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Grouped under</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">Good and Service Tax</p>
        </div>
      </div>
      <div className="col-6 col-md-12 mt-4">
        <button className="task-details__button task-details__button--outlined"
           onClick={() => setOpenRightTab(!openRightTab)}
        >
          edit details
        </button>
      </div>
   </div>
  );
};

export default TaskOverview;
