import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, editUserStatus } from "../../redux/actions/user";

const Clients = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userList.isLoading);
  const userList = useSelector((state) => state.userList.userList);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    dispatch(getUsers({ gUserID: "133", settingType: 6, actionFlag: 0 }));
  }, [dispatch]);

  const shortName = (str) => {
    let fullName = str.split(" ") || [];
    let result = "";
    switch (true) {
      case fullName.length === 1:
        result = fullName.shift().charAt(0);
        break;
      default:
        result = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    }
    return result.toUpperCase();
  };

  const toggleExpanded = (index, status) => {
    setExpanded({ ...expanded, [index]: status });
  };

  const editStatus = (user) => {
    const payload = {
      gUserID: user.UserID,
      settingType: user.UserType,
      actionFlag: user.StatusActive === 0 ? 1 : 0,
    };
    console.log("payload", payload);
    dispatch(editUserStatus(payload));
  };

  return (
    <>
      <div className="ER-task-container mt-0">
        <div className="ER-take-action">
          <div className="">
            <table className="table">
              <thead>
                <tr>
                  <th>STATUS</th>
                  <th>TEAM MEMBER NAME</th>
                  <th>ROLES</th>
                  <th>PHONE NO</th>
                  <th>EMAIL ID</th>
                  <th>CLIENTS</th>
                  <th>LICENSES EXPERTISE</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={12} className="text-center text-muted">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  userList.map((user, index) => (
                    <>
                      <tr key={index}>
                        <th>
                          <span class="">
                            <label class="switch-btn">
                              <input
                                type="checkbox"
                                value={user.StatusActive}
                                checked={user.StatusActive === 0 ? true : false}
                                disabled={
                                  user.StatusActive === 2 ? true : false
                                }
                                onChange={() => editStatus(user)}
                              />
                              <span class="slider-btn round"></span>
                            </label>
                          </span>
                        </th>
                        <td>
                          <div class="d-flex new-task-list">
                            <div class="circle-name d-none d-sm-block">
                              <div class="circle-text">
                                {shortName(user.FullName)}
                              </div>
                            </div>
                            <div class="circle-front-text d-none d-sm-block mail">
                              {user.FullName}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="user-role">{user.UserRole}</span>
                        </td>
                        <td>{user.Mobile}</td>
                        <td>{user.EmailID}</td>
                        <td>
                          <div class="d-flex new-task-list">
                            <div class="circle-name d-sm-block client-circle">
                              <div class="circle-text">{user.NoofClients}</div>
                            </div>
                          </div>
                        </td>
                        <td>{user.LicExpertee}</td>
                        <td>
                          {expanded[index] ? (
                            <AiOutlineUp
                              size={15}
                              color="#000000"
                              onClick={() => toggleExpanded(index, false)}
                            />
                          ) : (
                            <AiOutlineDown
                              size={15}
                              color="#000000"
                              onClick={() => toggleExpanded(index, true)}
                            />
                          )}
                        </td>
                      </tr>
                      {expanded[index] && (
                        <tr>
                          <td
                            colSpan={8}
                            style={{ padding: "15px 30px 30px 0" }}
                          >
                            <div className="row">
                              <div className="col-md-1">-</div>
                              <div className="col-md-1">{user.Clients}</div>
                              <div className="col-md-1"></div>
                              <div className="col-md-1"></div>
                              <div className="col-md-6"></div>
                              <div className="col-md-1"></div>
                              <div className="col-md-1 edit-btn">Edit</div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
