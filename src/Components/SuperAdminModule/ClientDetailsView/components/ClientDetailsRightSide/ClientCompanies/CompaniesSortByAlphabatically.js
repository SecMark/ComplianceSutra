import React from "react";
import { MdExpandMore } from "react-icons/md";
import ToggleButon from "../../../../../../CommonModules/sharedComponents/ToggleButton";

const CompaniesSortByAlphabatically = () => {
  return (
    <table className="w-100 client-details__table">
      <tr>
        <th>status</th>
        <th>subsidary name</th>
        <th>business type</th>
        <th>no. of licenses</th>
        <th>no. of users</th>
        <th>next bill amount</th>
        <th>compliance officer</th>
      </tr>
      <tr>
        <td>
          <ToggleButon onChangeHandler={(value) => {}} />
        </td>
        <td className="licenses-list__task-name client-details__task_name">
          shree securities
        </td>
        <td>
          <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
            broker
          </span>
        </td>
        <td className="text-center">
          <div className="task-count mx-auto">2</div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <span className="cs__sort-by--item cs__sort-by-filter client-details__users-circle">
              sk
            </span>
            <span className="cs__sort-by--item cs__sort-by-filter cs__sort-by-filter--active client-details__users-circle client-details__users-circle--overlaped">
              TS
            </span>
            <div className="task-count">4</div>
          </div>
        </td>
        <td>₹231</td>
        <td>
          <p className="licenses-list__task-name client-details__co-name mb-0">
            akash singal
            <MdExpandMore className="license-details__expand-more ml-2" />
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <ToggleButon onChangeHandler={(value) => {}} />
        </td>
        <td className="licenses-list__task-name client-details__task_name">
          shree securities
        </td>
        <td>
          <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
            broker
          </span>
        </td>
        <td className="text-center">
          <div className="task-count mx-auto">2</div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <span className="cs__sort-by--item cs__sort-by-filter client-details__users-circle">
              sk
            </span>
            <span className="cs__sort-by--item cs__sort-by-filter cs__sort-by-filter--active client-details__users-circle client-details__users-circle--overlaped">
              TS
            </span>
            <div className="task-count">4</div>
          </div>
        </td>
        <td>₹231</td>
        <td>
          <p className="licenses-list__task-name client-details__co-name mb-0">
            akash singal
            <MdExpandMore className="license-details__expand-more ml-2" />
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <ToggleButon onChangeHandler={(value) => {}} />
        </td>
        <td className="licenses-list__task-name client-details__task_name">
          shree securities
        </td>
        <td>
          <span className="cs__sort-by--item cs__sort-by-filter client-details__bussiness-type">
            broker
          </span>
        </td>
        <td className="text-center">
          <div className="task-count mx-auto">2</div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <span className="cs__sort-by--item cs__sort-by-filter client-details__users-circle">
              sk
            </span>
            <span className="cs__sort-by--item cs__sort-by-filter cs__sort-by-filter--active client-details__users-circle client-details__users-circle--overlaped">
              TS
            </span>
            <div className="task-count">4</div>
          </div>
        </td>
        <td>₹231</td>
        <td>
          <p className="licenses-list__task-name client-details__co-name mb-0">
            akash singal
            <MdExpandMore className="license-details__expand-more ml-2" />
          </p>
        </td>
      </tr>
    </table>
  );
};

export default CompaniesSortByAlphabatically;
