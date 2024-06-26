import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./JiroSpinner.css";

const JiroSpinner = ({ countdownTime }) => {
  const [countdown, setCountdown] = useState(countdownTime);

  useEffect(() => {
    if (countdownTime === null || countdownTime === undefined) return;

    setCountdown(countdownTime);

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownTime]);

  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
      {countdownTime !== null && countdownTime !== undefined && (
        <p className="loader-text">
          Calculando tu ahorro, tiempo estimado: {countdown} segundos
        </p>
      )}
    </div>
  );
};

JiroSpinner.propTypes = {
  countdownTime: PropTypes.number,
};

export default JiroSpinner;