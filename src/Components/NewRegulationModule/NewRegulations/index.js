import React, { useState, useEffect, useRef } from "react";
import filter from "../../../assets/Icons/Filters.png";
import MobileLeftSidebar from "../../OnBording/SubModules/DashBoardCO/components/MobileLeftSidebar";
import sideBarlogo from "../../../assets/Icons/sideBarlogo.png";
import togglemobile from "../../../assets/Icons/togglemobile.png";
import { isMobile } from "react-device-detect";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import filterImage from "../../../assets/Icons/filter_background.png";
import { withRouter } from "react-router";
import { ImSearch } from "react-icons/im";
import { useRouteMatch } from "react-router";
import { Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  setIsSearch,
  setSearchText,
  getIndustryList,
  getIssuerList,
  getTopicList,
  getUpdates,
} from "../redux/actions";
import Loading from "../../../CommonModules/sharedComponents/Loader";
import moment from "moment";

import NewRegulationDetail from "../NewRegulationDetail";
import NewRegulationFilter from "../NewRegulationFilter";
import NoResultFound from "../../../CommonModules/sharedComponents/NoResultFound";
import NewRegulationSearchResult from "../NewRegulationSearchResult";
import NewRegulationsQuiz from "../../NewRegulationsQuiz/index";
import "./style.css";
import NewRegulationSearchBadge from "../NewRegulationSearchBadge";
import axiosInstance from "../../../apiServices";
import { BACKEND_BASE_URL } from "../../../apiServices/baseurl";
import { toast } from "react-toastify";
import BackDrop from "../../../CommonModules/sharedComponents/Loader/BackDrop";
import Auth from "../../Authectication/components/Auth";

