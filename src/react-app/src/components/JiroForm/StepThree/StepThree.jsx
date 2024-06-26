import React, { useState, forwardRef, useImperativeHandle } from "react";
import FacturaCard from "../../FacturaCard/FacturaCard";
import "./StepThree.css";

const StepThree = forwardRef(({ userInfo }, ref) => {
  const defaultFactura = {
    file: null,
    address: "",
    zip_code: "",
    previous_account_holder_name: "",
    previous_account_holder_is_company: false,
  };

  const [facturas, setFacturas] = useState([defaultFactura]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      ...userInfo,
      facturas,
    }),
  }));

  const handleFileUpload = (index, e) => {
    const files = e.target.files || []
    if (files.length > 0) {
      updateFactura(index, { files });
    }
  };

  const updateFactura = (index, updatedData) => {
    setFacturas((prevFacturas) =>
      prevFacturas.map((factura, i) =>
        i === index ? { ...factura, ...updatedData } : factura
      )
    );
  };

  const addFactura = () => {
    setFacturas((prevFacturas) => [...prevFacturas, { ...defaultFactura }]);
  };

  return (
    <>
    <div className="headerContainer">
      <h1>Introduce los datos de tus hogares</h1>
      <p>
        Con una factura por hogar es suficiente, pero cuantas mas facturas adjuntes mejor comprenderemos tus necesidades
      </p>
    </div>
      {facturas.length > 0 &&
        facturas.map((factura, index) => (
          <FacturaCard
            key={index}
            factura={factura}
            index={index}
            updateFactura={updateFactura}
            handleFileUpload={handleFileUpload}
          />
        ))}
      <div className="custom-button-wrapper" onClick={addFactura}>
        <button className="custom-button">+</button>
        <span className="custom-button-label">Añade una nueva vivienda</span>
      </div>
    </>
  );
});

export default StepThree;