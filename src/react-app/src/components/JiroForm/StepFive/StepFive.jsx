import React, { useState, forwardRef, useImperativeHandle } from "react";
import { JIRO_FORM_INPUTS_STEP_FIVE } from "../../../constants";
import InputComponent from "../../Input/Input";
import "./StepFive.css";

const StepFive = React.forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    iban: "",
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
    <>
    <div className="headerContainer">
      <h2>
      Necesitamos tu IBAN para que la nueva comercializadora pueda realizar el proceso
      </h2>
      <p>
      Te pediremos confirmación a través de un correo electrónico antes de hacer ningún cambio
      </p>
    </div>
      <InputComponent
        key={JIRO_FORM_INPUTS_STEP_FIVE.name}
        {...JIRO_FORM_INPUTS_STEP_FIVE}
        value={formData[JIRO_FORM_INPUTS_STEP_FIVE.name]}
        onChange={handleChange}
      />
    </>
  );
});

export default StepFive;
