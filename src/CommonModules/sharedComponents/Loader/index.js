import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./style.css";

const Loading = (props) => {
  return (
    <div className="loader">
      <Loader type="Puff" color="#00BFFF" height={50} width={100} />
    </div>
  );
};

export default Loading;
