import React from "react";
import { MdDelete } from "react-icons/md";

const SelectDataDropdown = ({
  options,
  currentInput,
  setCurrentInput,
  selectedList,
  setSelectedList,
  labelText,
  addNewButtonText,
  deleteButtonText,
}) => {
  const handleCurrentInputChange = (e, type, selectedDataId) => {
    const dataValue = e.target.value;
    const data = options.find((element) => element.value === dataValue);
    const dataIndexInSelectedData = selectedList.findIndex(
      (element) => element.id === data.id
    );
    if (!type && !selectedDataId) {
      setCurrentInput(data);
    } else if (type && type === "selected" && dataIndexInSelectedData === -1) {
      const finedIndex = selectedList.findIndex(
        (element) => element.id === selectedDataId
      );
      let tempArray = [...selectedList];
      tempArray[finedIndex] = data;
      setSelectedList(tempArray);
    }
  };

  const handleAddNewData = () => {
    if (currentInput && Object.keys(currentInput).length !== 0) {
      if (
        selectedList.findIndex(
          (element) => element.value === currentInput.value
        ) === -1
      ) {
        setSelectedList([...selectedList, currentInput]);
        setCurrentInput({});
      }
    }
  };
  const handleDeleteData = (id) => {
    if (id) {
      const tempArray = selectedList.filter((element) => element.id !== id);
      setSelectedList(tempArray);
    }
  };
  return (
    <>
      <div className="col-10">
        {selectedList &&
          selectedList.length !== 0 &&
          selectedList.map((selectedData, index) => (
            <div key={selectedData.id} className="selected-role my-2">
              <label className="form-control-label">
                {labelText}&nbsp;{index !== 0 && ordinalSuffix(index + 1)}
              </label>
              <div className="d-flex w-100 justify-content-between">
                <select
                  className="form-control selected-role--form-control"
                  onChange={(e) =>
                    handleCurrentInputChange(e, "selected", selectedData.id)
                  }
                >
                  {options.map((item) => {
                    const finedIndex = selectedList.findIndex(
                      (element) => element.value === item.value
                    );
                    return (
                      <option
                        key={item.id}
                        selected={selectedData.value === item.value}
                        disabled={finedIndex !== -1}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="stroke-button"
                  onClick={() => handleDeleteData(selectedData.id)}
                >
                  <MdDelete />
                  &nbsp;{deleteButtonText}
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="col-6">
        {/* Select Input */}
        {selectedList.length < options.length && (
          <>
            <label className="form-control-label">
              {labelText}&nbsp;
              {selectedList.length !== 0 &&
                ordinalSuffix(selectedList.length + 1)}
            </label>
            <select
              className="form-control"
              onChange={handleCurrentInputChange}
            >
              <option
                value=""
                disabled
                selected={Object.keys(currentInput).length === 0}
              >
                {labelText}
              </option>
              {options.map((item) => {
                const finedIndex = selectedList.findIndex(
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
            {addNewButtonText && addNewButtonText !== "" && (
              <button
                className="stroke-button my-3"
                onClick={handleAddNewData}
                disabled={Object.keys(currentInput).length === 0}
                style={{
                  opacity: Object.keys(currentInput).length === 0 ? "0.6" : "1",
                }}
              >
                {addNewButtonText}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};
const ordinalSuffix = (i) => {
  let j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
};
export default SelectDataDropdown;
