import React, { useState } from 'react';
import "./style.css";
import StepperProgressIcon from "../../../../src/assets/Icons/stepper-progress-cricle.png";
import StepperCheckIcon from "../../../../src/assets/Icons/check-icon-disable.png";
import StepperCheckIconActive from "../../../../src/assets/Icons/check-icon.png";
import Drawer from "../../../CommonModules/sharedComponents/Drawer"
import Stepper from '../../../CommonModules/sharedComponents/Stepper';
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import  DatePicker  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import plusIcon from "../../../../src/assets/Icons/plusIcon.png"
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {AiOutlineCalendar} from "react-icons/ai"
import {AiFillFile} from "react-icons/ai"
import searchIcon from "../../../../src/assets/Icons/searchIcon.png";
import Dropdown from "react-dropdown";
import {AiOutlinePlus} from "react-icons/ai";
import {AiFillInfoCircle} from "react-icons/ai";
import {AiOutlineUp} from "react-icons/ai";
import {AiOutlineDown} from "react-icons/ai";
import {AiOutlineSearch} from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux";
import quiz1 from "../../../../src/assets/Images/quiz1.png"
import quiz2 from "../../../../src/assets/Images/quiz2.png"
import quiz3 from "../../../../src/assets/Images/quiz3.png"
import quiz4 from "../../../../src/assets/Images/quiz4.png"

