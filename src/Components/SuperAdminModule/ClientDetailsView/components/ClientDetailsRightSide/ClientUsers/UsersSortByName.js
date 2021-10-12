import React from "react";
import { MdExpandMore } from "react-icons/md";
import ToggleButon from "../../../../../../CommonModules/sharedComponents/ToggleButton";

const UsersSortByName = () => {
  return (
    <table className="w-100 client-details__table">
      <tr>
        <th>user's name</th>
        <th>associated subsidary</th>
        <th>role</th>
        <th>Mobile Number</th>
        <th>status</th>
      </tr>
      <tr>
        {/* User's Name */}
        <td>
          <p className="licenses-list__task-name client-details__co-name mb-0">
            akash singal
          </p>
        </td>
        {/* Associated Subsidary */}
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
        {/* Roles */}
        <td>
          <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
            TM
          </span>
          <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
            CO
          </span>
        </td>

        {/* Mobile Number */}
        <td>9971226214</td>
        {/* Status */}
        <td>
          <div className="d-flex align-items-center">
            <ToggleButon onChangeHandler={(value) => {}} />
            <MdExpandMore className="license-details__expand-more ml-3" />
          </div>
        </td>
      </tr>
      <tr>
        {/* User's Name */}
        <td>
          <p className="licenses-list__task-name client-details__co-name mb-0">
            akash singal
          </p>
        </td>
        {/* Associated Subsidary */}
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
        {/* Roles */}
        <td>
          <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
            TM
          </span>
          <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
            CO
          </span>
        </td>

        {/* Mobile Number */}
        <td>9971226214</td>
        {/* Status */}
        <td>
          <div className="d-flex align-items-center">
            <ToggleButon onChangeHandler={(value) => {}} />
            <MdExpandMore className="license-details__expand-more ml-3" />
          </div>
        </td>
      </tr>
      <tr>
        {/* User's Name */}
        <td>
          <p className="licenses-list__task-name client-details__co-name mb-0">
            akash singal
          </p>
        </td>
        {/* Associated Subsidary */}
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
        {/* Roles */}
        <td>
          <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
            TM
          </span>
          <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
            CO
          </span>
        </td>

        {/* Mobile Number */}
        <td>9971226214</td>
        {/* Status */}
        <td>
          <div className="d-flex align-items-center">
            <ToggleButon onChangeHandler={(value) => {}} />
            <MdExpandMore className="license-details__expand-more ml-3" />
          </div>
        </td>
      </tr>
    </table>
  );
};

export default UsersSortByName;
