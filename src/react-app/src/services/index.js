import axios from "axios";

const domain = process.env.REACT_APP_BACKEND_URL || 'https://backend-zenvi-5zv6ce4weq-no.a.run.app/api';

const validateUserToken = async (body) => {
  try {
    const response = await axios.post(`${domain}/register_login`, body);
    return response.data;
  } catch (error) {
    console.error("Error posting form data:", error);
    throw error;
  }
};

const registerUserWithIBAN = async (body) => {
  try {
    const response = await axios.post(
      `${domain}/register_user_with_iban`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error posting form data:", error);
    throw error;
  }
};

const isIBANRegistered = async (body) => {
  try {
    const response = await axios.post(`${domain}/is_iban_registered`, body);
    return response.data;
  } catch (error) {
    console.error("Error posting form data:", error);
    throw error;
  }
};

const saveUserInfo = async (body) => {
  try {
    const response = await axios.post(`${domain}/add_personal_details`, body);
    return response.data;
  } catch (error) {
    console.error("Error posting form data:", error);
    throw error;
  }
};

const saveUserContracts = async (data) => {
  const formData = new FormData();
  data.facturas.forEach((factura, index) => {
    if (factura.files && Array.isArray(factura.files)) {
      factura.files.forEach((file, subindex) => {
        formData.append(`facturas_${index}_file_${subindex}`, file);
      });
    }
    formData.append(`facturas_${index}_address`, factura.address);
    formData.append(`facturas_${index}_zip_code`, factura.zip_code);
    formData.append(
      `facturas_${index}_previous_account_holder_name`,
      factura.previous_account_holder_name
    );
    formData.append(
      `facturas_${index}_previous_account_holder_is_company`,
      factura.previous_account_holder_is_company
    );
  });
  Object.keys(data).forEach((key) => {
    if (key !== "facturas") {
      formData.append(key, data[key]);
    }
  });

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve([
  //       {
  //         address: "bravo murillo 191",
  //         factura_estimada_mensual: 40,
  //         factura_real_mensual: 50,
  //         ahorro_estimado_anual: 120,
  //       },
  //       {
  //         address: "orellana 10",
  //         factura_estimada_mensual: 40,
  //         factura_real_mensual: 60,
  //         ahorro_estimado_anual: 240,
  //       },
  //     ]);
  //   }, 2000);
  // });

  try {
    const response = await axios.post(
      `${domain}/get_bill_estimates`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting form data:", error);
    throw error;
  }
};

const saveGasBills = async (email, token, files) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("token", token);
  files.forEach((file, index) => {
    formData.append(`facturas_${index}_file`, file);
  });

  const response = await axios.post(`${domain}/save_gas_files`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default {
  validateUserToken,
  saveUserInfo,
  saveUserContracts,
  isIBANRegistered,
  registerUserWithIBAN,
  saveGasBills,
};
