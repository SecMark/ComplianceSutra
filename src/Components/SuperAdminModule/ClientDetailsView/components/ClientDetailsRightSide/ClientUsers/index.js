import React, { useState } from "react";
import { MdAddBox } from "react-icons/md";
import UsersSortByCompanyName from "./UsersSortByCompanyName";
import UsersSortByName from "./UsersSortByName";
import UsersSortByRole from "./UsersSortByRole";

const ClientUsers = () => {
  const [sortBy, setSortBy] = useState("name");
  const [expandedFlags, setExpandedFlags] = useState(["brokers"]);
  const [expandedViewAllFlags, setExpandedViewAllFlags] = useState([]);
  const [countDetails, setCountDetails] = useState({
    byCompanyType: {},
    byLicenses: {},
  });
  const handleExpandFlag = (name) => {
    if (!expandedFlags.includes(name)) {
      setExpandedFlags([...expandedFlags, name]);
    } else if (expandedFlags.includes(name)) {
      setExpandedFlags([...expandedFlags].filter((flag) => flag !== name));
    }
  };
  const handleViewAllExpandFlag = (name) => {
    if (expandedFlags.includes(name)) {
      if (!expandedViewAllFlags.includes(name)) {
        setExpandedViewAllFlags([...expandedViewAllFlags, name]);
      } else if (expandedViewAllFlags.includes(name)) {
        setExpandedViewAllFlags(
          [...expandedViewAllFlags].filter((flag) => flag !== name)
        );
      }
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-end w-100">
        <button className="cs__button cs__button--stroke d-flex align-items-center">
          <MdAddBox />
          &nbsp;add new user
        </button>
        <div className="cs__sort-by">
          <span className="cs__sort-by--item mr-2">sort by</span>
          {["name", "company name", "role"].map((filter) => (
            <span
              className={`cs__sort-by--item cs__sort-by-filter ${
                sortBy === filter && "cs__sort-by-filter--active"
              }`}
              onClick={() => setSortBy(filter)}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>
      <div className="col-12 col-md-12 mt-4">
        <table></table>
        {sortBy === "name" && <UsersSortByName />}
        {sortBy === "company name" && (
          <UsersSortByCompanyName
            expandFlagHandler={handleExpandFlag}
            countDetails={countDetails}
            expandedFlags={expandedFlags}
            // companyTypes={companyTypes}
            expandViewAllFlagHandler={handleViewAllExpandFlag}
            expandViewAllFlags={expandedViewAllFlags}
          />
        )}
        {sortBy === "role" && (
          <UsersSortByRole
            expandFlagHandler={handleExpandFlag}
            countDetails={countDetails}
            expandedFlags={expandedFlags}
            // companyTypes={companyTypes}
            expandViewAllFlagHandler={handleViewAllExpandFlag}
            expandViewAllFlags={expandedViewAllFlags}
          />
        )}
      </div>
    </>
  );
};

export default ClientUsers;
