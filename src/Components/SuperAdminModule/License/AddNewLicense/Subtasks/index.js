import React from "react";
import Select from "react-select";
import { IoIosAddCircle } from "react-icons/io";

import "../style.css";
const SASubTasks = ({ options, setSubTasks, subTasks }) => {
  const subtasksArray = [1, 2, 3];
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: 200,

      color: "black",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
    }),

    container: (provided) => ({
      ...provided,
      width: 350,

      margin: "0px 8px",
      fontSize: "13px",
    }),
    dropdownIndicator: () => ({
      color: "black",
      paddingRight: 4,
    }),

    singleValueLabel: () => ({
      backgroundColor: "white",
      padding: 2,
      margin: 2,
      borderRadius: 8,
    }),
    singleValue: () => ({
      border: "none",
      color: "black",
      fontSize: "85%",
      display: "flex",
    }),
    option: () => ({
      "&:hover": {
        backgroundColor: "#f7f4fe",
      },
      padding: 8,
      marginBottom: 5,
    }),
    indicatorSeparator: () => ({
      backgroundColor: "#f7f4fe",
    }),
    control: () => ({
      backgroundColor: "#e4e4e4",
      opacity: 0.7,
      display: "flex",
      borderRadius: 7,
      height: 40,
      fontWeight: "600",
    }),
  };
  console.log(subtasksArray);
  return (
    <div className="SASubtasks">
      <h6>Subtask Details</h6>

      <div className="SubtaskContainer">
        <label>Select Subtask 1</label>
        <div>
          <Select
            styles={customStyles}
            options={options}
            onChange={(e) =>
              setSubTasks({
                ...subTasks,
                subTask1: e.value,
              })
            }
          />
          <button
            onClick={() =>
              setSubTasks({
                ...subTasks,
                subTask1: null,
              })
            }
          >
            DELETE
          </button>
        </div>
      </div>
      <div className="SubtaskContainer">
        <label>Select Subtask 2</label>
        <div>
          <Select
            styles={customStyles}
            options={options}
            onChange={(e) =>
              setSubTasks({
                ...subTasks,
                subTask2: e.value,
              })
            }
          />
          <button
            onClick={() =>
              setSubTasks({
                ...subTasks,
                subTask2: null,
              })
            }
          >
            DELETE
          </button>
        </div>
      </div>
      <div className="SubtaskContainer">
        <label>Select Subtask 3</label>
        <div>
          <Select
            styles={customStyles}
            options={options}
            onChange={(e) =>
              setSubTasks({
                ...subTasks,
                subTask3: e.value,
              })
            }
          />
          <button
            onClick={() =>
              setSubTasks({
                ...subTasks,
                subTask3: null,
              })
            }
          >
            DELETE
          </button>
        </div>
      </div>
      <button style={{ margin: "2rem 1rem" }}>
        <IoIosAddCircle
          style={{
            marginRight: "7px",
            width: "20px",
            height: "20px",
          }}
        />
        ADD NEW SUB LICENSE
      </button>
    </div>
  );
};
export default SASubTasks;