const NewRegulations = (props) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowRegulationDetail, setIsShowRegulationDetail] = useState(false);
  const [newRegulationDetail, setNewRegulationDetail] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [showHB, setShowHBMenu] = useState(false); // For showing Hamburger Menu
  const sideBarParent = useRef(null);
  const sideBarChild = useRef(null);
  const [navigationHideShow, setNavigationHideShow] = useState(false);
  const [showSearchBoxMobile, setShowSearchBoxMobile] = useState(false);
  const [isShowMobileFilter, setIsShowMobileFilter] = useState(false);
  const [isShowRegulationDetailMobile, setIsShowRegulationDetailMobile] =
    useState(false);
  const { path } = useRouteMatch();
  const [loading, setLoading] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [filters, setFilters] = useState({
    issuer: [],
    industry: [],
    topic: [],
    from_date: "",
    to_date: "",
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  //deconstruct updates reducer state values.
  const { isSuccess, isLoading, updateList, isFilterApplied, isSearch } =
    state.UpdatesReducer;
  const { industry, issuer, topic, from, to } = state.UpdatesReducer?.badges;
  useEffect(() => {
    const listOfFilters = [industry, issuer, topic, from, to].filter(
      (element) => element
    );
    setNumberOfFilters(listOfFilters?.length || 0);
  }, [industry, issuer, topic, from, to]);
  const onHBMenu = () => {
    setNavigationHideShow(true);
    const drawerParent = sideBarParent;
    const drawerChild = sideBarChild;
    if (drawerParent) {
      drawerParent.current.classList.add("overlay");
      drawerChild.current.style.left = "0%";
    }
  };

  const closeMobileSidebar = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.remove("overlay");
      drawerChild.style.left = "-100%";
    }
    setShowHBMenu(false);
  };

  // clear filter
  useEffect(() => {
    dispatch(clearFilter());
  }, []);

  useEffect(() => {
    const filter = filters;
    fetchAndSetUpdates({ filters: filter });
  }, []);

  useEffect(() => {
    setIsShowFilter(false);
    setIsShowMobileFilter(false);
  }, [isSuccess]);

  useEffect(() => {
    if (
      props.history?.location?.state?.from === "notifications" &&
      props.history?.location?.state?.circular_id
    ) {
      fetchAndSetNewRegulationDetail(
        props.history?.location?.state?.circular_id
      );
    }
  }, []);

  const fetchAndSetUpdates = (filter) => {
    dispatch(getUpdates(filter));
  };
  const changeShowRegulationDetail = () => {
    setIsShowRegulationDetail(!isShowRegulationDetail);
  };

  const fetchAndSetNewRegulationDetail = async (updatesId) => {
    try {
      setNewRegulationDetail({});
      setLoading(true);

      if (updateList.length > 0) {
        const { data } = await axiosInstance.post(
          `${BACKEND_BASE_URL}compliance.api.getRegulationDetails`,
          {
            name: updatesId,
          }
        );

        if (data.message.status) {
          const { circular_details } = data.message;
          setNewRegulationDetail(circular_details);
          setLoading(false);
          setIsShowRegulationDetail(!isShowRegulationDetail);
          setIsShowRegulationDetailMobile(!isShowRegulationDetailMobile);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch circular details! Please try later");
    }
  };

  const setSeachTextAndFetchIndustryList = (event) => {
    const { value } = event.target;
    if (value !== "") {
      setSearchValue(value);
      dispatch(setIsSearch(true));
    } else {
      setSearchValue("");
      dispatch(setIsSearch(false));
      fetchAndSetUpdates();
    }
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
                ? { fontWeight: "bold", color: "#000" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };
  const getNewRegulationFilterList = async (isMobile) => {
    getAndSetIndustryList();
    setTimeout(() => {
      if (!isMobile) {
        setIsShowFilter(!isShowFilter);
      } else {
        setIsShowMobileFilter(!isShowMobileFilter);
      }
    }, 1000);
  };

  const getAndSetIndustryList = () => {
    //get issuer list.
    dispatch(getIndustryList());
  };

  return (
    <>
      <Auth />
      <Switch>
        <Route exact path={path + "/quiz"}>
          <NewRegulationsQuiz key="new-regulations-quiz" />
        </Route>
        <Route exact path={path}>
          <div className="new-regulation-side-bar">
            <BackDrop isLoading={loading} />
            {isMobile && (
              <div id="sideBarParent" className="" ref={sideBarParent}>
                <div
                  id="sideBarChild"
                  className="leftSideBarFixed"
                  ref={sideBarChild}
                >
                  <MobileLeftSidebar
                    className="d-block d-md-none"
                    close={() => closeMobileSidebar()}
                  />
                </div>
              </div>
            )}

            <div className="new-regulation-container-mobile d-block d-md-none">
              {/* Filter pop-up for mobile */}
              <div
                className={`filter-popup-mobile ${
                  isShowMobileFilter && "d-block"
                } d-lg-none`}
              >
                <div className="filter-popup-mobile--container">
                  <img
                    src={closeIcon}
                    alt="close-icon"
                    className="close--filter-popup-mobile"
                    onClick={() => setIsShowMobileFilter(!isShowMobileFilter)}
                  />
                  <div className="filter-popup-mobile--wrapper">
                    <h2 style={{ marginBottom: "2rem" }}>Filter</h2>
                    <div className="filter-wrapper-mobile">
                      <NewRegulationFilter
                        setIsShowFilter={setIsShowFilter}
                        isShowFilter={isShowFilter}
                        isShowMobileFilter={isShowMobileFilter}
                        setIsShowMobileFilter={setIsShowMobileFilter}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Regulation Details pop-up for mobile */}
              <div
                className={`regulation-details-popup-mobile ${
                  isShowRegulationDetailMobile &&
                  newRegulationDetail &&
                  newRegulationDetail?.name &&
                  "d-block"
                } d-lg-none `}
              >
                <div className=" regulation-details-popup-mobile--container">
                  <img
                    src={closeIcon}
                    alt="close-icon"
                    className="close--regulation-details-popup-mobile"
                    onClick={() => setIsShowRegulationDetailMobile(false)}
                  />
                  <div className=" regulation-details-popup-mobile--wrapper">
                    <div style={{ marginBottom: "1rem", width: "90%" }}>
                      <div className="tags" style={{ marginBottom: "1rem" }}>
                        <div className="tag-buttons">
                          {newRegulationDetail?.tags &&
                            newRegulationDetail?.tags.map((item) => (
                              <button className="tags-button">{item}</button>
                            ))}
                        </div>
                      </div>
                      <h5>{newRegulationDetail?.title}</h5>
                    </div>
                    <div className="regulation-details-wrapper-mobile pr-2">
                      <div
                        className="regulation-details-html-mobile"
                        dangerouslySetInnerHTML={{
                          __html: newRegulationDetail?.description,
                        }}
                      />
                      <div className="regulation-details-html-mobile">
                        For more information click this link{" "}
                        <a
                          href={newRegulationDetail?.circular_link}
                          target="blank"
                        >
                          {newRegulationDetail?.circular_link}
                        </a>
                      </div>
                    </div>
                    <div className=" mt-3 d-flex align-items-center justify-content-between">
                      <a
                        href={`data:application/${
                          newRegulationDetail?.file_details &&
                          newRegulationDetail?.file_details[0].file_name
                            .split(".")
                            .pop()
                        };base64,${
                          newRegulationDetail?.file_details &&
                          newRegulationDetail?.file_details[0].encoded_string
                        }`}
                        className="download-file"
                        download={
                          newRegulationDetail?.file_details &&
                          newRegulationDetail?.file_details[0].file_name
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download File
                      </a>
                      <Link
                        to={{
                          pathname: path + "/quiz",
                          state: {
                            circular_no: newRegulationDetail?.name,
                          },
                        }}
                        className="download-file"
                      >
                        Quiz
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block mobile-head d-md-none">
                {showHB === false && (
                  // <div className=" d-block d-sm-none pad-ms">
                  <div className="d-flex justify-content-between d-lg-none">
                    <div
                      className=""
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        onHBMenu();
                      }}
                    >
                      <img src={togglemobile} alt="toggle mobile" />
                    </div>
                    <div className="pr-4">
                      {" "}
                      <img
                        className="mobile-logo"
                        src={sideBarlogo}
                        alt="sideBarlogo"
                      />{" "}
                    </div>
                  </div>
                )}
                <div className="new-regulations-mobile-header justify-content-between">
                  {showSearchBoxMobile ? (
                    <div className="TopSearch">
                      <div className="SearchIcon">
                        <ImSearch />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for updates"
                        onChange={(event) =>
                          setSeachTextAndFetchIndustryList(event)
                        }
                      />
                      <img
                        src={closeIcon}
                        alt="close-icon"
                        onClick={() =>
                          setShowSearchBoxMobile(!showSearchBoxMobile)
                        }
                        style={{
                          margin: "0 0.5rem",
                          height: "15px",
                          width: "15px",
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <h4>New Regulations</h4>
                      <div className="mobile-header-buttons-group">
                        <div
                          className="SearchIcon--black"
                          onClick={() =>
                            setShowSearchBoxMobile(!showSearchBoxMobile)
                          }
                        >
                          <ImSearch />
                        </div>
                        <div className="filter-counter">
                          <span className="black-background">
                            {numberOfFilters}
                          </span>
                          <img
                            src={filter}
                            alt="filter"
                            onClick={() => getNewRegulationFilterList(true)}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="new-regulations-list my-5">
                  {isFilterApplied && <NewRegulationSearchBadge />}

                  {isSearch && <NewRegulationSearchResult />}
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <div className="title regulations-list-mobile">
                      {updateList?.length === 0 ? (
                        <NoResultFound text="No detail found" />
                      ) : (
                        updateList?.map((updates, index) => {
                          return (
                            <div
                              className="list"
                              onClick={() =>
                                fetchAndSetNewRegulationDetail(updates?.name)
                              }
                            >
                              <h2
                                className={
                                  state.UpdatesReducer.isSearch
                                    ? "new-regulation-title-search-active"
                                    : "new-regulation-title"
                                }
                              >
                                {updates?.topic &&
                                  getHighlightedText(
                                    updates.topic,
                                    searchValue
                                  )}
                              </h2>
                              <div className="description">
                                <p
                                  className={
                                    state.UpdatesReducer.isSearch
                                      ? "description-text-search-active"
                                      : "description-text"
                                  }
                                >
                                  {updates?.GistText &&
                                    getHighlightedText(
                                      updates.title,
                                      searchValue
                                    )}
                                </p>
                                <span
                                  className={
                                    state.UpdatesReducer.isSearch
                                      ? "date-search-active"
                                      : "date"
                                  }
                                >
                                  {updates?.date_issued &&
                                    getHighlightedText(
                                      moment(updates.date_issued).format(
                                        "Do MMM YYYY"
                                      ),
                                      searchValue
                                    )}
                                </span>
                              </div>
                              <button className="license-code">
                                {updates.issuer}
                              </button>
                              <span
                                className={
                                  state.UpdatesReducer.isSearch
                                    ? "license-number-search-active"
                                    : "license-number"
                                }
                              >
                                {updates?.circular_number &&
                                  getHighlightedText(
                                    updates.circular_number,
                                    searchValue
                                  )}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`filter-popup ${
                isShowFilter && "popup-open"
              } d-none d-md-block`}
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
                <NewRegulationFilter
                  setIsShowFilter={setIsShowFilter}
                  isShowFilter={isShowFilter}
                  isShowMobileFilter={isShowMobileFilter}
                  setIsShowMobileFilter={setIsShowMobileFilter}
                />
              </div>
            </div>
            <div className="d-none d-md-block w-100">
              <NewRegulationDetail
                isShowRegulationDetail={isShowRegulationDetail}
                changeShowRegulationDetail={changeShowRegulationDetail}
                newRegulationDetail={newRegulationDetail}
              />
            </div>
            <div className="new-regulation-container d-none d-md-block">
              <div className="row d-none d-md-block">
                <div className="col-md-12 p-0">
                  <div className="new-regulation-header">
                    <h2 className="main-title">
                      New Regulations{" "}
                      <img
                        src={filter}
                        alt="Filter"
                        className="filter-image"
                        onClick={() => getNewRegulationFilterList(false)}
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
                        onChange={(event) =>
                          setSeachTextAndFetchIndustryList(event)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 regulations-scroll d-none d-md-block">
                  {isFilterApplied && <NewRegulationSearchBadge />}

                  {isSearch && <NewRegulationSearchResult />}

                  <div>
                    <div className="title d-none d-md-block">
                      {updateList.length === 0 ? (
                        <NoResultFound text="No detail found" />
                      ) : (
                        updateList?.map((updates, index) => {
                          return (
                            <div
                              className="list"
                              onClick={() => {
                                fetchAndSetNewRegulationDetail(updates?.name);
                                setIsShowRegulationDetailMobile(
                                  !isShowRegulationDetailMobile
                                );
                              }}
                            >
                              <h2
                                className={
                                  state.UpdatesReducer.isSearch
                                    ? "new-regulation-title-search-active"
                                    : "new-regulation-title"
                                }
                              >
                                {updates?.topic &&
                                  getHighlightedText(
                                    updates.topic,
                                    searchValue
                                  )}
                              </h2>
                              <div className="description">
                                <p
                                  className={
                                    state.UpdatesReducer.isSearch
                                      ? "description-text-search-active"
                                      : "description-text"
                                  }
                                >
                                  {" "}
                                  {updates?.title &&
                                    getHighlightedText(
                                      updates?.title,
                                      searchValue
                                    )}
                                </p>
                              </div>
                              <div className="description-details">
                                <div className="license-details">
                                  <button className="license-code">
                                    {updates?.issuer && updates.issuer}
                                  </button>
                                  <span
                                    className={
                                      state.UpdatesReducer.isSearch
                                        ? "license-number-active"
                                        : "license-number"
                                    }
                                  >
                                    {updates?.circular_number &&
                                      getHighlightedText(
                                        updates.circular_number,
                                        searchValue
                                      )}
                                  </span>
                                </div>
                                <span
                                  className={
                                    state.UpdatesReducer.isSearch
                                      ? "date-active"
                                      : "date"
                                  }
                                >
                                  {updates?.date_issued &&
                                    moment(updates.date_issued).format(
                                      "Do MMM"
                                    )}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </>
        )} */}
          </div>
        </Route>
      </Switch>
    </>
  );
};

export default withRouter(NewRegulations);
