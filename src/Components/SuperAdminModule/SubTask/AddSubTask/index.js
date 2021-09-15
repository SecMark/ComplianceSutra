import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "../../../../CommonModules/sharedComponents/Stepper";
import AddBasicDetials from "./AddBasicDetails";
import AddReferences from "./AddReferences";
import { setSubTaskName } from "../AddSubTask/redux/actions";
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
      text: "Add References",
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
    subTaskName: "Quaterly review of Stock Exchnage",
  });
  const [state, setState] = useState({
    files: [],
    changedFileIndex: -1,
  });
  const [referencesLinks, setReferencesLinks] = useState({
    linksList: [],
    linkInput: "",
  });
  const handleLinkAddMore = () => {
    if (referencesLinks.linkInput !== "" && isURL(referencesLinks.linkInput)) {
      setReferencesLinks({
        ...referencesLinks,
        linksList: [...referencesLinks.linksList, referencesLinks.linkInput],
        linkInput: "",
      });
    }
  };

  const fileUpload = (e) => {
    let changedFile = e.target.files[0];
    let uploadedFiles = e.target.files;

    if (state.changedFileIndex >= 0) {
      setState((prevState) => {
        const list = [];
        prevState.files.map((file, i) => {
          if (i === prevState.changedFileIndex) list.push(changedFile);
          else list.push(file);
        });
        return {
          files: list,
          changedFileIndex: -1,
        };
      });
    } else if (state.files.length > 0) {
      setState((prevState) => {
        return { files: [...prevState.files, ...uploadedFiles] };
      });
    } else setState({ files: [...e.target.files] });
  };

  const handleValueSubmit = () => {
    actionDispatch(setSubTaskName(basicDetails.subTaskName));
  };
  const handleChnageBasicDetails = (e) => {
    const value = e.target.value;
    setBasicDetails({ ...basicDetails, [e.target.name]: value });
  };
  const handleNextClick = (step) => {
    handleValueSubmit();
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
  return (
    <div>
      <h1 className="SubTask-heading">ADD New SubTask Details</h1>
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
          <AddReferences
            state={state}
            referencesLinks={referencesLinks}
            setReferencesLinks={setReferencesLinks}
            handleLinkAddMore={handleLinkAddMore}
            fileUpload={fileUpload}
          />
        )}
        {stepper.stepperAcitveSlide === 3 && <div>hello 2</div>}
      </div>
      {stepper.stepperAcitveSlide === 2 && (
        <button
          className="SuTask-button-goback"
          onClick={() => handlePreviousClick(stepper.stepperAcitveSlide)}
        >
          Back
        </button>
      )}

      <button
        className="SuTask-button"
        onClick={() => handleNextClick(stepper.stepperAcitveSlide)}
      >
        NEXT
      </button>
    </div>
  );
}

export default AddSubTask;
