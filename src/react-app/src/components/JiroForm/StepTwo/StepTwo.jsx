import React, { useState, forwardRef, useImperativeHandle } from "react";
import { JIRO_FORM_INPUTS_STEP_TWO } from "../../../constants";
import InputComponent from "../../Input/Input";
import "./StepTwo.css";

const StepTwo = forwardRef((props, ref) => {
  const { initialData, onPrivacyPolicyChange } = props;
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    id_number: "",
    phone_number: "",
    email: initialData.email,
    is_company: false,
  });

  useImperativeHandle(ref, () => ({
    getData: () => formData,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "userType") {
      setFormData((prevState) => ({
        ...prevState,
        is_company: value === "sociedad",
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
    <div className="headerContainer">
      <h1>Crea tu usuario en Zenvi para empezar a ahorrar</h1>
    </div>
      <div className="formGrid">
        <div className="first-row">
          {JIRO_FORM_INPUTS_STEP_TWO.slice(0, 2).map((input) => (
            <InputComponent
              key={input.name}
              {...input}
              value={formData[input.name]}
              onChange={handleChange}
              disabled={input.name === "email"}
            />
          ))}
        </div>
        <div className="second-row">
          {JIRO_FORM_INPUTS_STEP_TWO.slice(2).map((input) => (
            <InputComponent
              key={input.name}
              {...input}
              value={formData[input.name]}
              onChange={handleChange}
              disabled={input.name === "email"}
            />
          ))}
        </div>
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              name="userType"
              value="particular"
              checked={!formData.is_company}
              onChange={handleChange}
            />
            Particular
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="sociedad"
              checked={formData.is_company}
              onChange={handleChange}
            />
            Sociedad
          </label>
        </div>
      </div>
      <div className="checkboxContainer">
        <input
          type="checkbox"
          id="politicaPrivacidad"
          name="politicaPrivacidad"
          onChange={(e) => onPrivacyPolicyChange(e.target.checked)}
        />
        <label htmlFor="politicaPrivacidad">
          Acepto la política de privacidad de datos
        </label>
      </div>
    </>
  );
});

export default StepTwo;
