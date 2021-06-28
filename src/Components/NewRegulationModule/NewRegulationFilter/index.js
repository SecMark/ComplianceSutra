import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Searchable from "react-searchable-dropdown";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import {
  getIndustryList,
  getIssuerList,
  getTopicList,
  setFilterPayload,
  setIndustry,
  setIsFilter,
  setIssuer,
  setTopic,
} from "../redux/actions";
import moment from "moment";

import "./style.css";

const NewRegulationFilter = ({ label }) => {
  const [listOfIndustries, setListOfIndustry] = useState([]);
  const [listOfIssuers, setListOfIssuers] = useState([]);
  const [listOfTopic, setListOfTopic] = useState([]);
  const [isAllInputFilled, setIsAllInputFilled] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  //deconstruct updates reducer state values.
  const { industryList, issuerList, topicList } = state.UpdatesReducer;

  useEffect(() => {
    const industryListRequestPayload = {
      userID: state.auth.loginInfo?.UserID,
      industry: constant.flag,
    };

    //get issuer list.
    dispatch(getIndustryList(industryListRequestPayload));
    //set industry list for searchable dropdown.
    const setArrayOfObjectInList = industryList.map((item) => {
      return { value: item.Industry, label: item.Industry };
    });
    setListOfIndustry([...setArrayOfObjectInList]);
  }, [state.auth.loginInfo?.UserID]);

  useEffect(() => {
    const issuerListRequestPayload = {
      userID: state.auth.loginInfo?.UserID,
      regbodies: constant.flag,
    };

    //get issuer list.
    dispatch(getIssuerList(issuerListRequestPayload));
    //set issuer list for searchable dropdown.
    const setArrayOfObjectInList = issuerList.map((item) => {
      return { value: item.Regbodies, label: item.Regbodies };
    });

    setListOfIssuers([...setArrayOfObjectInList]);
  }, [state.auth.loginInfo?.UserID]);

  useEffect(() => {
    const topicListRequestPayload = {
      userID: state.auth.loginInfo?.UserID,
      topic: constant.flag,
    };

    //get topic list.
    dispatch(getTopicList(topicListRequestPayload));
    //set topic list for searchable dropdown.
    const setArrayOfObjectInList = topicList.map((item) => {
      return { value: item.Topic, label: item.Topic };
    });
    setListOfTopic([...setArrayOfObjectInList]);
  }, [state.auth.loginInfo?.UserID]);

  useEffect(() => {
    if (
      state.UpdatesReducer.from !== "" &&
      state.UpdatesReducer.to !== "" &&
      state.UpdatesReducer.industry !== "" &&
      state.UpdatesReducer.issuer !== "" &&
      state.UpdatesReducer.topic !== ""
    ) {
      setIsAllInputFilled(true);
    } else {
      setIsAllInputFilled(false);
    }
  }, [state.UpdatesReducer]);

  const getResultByFilter = () => {
    const filterRequestPayload = {
      userID: state.auth.loginInfo?.UserID,
      industry: state.UpdatesReducer.industry,
      topic: state.UpdatesReducer.topic,
      regbodies: state.UpdatesReducer.issuer,
      submissionfrom: moment(
        state.UpdatesReducer.from.join("-"),
        "DD-M-YYYY"
      ).format("YYYY-MM-DD"),
      submissionto: moment(
        state.UpdatesReducer.to.join("-"),
        "DD-M-YYYY"
      ).format("YYYY-MM-DD"),
      flag: constant.filterFlag,
    };

    dispatch(setFilterPayload(filterRequestPayload));
    dispatch(setIsFilter(true));
  };

  return (
    <div className="filter-form">
      <div>
        <label>Issuer</label>
        <Searchable
          className="search-dropdown"
          placeholder="Select issuer"
          notFoundText="No result found"
          listMaxHeight={200}
          options={listOfIssuers}
          onSelect={(event) => dispatch(setIssuer(event))}
        />
      </div>
      <div>
        <label>Industry</label>
        <Searchable
          className="l"
          placeholder="Select Industry"
          notFoundText="No result found"
          listMaxHeight={200}
          options={listOfIndustries}
          onSelect={(event) => dispatch(setIndustry(event))}
        />
      </div>
      <div>
        <label>Topic</label>
        <Searchable
          className=""
          placeholder="Select Topic"
          notFoundText="No result found"
          listMaxHeight={200}
          options={listOfTopic}
          onSelect={(event) => dispatch(setTopic(event))}
        />
      </div>
      <div>
        <label>From</label>
        <Datepicker
          pageName="newRegulation"
          dispatch={dispatch}
          actionType="SET_TO_DATE"
          name="from"
        />
      </div>
      <div>
        <label>To</label>
        <Datepicker
          pageName="newRegulation"
          dispatch={dispatch}
          actionType="SET_FROM_DATE"
          name="to"
        />
      </div>

      {isAllInputFilled ? (
        <button className="view-updates-active" onClick={getResultByFilter}>
          View Updates
        </button>
      ) : (
        <button className="view-updates" onClick={getResultByFilter}>
          View Updates
        </button>
      )}
    </div>
  );
};

export default NewRegulationFilter;
