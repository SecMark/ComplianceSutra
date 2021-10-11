import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import "../../../LicenseDetails/Components/TaskDetailRightSide/style.css";
import "./style.css";
import ClientOverview from "./ClientOverview";
import ClientBilling from "./ClientBilling";
import ClientCompanies from "./ClientCompanies";
const ClientDetailsRightSide = ({ taskData }) => {
  const [taskDisplay, setTaskDisplay] = useState(1);
  const [headerHeight, setHeaderHight] = useState(0);
  useEffect(() => {
    const headerRef = document
      .querySelector(".task-data__header")
      .getClientRects()[0].height;
    setHeaderHight(Math.trunc(headerRef));
  }, [taskDisplay, taskData]);
  return (
    <div className="task-data__container position-relative">
      <span className="task-data__close">
        <MdClose />
      </span>
      <div className="task-data__header">
        <div className="position-relative task-data__header-details">
          <div className="d-flex align-items-md-center mb-3 flex-column flex-md-row align-items-start">
            <p className="mb-0 task-data__header--title">
              {taskData.company_name}
            </p>
            {/* <span className="task-data__header--entity-name ml-0 ml-md-3 mt-2 mt-md-0">
              GST
            </span> */}
          </div>
          <div className="license-details__tabs d-flex align-items-center">
            {[
              "overview",
              "billing",
              "companies",
              "users",
              "data analytics",
            ].map((tab, index) => (
              <p
                className={`license-details__tab px-1 mb-0 ${
                  taskDisplay === index + 1 && "license-details__tab--active"
                }`}
                onClick={() => setTaskDisplay(index + 1)}
              >
                {tab}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div
        className="task-data__main"
        style={{
          height: `calc(90vh - ${headerHeight}px)`,
        }}
      >
        <div className="row my-4 task-data-fields">
          {taskDisplay === 1 && <ClientOverview clientData={taskData} />}
          {taskDisplay === 2 && <ClientBilling clientData={taskData} />}
          {taskDisplay === 3 && <ClientCompanies clientData={taskData} />}
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsRightSide;
