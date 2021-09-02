import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router";
import { AiOutlineClose } from "react-icons/ai";
import { MdCheckCircle } from "react-icons/md";
import "react-dropdown/style.css";
import "./style.css";
import StepperProgressIcon from "../../../../../assets/Icons/stepper-progress-cricle.svg";
import StepperCheckIcon from "../../../../../assets/Icons/check-icon-disable.svg";
import StepperCheckIconActive from "../../../../../assets/Icons/check-icon.svg";
const internalRolesData = [
  {
    id: 1,
    value: 5,
    label: "Team Member",
  },
  {
    id: 2,
    value: 0,
    label: "Super Admin",
  },
];
const AddEditUser = (props) => {
  const [stepper, setStepper] = useState({
    stepperAcitveSlide: 1,
    stepperCompletedSlides: [],
  });
  const [internalRoles, setInternalRoles] = useState([]);
  useEffect(() => {
    console.log(internalRoles);
  }, [internalRoles]);
  const [currentInternalRoleInput, setCurrentInternalRoleInput] = useState({});
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
  const handleInternalRolesInputChange = (e, type) => {
    const role = parseInt(e.target.value);
    if (!type) {
      setCurrentInternalRoleInput(
        internalRolesData.find((element) => element.value === role)
      );
    } else if (type && type === "selected") {
      console.log(role);
    }
  };
  const handleAddNewRole = () => {
    if (
      currentInternalRoleInput &&
      Object.keys(currentInternalRoleInput).length !== 0
    ) {
      if (
        internalRoles.findIndex(
          (element) => element.value === currentInternalRoleInput.value
        ) === -1
      ) {
        setInternalRoles([...internalRoles, currentInternalRoleInput]);
        setCurrentInternalRoleInput({});
      }
    }
  };
  // useEffect(() => {
  //   console.log(currentInternalRoleInput);
  // }, [currentInternalRoleInput]);
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
          <div className="col-md-12 mt-4">
            <h6 style={{ color: "#2c2738" }}>Internal Role Details</h6>
          </div>

          {/* ADD NEW ROLE INPUT */}
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-start">
              {/* Selected Roles List */}
              <div className="selected-roles-list w-100">
                {internalRoles &&
                  internalRoles.length !== 0 &&
                  internalRoles.map((selectedRole, index) => {
                    return (
                      <div className="selected-role my-2">
                        <label className="form-control-label">
                          Select Role {index !== 0 && index + 1}
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) =>
                            handleInternalRolesInputChange(e, "selected")
                          }
                        >
                          {internalRolesData.map((item) => {
                            return (
                              <option
                                key={item.id}
                                selected={selectedRole.value === item.value}
                                value={item.value}
                              >
                                {item.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    );
                  })}
              </div>
              {/* Select Internal Role Input */}
              <label className="form-control-label">
                Select Role{" "}
                {internalRoles.length !== 0 && internalRoles.length + 1}
              </label>
              <select
                className="form-control"
                onChange={handleInternalRolesInputChange}
              >
                <option
                  value=""
                  disabled
                  selected={Object.keys(currentInternalRoleInput).length === 0}
                >
                  Select Role
                </option>
                {internalRolesData.map((item) => {
                  return (
                    <option key={item.id} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
              {internalRoles.length < internalRolesData.length - 1 && (
                <button
                  className="stroke-button my-3"
                  onClick={() => handleAddNewRole()}
                  disabled={Object.keys(currentInternalRoleInput).length === 0}
                  style={{
                    opacity:
                      Object.keys(currentInternalRoleInput).length === 0
                        ? "0.6"
                        : "1",
                  }}
                >
                  add new role
                </button>
              )}
            </div>
          </div>
          {/* Certification Details */}
          <div className="col-md-12 mt-4">
            <h6>Certification Details</h6>
          </div>
          <div className="col-md-6">
            <label htmlFor="" className="form-control-label">
              Select Certification
            </label>
            <select id="certificate-validity" className="form-control">
              <option>License Compliance Check</option>
            </select>
          </div>
          <div className="col-md-6">
            <label
              htmlFor="certificate-validity"
              className="form-control-label"
            >
              Certificate Validity till
            </label>
            <select id="certificate-validity" className="form-control">
              <option>1 year</option>
            </select>
          </div>
          <div className="col-md-6">
            <label
              htmlFor="certificate-validity"
              className="form-control-label"
            >
              Date of Validity
            </label>
            <select id="certificate-validity" className="form-control">
              <option>1 year</option>
            </select>
          </div>
          <div className="col-md-12">
            <button className="stroke-button my-4 d-block">
              add new cirtification
            </button>
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
            <div className="col-md-6 mx-0 px-0">
              <label
                htmlFor="license-expertise"
                className="form-control-label mt-2"
              >
                License Expertise
              </label>
              <select id="license-expertise" className="form-control px-0">
                <option disabled selected>
                  Select a license
                </option>
                <option>NSE</option>
              </select>
              <button className="stroke-button mt-3 px-0">
                add new license
              </button>
            </div>
          </div>
          <div className="col-12 mt-5">
            <h6>Associated Client Details</h6>
            <div className="col-md-6 mx-0 px-0">
              <label
                htmlFor="license-expertise"
                className="form-control-label mt-2"
              >
                Add a client
              </label>
              <select id="license-expertise" className="form-control px-0">
                <option disabled selected>
                  Select client to allocate
                </option>
                <option>NSE</option>
              </select>
              <button className="stroke-button mt-3 px-0">
                add a new client
              </button>
            </div>
          </div>
          <div className="col-12 mt-5">
            <button className="primary-button primary-button--outlined mr-3">
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
            <p className="review-details__text">Expert Reviwer</p>
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
          <div className="col-12">
            <button
              className="primary-button mt-3 d-block"
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
