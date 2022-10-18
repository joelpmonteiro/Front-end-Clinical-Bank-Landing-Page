export const data = {
  Submit: {
    Id: new Date().getTime(),
    Inputs: [],
    Policy: "CLINICAL_BANK_PRONTO",
    ResultingVariable: "FLX_PRINCIPAL",
    Version: "V2.0",
  },
  Authentication: {
    Login: import.meta.env.VITE_AuthenticationLogin,
    Password: import.meta.env.VITE_AuthenticationPassword,
    Properties: [
      {
        Key: "FILIAL_ID",
        Value: "0",
      },
    ],
  },
  Properties: [
    {
      Key: "USUARIO",
      Value: "CLINICAL_BANK_API",
    },
  ],
};

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getUTCDate()),
    padTo2Digits(date.getUTCMonth() + 1),
    date.getUTCFullYear(),
  ].join("/");
}
