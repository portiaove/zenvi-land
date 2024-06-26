import React from "react";
import PlugIcon from "../../../assets/plug-icon.svg";
import "./StepSix.css";

const stepSix = React.forwardRef((props, ref) => {
  return (
    <div className="plug-container">
      <img className="zenvi-icon" src={PlugIcon} alt="Plug icon" />
      <h1>Tu ahorro ha comenzado</h1>
      <p>
        Próximamente te enviaremos un email proponiendote tu primer cambio
      </p>
    </div>
  );
});

export default stepSix;
