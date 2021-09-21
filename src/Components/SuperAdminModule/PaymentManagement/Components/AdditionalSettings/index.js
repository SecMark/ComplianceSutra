import React, { useState } from "react";
import Drawer from "../../../../../CommonModules/sharedComponents/Drawer";
import Stepper from "../../../../../CommonModules/sharedComponents/Stepper";
import EditYearlyPlan from "../../PriceManagement/ComplainceModule/EditYearlyPlan";
import "./style.css";

const AdditionalSettings = () => {
  const [editYearlyPlan, setEditYearlyPlan] = useState(false);
  const [stepper, setStepper] = useState({
    stepperAcitveSlide: 1,
    stepperCompletedSlides: [],
  });

  const steps = [
    {
      id: 1,
      text: "Edit Price",
    },
    {
      id: 2,
      text: "Confirm Changes",
    },
  ];

  return (
    <>
      <Drawer isOpen={editYearlyPlan} setIsOpen={setEditYearlyPlan}>
        {" "}
        <div className="add-discount">
          <h5 className="title">Edit Yearly Charges</h5>
        </div>
        <Stepper
          steps={steps}
          stepper={stepper}
          setStepper={setStepper}
          step={steps}
        />
        {stepper.stepperAcitveSlide === 1 && <EditYearlyPlan />}
      </Drawer>

      <div className="px-2 mt-4">
        <div className="my-2">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="head-title">Trial Period</p>
            <p className="add-btn">Edit Details</p>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">
                Allow trial usage to New users
              </span>
            </div>
            <div className="col-md-7">
              <span class="check-box">
                <label class="switch-btn">
                  <input type="checkbox" value="" checked={true} />
                  <span class="slider-btn round"></span>
                </label>
              </span>
            </div>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">Trail Period Duration</span>
            </div>
            <div className="col-md-7">
              <span className="">14 days </span>
            </div>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">Free License for trial</span>
            </div>
            <div className="col-md-7">
              <span>5 </span>
            </div>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">
                Free trail User Accounts per company
              </span>
            </div>
            <div className="col-md-7">
              <span>3 Accounts</span>
            </div>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">
                Ability to Apply for Expert Review
              </span>
            </div>
            <div className="col-md-7">
              <span class="check-box">
                <label class="switch-btn">
                  <input type="checkbox" value="" checked={false} />
                  <span class="slider-btn round"></span>
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="head-title">User Account</p>
            <p className="add-btn">Edit Details</p>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">
                Allow Bundling for user Accounts
              </span>
            </div>
            <div className="col-md-7">
              <span class="check-box">
                <label class="switch-btn">
                  <input type="checkbox" value="" checked={true} />
                  <span class="slider-btn round"></span>
                </label>
              </span>
            </div>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">
                Min. user accounts in a bundle
              </span>
            </div>
            <div className="col-md-7">
              <span>5 (User can only add new accounts in Multiples of 5)</span>
            </div>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">1 User Account Charges</span>
            </div>
            <div className="col-md-7">
              <span>₹1000/yearly</span>
            </div>
          </div>
        </div>

        <div className="my-2">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="head-title">Applicable Taxes</p>
            <p className="add-btn">Edit Details</p>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">GST charges on Tool prices</span>
            </div>
            <div className="col-md-7">
              <span>18% of Total</span>
            </div>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">
                GST charges on Expert Review
              </span>
            </div>
            <div className="col-md-7">
              <span>12% of Total </span>
            </div>
          </div>
        </div>

        <div className="my-2">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="head-title">Yearly Charges</p>
            <p
              className="add-btn"
              onClick={() => setEditYearlyPlan(true)}
              style={{ cursor: "pointer" }}
            >
              Edit Details
            </p>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">
                Allow yearly charges for tool
              </span>
            </div>
            <div className="col-md-7">
              <span class="check-box">
                <label class="switch-btn">
                  <input type="checkbox" value="" checked={true} />
                  <span class="slider-btn round"></span>
                </label>
              </span>
            </div>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">
                Allow yearly charges for Expert Review
              </span>
            </div>
            <div className="col-md-7">
              <span class="check-box">
                <label class="switch-btn">
                  <input type="checkbox" value="" checked={true} />
                  <span class="slider-btn round"></span>
                </label>
              </span>{" "}
            </div>
          </div>
          <div className="row row-height">
            <div className="col-md-5">
              <span className="head-subtitle">Yearly charge Calculation</span>
            </div>
            <div className="col-md-7">
              <span>10X of Monthly charges</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalSettings;
