import React from "react";
import "../style.css";
import Select from "react-select";
import { DatePicker } from "antd";

const SABasicDetails = ({ setBasicDetails, basicDetails }) => {
  const industries = [
    "Brokerage",
    "Depository",
    "Advisory",
    "General",
    "Non Brokerage Activities",
  ];
  const countryOptions = [
    {
      value: "India",
      label: "India",
    },
    {
      value: "USA",
      label: "USA",
    },
    {
      value: "China",
      label: "China",
    },
    {
      value: "Japan",
      label: "Japan",
    },
  ];
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: 200,

      color: "black",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
    }),

    container: (provided) => ({
      ...provided,
      width: 200,

      margin: "0px 8px",
      fontSize: "13px",
    }),
    dropdownIndicator: () => ({
      color: "black",
      paddingRight: 4,
    }),

    singleValueLabel: () => ({
      backgroundColor: "white",
      padding: 2,
      margin: 2,
      borderRadius: 8,
    }),
    singleValue: () => ({
      border: "none",
      color: "black",
      fontSize: "85%",
      display: "flex",
    }),
    option: () => ({
      "&:hover": {
        backgroundColor: "#f7f4fe",
      },
      padding: 8,
      marginBottom: 5,
    }),
    indicatorSeparator: () => ({
      backgroundColor: "#f7f4fe",
    }),
    control: () => ({
      backgroundColor: "#e4e4e4",
      opacity: 0.7,
      display: "flex",
      borderRadius: 7,
      height: 40,
      fontWeight: "600",
    }),
  };
  return (
    <div className="BasicDetails">
      <form>
        <h6>Basic Details</h6>
        <div className="LicenseContainer">
          <div className="DetailsElement">
            <label>Name of the license</label>
            <input
              type="text"
              placeholder="Enter name of the License"
              onChange={(element) =>
                setBasicDetails({
                  ...basicDetails,
                  nameOfLicense: element.target.value,
                })
              }
              value={basicDetails.nameOfLicense}
            ></input>
          </div>
          <div className="LicenseDetails">
            <div className="DetailsElement">
              <label>Applicable in </label>

              <Select
                options={countryOptions}
                styles={customStyles}
                placeholder="Select a Country"
                onChange={(e) => {
                  setBasicDetails({
                    ...basicDetails,
                    countryName: e.value,
                  });
                }}
              />
            </div>
            <div className="DetailsElement">
              <label>Activation Date</label>
              <DatePicker
                placeholder="Select a date for activating Subtask"
                style={{
                  backgroundColor: "#e4e4e485",
                  width: 300,
                  height: 40,
                  borderRadius: "4px",
                  fontSize: "13px",

                  fontWeight: "600",
                  color: "black",
                }}
                onChange={(e) => {
                  setBasicDetails({
                    ...basicDetails,
                    Date: e.format("MMMM Do YYYY"),
                  });
                }}
              />
            </div>
          </div>
          <div className="DetailsElement">
            <label>Select Industry Type</label>
            <div className="LicenseType">
              {industries.map((element, index) => {
                return (
                  <div>
                    <button
                      key={index}
                      style={{
                        background:
                          basicDetails.industryType.includes(element) &&
                          "#41d290",
                        color:
                          basicDetails.industryType.includes(element) &&
                          "#ffffff",
                      }}
                      onClick={() => {
                        if (basicDetails.industryType.includes(element)) {
                          setBasicDetails({
                            ...basicDetails,
                            industryType: basicDetails.industryType.filter(
                              (item) => item !== element
                            ),
                          });
                        } else {
                          setBasicDetails({
                            ...basicDetails,
                            industryType: [
                              ...basicDetails.industryType,
                              element,
                            ],
                          });
                        }
                      }}
                    >
                      {element}{" "}
                      {(basicDetails.industryType.includes(element) && "-") ||
                        "+"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="DetailsElement">
            <label>Short Description</label>
            <input
              type="text"
              placeholder="Write the description of the License here"
              onChange={(element) =>
                setBasicDetails({
                  ...basicDetails,
                  licenseDescription: element.target.value,
                })
              }
              value={basicDetails.licenseDescription}
              style={{
                height: "100px",
              }}
            ></input>
          </div>
          <div className="LicenseDetails">
            <div className="DetailsElement">
              <label>Write a Short form/Acronym</label>
              <input
                onChange={(element) =>
                  setBasicDetails({
                    ...basicDetails,
                    licenseAcronym: element.target.value,
                  })
                }
                value={basicDetails.licenseAcronym}
                style={{ minWidth: 250 }}
                type="text"
                placeholder="Type a word with 3-4 words"
              ></input>
            </div>
            <div className="DetailsElement">
              <label>Expert Review Service </label>

              <Select
                options={[
                  {
                    value: "Available",
                    label: "Available",
                  },
                  {
                    value: "Unavailable",
                    label: "Unavailable",
                  },
                ]}
                styles={customStyles}
                placeholder="Select an option"
                onChange={(e) => {
                  setBasicDetails({
                    ...basicDetails,
                    ExpertReviewService: e.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SABasicDetails;
