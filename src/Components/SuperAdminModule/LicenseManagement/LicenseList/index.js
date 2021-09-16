import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../UserManagement/redux/actions/user";

const LicenseList = () => {
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
          <div className="task-list-grid active-licenese">
            <table className="license table">
              <thead>
                <tr>
                  <th align="left">STATUS</th>
                  <th>License Name</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody key={1}>
                <tr>
                  <td align="left">
                    <span class="check-box">
                      <label className="switch">
                        <input type="checkbox" value="true" />
                        <span className="slider"></span>
                      </label>
                    </span>
                  </td>
                  <td>
                    <div class="d-flex new-task-list">
                      <h6>Goods and Service Tax</h6>
                      <button className="license-list-button">GST</button>
                      <div class="circle-front-text d-none d-sm-block mail"></div>
                      {collapse && collapse[1] && collapse[1].open ? (
                        <AiOutlineUp
                          size={12}
                          color="#000000"
                          onClick={() => openCloseCollapsible(1)}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <AiOutlineDown
                          size={12}
                          color="#000000"
                          onClick={() => openCloseCollapsible(1)}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </div>
                  </td>
                  <td>India</td>
                  <td className="Edit-license">EDIT</td>
                  <td className="Edit-license">ADD CIRCULAR</td>
                </tr>

                {collapse && collapse[1] && collapse[1].open && (
                  <tr>
                    <td colspan="5">
                      <table className="table">
                        <thead>
                          <th></th>
                          <th>SUBLICENSE/SUBTASK</th>
                          <th>OCCURANCE</th>
                          <th>COMPLETATION DATE</th>
                          <th>RECENT DUE DATE</th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {" "}
                              <span class="check-box">
                                <label className="switch">
                                  <input type="checkbox" value="true" />
                                  <span className="slider"></span>
                                </label>
                              </span>
                            </td>
                            <td>Fill Subsheet for Form 283B</td>
                            <td>Monthly</td>
                            <td>13 May 2021</td>
                            <td>11 May 2021</td>
                            <td>{">"}</td>
                          </tr>

                          <tr>
                            <td>
                              {" "}
                              <span class="check-box">
                                <label className="switch">
                                  <input type="checkbox" value="true" />
                                  <span className="slider"></span>
                                </label>
                              </span>
                            </td>
                            <td>Fill Subsheet for Form 283B</td>
                            <td>Monthly</td>
                            <td>13 May 2021</td>
                            <td>11 May 2021</td>
                            <td>{">"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LicenseList;
