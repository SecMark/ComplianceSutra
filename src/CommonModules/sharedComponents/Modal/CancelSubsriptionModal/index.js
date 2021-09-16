import React from "react";
import "./style.css";

function CancelSubscriptionModal({ closeModal, setIsPaidMember }) {
  const close = () => {
    closeModal();
  };
  return (
    <div className="modal-subscription-container">
      <div className="modal-subscription-main">
        <div className="modal-subscription-content">
          <div className="modal--subscription-body-container">
            <div className="subscription-header">
              <h3>Cancel subscription?</h3>
            </div>
            <div className="subscription-confirm">
              <h3>
                This will cancel your subscription. Are you sure you want to
                continue?
              </h3>
            </div>
          </div>

          <div className="confirm-buttons">
            <button className="cancel-button" onClick={close}>
              Cancel
            </button>
            <button
              className="delete-button"
              onClick={() => {
                setIsPaidMember(false);
                close();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelSubscriptionModal;
