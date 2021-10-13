import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdInfo, MdAddCircle, MdExpandMore } from "react-icons/md";
import ListByFilter from "./ListByFilter";
import "./style.css";
const sortByFilters = [
  {
    id: 1,
    value: "date of addition",
  },
  {
    id: 2,
    value: "licenses",
  },
  {
    id: 3,
    value: "alphabatically",
  },
  {
    id: 4,
    value: "status",
  },
  {
    id: 5,
    value: "country",
  },
];
const dummyLicenses = [
  {
    id: 1,
    name: "Brokerage",
    is_active: true,
    active_licenses: ["gst", "nes", "bse", "mcedex"],
    country: "india",
  },
  {
    id: 2,
    name: "Advisory",
    is_active: false,
    active_licenses: ["gst", "nes", "bse", "mcedex"],
    country: "india",
  },
  {
    id: 3,
    name: "Depository Participants",
    is_active: true,
    active_licenses: ["gst", "nes", "bse", "mcedex"],
    country: "india",
  },
  {
    id: 4,
    name: "Non-Banking Activities",
    is_active: true,
    active_licenses: ["gst", "nes", "bse", "mcedex"],
    country: "india",
  },
  {
    id: 5,
    name: "General",
    is_active: false,
    active_licenses: ["gst", "nes", "bse", "mcedex"],
    country: "india",
  },
  {
    id: 6,
    name: "Portfolio Management",
    is_active: false,
    active_licenses: ["gst", "nes", "bse", "mcedex"],
    country: "england",
  },
  {
    id: 7,
    name: "Portfolio Management",
    is_active: true,
    active_licenses: ["gst", "nes", "bse", "mcedex"],
    country: "england",
  },
];
const IndustryType = () => {
  const [currentFilter, setCurrentFilter] = useState(sortByFilters[0].value);
  const [expandedFlags, setExpandedFlags] = useState([
    "active",
    "india",
    "gst",
  ]);
  const [countDetails, setCountDetails] = useState({
    byStatus: {},
    byCountry: {},
  });
  const handleExpandFlag = (name) => {
    if (!expandedFlags.includes(name)) {
      setExpandedFlags([...expandedFlags, name]);
    } else if (expandedFlags.includes(name)) {
      setExpandedFlags([...expandedFlags].filter((flag) => flag !== name));
    }
  };
  useEffect(() => {
    if (currentFilter === "status") {
      setCountDetails({
        ...countDetails,
        byStatus: {
          activeIndustryType: dummyLicenses.filter(
            (item) => item.is_active === true
          ).length,
          inActiveIndustryType: dummyLicenses.filter(
            (item) => item.is_active === false
          ).length,
        },
      });
    } else if (currentFilter === "country") {
      setCountDetails({
        ...countDetails,
        byCountry: {
          india: dummyLicenses.filter((item) => item.country === "india")
            .length,
          england: dummyLicenses.filter((item) => item.country === "england")
            .length,
        },
      });
    }
  }, [currentFilter]);
  return (
    <div className="industry-type row">
      <div className="industry-type__top-actions w-100 my-2 d-flex align-items-center justify-content-end">
        <button className="cs__button cs__button--stroke d-flex align-items-center">
          <AiOutlinePlus
            className="cs__button--primary"
            style={{ borderRadius: "3px" }}
          />
          &nbsp;&nbsp;add new sub task
        </button>
        <div className="cs__sort-by p-1 ml-5">
          <span className="cs__sort-by--item mr-2">sort by</span>
          {sortByFilters.map((filter) => {
            return (
              <span
                key={filter.id}
                className={`cs__sort-by--item cs__sort-by-filter ${
                  filter.value === currentFilter && "cs__sort-by-filter--active"
                }`}
                onClick={() => setCurrentFilter(filter.value)}
              >
                {filter.value}
              </span>
            );
          })}
        </div>
      </div>
      <div className="industry-type__license-list mt-5">
        {currentFilter === "date of addition" && (
          <>
            {dummyLicenses &&
              dummyLicenses.map((card) => {
                const { id, name, is_active, active_licenses, country } = card;
                return (
                  <div key={id} className="industry-type__license-card">
                    <h6 className="license-card__title">
                      {name} <MdInfo title={name} />
                    </h6>
                    <div className="license-card__flag d-flex align-items-center">
                      🇮🇳
                      <span className="license-card__flag-title ml-1">
                        {country}
                      </span>
                    </div>
                    <div className="license-card__active-licenses my-3">
                      <span className="license-card__flag-title license-card__active-license-title">
                        Active Licenses
                      </span>
                      <div className="d-flex mt-1 flex-wrap">
                        {active_licenses &&
                          active_licenses.map((license) => (
                            <span className="license-card__title license-card__active-licenses-item">
                              {license}
                            </span>
                          ))}
                        <MdAddCircle className="license-card__active-licenses-item--add-more" />
                      </div>
                    </div>
                    <div className="license-card__actions d-flex align-items-center justify-content-between">
                      <div className="license-card__action-item license-card__action-item--left">
                        <button className="cs__button cs__button--stroke license-card__button">
                          edit details
                        </button>
                      </div>
                      <div className="license-card__action-item license-card__action-item--right">
                        <button className="cs__button cs__button--stroke">
                          {is_active ? "on" : "off"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        )}
        {currentFilter === "alphabatically" && (
          <>
            {dummyLicenses &&
              [...dummyLicenses]
                .sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0))
                .map((card) => {
                  const { id, name, is_active, active_licenses, country } =
                    card;
                  return (
                    <div key={id} className="industry-type__license-card">
                      <h6 className="license-card__title">
                        {name} <MdInfo title={name} />
                      </h6>
                      <div className="license-card__flag d-flex align-items-center">
                        🇮🇳
                        <span className="license-card__flag-title ml-1">
                          {country}
                        </span>
                      </div>
                      <div className="license-card__active-licenses my-3">
                        <span className="license-card__flag-title license-card__active-license-title">
                          Active Licenses
                        </span>
                        <div className="d-flex mt-1 flex-wrap">
                          {active_licenses &&
                            active_licenses.map((license) => (
                              <span className="license-card__title license-card__active-licenses-item">
                                {license}
                              </span>
                            ))}
                          <MdAddCircle className="license-card__active-licenses-item--add-more" />
                        </div>
                      </div>
                      <div className="license-card__actions d-flex align-items-center justify-content-between">
                        <div className="license-card__action-item license-card__action-item--left">
                          <button className="cs__button cs__button--stroke license-card__button">
                            edit details
                          </button>
                        </div>
                        <div className="license-card__action-item license-card__action-item--right">
                          <button className="cs__button cs__button--stroke">
                            {is_active ? "on" : "off"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </>
        )}
      </div>
      <div className="industry-type__license-list d-block w-100">
        {currentFilter === "status" && (
          <>
            <ListByFilter
              name="active industry types"
              flag="active"
              expandedFlags={expandedFlags}
              handleExpanedFalgs={handleExpandFlag}
              count={countDetails.byStatus?.activeIndustryType}
            >
              {dummyLicenses &&
                [...dummyLicenses]
                  .filter((item) => item.is_active === true)
                  .map((card) => {
                    const { id, name, is_active, active_licenses, country } =
                      card;
                    return (
                      <div key={id} className="industry-type__license-card">
                        <h6 className="license-card__title">
                          {name} <MdInfo title={name} />
                        </h6>
                        <div className="license-card__flag d-flex align-items-center">
                          🇮🇳
                          <span className="license-card__flag-title ml-1">
                            {country}
                          </span>
                        </div>
                        <div className="license-card__active-licenses my-3">
                          <span className="license-card__flag-title license-card__active-license-title">
                            Active Licenses
                          </span>
                          <div className="d-flex mt-1 flex-wrap">
                            {active_licenses &&
                              active_licenses.map((license) => (
                                <span className="license-card__title license-card__active-licenses-item">
                                  {license}
                                </span>
                              ))}
                            <MdAddCircle className="license-card__active-licenses-item--add-more" />
                          </div>
                        </div>
                        <div className="license-card__actions d-flex align-items-center justify-content-between">
                          <div className="license-card__action-item license-card__action-item--left">
                            <button className="cs__button cs__button--stroke license-card__button">
                              edit details
                            </button>
                          </div>
                          <div className="license-card__action-item license-card__action-item--right">
                            <button className="cs__button cs__button--stroke">
                              {is_active ? "on" : "off"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </ListByFilter>
            <ListByFilter
              name="inactive industry types"
              flag="inactive"
              expandedFlags={expandedFlags}
              handleExpanedFalgs={handleExpandFlag}
              count={countDetails.byStatus?.inActiveIndustryType}
            >
              {dummyLicenses &&
                [...dummyLicenses]
                  .filter((item) => item.is_active === false)
                  .map((card) => {
                    const { id, name, is_active, active_licenses, country } =
                      card;
                    return (
                      <div
                        key={id}
                        className="industry-type__license-card"
                        style={{
                          opacity: "0.5",
                          pointerEvents: "none",
                        }}
                      >
                        <h6 className="license-card__title">
                          {name} <MdInfo title={name} />
                        </h6>
                        <div className="license-card__flag d-flex align-items-center">
                          🇮🇳
                          <span className="license-card__flag-title ml-1">
                            {country}
                          </span>
                        </div>
                        <div className="license-card__active-licenses my-3">
                          <span className="license-card__flag-title license-card__active-license-title">
                            Active Licenses
                          </span>
                          <div className="d-flex mt-1 flex-wrap">
                            {active_licenses &&
                              active_licenses.map((license) => (
                                <span className="license-card__title license-card__active-licenses-item">
                                  {license}
                                </span>
                              ))}
                            <MdAddCircle className="license-card__active-licenses-item--add-more" />
                          </div>
                        </div>
                        <div className="license-card__actions d-flex align-items-center justify-content-between">
                          <div className="license-card__action-item license-card__action-item--left">
                            <button className="cs__button cs__button--stroke license-card__button">
                              edit details
                            </button>
                          </div>
                          <div className="license-card__action-item license-card__action-item--right">
                            <button className="cs__button cs__button--stroke">
                              {is_active ? "on" : "off"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </ListByFilter>
          </>
        )}
        {currentFilter === "country" && (
          <>
            <ListByFilter
              name="india"
              expandedFlags={expandedFlags}
              handleExpanedFalgs={handleExpandFlag}
              count={countDetails.byCountry?.india}
              flag="india"
            >
              {dummyLicenses &&
                [...dummyLicenses]
                  .filter((item) => item.country === "india")
                  .map((card) => {
                    const { id, name, is_active, active_licenses, country } =
                      card;
                    return (
                      <div key={id} className="industry-type__license-card">
                        <h6 className="license-card__title">
                          {name} <MdInfo title={name} />
                        </h6>
                        <div className="license-card__flag d-flex align-items-center">
                          🇮🇳
                          <span className="license-card__flag-title ml-1">
                            {country}
                          </span>
                        </div>
                        <div className="license-card__active-licenses my-3">
                          <span className="license-card__flag-title license-card__active-license-title">
                            Active Licenses
                          </span>
                          <div className="d-flex mt-1 flex-wrap">
                            {active_licenses &&
                              active_licenses.map((license) => (
                                <span className="license-card__title license-card__active-licenses-item">
                                  {license}
                                </span>
                              ))}
                            <MdAddCircle className="license-card__active-licenses-item--add-more" />
                          </div>
                        </div>
                        <div className="license-card__actions d-flex align-items-center justify-content-between">
                          <div className="license-card__action-item license-card__action-item--left">
                            <button className="cs__button cs__button--stroke license-card__button">
                              edit details
                            </button>
                          </div>
                          <div className="license-card__action-item license-card__action-item--right">
                            <button className="cs__button cs__button--stroke">
                              {is_active ? "on" : "off"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </ListByFilter>
            <ListByFilter
              name="england"
              expandedFlags={expandedFlags}
              handleExpanedFalgs={handleExpandFlag}
              count={countDetails.byCountry?.england}
              flag="england"
            >
              {dummyLicenses &&
                [...dummyLicenses]
                  .filter((item) => item.country === "england")
                  .map((card) => {
                    const { id, name, is_active, active_licenses, country } =
                      card;
                    return (
                      <div key={id} className="industry-type__license-card">
                        <h6 className="license-card__title">
                          {name} <MdInfo title={name} />
                        </h6>
                        <div className="license-card__flag d-flex align-items-center">
                          🇮🇳
                          <span className="license-card__flag-title ml-1">
                            {country}
                          </span>
                        </div>
                        <div className="license-card__active-licenses my-3">
                          <span className="license-card__flag-title license-card__active-license-title">
                            Active Licenses
                          </span>
                          <div className="d-flex mt-1 flex-wrap">
                            {active_licenses &&
                              active_licenses.map((license) => (
                                <span className="license-card__title license-card__active-licenses-item">
                                  {license}
                                </span>
                              ))}
                            <MdAddCircle className="license-card__active-licenses-item--add-more" />
                          </div>
                        </div>
                        <div className="license-card__actions d-flex align-items-center justify-content-between">
                          <div className="license-card__action-item license-card__action-item--left">
                            <button className="cs__button cs__button--stroke license-card__button">
                              edit details
                            </button>
                          </div>
                          <div className="license-card__action-item license-card__action-item--right">
                            <button className="cs__button cs__button--stroke">
                              {is_active ? "on" : "off"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </ListByFilter>
          </>
        )}
        {currentFilter === "licenses" && (
          <>
            <ListByFilter
              name="good and service tax"
              expandedFlags={expandedFlags}
              handleExpanedFalgs={handleExpandFlag}
              count={3}
              flag="gst"
              listContainerClass="industry-type__license-list d-block"
            >
              <div className="d-flex w-100 mb-2">
                <div className="col-md-1 pl-0 license-list__status-list__heading">
                  status
                </div>
                <div className="col-md-11 pl-0 license-list__status-list__heading">
                  industry type
                </div>
              </div>
              <div className="d-flex w-100 align-items-center mb-2">
                <div className="col-md-1 pl-0">
                  <button className="cs__button cs__button--stroke p-0">
                    on
                  </button>
                </div>
                <div className="col-md-11 pl-0 d-flex align-items-center justify-content-between">
                  <p className="license-list__status-list-item--title mb-0">
                    industry type{" "}
                    <MdInfo className="license-list__status-list-item--title-info" />
                  </p>
                  <div className="license-card__flag d-flex align-items-center">
                    🇮🇳
                    <span className="license-card__flag-title ml-1">india</span>
                  </div>
                  <button className="cs__button cs__button--stroke p-0">
                    edit details
                  </button>
                </div>
              </div>
              <div className="d-flex w-100 align-items-center mb-2">
                <div className="col-md-1 pl-0">
                  <button className="cs__button cs__button--stroke p-0">
                    on
                  </button>
                </div>
                <div className="col-md-11 pl-0 d-flex align-items-center justify-content-between">
                  <p className="license-list__status-list-item--title mb-0">
                    Despository Participants
                    <MdInfo className="license-list__status-list-item--title-info" />
                  </p>
                  <div className="license-card__flag d-flex align-items-center">
                    🇮🇳
                    <span className="license-card__flag-title ml-1">india</span>
                  </div>
                  <button className="cs__button cs__button--stroke p-0">
                    edit details
                  </button>
                </div>
              </div>
            </ListByFilter>
            <ListByFilter
              name="national stock exchange"
              expandedFlags={expandedFlags}
              handleExpanedFalgs={handleExpandFlag}
              count={3}
              flag="nse"
              listContainerClass="industry-type__license-list d-block"
            >
              <div className="d-flex w-100 mb-2">
                <div className="col-md-1 pl-0 license-list__status-list__heading">
                  status
                </div>
                <div className="col-md-11 pl-0 license-list__status-list__heading">
                  industry type
                </div>
              </div>
              <div className="d-flex w-100 align-items-center mb-2">
                <div className="col-md-1 pl-0">
                  <button className="cs__button cs__button--stroke p-0">
                    on
                  </button>
                </div>
                <div className="col-md-11 pl-0 d-flex align-items-center justify-content-between">
                  <p className="license-list__status-list-item--title mb-0">
                    industry type{" "}
                    <MdInfo className="license-list__status-list-item--title-info" />
                  </p>
                  <div className="license-card__flag d-flex align-items-center">
                    🇮🇳
                    <span className="license-card__flag-title ml-1">india</span>
                  </div>
                  <button className="cs__button cs__button--stroke p-0">
                    edit details
                  </button>
                </div>
              </div>
              <div className="d-flex w-100 align-items-center mb-2">
                <div className="col-md-1 pl-0">
                  <button className="cs__button cs__button--stroke p-0">
                    on
                  </button>
                </div>
                <div className="col-md-11 pl-0 d-flex align-items-center justify-content-between">
                  <p className="license-list__status-list-item--title mb-0">
                    Despository Participants
                    <MdInfo className="license-list__status-list-item--title-info" />
                  </p>
                  <div className="license-card__flag d-flex align-items-center">
                    🇮🇳
                    <span className="license-card__flag-title ml-1">india</span>
                  </div>
                  <button className="cs__button cs__button--stroke p-0">
                    edit details
                  </button>
                </div>
              </div>
            </ListByFilter>
          </>
        )}
      </div>
    </div>
  );
};

export default IndustryType;
