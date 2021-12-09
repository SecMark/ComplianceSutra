import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./style.css";

const Loading = ({ isInline, isSmall }) => {
  return (
    <div className={!isInline ? "loader" : "loader-inline"}>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={!isSmall ? 50 : 25}
        width={!isSmall ? 100 : 50}
      />
    </div>
  );
};

export default Loading;
