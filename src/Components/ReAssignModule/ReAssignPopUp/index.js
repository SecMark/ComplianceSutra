import React, { useState, useReducer, useEffect } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import CloseIcon from '../../../assets/Icons/closeBlack.png';
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import diffInDate from "../../../CommonModules/sharedComponents/Datepicker/utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router";
import {
  clearState,
  getReAssignTasksList
} from "../redux/actions";
import moment from "moment";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
export const ReAssignTasksPopUp = ({ showReAssignTasks, setShowReAssignTasks, teamMemberDetail }) => {
  const [showSelectedUser, setShowSelectedUser] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [isAllInputFilled, setIsAllInputFilled] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);
  const state = useSelector((state) => state);
  console.log(state)
  const history = useHistory();
  const actionDispatch = useDispatch();
  useEffect(() => {
    const usersRequestPayload = {
      userID: state.auth.loginInfo?.UserID,
      usertype: state.auth.loginInfo?.UserType,
    };
    console.log(usersRequestPayload);
    actionDispatch(clearState());
    // actionDispatch(getReAssignTasksList(usersRequestPayload));
  }, [state.auth.loginInfo?.UserID]);
  useEffect(() => {
    setTimeDiff(
      diffInDate(state.ReAssignTasksReducer.from, state.ReAssignTasksReducer.to)
    );
  }, [state.ReAssignTasksReducer]);
  useEffect(() => {
    if (radioValue === 'custom') {
      if (
        state.ReAssignTasksReducer.from !== "" &&
        state.ReAssignTasksReducer.to !== ""
    
      ) {
        setIsAllInputFilled(true);
      } else {
        setIsAllInputFilled(false);
      }
    }
    
  }, [state.ReAssignTasksReducer]);
  const reAssignForm = () => {
    setShowSelectedUser(true);
  }
  const cancelAssignForm = () => {
    setShowSelectedUser(false);
  }
  console.log(teamMemberDetail);
  const handleOnChangeRadio = event => {
    setRadioValue(event.target.value);
  };
  const submitReAssignTasks = () => {
    if (
      radioValue !== "" &&
      state.HistoryReducer.from !== "" &&
      state.HistoryReducer.to !== ""
    ) {
      if (radioValue === "custom") {
        const reAssignTasksPayload = {
          selectValue: '',
          startDate:
            state.ReAssignTasksReducer.from &&
            moment(state.ReAssignTasksReducer.from.join("-"), "DD-M-YYYY").format(
              "YYYY-MM-DD"
            ),
          endDate:
            state.ReAssignTasksReducer.to &&
            moment(state.ReAssignTasksReducer.to.join("-"), "DD-M-YYYY").format(
              "YYYY-MM-DD"
            ),
        };
      }
    
    // actionDispatch(getHistoryList(historyListPayload));
   }
  }
  return (
    <>
      {
        showReAssignTasks ? 
        <Modal show={showReAssignTasks} onHide={setShowReAssignTasks} animation={true} scrollable centered contentClassName="re-assign-modal-content" bsPrefix="re-assign-modal-prefix" dialogClassName="re-assign-modal-dialog">
          {
            !showSelectedUser ?
            <Modal.Header className="re-assign-modal-header">
              <div style={{width: '100%'}}>
                <div className="re-assign-modal-header-content">
                  <h4>Re-assign to</h4>
                  <button className="close" onClick={setShowReAssignTasks}><img src={CloseIcon} alt='close' /></button>
                </div>
                <div className="search-assign-box">
                  <div className="form-group">
                    <input type="text"
                      className="form-control"
                      placeholder="Enter name or email"
                      // onChange={(e) => handleUserSearch(e)}
                      // value={userSearchText} 
                    />
                  </div>
                  <span className="or-devider">or</span>
                  <button className="btn reassign-to-me-btn" >Re-assign to me</button>
                </div>
                <div className="bottom-border-header"></div>
              </div>
            </Modal.Header>
            :
            <Modal.Header className="re-assign-modal-header">
              <div style={{width: '100%'}}>
                <div className="re-assign-modal-header-content">
                  <div className="re-assign-modal-header-selected">
                    <div className="re-assign-email-header-box">
                      <div className="re-assign-email-header-row" >
                        <span className="name-circle-email">AF</span>
                        <span className="last-email">Animesh Morale</span>
                        <span className="close-btn" onClick={() => cancelAssignForm()}>×</span>
                      </div>
                    </div>
                  </div>
                  <button className="close" onClick={setShowReAssignTasks}><img src={CloseIcon} alt='close' /></button>
                </div>
                <div className="bottom-border-header-sec"></div>
              </div>
            </Modal.Header>
          }
          {
            !showSelectedUser ?
            <Modal.Body className="re-assign-modal-body">
              
              {/* <div className="bottom-border-header"></div> */}
              <div className="">
                <div className="re-assign-email-list-box">
                  <div className="re-assign-email-list-row" onClick={() => reAssignForm()}>
                    <span className="name-circle-email">AF</span>
                    <span className="name-of-emailers">ASDF</span>
                    <span className="last-email">SDSSSS@gmail.com</span>
                  </div>
                  <div className="re-assign-email-list-row" onClick={() => reAssignForm()}>
                    <span className="name-circle-email">AF</span>
                    <span className="name-of-emailers">ASDF</span>
                    <span className="last-email">SDSSSS@gmail.com</span>
                  </div>
                  <div className="re-assign-email-list-row" onClick={() => reAssignForm()}>
                    <span className="name-circle-email">AF</span>
                    <span className="name-of-emailers">ASDF</span>
                    <span className="last-email">SDSSSS@gmail.com</span>
                  </div>
                  <div className="re-assign-email-list-row" onClick={() => reAssignForm()}>
                    <span className="name-circle-email">AF</span>
                    <span className="name-of-emailers">ASDF</span>
                    <span className="last-email">SDSSSS@gmail.com</span>
                  </div>
                  <div className="re-assign-email-list-row" onClick={() => reAssignForm()}>
                    <span className="name-circle-email">AF</span>
                    <span className="name-of-emailers">ASDF</span>
                    <span className="last-email">SDSSSS@gmail.com</span>
                  </div>
                  <div className="re-assign-email-list-row" onClick={() => reAssignForm()}>
                    <span className="name-circle-email">AF</span>
                    <span className="name-of-emailers">ASDF</span>
                    <span className="last-email">SDSSSS@gmail.com</span>
                  </div>
                  <div className="re-assign-email-list-row" onClick={() => reAssignForm()}>
                    <span className="name-circle-email">AF</span>
                    <span className="name-of-emailers">ASDF</span>
                    <span className="last-email">SDSSSS@gmail.com</span>
                  </div>
                </div>
              </div>
            </Modal.Body>
            :
            <Modal.Body className="re-assign-modal-body">
              <div className="re-assign-checkbox-list">
                <div className="re-assign-checkbox-list-box">
                  <div className="re-assign-checkbox-list-row">
                    <span className="checkbox-list">
                      <input type="radio" value="once" name="radio1" onChange={handleOnChangeRadio}/>
                    </span>
                    <span className="re-assign-checkbox-list-row-name">Re-assign tasks only once</span>
                    <span className="re-assign-checkbox-list-row-caption">(On leave)</span>
                  </div>
                  <div className="re-assign-checkbox-list-row">
                    <span className="checkbox-list">
                      <input type="radio" value="upcoming" name="radio1" onChange={handleOnChangeRadio}/>
                    </span>
                    <span className="re-assign-checkbox-list-row-name">Re-assign for all upcoming tasks</span>
                    <span className="re-assign-checkbox-list-row-caption">(Transferred/Quit)</span>
                  </div>
                  <div className="re-assign-checkbox-list-row">
                    <span className="checkbox-list">
                      <input type="radio" value="custom" name="radio1" onChange={handleOnChangeRadio}/>
                    </span>
                    <span className="re-assign-checkbox-list-row-name">Custom</span>
                    <span className="re-assign-checkbox-list-row-caption">(On leave/Probation)</span>
                  </div>
                </div>
                {
                  radioValue === 'custom' &&
                  <>
                    <div className="date-picker-box">
                      <label htmlFor="from">
                        From:
                      </label>
                      <Datepicker
                        name="from"
                        dispatch={actionDispatch}
                        actionType="SELECT_FROM_DATE"
                      />
                    </div>

                    <div className="date-picker-box">
                      <label htmlFor="to">
                        To:{" "}
                      </label>
                      <Datepicker
                        name="to"
                        dispatch={actionDispatch}
                        actionType="SELECT_TO_DATE"
                      />
                      {timeDiff > 365 && (
                        <span style={{ color: "red" }}>
                          Range Cannot be more than 1 year
                        </span>
                      )}
                    </div>
                  </>
                }
              </div>
            </Modal.Body>
          }
          {
            showSelectedUser &&
            <Modal.Footer className="re-assign-modal-footer">
              
                {isAllInputFilled && timeDiff < 365 ?
                  <Button variant="primary" onClick={submitReAssignTasks}>
                    RE-ASSIGN
                  </Button>
                  :
                  <Button variant="secondary" disabled>
                    RE-ASSIGN
                  </Button>
                }
              <Button variant="link" onClick={cancelAssignForm}>
                  CANCEL
              </Button>
            </Modal.Footer>
          }
        </Modal>
        :
        <div></div>
      }
    </>
    
  );
};
