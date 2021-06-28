import React, { useState, useReducer, useEffect } from "react";
import filter from "../../../assets/Icons/Filters.png";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import filterImage from "../../../assets/Icons/filter_background.png";
import { withRouter } from "react-router";
import { ImSearch } from "react-icons/im";

import { useDispatch, useSelector } from "react-redux";
import { clearFilter, getUpdates } from "../redux/actions";
import Loading from "../../../CommonModules/sharedComponents/Loader";
import moment from "moment";

import NewRegulationDetail from "../NewRegulationDetail";
import NewRegulationFilter from "../NewRegulationFilter";
import NoResultFound from "../../../CommonModules/sharedComponents/NoResultFound";
import NewRegulationSearchResult from "../NewRegulationSearchResult";

import "./style.css";
import NewRegulationSearchBadge from "../NewRegulationSearchBadge";

const NewRegulations = (props) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowRegulationDetail, setIsShowRegulationDetail] = useState(false);
  const [newRegulationDetail, setNewRegulationDetail] = useState({});

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isSuccess, isLoading, updateList, isFilterApplied, isSearch } =
    state.UpdatesReducer;

  //clear filter
  useEffect(() => {
    dispatch(clearFilter());
  }, []);
  
  useEffect(() => {
    const payload = { UserID: state.auth.loginInfo?.UserID };
    dispatch(getUpdates(payload));
  }, [state.auth.loginInfo?.UserID]);

  const changeShowRegulationDetail = () => {
    setIsShowRegulationDetail(!isShowRegulationDetail);
  };

  const fetchAndSetNewRegulationDetail = (updatesId) => {
    setNewRegulationDetail({});

    if (updateList.length > 0) {
      const getNewRegulationDetailById = updateList.find(
        ({ id }) => id === updatesId
      );
      setNewRegulationDetail({
        ...newRegulationDetail,
        getNewRegulationDetailById,
      });
    }
    setIsShowRegulationDetail(!isShowRegulationDetail);
  };

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };

  return (
    <div className="new-regulation-side-bar">
      <div
        className={`filter-popup ${isShowFilter && "popup-open"}`}
        style={{
          boxShadow: isShowFilter
            ? "1px 1px 9999px 9999px rgba(0,0,0,0.7)"
            : "none",
          backgroundImage: `url(${filterImage})`,
          backgroundPosition: "right -157px bottom -155px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container" style={{ width: "300px" }}>
          <div className="popup-header d-flex align-items-center my-5">
            <img
              src={closeIcon}
              alt="close-icon"
              onClick={() => {
                setIsShowFilter(!isShowFilter);
              }}
              style={{
                marginRight: "2rem",
                cursor: "pointer",
              }}
            />
            <h3 style={{ marginBottom: "0px" }}>Filters</h3>
          </div>

          <NewRegulationFilter />
        </div>
      </div>

      <NewRegulationDetail
        isShowRegulationDetail={isShowRegulationDetail}
        changeShowRegulationDetail={changeShowRegulationDetail}
        newRegulationDetail={newRegulationDetail}
      />

      <LeftSideBar />
      <div className="new-regulation-container">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <div className="new-regulation-header">
              <h2 className="main-title">
                New Regulations{" "}
                <img
                  src={filter}
                  className="filter-image"
                  onClick={() => setIsShowFilter(!isShowFilter)}
                />
              </h2>

              <div className="TopSearch">
                <div className="SearchIcon">
                  <ImSearch />
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for updates"
                />
              </div>
            </div>
            {isFilterApplied && <NewRegulationSearchBadge />}

            {isSearch && <NewRegulationSearchResult />}

            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <div className="title">
                  {updateList?.length === 0 ? (
                    <NoResultFound text="No detail found" />
                  ) : (
                    updateList?.map((updates) => (
                      <div className="list">
                        <h2
                          className="new-regulation-title"
                          onClick={() =>
                            fetchAndSetNewRegulationDetail(updates.id)
                          }
                        >
                          {updates.Title}
                        </h2>
                        <div className="description">
                          <p className="description-text">{updates.Gist}</p>
                          <span className="date">
                            {moment(updates.Submissiondate).format("Do MMM")}
                          </span>
                        </div>
                        <button className="license-code">
                          {updates.Regbodies}
                        </button>
                        <span className="license-number">
                          {updates.CircularNo}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(NewRegulations);
