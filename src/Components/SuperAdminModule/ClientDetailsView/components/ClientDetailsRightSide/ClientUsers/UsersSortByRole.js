import React from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import ListByFilter from "../../../../LicenseManagement/IndustryType/ListByFilter";
import ToggleButon from "../../../../../../CommonModules/sharedComponents/ToggleButton";
import TaskStatusBox from "../../../../../../CommonModules/sharedComponents/TaskStatusBox";
const UsersSortByRole = ({
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
        name="team member"
        flag="tm"
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
              <div className="d-flex align-items-center">
                <span className="licenses-list__task-name client-details__task_name">
                  shree securities
                </span>
                <span className="cs__sort-by--item cs__sort-by-filter client-details__users-circle">
                  sk
                </span>
                <span className="cs__sort-by--item cs__sort-by-filter cs__sort-by-filter--active client-details__users-circle client-details__users-circle--overlaped">
                  TS
                </span>
                <div className="task-count ml-1">4</div>
              </div>
            </td>
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
              Rohit Sharma
            </td>

            <td>
              <div className="d-flex align-items-center">
                <span className="licenses-list__task-name client-details__task_name">
                  Samsung
                </span>
                <span className="cs__sort-by--item cs__sort-by-filter client-details__users-circle">
                  RS
                </span>
                <span className="cs__sort-by--item cs__sort-by-filter cs__sort-by-filter--active client-details__users-circle">
                  AK
                </span>
                {/* <div className="task-count ml-1">4</div> */}
              </div>
            </td>
            <td>
              <p className="licenses-list__task-name client-details__co-name mb-0">
                9971226214
                <MdExpandMore className="license-details__expand-more ml-3" />
              </p>
            </td>
          </tr>
          {expandViewAllFlags.includes("tm") && (
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
                <div className="d-flex align-items-center">
                  <span className="licenses-list__task-name client-details__task_name">
                    shree securities
                  </span>
                  <span className="cs__sort-by--item cs__sort-by-filter client-details__users-circle">
                    sk
                  </span>
                  <span className="cs__sort-by--item cs__sort-by-filter cs__sort-by-filter--active client-details__users-circle client-details__users-circle--overlaped">
                    TS
                  </span>
                  <div className="task-count ml-1">4</div>
                </div>
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
          onClick={() => expandViewAllFlagHandler("tm")}
          className="cs__button cs__button--stroke p-0 mb-0 client-details__show-more"
        >
          {!expandViewAllFlags.includes("tm") ? (
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

export default UsersSortByRole;
