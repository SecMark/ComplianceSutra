import React, { useEffect, useState } from "react";
import "./style.css";
import TextEditor from "../TextEditor";
import { DatePicker, Space } from "antd";
import { setProject, getRegisteredUser } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import calanderIcon from "../../../../assets/Icons/calanderIcon.svg";
import api from "../../../../apiServices";
import axiosInstance from "../../../../apiServices";
import CreatableSelect from "react-select/creatable";


function AddProject({ show, onClose }) {
  
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userLilst, setUserList] = useState([]);
  const [values, setValues] = useState({
    project_name: "",
    assign_user: [],
    start_date: "",
    end_date: "",
    project_overview: "",
  });
  console.log("got this values", values);
  console.log("userList", userLilst);
  useEffect(() => {
    getRegisteredUSerList();
  }, []);

// custom style for dropdown
  const customStyle ={
    control: (styles) => ({
      ...styles,
      width: "100%",
      height: "50px",
      borderRadius: "10px"
    }),
  }


  // function to get the registered user list
  const getRegisteredUSerList = () => {
    axiosInstance.get("compliance.api.getAllUsersList").then((response) => {
      const arr1 = [];
      response.data.message.user_list.map((el)=>{
        arr1.push({
          label:el.name,
          value:el.full_name
        })
      })
      setUserList(arr1);
    });
  };

  const onHandleChange = (evt) => {
    const value = evt.target.value;
    console.log(evt);
    setValues({
      ...values,
      [evt.target.name]: value,
    });
  };


  // function to change dropdownvalue
 
  const handleDropDownChange = (val)=>{
      const arr2 = []
      val.map((label)=>{
          arr2.push(label.label)
      })
      setValues({
        ...values,
        assign_user:arr2
      })


  }

  // submiting form values
  const onSubmitValue = () =>{
    const payload = values;
    dispatch(setProject(payload));
    onClose()
  }

  const calanderimg = <img src={calanderIcon} />;

  return !show ? null : (
    <div className="add-edit-modal" onClick={onClose}>
      <div
        className="add-edit-project-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-edit-main-container">
          <label className="add-edit-project-labels">Project Name</label>
          <input
            className="add-edit-project-inputs"
            name="project_name"
            onChange={onHandleChange}
          />
          <div className="row mt-3">
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels">User</label>
              <CreatableSelect
                isMulti
                styles={customStyle}
                onChange={handleDropDownChange}
                options={userLilst}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <label className="add-edit-project-labels">Start Date</label>

              <DatePicker
                className="add-edit-project-inputs"
                name="start_date"
                suffixIcon={calanderimg}
                onChange={(date, dateString) => {
                  setValues({
                    ...values,
                    start_date: dateString,
                  });
                }}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <label className="add-edit-project-labels">End Date</label>
              <DatePicker
                className="add-edit-project-inputs"
                suffixIcon={calanderimg}
                onChange={(date, dateString) => {
                  setValues({
                    ...values,
                    end_date: dateString,
                  });
                }}
              />
            </div>
          </div>
          <label className="add-edit-project-labels mt-3">
            Project overview
          </label>
          <TextEditor values={values} setValues={setValues} />
          <div className="d-flex mt-3 justify-content-center">
            <div className="p-2">
              <button className="add-edit-project-submit-btn" onClick={onSubmitValue}>
                Submit
              </button>
            </div>
            <div className="p-2">
              <button className="add-edit-project-cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
