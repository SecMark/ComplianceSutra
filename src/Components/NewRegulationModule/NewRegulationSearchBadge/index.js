import moment from "moment";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, getUpdates, setIsFilter } from "../redux/actions";

import "./style.css";

const NewRegulationSearchBadge = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { industry, issuer, topic, from, to } = state.UpdatesReducer;

  const clearFilterPayload = () => {
    const payload = { UserID: state.auth.loginInfo?.UserID };
    dispatch(getUpdates(payload));
    dispatch(setIsFilter(false));
  };
  return (
    <div className="BadgesWrapper">
      <div className="BadgesDiv">
        <span>{issuer}</span>
        <div className="CloseBadge">
          <GrFormClose />
        </div>
      </div>
      <div className="BadgesDiv">
        <span>{industry}</span>
        <div className="CloseBadge">
          <GrFormClose />
        </div>
      </div>
      <div className="BadgesDiv">
        <span>{topic}</span>
        <div className="CloseBadge">
          <GrFormClose />
        </div>
      </div>
      <div className="BadgesDiv">
        <span>
          {moment(from.join("-"), "DD-MM-YYYY").format("MMM Do YYYY") +
            " to " +
            moment(to.join("-"), "DD-MM-YYYY").format("MMM Do YYYY")}
        </span>
        <div className="CloseBadge">
          <GrFormClose />
        </div>
      </div>

      <div className="BadgesDiv">
        <span onClick={clearFilterPayload}>Reset all</span>
        <div className="CloseBadge">
          <GrFormClose />
        </div>
      </div>
    </div>
  );
};

export default NewRegulationSearchBadge;
