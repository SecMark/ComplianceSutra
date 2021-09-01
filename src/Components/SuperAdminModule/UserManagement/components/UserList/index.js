import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/user";

const Clients = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList.userList);
  const [collapse, setCollapse] = useState(userList);

  useEffect(() => {
    dispatch(getUsers({ gUserID: "133", settingType: 6, actionFlag: 0 }));
  }, [dispatch]);

  const openCloseCollapsible = (index) => {
    let list = [...collapse];
    if (collapse[index].open === false) {
      list &&
        list.map((item, key) => {
          if (key === index) {
            list[index].open = true;
          } else {
            list[key].open = false;
          }
        });
      setCollapse(list);
    } else {
      let list = [...collapse];
      list &&
        list.map((item, key) => {
          if (key === index) {
            list[index].open = false;
          } else {
            list[key].open = false;
          }
        });
      setCollapse(list);
    }
  };

  const shortName = (str) => {
    let fullName = str.split(" ");
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
              {userList.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr onClick={() => openCloseCollapsible(index)}>
                      <th>
                        <span class="check-box">
                          <label className="switch">
                            <input
                              type="checkbox"
                              value={item.StatusActive}
                              checked={item.StatusActive === 0 ? true : false}
                              disabled={item.StatusActive === 2 ? true : false}
                            />
                            <span className="slider"></span>
                          </label>
                        </span>
                      </th>
                      <td>
                        <div class="d-flex new-task-list">
                          <div class="circle-name d-none d-sm-block">
                            <div class="circle-text">
                              {shortName(item.FullName)}
                            </div>
                          </div>
                          <div class="circle-front-text d-none d-sm-block mail">
                            {item.FullName}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="user-role">{item.UserRole}</span>
                      </td>
                      <td>{item.Mobile}</td>
                      <td>{item.EmailID}</td>
                      <td>
                        <div class="d-flex new-task-list">
                          <div class="circle-name d-sm-block client-circle">
                            <div class="circle-text">{item.NoofClients}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.LicExpertee}</td>
                      <td>
                        {collapse && collapse[index] && collapse[index].open ? (
                          <AiOutlineUp size={18} color="#000000" />
                        ) : (
                          <AiOutlineDown size={18} color="#000000" />
                        )}
                      </td>
                    </tr>
                    {collapse && collapse[index] && collapse[index].open && (
                      <tr>
                        <td></td>
                        <td>
                          <div className="text-muted">{item.Clients}</div>
                        </td>
                        <td></td>
                        <td>
                          <div>BK securities</div>
                        </td>
                        <td>
                          <div className="text-muted">Active From</div>
                        </td>
                        <td>
                          <div>May 03, 2021</div>
                        </td>
                        <td></td>
                        <td>
                          <span className="edit-btn">Edit</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
