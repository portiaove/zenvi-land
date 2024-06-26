import React, { useState, forwardRef, useImperativeHandle } from "react";
import ZenviArrowIcon from "../../../assets/zenvi-arrow.svg";
import "./StepFour.css";

const StepFour = React.forwardRef(({ contractData }, ref) => {
  const [formData, setFormData] = useState({
    iban: "",
  });

  useImperativeHandle(ref, () => ({
    getData: () => formData,
  }));

  return (
    <>
      <div>
        <div className="headerContainer">
        <h2>
          Cada mes Zenvi comprobará cual es la comercializadora mas óptima para ti
        </h2>
        </div>
        <div className="resultCard-container">
          {contractData.map((contract, index) => (
            <div className="resultCard" key={index}>
              <div className="resultCard-content">
                <div className="resultCard-section">
                  <span>Direccion</span>
                  <h2>{contract.address}</h2>
                </div>
                <img
                  className="zenvi-arrow-icon"
                  src={ZenviArrowIcon}
                  alt="Zenvi Arrow Logo"
                />
                <div className="resultCard-section">
                  <span>Ahorro estimado con Zenvi</span>
                  <h2>{contract.ahorro_estimado_anual}€/año</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export default StepFour;