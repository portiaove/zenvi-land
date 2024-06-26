import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree/StepThree";
import StepFour from "./StepFour/StepFour";
import StepFive from "./StepFive/StepFive";
import StepSix from "./StepSix/StepSix";
import StepSeven from "./StepSeven/StepSeven";
import services from "../../services";
import { ROUTES } from "../../constants";
import ButtonComponent from "../Button/Button";
import "./index.css";
import ZenviIcon from "../../assets/zenvi-lg.svg";
import JiroSpinner from "../JiroSpinner/JiroSpinner";

const {
  validateUserToken,
  saveUserInfo,
  saveUserContracts,
  registerUserWithIBAN,
  isIBANRegistered,
  saveGasBills,
} = services;

const pickFields = (obj, fields) => {
  return fields.reduce((acc, field) => {
    if (obj.hasOwnProperty(field)) {
      acc[field] = obj[field];
    }
    return acc;
  }, {});
};

const JiroForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [files, setFiles] = useState([]); // State for files
  const [loading, setLoading] = useState(false);
  const [countdownTime, setCountdownTime] = useState(null); // State for countdown time
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    name: "",
    surname: "",
    id_number: "",
    phone_number: "",
  });
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
  const navigate = useNavigate();

  const stepOneRef = useRef();
  const stepTwoRef = useRef();
  const stepThreeRef = useRef();
  const stepFourRef = useRef();
  const stepFiveRef = useRef();
  const stepSixRef = useRef();
  const stepSevenRef = useRef();

  const handleNextStep = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      switch (currentStep) {
        case 1:
          await handleStepOne();
          break;
        case 2:
          await handleStepTwo();
          break;
        case 3:
          await handleStepThree();
          break;
        case 4:
          await handleStepFour();
          break;
        case 5:
          await handleStepFive();
          break;
        case 6:
          await handleStepSix();
          break;
        case 7:
          await handleStepSeven();
          break;
        default:
          throw new Error("Unexpected step");
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStepOne = async () => {
    const data = stepOneRef.current.getData();
    setFormData({ ...formData, ...data });
    try {
      const res = await validateUserToken(data);
      setError(null);
      if (res.success) {
        setCurrentStep(3);
      } else {
        setCurrentStep(2);
      }
    } catch (err) {
      setError("Email o Código de invitación introducido no válido");
    }
  };

  const handleStepTwo = async () => {
    const data = stepTwoRef.current.getData();
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
    try {
      await saveUserInfo(newFormData);
      setCurrentStep(3);
    } catch (err) {
      // TODO: Handle error
    }
  };


  const numberOfFilesInRequest = (data) => {
    if (!data.facturas || !Array.isArray(data.facturas)) {
      return 0;
    }
  
    return data.facturas.reduce((sum, factura) => {
      if (factura.files && Array.isArray(factura.files)) {
        return sum + factura.files.length;
      }
      return sum;
    }, 0);
  };


  const handleStepThree = async () => {
    const data = stepThreeRef.current.getData();
    const numberOfFiles = numberOfFilesInRequest(data)
    const secondsToWait = numberOfFiles * 15
    setCountdownTime(secondsToWait);
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
    try {
      const res = await saveUserContracts(newFormData);
      setCountdownTime(null);
      setContractData(res);
      setCurrentStep(4);
    } catch (err) {
        setCountdownTime(null);
        const resIban = await isIBANRegistered(formData);
        setError(null);
        if (resIban.success) {
          setCurrentStep(6);
        } else {
          setCurrentStep(5);
        }
    } finally {
      setCountdownTime(null);
    }
  };

  const handleStepFour = async () => {
    try {
      const res = await isIBANRegistered(formData);
      setError(null);
      if (res.success) {
        setCurrentStep(6);
      } else {
        setCurrentStep(5);
      }
    } catch (err) {
      // TODO
    }
  };

  const handleStepFive = async () => {
    const data = stepFiveRef.current.getData();
    const fieldsToKeep = ["email", "token", "iban"];
    const selectedFormData = pickFields(formData, fieldsToKeep);
    const newFormData = { ...selectedFormData, ...data };
    setFormData(newFormData);
    try {
      await registerUserWithIBAN(newFormData);
      setCurrentStep(6);
    } catch (err) {
      // TODO: Handle error
    }
  };

  const handleStepSix = async () => {
    setCurrentStep(7);
  };

  const handleStepSeven = async () => {
    try {
      await saveGasBills(formData.email, formData.token, files);
      console.log("Files uploaded successfully");
      setCurrentStep(6);
    } catch (error) {
        console.error("Error uploading files:", error);
        setCurrentStep(6);
    }
  };

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const onRemoveFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const StepsIndicator = () => {
    if (currentStep === 2 || currentStep === 3 || currentStep === 4) {
      const stepMap = { 2: 1, 3: 2, 4: 3 };
      return (
        <div className="steps-indicator">
          <p>{`${stepMap[currentStep]} / 3`}</p>
        </div>
      );
    }
    return null;
  };

  const getButtonText = () => {
    if (currentStep === 3) {
      return "Enviar";
    } else if (currentStep === 6) {
      return "¿Quieres ahorrar en gas?";
    } else {
      return "Siguiente";
    }
  };

  return (
    <div className="form-container">
      {loading && <JiroSpinner countdownTime={countdownTime} />}
      <img className="zenvi-icon" src={ZenviIcon} alt="Zenvi Logo" />
      <form className="jiro-form" onSubmit={handleNextStep}>
        {currentStep === 1 && <StepOne ref={stepOneRef} />}
        {currentStep === 2 && (
          <StepTwo ref={stepTwoRef} initialData={{ email: formData.email }} onPrivacyPolicyChange={setIsPrivacyPolicyChecked} />
        )}
        {currentStep === 3 && (
          <StepThree ref={stepThreeRef} userInfo={formData} />
        )}
        {currentStep === 4 && (
          <StepFour ref={stepFourRef} contractData={contractData} />
        )}
        {currentStep === 5 && (
          <StepFive
            ref={stepFiveRef}
          />
        )}
        {currentStep === 6 && <StepSix ref={stepSixRef} />}
        {currentStep === 7 && (
          <StepSeven
            ref={stepSevenRef}
            files={files}
            onDrop={onDrop}
            onRemoveFile={onRemoveFile}
            email={formData.email}
          />
        )}
        {error && <p className="error-message">{error}</p>}
        <div className="button-container">
          <ButtonComponent
            type="submit"
            text={getButtonText()}
            disabled={currentStep === 2 && !isPrivacyPolicyChecked}
          />
        </div>
        <StepsIndicator />
      </form>
    </div>
  );
};

export default JiroForm;
