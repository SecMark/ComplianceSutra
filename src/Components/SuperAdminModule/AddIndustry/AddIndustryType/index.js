import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "../../../../CommonModules/sharedComponents/Stepper";
import AddBasicDetials from "./AddBasicDetails";
import AddAssociateLicence from "./AddAssociateLicence";
import ReviewAndConfirm from "./ReviewAndConfirm";
import {
  setIndustryName,
  setAssociateLicense,
  setShortDescription
} from "../AddIndustryType/redux/actions";
import isURL from "validator/lib/isURL";
function AddSubTask() {
  const actionDispatch = useDispatch();
  const steps = [
    {
      id: 1,
      text: "Add Basic Details",
    },
    {
      id: 2,
      text: "Add Associated Licenses",
    },
    {
      id: 3,
      text: "Review Details & Confirm",
    },
  ];

  const [stepper, setStepper] = useState({
    stepperAcitveSlide: 1,
    stepperCompletedSlides: [],
  });
  const [basicDetails, setBasicDetails] = useState({
    industryName: "Credit Rating",
    shortDescription:"write the industries type description here"
  });

  const [dopdownValues, setDropDownVqalue] = useState([]);
  const [dropdata, setdropData] = useState([]);
  
  const onDropdownChange = (selectedOptions) => {
    let licarray = [];
    selectedOptions.forEach((element) => {
      licarray.push(element.value);
    });
    setDropDownVqalue(licarray);
  };
  const handleValueSubmit = () => {
    actionDispatch(setIndustryName(basicDetails.industryName));
    actionDispatch(setShortDescription(basicDetails.shortDescription))
  };
  const handleChnageBasicDetails = (e) => {
    const value = e.target.value;
    setBasicDetails({ ...basicDetails, [e.target.name]: value });
  };

  const hanndleAssociateLicense = () => {
    actionDispatch(setAssociateLicense(dopdownValues));
    var data = [];
    dopdownValues.forEach(
      (v, i) => (data = [...data, { label: dopdownValues[i], value: v }])
    );
    setdropData(data);
  };
  const handleNextClick = (step) => {
    handleValueSubmit();
    if (stepper.stepperAcitveSlide === 2) {
      hanndleAssociateLicense();
    }
    if (step) {
      setStepper({
        ...stepper,
        stepperAcitveSlide: step + 1,
        stepperCompletedSlides: [...stepper.stepperCompletedSlides, step],
      });
    }
  };

  const handlePreviousClick = (step) => {
    if (step) {
      setStepper({
        ...stepper,
        stepperAcitveSlide: step - 1,
        stepperCompletedSlides: [...stepper.stepperCompletedSlides, step - 1],
      });
    }
  };
  const handleEditBasicClick = (step) => {
    if (step) {
      setStepper({
        ...stepper,
        stepperAcitveSlide: step - 2,
        stepperCompletedSlides: [...stepper.stepperCompletedSlides, step - 2],
      });
    }
  };
  return (
    <div>
      <h1 className="SubTask-heading">Add New Industry Type</h1>
      <div className="cs-drawer__horizontal-line"></div>
      <div className="mt-4">
        <Stepper steps={steps} stepper={stepper} setStepper={setStepper} />
      </div>
      <div>
        {stepper.stepperAcitveSlide === 1 && (
          <AddBasicDetials
            basicDetails={basicDetails}
            handleChnageBasicDetails={handleChnageBasicDetails}
          />
        )}
        {stepper.stepperAcitveSlide === 2 && (
          <AddAssociateLicence
            dopdownValues={dopdownValues}
            onDropdownChange={onDropdownChange}
            dropdata={dropdata}
          />
        )}
        {stepper.stepperAcitveSlide === 3 && (
          <ReviewAndConfirm
            handleEditBasicClick={handleEditBasicClick}
            handlePreviousClick={handlePreviousClick}
          />
        )}
      </div>
      {stepper.stepperAcitveSlide === 2 && (
        <button
          className="SuTask-button-goback"
          onClick={() => handlePreviousClick(stepper.stepperAcitveSlide)}
        >
          Back
        </button>
      )}
      {stepper.stepperAcitveSlide === 1 || stepper.stepperAcitveSlide === 2 ? (
        <button
          className="SuTask-button"
          onClick={() => handleNextClick(stepper.stepperAcitveSlide)}
        >
          NEXT
        </button>
      ) : (
        <button className="Industry__addConfirm_button">
          Confirm And Add New License
        </button>
      )}
    </div>
  );
}

export default AddSubTask;
