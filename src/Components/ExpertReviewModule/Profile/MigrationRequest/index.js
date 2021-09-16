import React, { useState } from "react";
import Modal from "react-responsive-modal";
import Datepicker from "../../../../CommonModules/sharedComponents/Datepicker";
import Searchable from "react-searchable-dropdown";
import "./style.css";

const MigrationRequest = (props) => {
  const [openMigrateModal, setOpenMigrateModal] = useState(false);
  
  return (
    <div className="migration-request-container">
      <h2 className="migration-header">Migration Requests</h2>

      <Modal
        classNames={{
          overlayAnimationIn: "",
          overlayAnimationOut: "",
          modalAnimationIn: "",
          modalAnimationOut: "",
        }}
        open={openMigrateModal}
        center={true}
        showCloseIcon={false}
        onClose={() => setOpenMigrateModal(false)}
        modalId="MigrationRequest"
        onOverlayClick={() => setOpenMigrateModal(false)}
      >
        <div className="migration-request-model">
          <div className="title">New Migration Request</div>
          <p className="subtitle-sescription">
            Add details to submit your migration request
          </p>
          <div>
            <div className="row">
              <div className="col-md-3">
                <label>Date Range</label>
              </div>
              <div className="col">
                <Datepicker name="From" className="form-control" />
              </div>
              <div className="col">
                <Datepicker name="To" />
              </div>
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-md-3">
                <label>Reason for Request</label>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col-md-6">
                    <Searchable
                      className=""
                      placeholder="Select Topic"
                      notFoundText="No result found"
                      listMaxHeight={200}
                      multiple={true}
                    />
                  </div>
                </div>

                <textarea
                  className="form-control"
                  style={{ marginTop: "20px" }}
                />
              </div>
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-md-3">
                <label>Assing Work To</label>
              </div>
              <div className="col-md-4">
                <Searchable
                  className=""
                  placeholder="Select Topic"
                  notFoundText="No result found"
                  listMaxHeight={200}
                  multiple={true}
                />
              </div>
            </div>
            <div style={{ marginTop: "40px" }}>
              <button className="submit-request">submit request</button>

              <button
                className="decline-request"
                onClick={() => setOpenMigrateModal(false)}
              >
                decline request
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="migration-request-list">
        <div className="migration-request-list">
          <table className="table borderless">
            <thead>
              <th>Request Date</th>
              <th>Reason of migration</th>
              <th>Task assigned to</th>
              <th>Status</th>
            </thead>
            <tbody>
              <tr>
                <td>31 Jan 2021</td>
                <td>
                  High Fever : Was suffering due to high fever along wi...
                </td>
                <td>Parkash Sharma</td>
                <td>
                  <button className="migration-list-status">approve</button>
                </td>
              </tr>
              <tr>
                <td>31 Jan 2021</td>
                <td>
                  High Fever : Was suffering due to high fever along wi...
                </td>
                <td>Parkash Sharma</td>
                <td>
                  <button className="migration-list-status">approve</button>
                </td>
              </tr>
            </tbody>
          </table>

          <button
            className="submit-new-request"
            onClick={() => setOpenMigrateModal(true)}
          >
            submit a new request
          </button>
        </div>
      </div>
    </div>
  );
};

export default MigrationRequest;
