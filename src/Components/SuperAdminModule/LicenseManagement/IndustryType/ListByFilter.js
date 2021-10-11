import React from "react";
import { MdExpandMore } from "react-icons/md";
const ListByFilter = ({
  expandedFlags,
  handleExpanedFalgs,
  name,
  count,
  listContainerClass,
  children,
  flag,
}) => {
  return (
    <>
      <div className="license-list__status-item w-100 d-flex align-items-center mt-2 mb-3">
        <h6 className="license-list__status-title mb-0">{name}</h6>
        <div className="license-list__status-count--circle mx-2">
          <span>{count || 0}</span>
        </div>
        <MdExpandMore
          className={`license-list__status-expand-more ${
            expandedFlags.includes(flag) &&
            "license-list__status-expand-more--inverted"
          }`}
          onClick={() => handleExpanedFalgs(flag)}
        />
      </div>
      {expandedFlags.includes(flag) && (
        <div
          className={`${
            listContainerClass || "industry-type__license-list"
          } mb-4`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default ListByFilter;
