import React from "react";
import "../style.css";

const SALicenseSummary = ({
  basicDetails,
  setStepper,
  stepper,
  subTasks,
  color,
}) => {
  return (
    <div>
      <div className="DetailsEdit">
        <div>
          <h5>Basic Details</h5>
          <button
            onClick={() =>
              setStepper({
                ...stepper,
                stepperAcitveSlide: 1,
                stepperCompletedSlides: [
                  ...stepper.stepperCompletedSlides,
                  stepper.stepperAcitveSlide,
                ],
              })
            }
          >
            Edit
          </button>
        </div>
        <div className="DetailsContainer">
          <div>
            <p className="DetailsLabel">License Name</p>
            <p
              style={{
                color: color,
              }}
            >
              {basicDetails.nameOfLicense}({basicDetails.licenseAcronym}){" "}
            </p>
          </div>
          <div>
            <p className="DetailsLabel">Industry Type</p>
            <p id="IndustryTypeEdit">
              {basicDetails.industryType.map((e) => {
                return <span style={{ marginRight: "8px" }}>{e},</span>;
              })}
            </p>
          </div>
          <div>
            <p className="DetailsLabel">Applicable Country</p>
            <p>{basicDetails.countryName}</p>
          </div>
          <div>
            <p className="DetailsLabel">Applicable Date</p>
            <p>{basicDetails.Date}</p>
          </div>
          <div>
            <p className="DetailsLabel">Short Description</p>
            <p>{basicDetails.licenseDescription}</p>
          </div>
        </div>

        <div>
          <h5>Sub License and Subtask Details</h5>
          <button
            onClick={() =>
              setStepper({
                ...stepper,
                stepperAcitveSlide: 3,
                stepperCompletedSlides: [
                  ...stepper.stepperCompletedSlides,
                  stepper.stepperAcitveSlide,
                ],
              })
            }
          >
            Edit
          </button>
        </div>
        <div className="DetailsContainer">
          <div>
            <p className="DetailsLabel">Subtask 1</p>
            <p>{subTasks.subTask1}</p>
          </div>

          <div>
            <p className="DetailsLabel">Subtask 2</p>
            <p>{subTasks.subTask2}</p>
          </div>
          <div>
            <p className="DetailsLabel">Subtask 3</p>
            <p>{subTasks.subTask3} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SALicenseSummary;
