import React, { useState, forwardRef } from "react";
import { useDropzone } from "react-dropzone";

const MAX_TOTAL_SIZE_MB = 100; // Maximum total file size in MB
const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024; // Convert MB to Bytes

const StepSeven = forwardRef(({ files: initialFiles, onDrop: initialOnDrop, onRemoveFile: initialOnRemoveFile }, ref) => {
  const [files, setFiles] = useState(initialFiles || []);
  const [error, setError] = useState("");

  const onDrop = (acceptedFiles) => {
    const totalSize = [...files, ...acceptedFiles].reduce((acc, file) => acc + file.size, 0);

    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      setError(`Total files size exceeds the limit of ${MAX_TOTAL_SIZE_MB} MB.`);
      return;
    }

    const newFiles = [...files, ...acceptedFiles];
    setFiles(newFiles);
    initialOnDrop(newFiles);
    setError(""); // Clear any previous errors
  };

  const onRemoveFile = (fileToRemove, e) => {
    e.stopPropagation(); // Prevent the drop zone from getting activated
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    initialOnRemoveFile(updatedFiles);
    setError(""); // Clear any previous errors
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div style={headerContainerStyle}>
        <h2 style={headerStyle}>Desde Zenvi estamos trabajando para ayudarte a ahorrar en tu factura de gas</h2>
        <p style={paragraphStyle}>
          Adjunta las facturas de gas de tus hogares, cuantas mas adjuntes por cada vivienda mejor afinaremos el servicio
        </p>
      </div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta aqui las facturas...</p>
        ) : files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} style={iconStyle}>
              <button
                style={removeButtonStyle}
                onClick={(e) => onRemoveFile(file, e)}
              >
                ✖
              </button>
              <span style={fileNameStyle}>📄 {file.name}</span>
            </div>
          ))
        ) : (
          <p>Arrastra o haz click para subir la factura(s) asociada(s)</p>
        )}
      </div>
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
});

const headerContainerStyle = {
  textAlign: "center",
  marginBottom: "20px", // Adjust this value to add space below the container
};

const headerStyle = {
  marginBottom: "10px", // Add margin to the bottom of the header
};

const paragraphStyle = {
  marginBottom: "20px", // Add margin to the bottom of the paragraph
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  marginBottom: "20px",
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "center",
  marginTop: "20px", // Add margin to the top of the drop zone
};

const iconStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  border: "1px solid #cccccc",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
  position: "relative",
  width: "250px",
};

const removeButtonStyle = {
  backgroundColor: "transparent",
  border: "none",
  color: "red",
  cursor: "pointer",
  fontSize: "16px",
  position: "absolute",
  left: "10px",
};

const fileNameStyle = {
  marginLeft: "30px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const errorStyle = {
  color: "red",
  marginTop: "10px",
};

export default StepSeven;