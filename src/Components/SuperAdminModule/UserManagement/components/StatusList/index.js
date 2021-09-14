import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, editUserStatus } from "../../redux/actions/user";

const StatusList = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList.userList);
  const [collapse1, setCollapse1] = useState(true);
  const [collapse2, setCollapse2] = useState(true);
  const [expanded1, setExpanded1] = useState({});
  const [expanded2, setExpanded2] = useState({});
  const [active, setActive] = useState([]);
  const [inActive, setinActive] = useState([]);
  const [showActive, setshowActive] = useState(2);
  const [showInActive, setshowInActive] = useState(2);

  useEffect(() => {
    dispatch(getUsers({ gUserID: "133", settingType: 6, actionFlag: 0 }));
  }, [dispatch]);

  useEffect(() => {
    setActive(userList.filter((item) => item.StatusActive === 0));
    setinActive(userList.filter((item) => item.StatusActive === 1));
  }, [userList]);

  const toggleExpanded1 = (index, status) => {
    setExpanded1({ ...expanded1, [index]: status });
  };

  const toggleExpanded2 = (index, status) => {
    setExpanded2({ ...expanded2, [index]: status });
  };

  const editStatus = (user) => {
    const payload = {
      gUserID: user.UserID,
      settingType: user.UserType,
      actionFlag: user.StatusActive === 0 ? 1 : 0,
    };
    console.log(payload);
    dispatch(editUserStatus(payload));
  };

  return (
    <>
      <div className="ER-task-container mt-0">
        <div className="ER-take-action">
          <div className="">
            <div className="upcoming-btn">
              <div
                className="upcoming-title"
                onClick={() => setCollapse1(!collapse1)}
              >
                Active Users
                <span className="black-circle">
                  <p className="black-circle-text">{active.length}</p>
                </span>
                {collapse1 ? (
                  <AiOutlineDown size={15} color="#000000" className="ml-2" />
                ) : (
                  <AiOutlineUp size={15} color="#000000" className="ml-2" />
                )}
              </div>
            </div>
            {collapse1 && (
              <table className="table">
                <tbody>
                  {active
                    .filter((item, index) => index < showActive)
                    .map((user, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <th>
                              <span class="check-box">
                                <label class="switch-btn">
                                  <input
                                    type="checkbox"
                                    value={user.StatusActive}
                                    checked={
                                      user.StatusActive === 0 ? true : false
                                    }
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
                                  <div class="circle-text">ss</div>
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
                                  <div class="circle-text">
                                    {user.NoofClients}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{user.LicExpertee}</td>
                            <td>
                              {expanded1[index] ? (
                                <AiOutlineUp
                                  size={15}
                                  color="#000000"
                                  onClick={() => toggleExpanded1(index, false)}
                                />
                              ) : (
                                <AiOutlineDown
                                  size={15}
                                  color="#000000"
                                  onClick={() => toggleExpanded1(index, true)}
                                />
                              )}
                            </td>
                          </tr>
                          {expanded1[index] && (
                            <tr>
                              <td
                                colSpan={8}
                                style={{ padding: "15px 30px 30px 0" }}
                              >
                                <div className="row">
                                  <div className="col-md-2">-</div>
                                  <div className="col-md-2">{user.Clients}</div>
                                  <div className="col-md-7"></div>
                                  <div className="col-md-1 edit-btn">Edit</div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                </tbody>
                <div>
                  <span>
                    View All (
                    {active.length - showActive > 0
                      ? active.length - showActive
                      : 0}
                    More)
                  </span>
                  {showActive === 2 ? (
                    <AiOutlineDown
                      size={15}
                      color="#000000"
                      className="ml-2"
                      onClick={() => setshowActive(active.length)}
                    />
                  ) : (
                    <AiOutlineUp
                      size={15}
                      color="#000000"
                      className="ml-2"
                      onClick={() => setshowActive(2)}
                    />
                  )}
                </div>
              </table>
            )}
          </div>
        </div>

        <div className="ER-take-action">
          <div className="">
            <div className="upcoming-btn">
              <div
                className="upcoming-title"
                onClick={() => setCollapse2(!collapse2)}
              >
                Inactive Users
                <span className="black-circle">
                  <p className="black-circle-text">{inActive.length}</p>
                </span>
                {collapse2 ? (
                  <AiOutlineDown size={15} color="#000000" className="ml-2" />
                ) : (
                  <AiOutlineUp size={15} color="#000000" className="ml-2" />
                )}
              </div>
            </div>
            {collapse2 && (
              <table className="table">
                <tbody>
                  {inActive
                    .filter((item, index) => index < showInActive)
                    .map((user, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <th>
                              <span class="check-box">
                                <label class="switch-btn">
                                  <input
                                    type="checkbox"
                                    value={user.StatusActive}
                                    checked={
                                      user.StatusActive === 0 ? true : false
                                    }
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
                                  <div class="circle-text">ss</div>
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
                                  <div class="circle-text">
                                    {user.NoofClients}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{user.LicExpertee}</td>
                            <td>
                              {expanded2[index] ? (
                                <AiOutlineUp
                                  size={15}
                                  color="#000000"
                                  onClick={() => toggleExpanded2(index, false)}
                                />
                              ) : (
                                <AiOutlineDown
                                  size={15}
                                  color="#000000"
                                  onClick={() => toggleExpanded2(index, true)}
                                />
                              )}
                            </td>
                          </tr>
                          {expanded2[index] && (
                            <tr>
                              <td
                                colSpan={8}
                                style={{ padding: "15px 30px 30px 0" }}
                              >
                                <div className="row">
                                  <div className="col-md-2">-</div>
                                  <div className="col-md-2">{user.Clients}</div>
                                  <div className="col-md-7"></div>
                                  <div className="col-md-1 edit-btn">Edit</div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                </tbody>
                <div>
                  <span>
                    View All (
                    {inActive.length - showInActive > 0
                      ? inActive.length - showActive
                      : 0}
                    More)
                  </span>
                  {showInActive === 2 ? (
                    <AiOutlineDown
                      size={15}
                      color="#000000"
                      className="ml-2"
                      onClick={() => setshowInActive(inActive.length)}
                    />
                  ) : (
                    <AiOutlineUp
                      size={15}
                      color="#000000"
                      className="ml-2"
                      onClick={() => setshowInActive(2)}
                    />
                  )}
                </div>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusList;
