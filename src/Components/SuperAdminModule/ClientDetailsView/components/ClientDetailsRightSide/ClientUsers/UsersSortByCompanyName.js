import React from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import ListByFilter from "../../../../LicenseManagement/IndustryType/ListByFilter";
import ToggleButon from "../../../../../../CommonModules/sharedComponents/ToggleButton";
import TaskStatusBox from "../../../../../../CommonModules/sharedComponents/TaskStatusBox";

const UsersSortByCompanyName = ({
  expandedFlags,
  expandFlagHandler,
  countDetails,
  expandViewAllFlagHandler,
  expandViewAllFlags,
}) => {
  return (
    <>
      <ListByFilter
        expandedFlags={expandedFlags}
        handleExpanedFalgs={expandFlagHandler}
        count="5"
        name="shree finances"
        flag="shreefinances"
        listContainerClass="w-100"
      >
        <table className="w-100 client-details__table">
          <tr>
            <td>
              <ToggleButon onChangeHandler={(value) => {}} />
            </td>
            <td>
              <div style={{ width: "fit-content" }}>
                <TaskStatusBox status="approved">active</TaskStatusBox>
              </div>
            </td>
            <td className="licenses-list__task-name client-details__task_name">
              Aakash Singal
            </td>

            <td>
              <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
                Team Member
              </span>
            </td>
            {/* <td>
              <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
                5 users
              </span>
            </td>
            <td>₹231</td> */}
            <td>
              <p className="licenses-list__task-name client-details__co-name mb-0">
                9971226214
                <MdExpandMore className="license-details__expand-more ml-3" />
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <ToggleButon onChangeHandler={(value) => {}} />
            </td>
            <td>
              <div style={{ width: "fit-content" }}>
                <TaskStatusBox status="approved">active</TaskStatusBox>
              </div>
            </td>
            <td className="licenses-list__task-name client-details__task_name">
              Raman Bokar
            </td>

            <td>
              <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
                Compliance Officer
              </span>
            </td>
            <td>
              <p className="licenses-list__task-name client-details__co-name mb-0">
                9971226214
                <MdExpandMore className="license-details__expand-more ml-3" />
              </p>
            </td>
          </tr>
          {expandViewAllFlags.includes("shreefinances") && (
            <tr>
              <td>
                <ToggleButon onChangeHandler={(value) => {}} />
              </td>
              <td>
                <div style={{ width: "fit-content" }}>
                  <TaskStatusBox status="rejected">inactive</TaskStatusBox>
                </div>
              </td>
              <td className="licenses-list__task-name client-details__task_name">
                Rohit Sharma
              </td>

              <td>
                <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
                  Team Member
                </span>
              </td>
              <td>
                <p className="licenses-list__task-name client-details__co-name mb-0">
                  9971226214
                  <MdExpandMore className="license-details__expand-more ml-3" />
                </p>
              </td>
            </tr>
          )}
        </table>
        <p
          onClick={() => expandViewAllFlagHandler("shreefinances")}
          className="cs__button cs__button--stroke p-0 mb-0 client-details__show-more"
        >
          {!expandViewAllFlags.includes("shreefinances") ? (
            <>
              view all (2 more)
              <MdExpandMore className=" license-details__expand-more" />
            </>
          ) : (
            <>
              show less{" "}
              <MdExpandLess className=" license-details__expand-more" />
            </>
          )}
        </p>
      </ListByFilter>
    </>
  );
};

export default UsersSortByCompanyName;
