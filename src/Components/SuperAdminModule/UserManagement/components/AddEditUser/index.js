import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router";
import { AiOutlineClose } from "react-icons/ai";
import "./style.css";
import StepperProgressIcon from "../../../../../assets/Icons/stepper-progress-cricle.svg";
import StepperCheckIcon from "../../../../../assets/Icons/check-icon-disable.svg";
import StepperCheckIconActive from "../../../../../assets/Icons/check-icon.svg";
import SelectDataDropdown from "./SelectDataDropown";
import CertificationsDropdown from "./CertificationsDropdown";
import {
  internalRolesData,
  reviewerExpertiesList,
  associatedClientsList,
} from "./data";
const AddEditUser = (props) => {
  const [stepper, setStepper] = useState({
    stepperAcitveSlide: 1,
    stepperCompletedSlides: [],
  });
  const [internalRoles, setInternalRoles] = useState([]);
  const [currentInternalRoleInput, setCurrentInternalRoleInput] = useState({});
  const [certifications, setCertifications] = useState([]);
  const [currentCertificationInput, setCurrentCertificationInput] = useState(
    {}
  );
  const [reviewerExperties, setReviewerExperties] = useState([]);
  const [reviewerExpertiseInput, setReviewerExpertiesInput] = useState({});
  const [associatedClients, setAssociatedClients] = useState([]);
  const [associatedClientsInput, setAssociatedClientsInput] = useState({});
  useEffect(() => {
    console.log(currentCertificationInput);
  }, [currentCertificationInput]);
  useEffect(() => {
    console.log(currentInternalRoleInput);
  }, []);
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
    <div className="spacing">
      <div className="row">
        <div className="col-md-12">
          <AiOutlineClose
            size={20}
            style={{ fontWeight: "bold" }}
            onClick={() => props.onCloseTab()}
          />
          <div style={{ height: 20 }}></div>
          <h3 style={{ color: "#2c2738" }}>Add New Team Member</h3>
          <hr />
          {/* Progress Bar Over Here */}
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
                <p className="stepper-text stepper-text--left position-absolute">
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
                <p className="stepper-text stepper-text--center position-absolute">
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
        </div>
      </div>
      {stepper.stepperAcitveSlide === 1 && (
        <div className="row">
          <div className="col-md-12">
            <h6 style={{ color: "#2c2738" }}>Personal Details</h6>
          </div>
          <div className="col-md-6">
            <label className="form-control-label">Team Member's Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Full Name"
            />
          </div>
          <div className="col-md-6">
            <label className="form-control-label">Email ID</label>
            <div className="d-flex">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email ID"
                style={{
                  borderRadius: "0px",
                }}
              />
              <select
                className="form-control"
                style={{
                  borderLeft: "1px solid #f1f1f1",
                  borderRadius: "0px",
                }}
              >
                <option>@secmark.in</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-control-label">Mobile No.</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Mobile No"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="10"
            />
          </div>
          <div className="col-md-6">
            <label className="form-control-label">
              Current Address Pincode
            </label>
            <div className="d-flex justify-content-between">
              <input
                type="number"
                className="form-control mr-2"
                placeholder="6 Digits"
                style={{ width: "100px" }}
              />
              <select className="form-control">
                <option value="" disabled={true} selected={true}>
                  City, State
                </option>
                <option value="">New Delhi, Delhi</option>
                <option value="">Uttrakhand</option>
              </select>
            </div>
          </div>
          {/* Internal Roles Details */}
          <div className="col-md-12 mt-4">
            <h6 style={{ color: "#2c2738" }}>Internal Role Details</h6>
          </div>
          <SelectDataDropdown
            options={internalRolesData}
            selectedList={internalRoles}
            setSelectedList={setInternalRoles}
            currentInput={currentInternalRoleInput}
            setCurrentInput={setCurrentInternalRoleInput}
            labelText="Select Role"
            addNewButtonText="add new role"
            deleteButtonText="delete role"
          />
          {/* Certification Details */}
          <div className="col-md-12 mt-4">
            <h6>Certification Details</h6>
          </div>
          <CertificationsDropdown
            certifications={certifications}
            setCertifications={setCertifications}
            currentCertificationInput={currentCertificationInput}
            setCurrentCertificationInput={setCurrentCertificationInput}
          />
          <div className="col-md-12">
            <button
              className="primary-button mt-3 d-block"
              onClick={() =>
                setStepper({
                  ...stepper,
                  stepperAcitveSlide: 2,
                  stepperCompletedSlides: [
                    ...stepper.stepperCompletedSlides,
                    1,
                  ],
                })
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
      {stepper.stepperAcitveSlide === 2 && (
        <div className="row">
          <div className="col-12">
            <h6>Reviewer's Expertise Details</h6>
          </div>
          <SelectDataDropdown
            options={reviewerExpertiesList}
            selectedList={reviewerExperties}
            setSelectedList={setReviewerExperties}
            currentInput={reviewerExpertiseInput}
            setCurrentInput={setReviewerExpertiesInput}
            labelText="Select License Expertise"
            addNewButtonText="add new license"
            deleteButtonText="delete license"
          />
          <div className="col-12 mt-5">
            <h6>Associated Client Details</h6>
          </div>
          <SelectDataDropdown
            options={associatedClientsList}
            selectedList={associatedClients}
            setSelectedList={setAssociatedClients}
            currentInput={associatedClientsInput}
            setCurrentInput={setAssociatedClientsInput}
            labelText="select client"
            addNewButtonText="add new client"
            deleteButtonText="delete client"
          />
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
        </div>
      )}
      {stepper.stepperAcitveSlide === 3 && (
        <div class="row">
          <div className="col-12 mb-3">
            <div className="d-flex align-items-center">
              <h5 className="mb-0">Personal Details</h5>
              <button className="stroke-button ml-auto">edit</button>
            </div>
          </div>
          <div className="col-6">
            <p className="review-details__text review-details__text--label">
              Team member's Name
            </p>
          </div>
          <div className="col-6">
            <p className="review-details__text">Krishna Kumar</p>
          </div>

          <div className="col-6">
            <p className="review-details__text review-details__text--label">
              Mobile Number
            </p>
          </div>
          <div className="col-6">
            <p className="review-details__text">9599182599</p>
          </div>

          <div className="col-6">
            <p className="review-details__text review-details__text--label">
              Email ID
            </p>
          </div>
          <div className="col-6">
            <p className="review-details__text">krishna.k@secmark.in</p>
          </div>

          <div className="col-6">
            <p className="review-details__text review-details__text--label">
              Address
            </p>
          </div>
          <div className="col-6">
            <p className="review-details__text">120201, Surat, Gujarat</p>
          </div>
          <div className="col-12 my-3">
            <div className="d-flex align-items-center">
              <h5 className="mb-0">Internal Role Details</h5>
              <button className="stroke-button ml-auto">edit</button>
            </div>
          </div>
          <div className="col-6">
            <p className="review-details__text review-details__text--label">
              Role 1
            </p>
          </div>
          <div className="col-6">
            <p className="review-details__text">Content Manager</p>
          </div>
          <div className="col-6">
            <p className="review-details__text review-details__text--label">
              Role 2
            </p>
          </div>
          <div className="col-6">
            <p className="review-details__text">Expert Reviewer</p>
          </div>
          <div className="col-12 my-3">
            <div className="d-flex align-items-center">
              <h5 className="mb-0">Certification Details</h5>
              <button className="stroke-button ml-auto">edit</button>
            </div>
          </div>
          <div className="col-6">
            <p className="review-details__text review-details__text--label">
              Certificate 1
            </p>
          </div>
          <div className="col-6">
            <p className="review-details__text">
              GST Validation (valid till 12 Mar, 2021)
            </p>
          </div>
          <div className="col-12 my-3">
            <div className="d-flex align-items-center">
              <h5 className="mb-0">Reviewer's Expertise Details</h5>
              <button className="stroke-button ml-auto">edit</button>
            </div>
          </div>
          <div className="col-6">
            <p className="review-details__text review-details__text--label">
              Licenses
            </p>
          </div>
          <div className="col-6">
            <p className="review-details__text">
              Good and Service tax (GST)
              <br />
              National Stock Exchange (NSE)
              <br />
              Bombay Stock Exchange (BSE)
            </p>
          </div>
          <div className="col-12 d-flex align-items-center mt-4">
            <button
              className="primary-button primary-button--outlined mr-3"
              onClick={() => handleStepClick(stepper.stepperAcitveSlide - 1)}
            >
              go back
            </button>
            <button
              className="primary-button"
              onClick={() => setStepper({ ...stepper, stepperAcitveSlide: 3 })}
            >
              confirm & add member
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(AddEditUser);
