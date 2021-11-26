import moment from "moment";
import React, { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import {
  getUpdates,
  removeBadge,
  setFilterPayload,
  setIsFilter,
  updateFilter,
} from "../redux/actions";

import "./style.css";

const NewRegulationSearchBadge = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [filters, setFilters] = useState({
    issuer: [],
    industry: [],
    topic: [],
    from_date: "",
    to_date: "",
  });

  const { industry, issuer, topic, from, to } = state.UpdatesReducer?.badges;

  const clearFilterPayload = () => {
    dispatch(setIsFilter(false));

    dispatch(getUpdates(filters));
  };

  const removeBadgeAndFetchIndustryList = (badgeName) => {
    let removeBadgePayload = {
      key: badgeName,
      value: "",
    };
    console.log(badgeName);
    if (badgeName === "fromAndToDate") {
      removeBadgePayload = {
        key: "from",
        value: "",
      };

      dispatch(removeBadge(removeBadgePayload));

      removeBadgePayload = {
        key: "to",
        value: "",
      };
    }

    dispatch(removeBadge(removeBadgePayload));
    dispatch(updateFilter(removeBadgePayload));
  };

  useEffect(() => {
    const filterRequestPayload = {
      industry:
        state.UpdatesReducer.industry.length > 0
          ? [...state.UpdatesReducer.industry.split(",")]
          : [],
      topic:
        state.UpdatesReducer.topic.length > 0
          ? [...state.UpdatesReducer.topic.split(",")]
          : [],
      issuer:
        state.UpdatesReducer.issuer.length > 0
          ? [...state.UpdatesReducer.issuer.split(",")]
          : [],
      from_date:
        (state.UpdatesReducer.from !== "" &&
          state.UpdatesReducer.from.length !== 0 &&
          state.UpdatesReducer.from.length === 3 &&
          moment(state.UpdatesReducer.from.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          )) ||
        "",
      to_date:
        (state.UpdatesReducer.to !== "" &&
          state.UpdatesReducer.to.length !== 0 &&
          state.UpdatesReducer.to.length === 3 &&
          moment(state.UpdatesReducer.to.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          )) ||
        "",
    };

    dispatch(setFilterPayload({ filter: filterRequestPayload }));
  }, [industry, issuer, topic, from, to]);

  useEffect(() => {
    if (
      issuer === "" &&
      industry === "" &&
      topic === "" &&
      from === "" &&
      to === ""
    ) {
      const payload = { UserID: state.auth.loginInfo?.UserID };
      dispatch(getUpdates(payload));
    }
  }, [state.UpdatesReducer?.badges]);

  return (
    <div className="BadgesWrapper">
      {issuer !== "" && (
        <div className="BadgesDiv">
          <span>{issuer}</span>
          <div
            className="CloseBadge"
            onClick={() => removeBadgeAndFetchIndustryList("issuer")}
          >
            <GrFormClose />
          </div>
        </div>
      )}

      {industry !== "" && (
        <div className="BadgesDiv">
          <span>{industry}</span>
          <div
            className="CloseBadge"
            onClick={() => removeBadgeAndFetchIndustryList("industry")}
          >
            <GrFormClose />
          </div>
        </div>
      )}

      {topic !== "" && (
        <div className="BadgesDiv">
          <span>{topic}</span>
          <div
            className="CloseBadge"
            onClick={() => removeBadgeAndFetchIndustryList("topic")}
          >
            <GrFormClose />
          </div>
        </div>
      )}

      {from !== "" && to !== "" && (
        <div className="BadgesDiv">
          <span>{`${from} to ${to}`}</span>
          <div
            className="CloseBadge"
            onClick={() => removeBadgeAndFetchIndustryList("fromAndToDate")}
          >
            <GrFormClose />
          </div>
        </div>
      )}
      {(issuer !== "" ||
        industry !== "" ||
        topic !== "" ||
        (from !== "" && to !== "")) && (
        <div className="BadgesDiv">
          <span onClick={clearFilterPayload}>Reset all</span>
          <div className="CloseBadge">
            <GrFormClose />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewRegulationSearchBadge;
