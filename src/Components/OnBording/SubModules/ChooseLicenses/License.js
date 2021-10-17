import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import assignIcon1 from "../../../../assets/Icons/assignIcon.png";
import assignIcon3 from "../../../../assets/Icons/assignIcon2.png";
import assignIcon5 from "../../../../assets/Icons/assignIcon3.png";
import assignIcon2 from "../../../../assets/Icons/assignIcon4.png";
import assignIcon4 from "../../../../assets/Icons/assignIcon5.png";

import { BsChevronUp, BsChevronDown } from "react-icons/bs";

import "./style.css";

const License = ({ index, addLicense }) => {
  const state = useSelector((state) => state);
  const [listOfLicense, setListOfLicense] = useState([]);
  const [searchEnable, setSearchEnable] = useState(false);

  useEffect(() => {
    const licenseInfo = state?.complianceOfficer?.licenseList?.licenseList;
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
  }, []);

  const renderCheckBox = (item, index) => {
    return (
      <input
        type="checkbox"
        value=""
        className="custom-control-input"
        checked={true}
      />
    );
  };

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
      }
    }

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
      temp[index].license[Jindex].sublicense[counter].selected =
        !temp[index].license[Jindex].sublicense[counter].selected;
    }

    setListOfLicense(temp);
  };

  const selectSubLicense = (index, Lindex, Sindex) => {
    let temp = [...listOfLicense];
    temp[index].license[Lindex].sublicense[Sindex].selected =
      !temp[index].license[Lindex].sublicense[Sindex].selected;
  };

  const getAllSubLicense = (index, subIndex) => {
    let temp = [...listOfLicense];
    temp[index].license[subIndex].show = !temp[index].license[subIndex].show;
    setListOfLicense(temp);
  };

  return (
    <>
      <div className="p-5">
        <p className="h1">Choose license</p>
        {listOfLicense &&
          listOfLicense.map((item, index) => {
            return (
              <div className="">
                <div>
                  <div className="row">
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
                      <span className="ml-2 text-license">{item.industry}</span>
                    </div>
                    <div className="col-4 d-flex align-item-center">
                      {" "}
                      <span>{item.license.length} License </span>
                    </div>
                    <div className="col-2" onClick={() => getAllLicense(index)}>
                      {item.show ? <BsChevronDown /> : <BsChevronUp />}
                    </div>
                  </div>

                  {/* sub license */}
                  {item.show &&
                    item.license.map((licenseItem, Jindex) => {
                      return (
                        <div className="ml-2">
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
                                {licenseItem.sublicense.length} License{" "}
                              </span>
                            </div>
                            <div
                              className="col-2"
                              onClick={() => getAllSubLicense(index, Jindex)}
                            >
                              {licenseItem.show ? (
                                <BsChevronDown />
                              ) : (
                                <BsChevronUp />
                              )}
                            </div>
                          </div>
                          {/* Sub license list */}
                          {licenseItem.show &&
                            licenseItem.sublicense.map(
                              (sublicenseItem, Sindex) => {
                                return (
                                  <div className="ml-2">
                                    <input
                                      type="checkbox"
                                      checked={sublicenseItem.selected}
                                      onClick={() =>
                                        selectSubLicense(index, Jindex, Sindex)
                                      }
                                    />
                                    <span className="text-license">
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
    </>
  );
};

export default License;
