import React from "react";
import auditInfo from "../../constants/CardData";
import Cards from "./Cards";

const AuditLandingPages = () => {
  return (
    <>
      {auditInfo.map((item, index) => (
        <Cards item={item} index={index} />
      ))}
    </>
  );
};

export default AuditLandingPages;
