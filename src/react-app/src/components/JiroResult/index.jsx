// ResultPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const data = location.state.data;

  return (
    <div>
      <h1>Bill Estimates Results</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <p>Address: {item.address}</p>
            <p>Estimated Monthly Bill: {item.factura_estimada_mensual}</p>
            <p>Real Monthly Bill: {item.factura_real_mensual}</p>
            <p>Estimated Annual Savings: {item.ahorro_estimado_anual}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultPage;
