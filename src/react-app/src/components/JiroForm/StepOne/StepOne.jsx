import React, { useState, forwardRef, useImperativeHandle } from "react";
import { JIRO_FORM_INPUTS_STEP_ONE } from "../../../constants";
import InputComponent from "../../Input/Input";

const StepOne = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    email: "",
    token: "",
  });

  useImperativeHandle(ref, () => ({
    getData: () => formData,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={stepOneContainer}>
      <h1>Introduce tu código</h1>
      {JIRO_FORM_INPUTS_STEP_ONE.map((input, idx) => (
        <InputComponent
          style={{ width: "80%" }}
          key={idx}
          {...input}
          value={formData[input.name]}
          onChange={handleChange}
        />
      ))}
      <div style={emailContainer}>
        <a href="mailto:facturas@zenvi.es?subject=Quiero%20un%20c%C3%B3digo%20de%20invitaci%C3%B3n">
          ¿No tienes código?
        </a>
        <p>Déjanos tu email para obtener un acceso anticipado</p>
      </div>
    </div>
  );
});

const stepOneContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
};

const emailContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "6px",
};

export default StepOne;
