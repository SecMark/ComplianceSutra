import React, { useState, useReducer, useEffect, useRef } from "react";
import filter from "../../../assets/Icons/Filters.png";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import MobileLeftSidebar from "../../OnBording/SubModules/DashBoardCO/components/MobileLeftSidebar";
import sideBarlogo from "../../../assets/Icons/sideBarlogo.png";
import togglemobile from "../../../assets/Icons/togglemobile.png";
import { isMobile } from "react-device-detect";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import filterImage from "../../../assets/Icons/filter_background.png";
import searchIcon from "../../../assets/Icons/searchIcon.png";
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
  const [showHB, setShowHBMenu] = useState(false); // For showing Hamburger Menu
  const sideBarParent = useRef(null);
  const sideBarChild = useRef(null);
  const [navigationHideShow, setNavigationHideShow] = useState(false);
  const [showSearchBoxMobile, setShowSearchBoxMobile] = useState(false);
  const [isShowMobileFilter, setIsShowMobileFilter] = useState(false);
  const [isShowRegulationDetailMobile, setIsShowRegulationDetailMobile] =
    useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isSuccess, isLoading, updateList, isFilterApplied, isSearch } =
    state.UpdatesReducer;

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

  console.log(updateList);
  //clear filter
  useEffect(() => {
    dispatch(clearFilter());
  }, []);

  useEffect(() => {
    const payload = { UserID: state.auth.loginInfo?.UserID };
    dispatch(getUpdates(payload));
  }, [state.auth.loginInfo?.UserID]);

  useEffect(() => {
    setIsShowFilter(false);
  }, [isSuccess]);

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
      {isMobile ? (
        <div id="sideBarParent" className="" ref={sideBarParent}>
          <div
            id="sideBarChild"
            className="leftSideBarFixed"
            ref={sideBarChild}
          >
            <MobileLeftSidebar
              className="d-block d-lg-none"
              close={() => closeMobileSidebar()}
            />
          </div>
        </div>
      ) : (
        <LeftSideBar />
      )}
      {isMobile ? (
        <div className="new-regulation-container-mobile">
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
                <h2 style={{ marginBottom: "2rem" }}>Fiters</h2>
                <div className="filter-wrapper-mobile">
                  <NewRegulationFilter />
                </div>
              </div>
            </div>
          </div>
          {/* Regulation Details pop-up for mobile */}
          <div
            className={`regulation-details-popup-mobile ${
              isShowRegulationDetailMobile &&
              newRegulationDetail &&
              newRegulationDetail?.getNewRegulationDetailById &&
              "d-block"
            } d-lg-none`}
          >
            <div className="regulation-details-popup-mobile--container">
              <img
                src={closeIcon}
                alt="close-icon"
                className="close--regulation-details-popup-mobile"
                onClick={() => setIsShowRegulationDetailMobile(false)}
              />
              <div className="regulation-details-popup-mobile--wrapper">
                <div style={{ marginBottom: "1rem", width: "90%" }}>
                  <div className="tags" style={{ marginBottom: "1rem" }}>
                    <div className="tag-buttons">
                      <buton className="tags-button">Stock Marketing</buton>
                      <buton className="tags-button">Stock Marketing</buton>
                      <buton className="tags-button">Stock Marketing</buton>
                    </div>
                  </div>
                  <h5>
                    {newRegulationDetail?.getNewRegulationDetailById?.Title}
                  </h5>
                </div>
                <div className="regulation-details-wrapper-mobile">
                  <div
                    className="regulation-details-html-mobile"
                    dangerouslySetInnerHTML={{
                      __html:
                        newRegulationDetail?.getNewRegulationDetailById?.Gist,
                    }}
                  />
                </div>
                <div className="regulation-details-download-button-mobile">
                  <button className="download-file">Download File</button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-block mobile-head">
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
            <div className="new-regulations-mobile-header">
              {showSearchBoxMobile ? (
                <div className="TopSearch">
                  <div className="SearchIcon">
                    <ImSearch />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for updates"
                  />
                  <img
                    src={closeIcon}
                    alt="close-icon"
                    onClick={() => setShowSearchBoxMobile(!showSearchBoxMobile)}
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
                      <span className="black-background">0</span>
                      <img
                        src={filter}
                        alt="filter"
                        onClick={() =>
                          setIsShowMobileFilter(!isShowMobileFilter)
                        }
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
                <div className="title">
                  {updateList?.length === 0 ? (
                    <NoResultFound text="No detail found" />
                  ) : (
                    updateList?.map((updates) => {
                      return (
                        <div
                          className="list"
                          onClick={() => {
                            fetchAndSetNewRegulationDetail(updates.id);
                            setIsShowRegulationDetailMobile(
                              !isShowRegulationDetailMobile
                            );
                          }}
                        >
                          <h2 className="new-regulation-title">
                            {updates.Title}
                          </h2>
                          <div className="description">
                            <p className="description-text">{updates.Gist}</p>
                          </div>
                          <div className="description-details">
                            <div className="license-details">
                              <button className="license-code">
                                {updates.Regbodies}
                              </button>
                              <span className="license-number">
                                {updates.CircularNo}
                              </span>
                            </div>
                            <span className="date">
                              {moment(updates.Submissiondate).format("Do MMM")}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
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
                        updateList?.map((updates) => {
                          return (
                            <div
                              className="list"
                              onClick={() =>
                                fetchAndSetNewRegulationDetail(updates.id)
                              }
                            >
                              <h2 className="new-regulation-title">
                                {updates.Title}
                              </h2>
                              <div className="description">
                                <p
                                  className="description-text"
                                  // dangerouslySetInnerHTML={{ __html: updates.Gist }}
                                >
                                  {updates.Gist}
                                </p>
                                <span className="date">
                                  {moment(updates.Submissiondate).format(
                                    "Do MMM"
                                  )}
                                </span>
                              </div>
                              <button className="license-code">
                                {updates.Regbodies}
                              </button>
                              <span className="license-number">
                                {updates.CircularNo}
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
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(NewRegulations);
