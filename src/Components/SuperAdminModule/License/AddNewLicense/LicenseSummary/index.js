import React from "react";
import "../style.css";

const SALicenseSummary = ({ basicDetails }) => {
  return (
    <div>
      <div className="DetailsEdit">
        <div>
          <h5>Basic Details</h5>
          <button>Edit</button>
        </div>
        <div className="DetailsContainer">
          <div>
            <p className="DetailsLabel">License Manager</p>
            <p>Portfolio Manager (PMS) </p>
          </div>
          <div>
            <p className="DetailsLabel">Business Category</p>
            <p>Depository Participants, General</p>
          </div>
          <div>
            <p className="DetailsLabel">Applicable Country</p>
            <p>England</p>
          </div>
          <div>
            <p className="DetailsLabel">Applicable Date</p>
            <p>13 Mar, 2021</p>
          </div>
          <div>
            <p className="DetailsLabel">Short Description</p>
            <p>PMS is a Lorem Ipsum type of law </p>
          </div>
        </div>

        <div>
          <h5>Sub License and Subtask Details</h5>
          <button>Edit</button>
        </div>
        <div className="DetailsContainer">
          <div>
            <p className="DetailsLabel">Subtask 1</p>
            <p>Good Fill Subsheet for Form 283 Band Service Tax</p>
          </div>

          <div>
            <p className="DetailsLabel">Subtask 2</p>
            <p>Fill Application status with stamp for Form 283B</p>
          </div>
          <div>
            <p className="DetailsLabel">Subtask 3</p>
            <p>Fill Subsheet for Form 283B </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SALicenseSummary;