const Circular = () =>{
    
  
    const [sortBy, setSortBy] = useState("Alphabatically");
    const [openRightTab, setOpenRightTab] = useState(true);

    const dropdownlist = ["item1", "item2", "item3"]
    const [firstdropdown, setFirstdropdown] = useState("I am the first!");
    const [seconddropdown, setSeconddropdown] = useState("I am the first!");
    const [thirddropdown, setThirddropdown] = useState("I am the first!");
    const [fourthdropdown, setFourthdropdown] = useState("I am the first!");

    const [addData, setVal] = useState("");
    const [addedData, showData] = useState(0);
    const handleChange  = (e, editor) =>{
      const data  = editor.getData();
      setVal(data);
    }

    // const [openRightTab, setOpenRightTab] = useState(true);
    // const [sortBy, setSortBy] = useState("Addtional Date");
    
    const actionDispatch = useDispatch();
    const filterOptions = [
      { value: "0", label: "None" },
      { value: "1", label: "All Circulars" },
      // { value: "5", label: "Approvers" },
      // { value: "3", label: "CO" },
      // { value: "az", label: "A > Z" },
      // { value: "za", label: "Z > A" },
    ];

  const userList = useSelector((state) => state.userList.userList);
  const [collapse, setCollapse] = useState(userList); 
  const openCloseCollapsible = (index) => {
    let list = [...collapse];
    if (collapse[index].open === false) {
      list &&
        list.map((item, key) => {
          if (key === index) {
            list[index].open = true;
          } else {
            list[key].open = false;
          }
        });
      setCollapse(list);
    } else {
      let list = [...collapse];
      list &&
        list.map((item, key) => {
          if (key === index) {
            list[index].open = false;
          } else {
            list[key].open = false;
          }
        });
      setCollapse(list);
    }
  };
  const [collaps, setCollaps] = useState(userList); 
  const openCloseCollapsibl = (index) => {
    let list = [...collaps];
    if (collaps[index].open === false) {
      list &&
        list.map((item, key) => {
          if (key === index) {
            list[index].open = true;
          } else {
            list[key].open = false;
          }
        });
      setCollaps(list);
    } else {
      let list = [...collaps];
      list &&
        list.map((item, key) => {
          if (key === index) {
            list[index].open = false;
          } else {
            list[key].open = false;
          }
        });
      setCollaps(list);
    }
  };

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
                                   Create a Quiz
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
                                <p className="stepper-detail stepper-text--right position-absolute">
                                  Review Details & Confirm
                                </p>
                              )}
                          </div>
                      </div>
      
                  {stepper.stepperAcitveSlide === 1 && (
                    <>
                        <div className="BasicDetails">Basic Details</div>
                        <div className="DI">Date of issuance </div>
                        <div class="">
                            <div className="Date">
                              {/* <DatePicker
                               selected={startDate}
                               onChange={(date) => setStartDate(date)} 
                               dateFormat="dd/MM/yyyy"
                               isClearable
                              placeholderText="Select Date"
                              type="date"
                              /> */}

                             <Datepicker
                                    // value={state.HistoryReducer.from}
                                    name="from"
                                    dispatch={actionDispatch}
                                    actionType="SELECT_FROM_DATE"
                                   
                              /> 

            
                      
                              {/* 
                               <div className="cal">
                                   <AiOutlineCalendar />
                              </div>  */}
                           
                          {/* <div className="img" alt="calendar">
                                <img src={calendar}/>  
                          </div>  */}

                            </div>
                            </div>                           
                        <div className="UI">Update issued by</div>
                        <div class="Rectangle-2">
                                
                        <select className="dropdemo"
                                // id="first"
                                value={thirddropdown}
                                onChange={e=> setThirddropdown(e.target.value)}
                                onBlur={e=> setThirddropdown(e.target.value)}
                                disabled={!dropdownlist.length}>
                                  <option>Goods and Service Tax</option>
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
                        <div className="plusicon-3">
                          <AiFillPlusCircle/>
                        </div>
                        <div className="add-3">
                    
                           Add New File</div>
                        
                        <div className="LD">  License Related Details</div>

                        <div className="License-impacted-by-Circular">License impacted by Circular</div>
                             
                        <div class="Rectangle-2">
                        <select className="secondrop"
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
                        <select className="thirdrop"
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

                            <div className="plusicon">
                            <AiFillPlusCircle />
                            </div>
                            <div className="add">
                                Add New License
                            </div>

                            <div className="plusicon-1">
                                <AiFillPlusCircle /></div>
                            <div class="add-1">
                                  Add Sub license
                            </div>  
                            <div className="plusicon-2">
                                <AiFillPlusCircle /></div>
                            <div className="add-2">
                                  Add Subtask
                            </div>  

                             <div className="Faskque">  Frequently Asked Questions </div>   
                             <div className="questionOne">  Question 01</div> 
                             <div className="takeque">
                                    <input
                                    type="text"
                                    className="form-control"
                                    // placeholder="Type your question here "
                                  />
                             </div>  
                             <div className="answerOne">Answer</div>
                              <div className="takeans">
                                     <textarea ></textarea>
                              </div> 
                              <div className="plusicon-8">
                                <AiFillPlusCircle /></div>
                            <div className="add-5">
                                  Add New FQA
                            </div>  

                        <br></br>
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
                        </div>
                      </> 
                  )}


                  {/* SeconStepper */}

            {stepper.stepperAcitveSlide === 2 && (
              <>
                    <div class="Rectangle-4564">
                      <div className="Examalationicon">
                        <AiOutlineInfoCircle />
                      </div>
                        <div className="Please-add-atleast-5-questions">
                         Please add atleast 5 questions
                        </div>
                    </div>

                    <div className="Signup">
                      Quiz Details
                    </div>

                    <div className="Question-01">
                      Question 01
                    </div>

                   
                        <div className=""> </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type your question here "
                          />

                        <div className="Option-A">
                          Option A
                        </div>

                        <div className="Option-B">
                          Option B
                        </div>

                            <input
                                          type="text"
                                          className="form-control-quize"
                                          placeholder="Type the topic here"
                            />

                            <input
                                          type="text"
                                          className="form-control-quize-1"
                                          placeholder="Type the topic here"
                            />

                        <div className="Option-C">
                          Option C
                        </div>

                        <div className="Option-D">
                          Option D
                        </div>

                            <input
                                          type="text"
                                          className="form-control-quize-2"
                                          placeholder="Type the topic here"
                            />

                            
                            <input
                                          type="text"
                                          className="form-control-quize-3"
                                          placeholder="Type the topic here"
                            />                                              
                        <div className="Correct-Answer">
                          Correct Answer
                        </div> 
                        <select className="fourthdrop"
                                // id="first"
                                value={fourthdropdown}
                                onChange={e=> setFourthdropdown(e.target.value)}
                                onBlur={e=> setFourthdropdown(e.target.value)}
                                disabled={!dropdownlist.length}>
                                  <option>Option B</option>
                                 
                        </select>
                  
                        <div className="plusicon-4">
                            <AiFillPlusCircle />
                        </div>
                        <div className="ANQ"> Add New Question</div>
                     
                        <div className="col-12 mt-5">
                              <button
                                className="goBackButton"
                                onClick={() => handleStepClick(stepper.stepperAcitveSlide - 1)}
                              >
                                Go Back
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

                   {stepper.stepperAcitveSlide === 3 && (
                    <>
                 
                        <div className="BSD"> Basic Details</div>
                        <div className="edit-1">  EDIT</div>
                        <div className="DateofIssuance"> Date of Issuance
                          <div className="aug"> Aug 24, 2021 -  </div>
                        </div>
                        <div className="UpdatedIssue">   Update Issued by
                        </div>
                        <div className="NSE">   National Stock Exchange  </div>
                        <div className="LinkofCircular">Link of the Circular 
                        </div> 
                        <div className="Link-1"> https://www.nseindia.com/regulation...  </div> 
                        <div className="CircularNumber">Circular Number
                        </div> 
                        <div className="NSENumber">   NSE/2021/0017  </div>

                        <div className="CUD"> Circular Details</div>
                        <div className="TitleofCircular">Title of the Circular
                        </div> 
                        <div className="Relax">  Relaxation in GST related Regulatory Compliance</div>
                        <div className="GO">Gist/Overview
                        </div>
                        <div className="LO">  Lorem Ipsum</div>
                        <div className="ACD"> Associated Circular Documents
                        </div>


                          <div className="pdf">
                          {/* <input type="file"/> */}
                          <AiFillFile />
                          </div>


                          
                        {/* Pending of pdf here */}

      
                        <div className="LRD">License Related Details</div>
                        <div className="edit-2">  EDIT</div>
                        <div className="AL">Associated License
                        </div>
                        <div className="NSE-1">   National Stock Exchange  </div>
                        <div className="AS">Associated Sublicense
                        </div>
                        <div className="na-1"> NA  </div>
                        <div className="AST">Associated Subtask
                        </div>
                        <div className="na-2"> NA  </div>

                        <div className="QD">Quiz Detils</div>
                        <div className="edit-3">  EDIT</div>
                        <div className="Q">Question 1
                        </div>
                        <div className="Q-1">How do you know that Complaince has been filled correctly?</div>
                        <div className="option-1">Option a</div>
                        <div className="SE">Success Emails</div>
                        <div className="option-2">Option b</div>
                        <div className="PS">  Portal Status changes to green</div>
                        <div className="AW">Answer</div>
                        <div className="option-3">Option c</div>
                        <div className="MOM">  Message on Mobile</div>
                        <div className="option-4">Option d</div>
                        <div className="NR">  No Response</div>
                        
                        
                        
                        <button
                                className="goBackButton"
                                onClick={() => handleStepClick(stepper.stepperAcitveSlide - 1)}
                              >
                                Go Back
                          </button>

                           <button
                                className="confirmcircular"
                                // onClick={() => handleStepClick(stepper.stepperAcitveSlide - 1)}
                              >
                               CONFIRM AND ADD CIRCULAR
                          </button>                        
                   </>
                   )}         
          </Drawer>  


          {/* circular managment dashboard */}



          <div className="row">
      <div className="col-md-12">
        <div className="Super-admin-main">
          <div className="row">
            <h4 className="mt-2">
              <span className="ml-1">License Management</span>
            </h4>
            <div className="Super-admin-search-input">
              <div className="input-group">
                {/* <img
                  className="IconGray"
                  src={searchIcon}
                  alt="search Icon"
                  style={{
                    position: "absolute",
                    left: "0px",
                    zIndex: "999",
                    top: "5px",
                  }}
                /> */}
                <div className="searchico">
                <AiOutlineSearch/>
                </div>
                <input
                  
                  className="pl-4 license-search"
                  placeholder="Search for license"
                />
              </div>
            </div>
          </div>
                            
                  <div className="Super-admin-task-statics row mt-4">
                    {/* <h6 className="mt-2">
                      <span className="ml-1">Active Licenses</span>
                      <div className="license-management-title-progress"></div>
                    </h6>
                    <h6 className="mt-2">
                      <span className="ml-4">Industry Type</span>
                      <div className=""></div>
                    </h6> */}
                    <h6 className="mt-2">
                      <span className="ml-4">Circular Management</span>
                      <div className=""></div>
                    </h6>
                  </div>

              <div className="row">
                        {sortBy === "Roles" && (
                          <div className="col-md-4">
                            <div className="col mt-3">
                              <div className="row">
                                <span className="mt-2 ml-2 mt-2">Show:</span>
                                <select
                                  className="form-select ml-2"
                                  style={{
                                    width: "200px",
                                    height: "40px",
                                    padding: "5px",
                                  }}
                                >
                                  <option selected>All Results</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                          <div
                              className="col d-flex mt-4 mb-4 show-options"
                              style={{ justifyContent: "space-between" }}
                          >

                              <div className="d-flex">
                                  <span className="mt-1">show:</span>
                                  <Dropdown
                                    arrowClosed={<span className="arrow-closed" />}
                                    arrowOpen={<span className="arrow-open" />}
                                    placeholder="Select an option"
                                    options={filterOptions}
                                    className="ml-2"
                                  />
                                </div>

                                <div className="sort-by-filter">
                                  <span
                                    className="sort-by add-btn"
                                    onClick={() => setOpenRightTab(!openRightTab)}
                                  >
                                    <AiOutlinePlus size={18} className="m-1 add-new-button" />
                                    ADD CIRCULAR
                                  </span>
                                  <span className="sort-by ml-4">Sort by</span>
                                  <span
                                      className={
                                        sortBy == "Addtional Date"
                                          ? "sort-filter-active"
                                          : "sort-filter-inactive"
                                      }
                                      onClick={() => setSortBy("Addtional Date")}
                                    >
                                      Addtional Date
                                  </span>
                                  <span
                                        className={
                                          sortBy == " Licenses"
                                            ? "sort-filter-active"
                                            : "sort-filter-inactive"
                                        }
                                        onClick={() => setSortBy(" Licenses")}
                                      >
                                        Licenses
                                  </span>

                                  
                                </div>
                          </div>
                    </div>
                                
                                <div className="Goods-Service">Goods and Service Tax
                                </div> 
                                <div className="AIOUT">
                                        <AiFillInfoCircle/>
                                </div> 
                                <div className="gst">GST</div>    
                          <div className="row-1">
                            <div className="ste">STATUS</div>
                            <div className="AL-1">DATE</div>
                            <div className="AL-2">ASSOCIATED LICENSES</div>
                            <div className="to">TOPIC</div>
                            <div className="CIR">CIRCULAR NAME</div>
                            <div className="QUZ">QUIZE COMPLETATION STATUS</div>
                          </div>
                      
                         <div className="slid-1">               
                            <tr>
                              <td align="left">
                                <span class="check-box">
                                  <label className="switch">
                                    <input type="checkbox" value="true" />
                                    <span className="slider"></span>
                                  </label>
                                </span>
                                <div className="date-1"> 29 May'21</div>
                                <div className="ASS-1">GST</div>
                                <div className="ASS-2">MCDX</div>
                                <div className="topic-1"> GST 35 Circular</div>
                                <div className="circularname-1">Aakash Singal requested for Leave Migration</div>
                                <div className="im1"><img src={quiz1}/></div>
                                <div className="arrow-1">{">"}</div>
                              </td>  
                            </tr>
                        </div>
                        <div className="slid-2">
                            <tr>
                              <td align="left">
                                <span class="check-box">
                                  <label className="switch">
                                    <input type="checkbox" value="true" />
                                    <span className="slider"></span>
                                  </label>
                                </span>
                                <div className="date-2">  29 May'21</div>
                                <div className="ASS-1">BSE</div>
                                <div className="topic-2"> Compliance</div>
                                <div className="circularname-2">Relaxation in Regulatory Compliance</div>
                                <div className="im2"><img src={quiz2}/></div>
                                <div className="arrow-2">{">"}</div>
                              </td>  
                            </tr>
                        </div>
                        <div className="slid-3">
                            <tr>
                              <td align="left">
                                <span class="check-box">
                                  <label className="switch">
                                    <input type="checkbox" value="true" />
                                    <span className="slider"></span>
                                  </label>
                                </span>
                                <div className="date-3">   03 May'21</div>
                                <div className="ASS-1">NSE</div>
                                <div className="ASS-2">BSE</div>
                                <div className="topic-3"> Claims </div>
                                <div className="circularname-3"> NSE BSE policy for evaluation of Claims </div>
                                <div className="im3"><img src={quiz3}/></div>
                                <div className="arrow-3">{">"}</div>
                              </td>  
                            </tr>
                        </div>
                        <div className="slid-4">
                            <tr>
                              <td align="left">
                                <span class="check-box">
                                  <label className="switch">
                                    <input type="checkbox" value="true" />
                                    <span className="slider"></span>
                                  </label>
                                </span>
                                <div className="date-4"> 29 Apr'21</div>
                                <div className="ASS-1">PMS</div>
                                <div className="ASS-2">MCDX</div>
                                <div className="topic-4">   Allotment</div>
                                <div className="circularname-4">  Multiple UCC allotted to clients</div>
                                <div className="im4"><img src={quiz4}/></div>
                                <div className="arrow-4">{">"}</div>
                              </td>  
                            </tr>
                        </div>
                          <div className="collap">                
                                  <h6> National Stock Exchange</h6>
                                  <div className="ns">NSE</div>
                              <div className="colla">
                                        {collapse && collapse[1] && collapse[1].open ? (
                                          <AiOutlineUp
                                            size={12}
                                            color="#000000"
                                            onClick={() => openCloseCollapsible(1)}
                                            style={{ cursor: "pointer" }}
                                          />
                                        ) : (
                                          <AiOutlineDown
                                            size={12}
                                            color="#000000"
                                            onClick={() => openCloseCollapsible(1)}
                                            style={{ cursor: "pointer" }}
                                          />
                                        )}

                                        {collapse && collapse[1] && collapse[1].open && (
                                                
                                                  <h1>NSE</h1>
                                        )}    
                                </div>
                          </div>

                          <div className="collap-1">                
                                  <h6> Bombay Stock Exchange</h6>
                                  <div className="bs">BSE</div>
                              <div className="colla-1">
                                        {collaps && collaps[2] && collaps[2].open ? (
                                          <AiOutlineUp
                                            size={12}
                                            color="#000000"
                                            onClick={() => openCloseCollapsibl(2)}
                                            style={{ cursor: "pointer" }}
                                          />
                                        ) : (
                                          <AiOutlineDown
                                            size={12}
                                            color="#000000"
                                            onClick={() => openCloseCollapsibl(2)}
                                            style={{ cursor: "pointer" }}
                                          />
                                        )}

                                        {collaps && collaps[2] && collaps[2].open && (
                                                
                                                  <h1>BSE</h1>
                                        )}    
                                </div>
                          </div>
                          <div className="collap-2">                
                                  <h6> Generic Licenses</h6>
                              <div className="colla-2">
                                        {collaps && collaps[3] && collaps[3].open ? (
                                          <AiOutlineUp
                                            size={12}
                                            color="#000000"
                                            onClick={() => openCloseCollapsibl(3)}
                                            style={{ cursor: "pointer" }}
                                          />
                                        ) : (
                                          <AiOutlineDown
                                            size={12}
                                            color="#000000"
                                            onClick={() => openCloseCollapsibl(3)}
                                            style={{ cursor: "pointer" }}
                                          />
                                        )}

                                        {collaps && collaps[3] && collaps[3].open && (
                                                
                                                  <h1>GL</h1>
                                        )}    
                                </div>
                          </div>
                          <div className="dumy"> RBI, SEBI updated would come in this Section upon sorting</div>

                        
        </div>  
      </div>
    </div>





                 
      </div>
    );
};

export default Circular

