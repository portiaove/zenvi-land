import React from "react";

const ButtonComponent = ({
  text,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className="custom-button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
