export const JIRO_FORM_INPUTS_STEP_ONE = [
  {
    type: "email",
    id: "email",
    name: "email",
    labelText: "Email",
    // prettier-ignore
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    errorMessage: "Por favor, introduzca un email válido",
    required: true,
  },
  {
    type: "token",
    id: "token",
    name: "token",
    labelText: "Código de invitacion",
    errorMessage: "Por favor, introduzca un token válido",
    required: true,
  },
];
export const JIRO_FORM_INPUTS_STEP_TWO = [
  {
    type: "text",
    id: "name",
    name: "name",
    labelText: "Nombre",
    pattern: "^.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*$",
    errorMessage: "Por favor, introduce un nombre válido",
    required: true,
  },
  {
    type: "text",
    id: "surname",
    name: "surname",
    labelText: "Apellidos",
    pattern: "^.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*$",
    errorMessage: "Por favor, introduce apellidos válidos",
    required: true,
  },
  {
    type: "email",
    id: "email",
    name: "email",
    labelText: "Email",
    // prettier-ignore
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    errorMessage: "Por favor, introduzca un email válido",
    disabled: true,
    required: true,
  },
  {
    type: "text",
    id: "id_number",
    name: "id_number",
    labelText: "DNI/NIF",
    pattern: "^[0-9]{8}[a-zA-Z]$",
    errorMessage: "Por favor, introduzco 8 digitos + Letra de control",
    required: true,
  },
  {
    type: "text",
    id: "phone_number",
    name: "phone_number",
    labelText: "Teléfono",
    pattern: "^[0-9]{9,13}$",
    errorMessage: "Por favor, introduzca un número de teléfono válido",
    required: true,
  },
];

export const FACTURA_CARD_INPUTS = [
  {
    type: "text",
    id: "address",
    name: "address",
    labelText: "Dirección",
    pattern: "^[A-Za-z0-9s,.'-]{3,}$",
    errorMessage: "Por favor, introduzca una dirección",
    required: true,
  },
  {
    type: "text",
    id: "zip_code",
    name: "zip_code",
    labelText: "Código Postal",
    pattern: "^[0-9]{5}$",
    errorMessage: "Por favor, introduzca un código postal válido",
    required: true,
  },
];
export const JIRO_FORM_INPUTS_STEP_FIVE = {
  type: "text",
  id: "iban",
  name: "iban",
  labelText: "IBAN",
  required: true,
};

export const ROUTES = {
  JiroForm: "/",
  JiroResult: "/result",
};
