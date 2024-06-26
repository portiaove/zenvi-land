import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FACTURA_CARD_INPUTS } from "../../constants";
import InputComponent from "../Input/Input";
import "./FacturaCard.css";

const MAX_TOTAL_SIZE_MB = 10; // Maximum total file size in MB
const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024; // Convert MB to Bytes

const FacturaCard = ({ factura, index, updateFactura, handleFileUpload }) => {
  const [files, setFiles] = useState(factura.file ? [factura.file] : []);
  const [error, setError] = useState("");

  const onDrop = (acceptedFiles) => {
    const totalSize = [...files, ...acceptedFiles].reduce((acc, file) => acc + file.size, 0);

    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      setError(`El tamaño de los archivos no puede ser mayor que ${MAX_TOTAL_SIZE_MB} MB.`);
      return;
    }

    setFiles([...files, ...acceptedFiles]);
    handleFileUpload(index, { target: { files: [...files, ...acceptedFiles] } });
    setError("");
  };

  const onRemoveFile = (fileToRemove, e) => {
    e.stopPropagation();
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    handleFileUpload(index, { target: { files: updatedFiles } });
    setError("");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFactura(index, { [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    updateFactura(index, { previous_account_holder_is_company: !checked });
  };

  return (
    <div className="facturaCard">
      <div className="inputWrapper">
        {FACTURA_CARD_INPUTS.map((input, idx) => (
          <InputComponent key={idx} {...input} onChange={handleInputChange} />
        ))}
      </div>
      <div
        className={`fileUploader ${isDragActive ? "dragOver" : ""}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta aqui las facturas...</p>
        ) : files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} className="icon">
              <button className="removeButton" onClick={(e) => onRemoveFile(file, e)}>
                ✖
              </button>
              <span className="fileName">📄 {file.name}</span>
            </div>
          ))
        ) : (
          <p>Arrastra o haz click para subir la factura(s) asociada(s)</p>
        )}
      </div>
      {error && <div className="error">{error}</div>}
      <div className="checkboxContainer">
        <input
          type="checkbox"
          id={`previous_account_holder_is_company-${index}`}
          name="previous_account_holder_is_company"
          checked={!factura.previous_account_holder_is_company}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`previous_account_holder_is_company-${index}`}>
          Soy el titular del contrato
        </label>
      </div>
    </div>
  );
};

export default FacturaCard;