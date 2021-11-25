import moment from "moment";
import React, { useEffect } from "react";
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
  const { industry, issuer, topic, from_date, to_date } =
    state.UpdatesReducer?.badges;

  const clearFilterPayload = () => {
    dispatch(setIsFilter(false));
    const payload = { UserID: state.auth.loginInfo?.UserID };
    dispatch(getUpdates(payload));
  };

  const removeBadgeAndFetchIndustryList = (badgeName) => {
    let removeBadgePayload = {
      key: badgeName,
      value: "",
    };
    dispatch(removeBadge(removeBadgePayload));

    dispatch(updateFilter(removeBadgePayload));

    const filterRequestPayload = {
      userID: state.auth.loginInfo?.UserID,
      industry: state.UpdatesReducer.industry,
      topic: state.UpdatesReducer.topic,
      regbodies: state.UpdatesReducer.issuer,
      submissionfrom:
        state.UpdatesReducer.from !== "" &&
        state.UpdatesReducer.from.length !== 0 &&
        state.UpdatesReducer.from.length === 3 &&
        moment(state.UpdatesReducer.from.join("-"), "DD-M-YYYY").format(
          "YYYY-MM-DD"
        ),
      submissionto:
        state.UpdatesReducer.to !== "" &&
        state.UpdatesReducer.to.length !== 0 &&
        state.UpdatesReducer.to.length === 3 &&
        moment(state.UpdatesReducer.to.join("-"), "DD-M-YYYY").format(
          "YYYY-MM-DD"
        ),
      flag: constant.filterFlag,
    };

    dispatch(setFilterPayload(filterRequestPayload));
  };
  useEffect(() => {
    console.log({ industry, issuer, topic, from_date, to_date });
  }, [industry, issuer, topic, from_date, to_date]);
  useEffect(() => {
    if (
      issuer === "" &&
      industry === "" &&
      topic === "" &&
      from_date === "" &&
      to_date === ""
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

      {from_date !== "" && to_date !== "" && (
        <div className="BadgesDiv">
          <span>{`${from_date} to ${to_date}`}</span>
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
        (from_date !== "" && to_date !== "")) && (
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
