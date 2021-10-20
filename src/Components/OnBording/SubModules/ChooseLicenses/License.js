import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import assignIcon1 from "../../../../assets/Icons/assignIcon.png";
import assignIcon3 from "../../../../assets/Icons/assignIcon2.png";
import assignIcon5 from "../../../../assets/Icons/assignIcon3.png";
import assignIcon2 from "../../../../assets/Icons/assignIcon4.png";
import assignIcon4 from "../../../../assets/Icons/assignIcon5.png";
import { MdClose, MdExpandMore } from "react-icons/md";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

import "./style.css";

const License = ({ index, addLicense, closeDrawer }) => {
  const state = useSelector((state) => state);
  const [listOfLicense, setListOfLicense] = useState([]);
  const [searchEnable, setSearchEnable] = useState(false);
  const [selectedListOfLicenses, setSelectedListOfLicenses] = useState([]);
  const [headerHight, setHeaderHight] = useState(0);
  const licenseInfo = state?.complianceOfficer?.licenseList?.licenseList;
  useEffect(() => {
    const newLicenseList = licenseInfo?.map((values) => {
      return {
        industry: values.industry,
        show: false,
        selected: false,
        license: values.license.map((licenseValue) => {
          return {
            name: licenseValue.name,
            total_task: licenseValue.total_task,
            show: false,
            selected: false,
            sublicense: licenseValue.sublicense.map((subValue) => {
              return {
                name: subValue.name,
                total_task: subValue.total_tasks,
                show: false,
                selected: false,
              };
            }),
          };
        }),
      };
    });
    setListOfLicense(newLicenseList);
  }, [licenseInfo]);

  const getListOfSelectedLicenses = () => {
    const temp = [...listOfLicense];
    const tempSelectedList = [];
    for (let count = 0; count < temp.length; count++) {
      if (temp[count].selected) {
        tempSelectedList.push(temp[count].industry);
      }
      for (
        let licenseCount = 0;
        licenseCount < temp[count].license.length;
        licenseCount++
      ) {
        for (
          let subLicenseCount = 0;
          subLicenseCount < temp[count].license[licenseCount].sublicense.length;
          subLicenseCount++
        ) {
          if (
            temp[count].license[licenseCount].sublicense[subLicenseCount]
              .selected
          ) {
            tempSelectedList.push(
              temp[count].license[licenseCount].sublicense[subLicenseCount].name
            );
          }
        }
      }
    }
    setSelectedListOfLicenses(tempSelectedList);
  };

  useEffect(() => {
    if (listOfLicense.length) {
      getListOfSelectedLicenses();
    }
  }, [listOfLicense]);

  const chooseImage = (index) => {
    if (index == 0 || index % 5 == 0) {
      return assignIcon1;
    }
    if (index == 1 || index % 5 == 1) {
      return assignIcon2;
    }
    if (index == 2 || index % 5 == 2) {
      return assignIcon3;
    }
    if (index == 3 || index % 5 == 3) {
      return assignIcon4;
    }
    if (index == 4 || index % 5 == 4) {
      return assignIcon5;
    }
  };

  const getAllLicense = (index) => {
    let temp = [...listOfLicense];
    temp[index].show = !temp[index].show;
    setListOfLicense(temp);
  };

  const selectAllLicense = (index) => {
    let temp = [...listOfLicense];
    const selectedList = [];
    temp[index].selected = !temp[index].selected;
    for (let counter = 0; counter < temp[index].license.length; counter++) {
      temp[index].license[counter].selected =
        !temp[index].license[counter].selected;
      for (
        let counterSubLicense = 0;
        counterSubLicense < temp[index].license[counter].sublicense.length;
        counterSubLicense++
      ) {
        temp[index].license[counter].sublicense[counterSubLicense].selected =
          !temp[index].license[counter].sublicense[counterSubLicense].selected;
        if (
          !temp[index].license[counter].sublicense[counterSubLicense].selected
        ) {
          selectedList.push(
            temp[index].license[counter].sublicense[counterSubLicense].name
          );
        }
      }
    }
    // console.log(selectedList);
    setListOfLicense(temp);
  };

  const selectAllSubLicense = (index, Jindex) => {
    let temp = [...listOfLicense];
    temp[index].license[Jindex].selected =
      !temp[index].license[Jindex].selected;

    for (
      let counter = 0;
      counter < temp[index].license[Jindex].sublicense.length;
      counter++
    ) {
      if (
        !temp[index].license[Jindex].sublicense[counter].selected &&
        temp[index].license[Jindex].selected
      ) {
        temp[index].license[Jindex].sublicense[counter].selected = true;
      } else if (
        temp[index].license[Jindex].sublicense[counter].selected &&
        !temp[index].license[Jindex].selected
      ) {
        temp[index].license[Jindex].sublicense[counter].selected = false;
      }
    }

    setListOfLicense(temp);
  };

  const selectSubLicense = (index, Lindex, Sindex) => {
    let temp = [...listOfLicense];
    temp[index].license[Lindex].sublicense[Sindex].selected =
      !temp[index].license[Lindex].sublicense[Sindex].selected;
    setListOfLicense(temp);
  };

  const getAllSubLicense = (index, subIndex) => {
    let temp = [...listOfLicense];
    temp[index].license[subIndex].show = !temp[index].license[subIndex].show;
    setListOfLicense(temp);
  };
  useEffect(() => {
    const headerRef = document
      .querySelector(".choose-license__top")
      .getClientRects()[0].height;
    setHeaderHight(Math.trunc(headerRef));
  }, []);

  return (
    <>
      <div>
        <div className="px-4 pt-4 choose-license__top">
          <MdClose
            onClick={() => {
              setSelectedListOfLicenses([]);
              closeDrawer();
            }}
            className="mb-3 license__close-button"
          />
          <p className="h1 mb-3">Choose license</p>
        </div>
        <div
          className=" py-4 px-4 license-main license-main__bg--dark"
          style={{
            height: `calc(85vh - ${headerHight}px)`,
          }}
        >
          {listOfLicense &&
            listOfLicense.map((item, index) => {
              return (
                <div>
                  <div>
                    <div className="row mb-3">
                      <div className="col-6">
                        {" "}
                        <span className="mr-2">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onClick={() => selectAllLicense(index)}
                          />
                        </span>
                        <img
                          src={chooseImage(index)}
                          alt="assignIcon"
                          style={
                            chooseImage(index) == assignIcon4
                              ? { height: 44, width: 44 }
                              : {}
                          }
                        />
                        <span className="ml-2 text-license">
                          {item.industry}
                        </span>
                      </div>
                      <div className="col-4 d-flex align-item-center">
                        {" "}
                        <span>{item.license.length} License </span>
                      </div>
                      <div
                        className="col-2"
                        onClick={() => getAllLicense(index)}
                      >
                        <MdExpandMore
                          className={`license__expand-more-button ${
                            item.show && "rotate-180"
                          }`}
                        />
                      </div>
                    </div>

                    {/* sub license */}
                    {item.show &&
                      item.license.map((licenseItem, Jindex) => {
                        return (
                          <div className="ml-4 mb-3">
                            <div className="row">
                              <div className="col-6">
                                {" "}
                                <span className="mr-2">
                                  <input
                                    type="checkbox"
                                    checked={licenseItem.selected}
                                    onClick={() =>
                                      selectAllSubLicense(index, Jindex)
                                    }
                                  />
                                </span>
                                <span className="ml-2 text-license">
                                  {licenseItem.name}
                                </span>
                              </div>
                              <div className="col-4 d-flex align-item-center">
                                {" "}
                                <span>
                                  {licenseItem.sublicense.length} Task{" "}
                                </span>
                              </div>
                              <div
                                className="col-2"
                                onClick={() => getAllSubLicense(index, Jindex)}
                              >
                                {/* {licenseItem.show ? (
                                <BsChevronDown className="license__expand-more-button" />
                              ) : (
                                <BsChevronUp className="license__expand-more-button" />
                              )} */}
                                <MdExpandMore
                                  className={`license__expand-more-button ${
                                    licenseItem.show && "rotate-180"
                                  }`}
                                />
                              </div>
                            </div>
                            {/* Sub license list */}
                            {licenseItem.show &&
                              licenseItem.sublicense.map(
                                (sublicenseItem, Sindex) => {
                                  return (
                                    <div className="ml-4 my-2">
                                      <input
                                        type="checkbox"
                                        checked={sublicenseItem.selected}
                                        onClick={() =>
                                          selectSubLicense(
                                            index,
                                            Jindex,
                                            Sindex
                                          )
                                        }
                                      />
                                      <span className=" ml-2 text-license">
                                        {sublicenseItem.name}
                                      </span>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
        <button
          disabled={selectedListOfLicenses.length === 0}
          onClick={() => {
            addLicense(index, selectedListOfLicenses);
            closeDrawer();
          }}
          className="mx-4 mt-4 btn save-details common-button-drower  mb-2"
          style={{
            backgroundColor:
              selectedListOfLicenses.length === 0 ? "#e4e4e4" : "#6c5dd3",
            color: selectedListOfLicenses.length === 0 && "#aeaeae",
          }}
        >
          {selectedListOfLicenses && selectedListOfLicenses.length} Licenses
          Selected
        </button>
      </div>
    </>
  );
};

export default License;
