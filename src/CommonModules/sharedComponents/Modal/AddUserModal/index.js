import React, { useEffect, useState } from "react";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import { AiOutlineInfo } from "react-icons/ai";
import cross from "../../../../assets/Icons/closeIcon1.png";

import "./style.css";

function AddUserModal({ setAddUser, setAddUserCount }) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count < 0) setCount(0);
  }, [count]);

  return (
    <div className="modal-container">
      <div className="modal-main">
        <div className="modal-content">
          <div className="modal-body-container">
            <div className="header">
              <h3>Add User</h3>
              <img src={cross} alt="" onClick={() => setAddUser(false)} />
            </div>
            <div className="select-section">
              <button className="info-button">
                <AiOutlineInfo />
              </button>
              <span className="select-user">
                you can only select users in a batch of 5
              </span>
            </div>
            <div className="counter-buttons">
              <button
                className="counter"
                onClick={() => {
                  setCount((count) => count - 5);
                  setAddUserCount((count) => count - 5);
                }}
              >
                <HiMinusSm />
              </button>
              <h2 className="counter-count">{count < 0 ? 0 : count}</h2>
              <button
                className="counter"
                onClick={() => {
                  setCount((count) => count + 5);
                  setAddUserCount((count) => count + 5);
                }}
              >
                <HiPlus />
              </button>
            </div>

            <div className="account-info">
              <div>
                <span>Amount to pay</span>
                <h3>₹5,000</h3>
              </div>
              <button className="procced-buy">Procceed to buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserModal;
