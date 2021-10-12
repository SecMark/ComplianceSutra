import React from "react";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import ToggleButton from "../../../../../CommonModules/sharedComponents/ToggleButton";
const ClientOverview = ({ clientData }) => {
  return (
    <>
      <div className="w-100 d-flex align-items-center">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Status</p>
        </div>
        <div className="col-6">
          <ToggleButton
            isChecked={clientData.isActive}
            onChangeHandler={(value) => {
              // Action for toggle
            }}
          />
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">No. of Companies</p>
        </div>
        <div className="col-6 d-flex justify-content-start">
          <p className="task-data__field-value">
            12&nbsp;
            <button className="py-0 task-details__button task-details__button--stroke">
              edit
            </button>
          </p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Total No. of Licenses</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">{clientData.licenses}</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">total no. of Users</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">
            08&nbsp;
            <button className="py-0 task-details__button task-details__button--stroke">
              edit
            </button>
          </p>
        </div>
      </div>

      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Billing Charges</p>
        </div>
        <div className="col-6">
          {/* <p className="task-data__field-value">₹{clientData.monthly_revenu}</p> */}
          <p className="task-data__field-value">₹238 Per user per license</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">payment plan</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">
            Monthly&nbsp;
            <button className="py-0 task-details__button task-details__button--stroke">
              change
            </button>
          </p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">next billing amount</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">₹{clientData.monthly_revenu}</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">next billing date</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">{clientData.payment_due}</p>
        </div>
      </div>
      <div className="w-100 d-flex align-items-center">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">expert review service</p>
        </div>
        <div className="col-6">
          <ToggleButton
            isChecked={clientData.isActive}
            onChangeHandler={(value) => {
              // Action for toggle
            }}
          />
        </div>
      </div>
      <div className="col-12 col-md-10 col-sm-10 mt-4">
        <h6
          style={{
            width: "fit-content !important",
          }}
        >
          Chief Complaince Officer Details
        </h6>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Head Compliance Officer's Name</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">Aakash Singal</p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">Email ID</p>
        </div>
        <div className="col-6 d-flex align-items-center">
          <p
            className="task-data__field-value"
            style={{
              textTransform: "lowercase",
            }}
          >
            Aakash.singal@gmail.com&nbsp;
            <a
              href="mailto:Aakash.singal@gmail.com"
              className="py-0 task-details__button task-details__button--stroke"
            >
              <MdEmail />
              &nbsp;send email
            </a>
          </p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="col-6 col-md-5">
          <p className="task-data__field-key">phone number</p>
        </div>
        <div className="col-6">
          <p className="task-data__field-value">
            +91 7483789324
            <a
              href="https://wa.me/+917483789324"
              className="py-0 task-details__button task-details__button--stroke"
            >
              <FaWhatsapp />
              &nbsp;send message
            </a>
          </p>
        </div>
      </div>

      <div className="col-6 col-md-12 mt-1">
        <button
          className="task-details__button task-details__button--outlined"
          //   onClick={() => setOpenRightTab(!openRightTab)}
        >
          edit details
        </button>
      </div>
    </>
  );
};

export default ClientOverview;
