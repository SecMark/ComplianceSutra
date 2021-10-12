import React, { useState } from "react";
import { MdAddBox, MdExpandMore } from "react-icons/md";
import CompaniesSortByAlphabatically from "./CompaniesSortByAlphabatically";
import CompaniesSortByLicenses from "./CompaniesSortByLicenses";
import CompaniesSortByTypes from "./CompaniesSortByTypes";
export const companyTypes = [
  {
    id: "brokers",
    name: "Brokers",
  },
  {
    id: "dp",
    name: "Depository Participants",
  },
  {
    id: "gen",
    name: "Genral",
  },
];
export const licenseTypes = [
  {
    id: "gst",
    name: "Goods and Service Tax",
  },
  {
    id: "nse",
    name: "National Stock Exchange",
  },
  {
    id: "bse",
    name: "Bombay Stock Exchange",
  },
  {
    id: "pf",
    name: "Portfolio Management",
  },
  {
    id: "servicetax",
    name: "Service Taxes",
  },
];
const ClientCompanies = () => {
  const [sortBy, setSortBy] = useState("alphabatically");
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
          &nbsp;add new subsidary
        </button>
        <div className="cs__sort-by">
          <span className="cs__sort-by--item mr-2">sort by</span>
          {["alphabatically", "company type", "licenses"].map((filter) => (
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
        {sortBy === "alphabatically" && <CompaniesSortByAlphabatically />}
        {sortBy === "company type" && (
          <CompaniesSortByTypes
            expandFlagHandler={handleExpandFlag}
            countDetails={countDetails}
            expandedFlags={expandedFlags}
            companyTypes={companyTypes}
            expandViewAllFlagHandler={handleViewAllExpandFlag}
            expandViewAllFlags={expandedViewAllFlags}
          />
        )}
        {sortBy === "licenses" && (
          <CompaniesSortByLicenses
            expandFlagHandler={handleExpandFlag}
            countDetails={countDetails}
            expandedFlags={expandedFlags}
            companyTypes={companyTypes}
            expandViewAllFlagHandler={handleViewAllExpandFlag}
            expandViewAllFlags={expandedViewAllFlags}
          />
        )}
      </div>
    </>
  );
};

export default ClientCompanies;
