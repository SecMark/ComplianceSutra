import React, { useState, useEffect, useRef } from "react"
import "./style.css"
import RightImageBg from "../../../../../../../assets/Images/Onboarding/RectangleOnboadign.png"
import search from "../../../../../../../assets/Icons/search.png"
import closeIcon from "../../../../../../../assets/Icons/closeIcon.png"
import closeIconGray from "../../../../../../../assets/Icons/closeIconGray.png"
import searchIcon from "../../../../../../../assets/Icons/searchIcon.png"
import { useDispatch, useSelector } from "react-redux"
import { actions as coActions } from "../../../redux/actions"
import assignIcon1 from "../../../../../../../assets/Icons/assignIcon.png"
import assignIcon3 from "../../../../../../../assets/Icons/assignIcon2.png"
import assignIcon5 from "../../../../../../../assets/Icons/assignIcon3.png"
import assignIcon2 from "../../../../../../../assets/Icons/assignIcon4.png"
import assignIcon4 from "../../../../../../../assets/Icons/assignIcon5.png"

function ChooseLicenses({ fields, close }) {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const [searchEnable, setSearchEnable] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [licenseList, setLicenseList] = useState({})
  const [searchLiecenseData, setSearchLienceseData] = useState([])
  const [selectedLiecenseIdArray, setSelectedLicenseIdArray] = useState([])

  useEffect(() => {
    dispatch(
      coActions.getCompanyTypeRequest({
        country: "INDIA",
        category: fields.category,
        eid: "",
      })
    )

    setSelectedLicenseIdArray(fields.selectedLiecenseIdArray)
  }, [])

  useEffect(() => {
    const LicenseCategory =
      state &&
      state.taskReport &&
      state.taskReport.companyTypeInfo &&
      state.taskReport.companyTypeInfo.CompanyInfo &&
      state.taskReport.companyTypeInfo.CompanyInfo[3] &&
      state.taskReport.companyTypeInfo.CompanyInfo[3][0] &&
      state.taskReport.companyTypeInfo.CompanyInfo[3][0].LicensebyCategory

    if (LicenseCategory != undefined && LicenseCategory.length > 0) {
      var arr = []
      arr = groupBy(LicenseCategory, "Category")
      let temp
      if (arr) {
        temp = Object.entries(arr)
      }
      setLicenseList(temp)
    }
  }, [state.taskReport.companyTypeInfo])

  const onClickLiencesCheckbox = (e, item, parentCheck) => {
    var array = [...selectedLiecenseIdArray]
    if (e.target.classList.contains("sub-checkbox")) {
      if (e.target.checked) {
        let itemindex = array.indexOf(item.LicenseId)
        if (itemindex === -1) {
          array.push(parseInt(item.LicenseId))
        }
        parentCheck.forEach((x) => {
          if (array.indexOf(x.LicenseId) === -1) {
            e.target
              .closest(".drower")
              .querySelector(
                ".down-arrow .custom-control-input"
              ).checked = false
            return
          }
          e.target
            .closest(".drower")
            .querySelector(".down-arrow .custom-control-input").checked = true
        })
        setSelectedLicenseIdArray(array)
      } else {
        const newArray = array.filter(
          (checkedItem) => checkedItem !== parseInt(item.LicenseId)
        )
        e.target
          .closest(".drower")
          .querySelector(".down-arrow .custom-control-input").checked = false
        setSelectedLicenseIdArray(newArray)
      }
    } else {
      if (e.target.checked) {
        item[1].forEach((x) => {
          let itemindex = array.indexOf(x.LicenseId)
          if (itemindex === -1) {
            array.push(parseInt(x.LicenseId))
          }
        })
        setSelectedLicenseIdArray(array)
      } else {
        let tempObj = item[1]
        tempObj.forEach((x) => {
          let itemindex = array.indexOf(x.LicenseId)
          if (itemindex != -1) {
            array.splice(itemindex, 1)
          }
        })
        setSelectedLicenseIdArray(array)
      }
    }
  }

  const onClickLiencesCheckboxInserach = (e, item) => {
    var array = [...selectedLiecenseIdArray]
    if (e.target.classList.contains("search-checkbox")) {
      if (e.target.checked) {
        array.push(parseInt(item.LicenseId))
        setSelectedLicenseIdArray(array)
      } else {
        const newArray = array.filter(
          (checkedItem) => checkedItem !== parseInt(item.LicenseId)
        )
        e.target
          .closest(".search-list")
          .querySelector(
            ".down-arrow-search .custom-control-input"
          ).checked = false
        setSelectedLicenseIdArray(newArray)
      }
    } else {
      if (e.target.checked) {
        item[1].forEach((item) => array.push(parseInt(item.LicenseId)))
        setSelectedLicenseIdArray(array)
      } else {
        let tempObj = item[1]
        tempObj.forEach((x) => {
          let itemindex = array.indexOf(x.LicenseId)
          if (itemindex != -1) {
            array.splice(itemindex, 1)
          }
        })
        setSelectedLicenseIdArray(array)
      }
    }
  }

  const groupBy = (objectArray, property) => {
    if (objectArray && objectArray.length > 0)
      return objectArray.reduce((acc, obj) => {
        const key = obj[property]
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(obj)
        return acc
      }, {})
  }

  const renderCheckBox = (item, index) => {
    let temp = item[0]
    let isChecked = null
    item[1].some((x) => {
      if (selectedLiecenseIdArray.indexOf(x.LicenseId) === -1) {
        isChecked = false
        return true
      } else {
        isChecked = true
        return false
      }
    })
    return (
      <input
        type="checkbox"
        value={temp}
        onChange={(e) => onClickLiencesCheckbox(e, item, null)}
        className="custom-control-input"
        id={temp}
        name={temp}
        checked={isChecked}
      />
    )
  }
  const onClickArrow = (index) => {
    const color = document.getElementById(`grid${index}`)
    const arrow = document.getElementById(`arrow${index}`)
    const SortBar = document.getElementById(`content${index}`)
    if (arrow && SortBar) {
      if (
        arrow.classList.contains("downArrow") &&
        SortBar.classList.contains("accordian-bar-with-min")
      ) {
        arrow.classList.remove("downArrow")
        arrow.classList.add("upArrow")
        color.classList.add("accordian-grid-active")
        SortBar.classList.add("filter-price-height")
        SortBar.classList.add("accordian-bar-with-fullheight")
      } else if (
        arrow.classList.contains("upArrow") &&
        SortBar.classList.contains("filter-price-height")
      ) {
        SortBar.classList.remove("filter-price-height")
        SortBar.classList.remove("accordian-bar-with-fullheight")
        arrow.classList.remove("upArrow")
        color.classList.remove("accordian-grid-active")
        arrow.classList.add("downArrow")
      }
    }
  }

  const setCerificateDetails = () => {
    setSearchEnable(false)
    callClose(1)
  }
  const callClose = (type) => {
    var fieldObj = { ...fields }
    if (type === 1) {
      fieldObj.selectedLiecenseIdArray = selectedLiecenseIdArray
    }
    close(fieldObj)
  }

  const handleSearch = (e) => {
    if (e.target.value !== "") {
      let filterData = []
      let searchData = []
      licenseList &&
        licenseList.length > 0 &&
        licenseList.map((item, index) => {
          item[1] &&
            item[1].length > 0 &&
            item[1].filter((data, key) => {
              var filterKey = e.target.value.toUpperCase()
              if (data.LicenseCode.toUpperCase().indexOf(filterKey) > -1) {
                return filterData.push(data)
              }
            })
        })
      if (filterData && filterData.length > 0) {
        searchData = groupBy(filterData, "Category")
        setSearchLienceseData(Object.entries(searchData))
      } else {
        setSearchLienceseData([])
      }
    } else {
      setSearchLienceseData([])
    }
    setSearchText(e.target.value)
  }
  const renderData = (item, parentCheck) => {
    return (
      <div className="accordian-date-drower">
        <div className="col-12 col-md-6 pl-0">
          <div className="goods-services">
            <div className="custom-control custom-checkbox">
              <input
                value={item.LicenseId}
                type="checkbox"
                onChange={(e) => onClickLiencesCheckbox(e, item, parentCheck)}
                className="custom-control-input sub-checkbox"
                id={item.LicenseId}
                name="example2"
                checked={
                  selectedLiecenseIdArray &&
                  selectedLiecenseIdArray.length > 0 &&
                  selectedLiecenseIdArray.includes(item.LicenseId)
                }
              />
              <label className="custom-control-label" htmlFor={item.LicenseId}>
                &nbsp;
              </label>
            </div>
            <span className="bold-text">{item.LicenseDesc}</span>
          </div>
          <div className="tasks-count d-block d-sm-none">
            {item.TaskCount} Tasks
          </div>
        </div>
        <div className="col-6 col-md-6 pl-2 d-none d-sm-block">
          <div className="tasks-count">{item.TaskCount} Tasks</div>
        </div>
      </div>
    )
  }

  const closeSearch = () => {
    setSearchLienceseData([])
    setSearchEnable(false)
    setSearchText("")
  }

  const renderChekboxInSearch = (item, itemParent) => {
    return (
      <div className="row">
        <div className="col-12 pl-1"></div>
        <div className="col-12 col-md-8 col-sm-8 col-xl-8">
          <div className="two-icon choose-licence-btn">
            <div className="down-arrow-search">
              <div className="custom-control custom-checkbox">
                <input
                  style={{ cursor: "pointer" }}
                  value={item.LicenseId}
                  type="checkbox"
                  onChange={(e) => onClickLiencesCheckboxInserach(e, item)}
                  className="custom-control-input search-checkbox"
                  id={`search${item.LicenseId}`}
                  name="example3"
                  checked={
                    selectedLiecenseIdArray &&
                    selectedLiecenseIdArray.length > 0 &&
                    selectedLiecenseIdArray.includes(item.LicenseId)
                  }
                />
                <label
                  className="custom-control-label"
                  htmlFor={`search${item.LicenseId}`}
                >
                  &nbsp;
                </label>
              </div>
            </div>
            <div className="list-search">
              {item.LicenseCode}:{" "}
              <span className="small-gray">{item.LicenseDesc}</span>
            </div>
          </div>
          <div className="serch-num d-block d-sm-none">
            {item.TaskCount} Task
          </div>
        </div>
        <div className="col-4 col-md-4 col-sm-4 col-xl-4 pl-0 d-none d-sm-block">
          <div className="serch-num">{item.TaskCount} Task</div>
        </div>
      </div>
    )
  }

  const chooseImage = (index) => {
    if(index==0 || index%5==0){
      return assignIcon1;
    }
    if(index==1 || index%5==1){
      return assignIcon2;
    }
    if(index==2 || index%5==2){
      return assignIcon3;
    }
    if(index==3 || index%5==3){
      return assignIcon4;
    }
    if(index==4 || index%5==4){
      return assignIcon5;
    }
  }

  return (
    <div className="get-main">
      <div className="container-fluid pl-0 pr-0">
        <div className="col-12 padding-right d-block d-sm-none">
          <img
            className="bottom-right-bg-drower1"
            src={RightImageBg}
            alt="RightImageBg"
          />
        </div>
        <div className="choose-licenses">
          <div className="choose-licenses-title">
            <div className="d-flex">
              <div className="col-6 pl-0">
                <img
                  className="closeIcon"
                  onClick={() => callClose(2)}
                  src={closeIcon}
                  alt="closeIcon"
                />
              </div>
              <div className="col-6 pl-0 d-block d-sm-none text-right mt-0">
                <button
                  style={{ zIndex: 999999 }}
                  disabled={
                    selectedLiecenseIdArray &&
                    selectedLiecenseIdArray.length === 0
                  }
                  onClick={() => setCerificateDetails()}
                  class="btn mb-2 save-details common-button-next"
                >
                  CONFIRM
                </button>
              </div>
            </div>
            {!searchEnable && <p className="licenses-title">
              {" "}
              Choose License{" "}
              <span className="search-icon">
                <img
                  onClick={() => setSearchEnable(true)}
                  src={search}
                  alt="search Icon"
                />
              </span>
            </p>}
          </div>
        </div>
        {searchEnable && (
          <div className="searchBox">
            <div className="input-group form-group">
              <img className="IconGray" src={searchIcon} alt="search Icon" />
              <input
                className="form-control"
                type="text"
                value={searchText}
                onChange={(e) => handleSearch(e)}
                id="example-search-input"
              />
              <span className="input-group-append">
                <button
                  onClick={() => closeSearch()}
                  className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5"
                  type="button"
                >
                  <img src={closeIconGray} alt="close Icon" />
                </button>
              </span>
            </div>
          </div>
        )}
        <div className="scroll-div">
          {searchEnable &&
            searchLiecenseData &&
            searchLiecenseData.length > 0 &&
            searchLiecenseData.map((data, key) => (
              <div className="searchGrid search-list">
                <div className="col-12 d-block d-sm-none pl-0">
                  <div className="serchlist-title">Search Results:</div>
                </div>
                <div className="search-detail-grid">
                  {data[1].map((subTask) =>
                    renderChekboxInSearch(subTask, data[0])
                  )}
                </div>
              </div>
            ))}
          {searchEnable === false && (
            <div className="scroll-div">
              {licenseList &&
                licenseList.length > 0 &&
                licenseList.map((item, index) => (
                  <div
                    key={index}
                    id={`grid${item[0]}`}
                    className="accordian-grid drower"
                  >
                    <div className="row">
                      <div className="col-10 col-sm-6 col-md-6 col-xl-6">
                        <div className="two-icon choose-licence-btn">
                          <div className="down-arrow">
                            <div className="custom-control custom-checkbox">
                              {renderCheckBox(item, index)}
                              <label
                                className="custom-control-label"
                                htmlFor={item[0]}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </div>
                          <div className="assign-icon">
                            <img src={chooseImage(index)} alt="assignIcon" />
                          </div>
                          <div className="gst-type-licence">
                            {item[0]}
                            <div className="count-task-num d-block d-sm-none">
                              {" "}
                              {item[1] && item[1].length} Licenses{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 col-sm-4 col-md-4 pl-0 d-none d-sm-block">
                        <div className="count-task-num">
                          {" "}
                          {item[1] && item[1].length} Licenses{" "}
                        </div>
                      </div>
                      <div
                        onClick={() => onClickArrow(item[0])}
                        className="col-2 col-sm-2 col-md-2"
                      >
                        <div className="liecense down-arrow float-right">
                          <div id={`arrow${item[0]}`} className="downArrow" />
                        </div>
                      </div>
                    </div>
                    <div
                      id={`content${item[0]}`}
                      className="accordian-bar-with-min accordian-grid accordian-grid-active border-0"
                    >
                      <div>
                        {item[1].map((subTask) => (
                          <div>{renderData(subTask, item[1])}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="bottom-logo-strip-drower">
          <div className="row aligncenter">
            <div className="col-12">
              <button
                style={{
                  zIndex: 999999,
                  backgroundColor:
                    selectedLiecenseIdArray &&
                      selectedLiecenseIdArray.length === 0
                      ? "#e4e4e4"
                      : "#6c5dd3",
                  color:
                    selectedLiecenseIdArray &&
                    selectedLiecenseIdArray.length === 0 &&
                    "#aeaeae",
                }}
                disabled={
                  selectedLiecenseIdArray &&
                  selectedLiecenseIdArray.length === 0
                }
                onClick={() => setCerificateDetails()}
                className="btn save-details common-button-drower  mb-2"
              >
                {selectedLiecenseIdArray && selectedLiecenseIdArray.length}{" "}
                licenses selected
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseLicenses
