import React, { useState } from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import LicenseCharges from "../../Components/LicenseCharges";
import AdditionalSettings from "../../Components/AdditionalSettings";

const ComplainceModule = ({}) => {
  const [tab, setTab] = useState(1);

  return (
    <>
      <div className="card-head">
        <h3 className="px-2">Master pricing</h3>
        <div className="input-group col-md-4">
          <div className="input-group">
            <div className="input-group">
              <span className="input-group-prepend">
                <div className="input-group-text bg-transparent border-right-0 pr-0">
                  <AiOutlineSearch size={15} color="#000000" />
                </div>
              </span>
              <input
                className="form-control py-2 border-left-0 border search-input"
                type="search"
                placeholder="Search for Licenses"
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "start" }}>
        <button
          className={`tabs-btn ${tab === 1 ? "active" : "inactive"} color`}
          onClick={() => setTab(1)}
        >
          License Charges
        </button>
        <button
          className={`tabs-btn ${tab === 2 ? "active" : "inactive"} color`}
          onClick={() => setTab(2)}
        >
          Additional Settings
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          padding: "0 10px",
        }}
      >
        <div
          className="tabs-bottom-line"
          style={{
            borderBottom: "2px solid #6c5dd3",
            width: tab === 1 ? "14%" : "17%",
            position: "absolute",
            marginLeft: tab === 2 ? "15%" : "0",
          }}
        />
        <div
          className="tabs-bottom-line"
          style={{
            borderBottom: "2px solid #b3abc4",
            width: "100%",
          }}
        />
      </div>

      <div className="">
        {tab === 1 ? <LicenseCharges /> : <AdditionalSettings />}
      </div>
    </>
  );
};

export default ComplainceModule;
