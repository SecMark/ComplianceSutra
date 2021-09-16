import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Searchable from "react-searchable-dropdown";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import {
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

const NewRegulationFilter = (props) => {
  const [isAllInputFilled, setIsAllInputFilled] = useState(false);
  const [listOfIndustries, setListOfIndustry] = useState([]);
  const [listOfIssuers, setListOfIssuers] = useState([]);
  const [listOfTopic, setListOfTopic] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { industryList, issuerList, topicList } = state.UpdatesReducer;

  useEffect(() => {
    //set industry list for searchable dropdown.
    var setArrayOfObjectInList = industryList?.map((item) => {
      return { value: item.Industry, label: item.Industry };
    });
    setListOfIndustry([...setArrayOfObjectInList]);

    //set issuer list for searchable dropdown.
    var setArrayOfObjectInList = issuerList.map((item) => {
      return { value: item.Regbodies, label: item.Regbodies };
    });
    setListOfIssuers([...setArrayOfObjectInList]);

    //set topic list for searchable dropdown.
    var setArrayOfObjectInList = topicList.map((item) => {
      return { value: item.Topic, label: item.Topic };
    });

    setListOfTopic([...setArrayOfObjectInList]);
  }, []);

  useEffect(() => {
    if (
      (state.UpdatesReducer.from !== "" &&
        state.UpdatesReducer.from.length !== 0 &&
        state.UpdatesReducer.from.length === 3 &&
        isSameOrBeforeToday(state.UpdatesReducer.from)) ||
      (state.UpdatesReducer.to !== "" &&
        state.UpdatesReducer.to.length !== 0 &&
        state.UpdatesReducer.to.length === 3 &&
        isSameOrBeforeToday(state.UpdatesReducer.to)) ||
      state.UpdatesReducer.industry !== "" ||
      state.UpdatesReducer.issuer !== "" ||
      state.UpdatesReducer.topic !== ""
    ) {
      setIsAllInputFilled(true);
    } else if (
      state.UpdatesReducer.from !== "" &&
      state.UpdatesReducer.from.length !== 0 &&
      state.UpdatesReducer.from.length === 3 &&
      isSameOrBeforeToday(state.UpdatesReducer.from) &&
      state.UpdatesReducer.to !== "" &&
      state.UpdatesReducer.to.length !== 0 &&
      state.UpdatesReducer.to.length === 3 &&
      isSameOrBeforeToday(state.UpdatesReducer.to) &&
      !isDifferenceIsMoreThanOneYear(
        state.UpdatesReducer.from,
        state.UpdatesReducer.to
      ) &&
      !isToDateBeforeFromDate(
        state.UpdatesReducer.from,
        state.UpdatesReducer.to
      )
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
      submissionfrom:
        (state.UpdatesReducer.from !== "" &&
          state.UpdatesReducer.from.length !== 0 &&
          state.UpdatesReducer.from.length === 3 &&
          moment(state.UpdatesReducer.from.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          )) ||
        "",
      submissionto:
        (state.UpdatesReducer.to !== "" &&
          state.UpdatesReducer.to.length !== 0 &&
          state.UpdatesReducer.to.length === 3 &&
          moment(state.UpdatesReducer.to.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          )) ||
        "",
      flag: constant.filterFlag,
    };

    const setBagdesPayload = {
      industry: state.UpdatesReducer.industry,
      topic: state.UpdatesReducer.topic,
      issuer: state.UpdatesReducer.issuer,
      fromDate:
        (state.UpdatesReducer.to !== "" &&
          state.UpdatesReducer.to.length !== 0 &&
          state.UpdatesReducer.to.length === 3 &&
          moment(state.UpdatesReducer.from.join("-"), "DD-M-YYYY").format(
            "MMM Do YYYY"
          )) ||
        "",
      toDate:
        (state.UpdatesReducer.to !== "" &&
          state.UpdatesReducer.to.length !== 0 &&
          state.UpdatesReducer.to.length === 3 &&
          moment(state.UpdatesReducer.to.join("-"), "DD-M-YYYY").format(
            "MMM Do YYYY"
          )) ||
        "",
    };

    dispatch(setBadges(setBagdesPayload));
    dispatch(setFilterPayload(filterRequestPayload));
    dispatch(setIsFilter(true));
    props.setIsShowFilter(!props.isShowFilter);
    props.setIsShowMobileFilter(!props.isShowMobileFilter);
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
          onSelect={(event) => dispatch(setIssuer(event.toString()))}
          multiple={true}
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
          onSelect={(event) => dispatch(setIndustry(event.toString()))}
          multiple={true}
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
          onSelect={(event) => dispatch(setTopic(event.toString()))}
          multiple={true}
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
