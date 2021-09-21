import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineDown } from "react-icons/ai";
import ConfirmOtp from "../../../../../CommonModules/sharedComponents/ConfirmOtp";
import Drawer from "../../../../../CommonModules/sharedComponents/Drawer";
import Stepper from "../../../../../CommonModules/sharedComponents/Stepper";
import AddDetails from "./AddDetails";
import DiscountMethods from "./DiscountMethods";
import "./style.css";

const DiscountModule = (props) => {
  const [activeStatus, setActiveStatus] = useState("discounts");

  const [stepper, setStepper] = useState({
    stepperAcitveSlide: 2,
    stepperCompletedSlides: [],
  });
  const [sortBy, setSortBy] = useState("Status");
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      id: 1,
      text: "Add Discount Details",
    },
    {
      id: 2,
      text: "Confirm Changes",
    },
  ];

  return (
    <>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {" "}
        <div className="add-discount">
          <h5 className="title">Add New Discount</h5>

          <Stepper
            steps={steps}
            stepper={stepper}
            setStepper={setStepper}
            step={steps}
          />

          {/* <AddDetails /> */}

          {stepper.stepperAcitveSlide === 1 && <DiscountMethods />}
          {stepper.stepperAcitveSlide === 2 && <ConfirmOtp />}
        </div>
      </Drawer>

      <div className="row">
        <h4>Manage Discounts & Coupons </h4>
        <div className="col-md-12">
          <div className="Super-admin-task-statics row mt-4">
            <h6 className="mt-2">
              <span
                className="ml-1"
                onClick={() => setActiveStatus("discounts")}
                style={{ cursor: "pointer" }}
              >
                Active Discounts
              </span>
              <div
                className={
                  activeStatus === "discounts" &&
                  "license-management-title-progress"
                }
              ></div>
            </h6>
            <h6 className="mt-2">
              <span
                className="ml-4"
                onClick={() => setActiveStatus("coupons")}
                style={{ cursor: "pointer" }}
              >
                Coupons
              </span>
              <div
                className={
                  activeStatus === "coupons" &&
                  "license-management-title-progress"
                }
              ></div>
            </h6>
          </div>

          <div className="sort-by-filter">
            <span
              className="sort-by add-btn"
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AiOutlinePlus size={18} className="m-1 add-new-button" />
              ADD NEW Discount
            </span>

            <span className="sort-by ml-4">Sort by</span>
            <span
              className={
                sortBy == "Status"
                  ? "sort-filter-active"
                  : "sort-filter-inactive"
              }
              onClick={() => setSortBy("Status")}
            >
              status
            </span>

            <span
              className={
                sortBy == "Discount Dates"
                  ? "sort-filter-active"
                  : "sort-filter-inactive"
              }
              onClick={() => setSortBy("Discount Dates")}
            >
              Discount Dates
            </span>
          </div>
        </div>
      </div>
      <div className="discount-list-header row">
        <p className="col-md-2">Status</p>
        <p className="col-md-3">Discount Type</p>
        <p className="col-md-4">Details</p>
        <p className="col-md-3">Discount Duration</p>
      </div>

      <div className="discount-list-item row">
        <div className="col-md-2">
          <button className="-button--status">Active</button>
        </div>
        <div className="col-md-3">
          <button className="-button--discount">%Discount</button>
        </div>
        <p className="col-md-4">10% discount on Tool Charges for all users</p>
        <p className="col-md-2">31 Jun - 20 Jul </p>
        <AiOutlineDown className="col-md-1"></AiOutlineDown>
      </div>
      <div className="discount-list-item row">
        <div className="col-md-2">
          <button className="-button--status">Active</button>
        </div>
        <div className="col-md-3">
          <button className="-button--discount">%Discount</button>
        </div>
        <p className="col-md-4">10% discount on Tool Charges for all users</p>
        <p className="col-md-2">31 Jun - 20 Jul </p>
        <AiOutlineDown className="col-md-1"></AiOutlineDown>
      </div>
      <div className="discount-list-item row">
        <div className="col-md-2">
          <button className="-button--status">Active</button>
        </div>
        <div className="col-md-3">
          <button className="-button--discount">%Discount</button>
        </div>
        <p className="col-md-4">10% discount on Tool Charges for all users</p>
        <p className="col-md-2">31 Jun - 20 Jul </p>
        <AiOutlineDown className="col-md-1"></AiOutlineDown>
      </div>
    </>
  );
};

export default DiscountModule;
