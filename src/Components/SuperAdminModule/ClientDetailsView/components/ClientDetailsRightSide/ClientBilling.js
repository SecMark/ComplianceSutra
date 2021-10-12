import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdExpandMore } from "react-icons/md";
import ToggleButton from "../../../../../CommonModules/sharedComponents/ToggleButton";
const ClientBilling = ({ clientData }) => {
  return (
    <>
      <div className="col-12 col-md-10 col-sm-10 mt-0">
        <h6
          style={{
            width: "fit-content !important",
          }}
        >
          Latest Billing Details
        </h6>
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
      <div className="col-12 col-md-10 col-sm-10 mt-4 mb-3">
        <h6
          style={{
            width: "fit-content !important",
          }}
        >
          Past Billing & Invoice Details
        </h6>
      </div>
      {/* df */}
      <div className="col-12 col-md-12">
        <table className="w-100 client-details__table">
          <tr>
            <th>month</th>
            <th>amount</th>
            <th>payment</th>
            <th>no. of users & licenses</th>
            <th>invoices</th>
          </tr>
          <tr>
            <td className="task-data__field-key">April 31, 2021</td>
            <td className="task-data__field-value">₹738</td>
            <td className="task-data__field-value task-data__field-value--success">
              paid
            </td>
            <td className="d-flex align-items-center">
              <p className="task-data__field-key">users-</p>
              <div className="task-count">5</div>&nbsp;
              <p className="task-data__field-key">licenses-</p>
              <div className="task-count">3</div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <button className="p-0 task-details__button task-details__button--stroke">
                  download
                </button>
                <button className="py-0 task-details__button task-details__button--stroke">
                  resend invoice
                </button>
                <MdExpandMore className="ml-auto license-details__expand-more" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="task-data__field-key">April 31, 2021</td>
            <td className="task-data__field-value">₹738</td>
            <td className="task-data__field-value task-data__field-value--success">
              paid
            </td>
            <td className="d-flex align-items-center">
              <p className="task-data__field-key">users-</p>
              <div className="task-count">5</div>&nbsp;
              <p className="task-data__field-key">licenses-</p>
              <div className="task-count">3</div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <button className="p-0 task-details__button task-details__button--stroke">
                  download
                </button>
                <button className="py-0 task-details__button task-details__button--stroke">
                  resend invoice
                </button>
                <MdExpandMore className="ml-auto license-details__expand-more" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="task-data__field-key">April 31, 2021</td>
            <td className="task-data__field-value">₹738</td>
            <td className="task-data__field-value task-data__field-value--success">
              paid
            </td>
            <td className="d-flex align-items-center">
              <p className="task-data__field-key">users-</p>
              <div className="task-count">5</div>&nbsp;
              <p className="task-data__field-key">licenses-</p>
              <div className="task-count">3</div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <button className="p-0 task-details__button task-details__button--stroke">
                  download
                </button>
                <button className="py-0 task-details__button task-details__button--stroke">
                  resend invoice
                </button>
                <MdExpandMore className="ml-auto license-details__expand-more" />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default ClientBilling;
