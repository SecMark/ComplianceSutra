import React from "react";
import "./style.css";

const ListView = (props) => {
  return (
    <>
      <div className="mt-4">
        <table className="table project-list-view-table">
          <thead>
            <th>Project Name</th>
            <th>Completed</th>
            <th>Owner</th>
            <th>Task</th>
            <th>Milestone</th>
            <th>Duration</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Asigned</th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>Management Design</td>
              <td>66%</td>
              <td>Ajit</td>
              <td>2/2</td>
              <td>0/1</td>
              <td>2 Days</td>
              <td>16 Aug 2021</td>
              <td>20 Aug 2022</td>
              <td>2 Days</td>
              <td>2 Days</td>
              <td>2 Days</td>
            </tr>
            <tr>
              <td>Management Design</td>
              <td>66%</td>
              <td>Ajit</td>
              <td>2/2</td>
              <td>0/1</td>
              <td>2 Days</td>
              <td>16 Aug 2021</td>
              <td>20 Aug 2022</td>
              <td>2 Days</td>
              <td>2 Days</td>
              <td>2 Days</td>
            </tr>
            <tr>
              <td>Management Design</td>
              <td>66%</td>
              <td>Ajit</td>
              <td>2/2</td>
              <td>0/1</td>
              <td>2 Days</td>
              <td>16 Aug 2021</td>
              <td>20 Aug 2022</td>
              <td>2 Days</td>
              <td>2 Days</td>
              <td>2 Days</td>
            </tr>
            <tr>
              <td>Management Design</td>
              <td>66%</td>
              <td>Ajit</td>
              <td>2/2</td>
              <td>0/1</td>
              <td>2 Days</td>
              <td>16 Aug 2021</td>
              <td>20 Aug 2022</td>
              <td>2 Days</td>
              <td>2 Days</td>
              <td>2 Days</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListView;
