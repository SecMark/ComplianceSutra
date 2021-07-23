import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Searchable from "react-searchable-dropdown";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import {
  getIndustryList,
  getIssuerList,
  getTopicList,
  setBadges,
  setFilterPayload,
  setIndustry,
  setIsFilter,
  setIssuer,
  setTopic,
} from "../redux/actions";
import moment from "moment";
import {
  isDifferenceIsMoreThanOneYear,
  isSameOrBeforeToday,
  isMoreThanOneYearFromToday,
  isToDateBeforeFromDate,
} from "../../ReAssignTasks/utilties";
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
    const setArrayOfObjectInList = industryList?.map((item) => {
      return { value: item.Industry, label: item.Industry };
    });
    setListOfIndustry([...setArrayOfObjectInList]);
  }, [false]);

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
  }, [false]);

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
  }, [false]);

  useEffect(() => {
    if (
      state.UpdatesReducer.from !== "" &&
      state.UpdatesReducer.from.length !== 0 &&
      state.UpdatesReducer.from.length === 3 &&
      state.UpdatesReducer.to !== "" &&
      state.UpdatesReducer.to.length !== 0 &&
      state.UpdatesReducer.to.length === 3 &&
      isSameOrBeforeToday(state.UpdatesReducer.from) &&
      !isMoreThanOneYearFromToday(state.UpdatesReducer.from) &&
      isSameOrBeforeToday(state.UpdatesReducer.to) &&
      !isMoreThanOneYearFromToday(state.UpdatesReducer.to) &&
      !isDifferenceIsMoreThanOneYear(
        state.UpdatesReducer.from,
        state.UpdatesReducer.to
      ) &&
      !isToDateBeforeFromDate(
        state.UpdatesReducer.from,
        state.UpdatesReducer.to
      ) &&
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

    const setBagdesPayload = {
      industry: state.UpdatesReducer.industry,
      topic: state.UpdatesReducer.topic,
      issuer: state.UpdatesReducer.issuer,
      fromAndToDate: `${moment(
        state.UpdatesReducer.from.join("-"),
        "DD-M-YYYY"
      ).format("MMM Do YYYY")} to ${moment(
        state.UpdatesReducer.to.join("-"),
        "DD-M-YYYY"
      ).format("MMM Do YYYY")}`,
    };

    dispatch(setBadges(setBagdesPayload));
    dispatch(setFilterPayload(filterRequestPayload));
    dispatch(setIsFilter(true));
  };
  useEffect(() => {
    console.log("from: ", state.UpdatesReducer.from);
    if (
      state.UpdatesReducer.from !== "" &&
      state.UpdatesReducer.from.length === 3
    ) {
      console.log(
        "isSameOrBeforeToday: ",
        isSameOrBeforeToday(state.UpdatesReducer.from)
      );
    }
    console.log("to: ", state.UpdatesReducer.to);
  }, [state.UpdatesReducer.from, state.UpdatesReducer.to]);

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
          actionType="SET_FROM_DATE"
          name="from"
        />
        <p className="warnings">
          {state.UpdatesReducer.from !== "" &&
            state.UpdatesReducer.from.length === 3 &&
            !isSameOrBeforeToday(state.UpdatesReducer.from) !== undefined &&
            !isSameOrBeforeToday(state.UpdatesReducer.from) && (
              <small className="d-block">
                {"* " + constant.errorMessage.errorDueToGreaterDate}
              </small>
            )}
          {state.UpdatesReducer.from !== "" &&
            state.UpdatesReducer.from.length === 3 &&
            isMoreThanOneYearFromToday(state.UpdatesReducer.from) !==
              undefined &&
            isMoreThanOneYearFromToday(state.UpdatesReducer.from) && (
              <small className="d-block">
                {"* " +
                  constant.errorMessage.errorDueToMoreThanOneYearDateFromToday}
              </small>
            )}
        </p>
      </div>
      <div>
        <label>To</label>
        <Datepicker
          pageName="newRegulation"
          dispatch={dispatch}
          actionType="SET_TO_DATE"
          name="to"
        />
        <p className="warnings">
          {state.UpdatesReducer.to !== "" &&
            state.UpdatesReducer.to.length === 3 &&
            !isSameOrBeforeToday(state.UpdatesReducer.to) !== undefined &&
            !isSameOrBeforeToday(state.UpdatesReducer.to) && (
              <small className="d-block">
                {"* " + constant.errorMessage.errorDueToGreaterDate}
              </small>
            )}
          {state.UpdatesReducer.to !== "" &&
            state.UpdatesReducer.to.length === 3 &&
            isMoreThanOneYearFromToday(state.UpdatesReducer.to) !== undefined &&
            isMoreThanOneYearFromToday(state.UpdatesReducer.to) && (
              <small className="d-block">
                {"* " +
                  constant.errorMessage.errorDueToMoreThanOneYearDateFromToday}
              </small>
            )}
          {state.UpdatesReducer.to !== "" &&
            state.UpdatesReducer.to.length === 3 &&
            state.UpdatesReducer.from !== "" &&
            state.UpdatesReducer.from.length === 3 &&
            isDifferenceIsMoreThanOneYear(
              state.UpdatesReducer.from,
              state.UpdatesReducer.to
            ) !== undefined &&
            isDifferenceIsMoreThanOneYear(
              state.UpdatesReducer.from,
              state.UpdatesReducer.to
            ) && (
              <small className="d-block">
                {"* " + constant.errorMessage.errorDueToRange}
              </small>
            )}
          {state.UpdatesReducer.to !== "" &&
            state.UpdatesReducer.to.length === 3 &&
            state.UpdatesReducer.from !== "" &&
            state.UpdatesReducer.from.length === 3 &&
            isToDateBeforeFromDate(
              state.UpdatesReducer.from,
              state.UpdatesReducer.to
            ) !== undefined &&
            isToDateBeforeFromDate(
              state.UpdatesReducer.from,
              state.UpdatesReducer.to
            ) && (
              <small className="d-block">
                {"* " +
                  constant.errorMessage.errorDueToReverseDate +
                  moment(
                    state.UpdatesReducer.from.join("-"),
                    "DD-MM-YYYY"
                  ).format("D MMMM YYYY")}
              </small>
            )}
        </p>
      </div>
      <button
        className={`view-updates ${isAllInputFilled && "view-updates-active"}`}
        onClick={getResultByFilter}
      >
        View Updates
      </button>
    </div>
  );
};

export default NewRegulationFilter;
