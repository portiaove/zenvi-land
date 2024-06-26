import React, { useState } from "react";
import "./Input.css";

const InputComponent = ({
  type = "text",
  id,
  name,
  pattern,
  placeholder = "Placeholder",
  errorMessage = null,
  disabled = false,
  innerRef,
  required = false,
  labelText,
  style = {},
  ...props
}) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const refProp = innerRef ? { ref: innerRef } : {};

  const handleInvalid = (e) => {
    e.preventDefault();
    setIsInvalid(true);
  };

  // const handleInput = (e) => {
  //   if (pattern) {
  //     const regex = new RegExp(pattern);
  //     setIsInvalid(!regex.test(e.target.value));
  //   }
  // };

  return (
    <div
      style={style}
      className={`form-group element ${disabled ? "disabled" : ""} ${
        isInvalid ? "error" : ""
      } ${isFocused ? "focused" : ""}`}
    >
      <input
        {...refProp}
        type={type}
        id={id}
        name={name}
        className={`form-control ${isInvalid ? "is-invalid" : ""}`}
        placeholder=""
        // pattern={pattern}
        disabled={disabled}
        required={required}
        // onInvalid={handleInvalid}
        // onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <label htmlFor={id} className="form-control-placeholder">
        {labelText}
      </label>
      {isInvalid && <span className="error-msg">{errorMessage}</span>}
    </div>
  );
};

export default InputComponent;
