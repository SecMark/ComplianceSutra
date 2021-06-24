import React, { useState, useReducer, useEffect } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import diffInDate from "../../../CommonModules/sharedComponents/Datepicker/utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
export const ReAssignTasksPopUp = ({ showReAssignTasks, setShowReAssignTasks, teamMemberDetail }) => {
  const [showSelectedUser, setShowSelectedUser] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);
  const state = useSelector((state) => state);
  console.log(state)
  const history = useHistory();
  const actionDispatch = useDispatch();
  useEffect(() => {
    setTimeDiff(
      diffInDate(state.ReAssignTasksReducer.from, state.ReAssignTasksReducer.to)
    );
  }, [state.ReAssignTasksReducer]);
  const reAssignForm = () => {
    setShowSelectedUser(true);
  }
  const cancelAssignForm = () => {
    setShowSelectedUser(false);
  }
  return (
    <>
      {
        showReAssignTasks ? 
        <Modal show={showReAssignTasks} onHide={setShowReAssignTasks} animation={true} scrollable centered>
          {
            !showSelectedUser ?
            <Modal.Header className="re-assign-modal-header">
              <div style={{width: '100%'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <h4>Re-assign to</h4>
                  <button className="close" onClick={setShowReAssignTasks}>×</button>
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
                  <span className="or-devider"> or</span>
                  <button className="btn reassign-to-me-btn" >Re-assign to me</button>
                </div>
              </div>
            </Modal.Header>
            :
            <Modal.Header closeButton className="re-assign-modal-header">
              <div className="re-assign-modal-header-selected">
                <div className="re-assign-email-header-box">
                  <div className="re-assign-email-header-row" >
                    <span className="name-circle-email">AF</span>
                    <span className="last-email">SDSSSS@gmail.com</span>
                    <span className="close-btn" onClick={() => cancelAssignForm()}>×</span>
                  </div>
                </div>
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
              <div className="bottom-border-header-sec"></div>
              <div className="re-assign-checkbox-list">
                <div className="re-assign-checkbox-list-box">
                  <div className="re-assign-checkbox-list-row">
                    <span className="checkbox-list">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" />
                      </Form.Group>
                    </span>
                    <span className="re-assign-checkbox-list-row-name">Re-assign tasks only once</span>
                    <span className="last-email">(On leave)</span>
                  </div>
                  <div className="re-assign-checkbox-list-row">
                    <span className="checkbox-list">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" />
                      </Form.Group>
                    </span>
                    <span className="re-assign-checkbox-list-row-name">Re-assign for all upcoming tasks</span>
                    <span className="last-email">(Transferred/Quit)</span>
                  </div>
                  <div className="re-assign-checkbox-list-row">
                    <span className="checkbox-list">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" />
                      </Form.Group>
                    </span>
                    <span className="re-assign-checkbox-list-row-name">Custom</span>
                    <span className="last-email">(On leave/Probation)</span>
                  </div>
                </div>
                <>
                  <div style={{ marginTop: "20px", display: 'flex', alignItems:'center' }}>
                    <label htmlFor="from" style={{ width: 55}}>
                      From:
                    </label>
                    <Datepicker
                      name="from"
                      dispatch={actionDispatch}
                      actionType="SELECT_FROM_DATE"
                    />
                  </div>

                  <div style={{ marginTop: "20px", display: 'flex' }}>
                    <label htmlFor="to" style={{ width: 55}}>
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
              </div>
            </Modal.Body>
          }
          {
            showSelectedUser &&
            <Modal.Footer className="re-assign-modal-footer">
              
                {
                  timeDiff < 365 ?
                    <Button variant="primary" onClick={setShowReAssignTasks}>
                      RE-ASSIGN
                    </Button>
                    :
                    <Button variant="secondary" onClick={setShowReAssignTasks} disabled>
                      RE-ASSIGN
                    </Button>
                }
              <Button variant="link" onClick={setShowReAssignTasks}>
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
