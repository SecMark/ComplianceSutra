import React, { useEffect ,useState} from "react";
import "./style.css";
import TextEditor from "../TextEditor";
import { DatePicker, Space } from "antd";
import { setProject } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import calanderIcon from "../../../../assets/Icons/calanderIcon.svg";

function AddProject({ show, onClose }) {
  // useEffect(()=>{
  //   if (!show) {
  //     return null;
  //   }
  // },[])

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    project_name: "",
    assign_user: "",
    start_date: "",
    end_date: "",
    project_overview: "",
  });
  console.log("got this values",values)
  const payload = {
    project_id: null,
    project_name: "abc",
    assign_user: ["ashuk@trakiot.in"],
    start_date: "2021-11-23",
    end_date: "2021-11-26",
    project_overview: "lemon project",
  };
  useEffect(() => {
    dispatch(setProject(payload));
  }, []);

  const onHandleChange = (evt) => {
    const value = evt.target.value;
    console.log(evt)
    setValues({
      ...values,
      [evt.target.name]: value
    });
  };

  
  const calanderimg = <img src={calanderIcon} />;

  return !show ? null : (
    <div className="add-edit-modal" onClick={onClose}>
      <div
        className="add-edit-project-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-edit-main-container">
          <label className="add-edit-project-labels">Project Name</label>
          <input className="add-edit-project-inputs" 
           name="project_name"
           onChange={onHandleChange}
          />
          <div className="row mt-3">
            <div className="col-6">
              <label className="add-edit-project-labels">User</label>
              <input className="add-edit-project-inputs"
              name="assign_user"
              onChange={onHandleChange}
              />
            </div>
            <div className="col-3">
              <label className="add-edit-project-labels">Start Date</label>

              <DatePicker
                className="add-edit-project-inputs"
                name="start_date"
                suffixIcon={calanderimg}
                onChange={(date,dateString)=>{
                  setValues({
                    ...values,
                    start_date:dateString
                  })
                }}
              />
            </div>
            <div className="col-3">
              <label className="add-edit-project-labels">End Date</label>
              <DatePicker
                className="add-edit-project-inputs"
                suffixIcon={calanderimg}
                onChange={(date,dateString)=>{
                  setValues({
                    ...values,
                    end_date:dateString
                  })
                }}
              />
            </div>
          </div>
          <label className="add-edit-project-labels mt-3">
            Project overview
          </label>
          <TextEditor />
          <div className="d-flex mt-3 justify-content-center">
            <div className="p-2">
              <button className="add-edit-project-submit-btn" onClick={onClose}>
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
