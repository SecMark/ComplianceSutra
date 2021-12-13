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
            >
              <option disabled value="default" selected>
                {placeholder}
              </option>
              {valueForDropDown?.map((element) => {
                return (
                  <option
                    key={element.id || element.value || element}
                    value={element?.value ? element?.value : element}
                  >
                    {element?.label || element?.name}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      ) : (
        <>
          <div className={styles.labelContainer}>
            <label className={styles[labelVariant]}>{labelText}</label>
          </div>
          <div>
            {type === "textarea" ? (
              <textarea
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
              />
            ) : (
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
              />
            )}

            {error && <p>{errorText}</p>}
          </div>
        </>
      )}
    </>
  );
};
