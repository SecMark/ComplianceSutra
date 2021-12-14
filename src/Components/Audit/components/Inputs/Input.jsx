import React from "react";
import styles from "./style.module.scss";

export const Input = ({
  variant = "default",
  labelVariant = "labelMedium",
  placeholder,
  labelText,
  type = "text",
  error,
  errorText,
  onChange,
  onBlur,
  name,
  max,
  min,
  pattern,
  valueForDropDown,
  disabled,
  selected,
  value,
  rows = "6",
  id,
}) => {
  return (
    <>
      {type === "select" ? (
        <>
          <div className={styles.labelContainer}>
            <label className={styles[labelVariant]}>{labelText}</label>
          </div>
          <div>
            <select
              value={value}
              onChange={onChange}
              className={styles[variant]}
              name={name}
              id={id}
            >
              <option disabled value="default" selected>
                Select
              </option>
              {valueForDropDown?.map((element) => {
                return (
                  <option key={element} value={element.name}>
                    {element.name}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      ) : type === "textArea" ? (
        <>
          <div className={styles.labelContainer}>
            <label>{labelText}</label>
          </div>
          <div>
            <textarea
              onChange={onChange}
              type={type}
              placeholder={placeholder}
              name={name}
              disabled={disabled}
              max={max}
              min={min}
              rows={rows}
              pattern={pattern}
              className={styles[variant]}
              value={value}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.labelContainer}>
            <label className={styles[labelVariant]}>{labelText}</label>
          </div>
          <div>
            <input
              onChange={onChange}
              type={type}
              placeholder={placeholder}
              name={name}
              disabled={disabled}
              max={max}
              min={min}
              pattern={pattern}
              className={styles[variant]}
              value={value}
              id={id}
              onBlur={onBlur}
            />
            {error && <p>{errorText}</p>}
          </div>
        </>
      )}
    </>
  );
};
