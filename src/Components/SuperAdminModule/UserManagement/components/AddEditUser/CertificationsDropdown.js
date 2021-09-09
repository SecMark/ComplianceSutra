import React, { useEffect } from "react";
import { DatePicker } from "antd";
import { certificationsList } from "./data";
import moment from "moment";
const CertificationsDropdown = ({
  certifications,
  setCertifications,
  currentCertificationInput,
  setCurrentCertificationInput,
}) => {
  const handleValidityTillInput = (dateString, type, id) => {
    if (!type && dateString !== "") {
      setCurrentCertificationInput({
        ...currentCertificationInput,
        validityTill: dateString,
      });
    } else if (type === "selected" && id && dateString !== "") {
      const finedIndex = certifications.findIndex(
        (element) => element.certificationDetail.id === id
      );
      let tempArray = [...certifications];
      tempArray[finedIndex].validityTill = dateString;
      setCertifications(tempArray);
    }
  };
  const handleDateOfValidity = (dateString, type, id) => {
    if (!type && dateString !== "") {
      setCurrentCertificationInput({
        ...currentCertificationInput,
        dateOfValidity: dateString,
      });
    } else if (type === "selected" && id && dateString !== "") {
      const finedIndex = certifications.findIndex(
        (element) => element.certificationDetail.id === id
      );
      let tempArray = [...certifications];
      tempArray[finedIndex].dateOfValidity = dateString;
      setCertifications(tempArray);
    }
  };
  const handleCertificationInputChange = (e, type, selectedCertificationId) => {
    const certificationValue = e.target.value;
    const certificationDetail = certificationsList.find(
      (element) => element.value === certificationValue
    );
    const certificationIndexInSelectedCertifications = certifications.findIndex(
      (element) => element.id === certificationDetail.id
    );

    if (!type && !selectedCertificationId) {
      setCurrentCertificationInput({
        ...currentCertificationInput,
        certificationDetail,
      });
    } else if (
      type &&
      type === "selected" &&
      selectedCertificationId &&
      certificationIndexInSelectedCertifications === -1
    ) {
      const finedIndex = certifications.findIndex(
        (element) => element.id === selectedCertificationId
      );
      let tempArray = [...certifications];
      tempArray[finedIndex] = certificationDetail;
      setCertifications(tempArray);
    }
  };

  const handleAddNewCertification = () => {
    if (
      currentCertificationInput &&
      Object.keys(currentCertificationInput).length !== 0
    ) {
      if (
        certifications.findIndex(
          (element) =>
            element.certificationDetail.value ===
            currentCertificationInput.certificationDetail.value
        ) === -1
      ) {
        setCertifications([...certifications, currentCertificationInput]);
        setCurrentCertificationInput({});
      }
    }
  };
  useEffect(() => {
    console.log(certifications, currentCertificationInput);
  }, [certifications, currentCertificationInput]);
  return (
    <>
      {/* Certifications List */}
      {certifications &&
        certifications.length !== 0 &&
        certifications.map((selectedData, index) => {
          return (
            <div className="col-12" key={index}>
              <div className="col-md-6">
                <label htmlFor="" className="form-control-label">
                  Select Certification
                </label>
                <select
                  id="certificate-validity"
                  className="form-control"
                  onChange={(e) =>
                    handleCertificationInputChange(
                      e,
                      "selected",
                      selectedData.certificationDetail.id
                    )
                  }
                >
                  {certificationsList.map((item) => {
                    const finedIndex = certifications.findIndex(
                      (element) => element.value === item.value
                    );
                    return (
                      <option
                        key={item.id}
                        value={item.value}
                        disabled={finedIndex !== -1}
                      >
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="certificate-validity"
                  className="form-control-label"
                >
                  Certificate Validity till
                </label>
                <DatePicker
                  defaultValue={moment(selectedData.validityTill)}
                  className="form-control"
                  onChange={(value, dateString) =>
                    handleValidityTillInput(
                      dateString,
                      "selected",
                      selectedData.certificationDetail.id
                    )
                  }
                  format="YYYY"
                  picker="year"
                  style={{
                    width: "100%",
                    color: "#000",
                  }}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="date-validity" className="form-control-label">
                  Date of Validity
                </label>
                <DatePicker
                  defaultValue={moment(selectedData.dateOfValidity)}
                  className="form-control"
                  onChange={(value, dateString) =>
                    handleDateOfValidity(
                      dateString,
                      "selected",
                      selectedData.certificationDetail.id
                    )
                  }
                  format="DD MMM YYYY"
                  style={{
                    width: "100%",
                    color: "#000",
                  }}
                />
              </div>
            </div>
          );
        })}
      {/* Certification Details Input */}
      {certifications.length < certificationsList.length && (
        <>
          <div className="col-md-6">
            <label htmlFor="" className="form-control-label">
              Select Certification
            </label>
            <select
              id="certificate-validity"
              className="form-control"
              onChange={handleCertificationInputChange}
            >
              <option
                value=""
                disabled
                selected={
                  currentCertificationInput.certificationDetail === undefined
                }
              >
                Selected Certification
              </option>
              {certificationsList.map((item) => {
                const finedIndex = certifications.findIndex(
                  (element) => element.value === item.value
                );
                return (
                  <option
                    key={item.id}
                    value={item.value}
                    disabled={finedIndex !== -1}
                  >
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label
              htmlFor="certificate-validity"
              className="form-control-label"
            >
              Certificate Validity till
            </label>
            <DatePicker
              defaultValue={
                Object.keys(currentCertificationInput).length === 0 &&
                moment(currentCertificationInput.validityTill)
              }
              className="form-control"
              onChange={(value, dateString) =>
                handleValidityTillInput(dateString)
              }
              format="YYYY"
              picker="year"
              style={{
                width: "100%",
                color: "#000",
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="date-validity" className="form-control-label">
              Date of Validity
            </label>
            <DatePicker
              className="form-control"
              onChange={(value, dateString) => handleDateOfValidity(dateString)}
              format="DD MMM YYYY"
              style={{
                width: "100%",
                color: "#000",
              }}
            />
          </div>
          <div className="col-md-12">
            {/* <button
              className="stroke-button my-4 d-block"
              onClick={() => handleAddNewCertification()}
              disabled={
                !(
                  Object.keys(currentCertificationInput).length === 3 &&
                  Object.keys(currentCertificationInput.certificationDetail)
                    .length !== 0 &&
                  currentCertificationInput.dateOfValidity !== "" &&
                  currentCertificationInput.validityTill !== ""
                )
              }
              style={{
                opacity: `${
                  Object.keys(currentCertificationInput).length === 3 &&
                  Object.keys(currentCertificationInput.certificationDetail)
                    .length !== 0 &&
                  currentCertificationInput.dateOfValidity !== "" &&
                  currentCertificationInput.validityTill !== ""
                    ? "1"
                    : "0.6"
                }`,
              }}
            >
              add new cirtification
            </button> */}
          </div>
        </>
      )}
    </>
  );
};

export default CertificationsDropdown;
