import React from "react";
import "./style.css";

function DeActivateAccountModal({ closeModal }) {
  const close = () => {
    closeModal();
  };
  return (
    <div className="modal-subscription-container">
      <div className="modal-subscription-main">
        <div className="modal-subscription-content">
          <div className="modal--subscription-body-container">
            <div className="subscription-header">
              <h3>De-activate account?</h3>
            </div>
            <div className="subscription-confirm">
              <h3>
                When your accout is deactivated, you'll be logged out. Your team
                members won't be able to access the tool until and unless you
                log back into your account and reactivate it.
              </h3>
            </div>
          </div>

          <div className="confirm-buttons">
            <button className="cancel-button" onClick={close}>
              CANCEL
            </button>
            <button
              className="delete-button"
              onClick={() => {
                // setIsDeactivatedAccount(true);
                close();
              }}
            >
              DEACTIVATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeActivateAccountModal;
