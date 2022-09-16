export const data = {
  Submit: {
    Id: new Date().getTime(),
    Inputs: [],
    Policy: "CLINICAL_BANK_PRONTO",
    ResultingVariable: "FLX_PRINCIPAL",
    Version: "V2.0",
  },
  Authentication: {
    Login: env.VITE_AuthenticationLogin,
    Password: env.VITE_AuthenticationPassword,
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
    padTo2Digits(date.getDate() + 1),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}